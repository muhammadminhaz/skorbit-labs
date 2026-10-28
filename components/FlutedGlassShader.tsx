"use client";

import { useEffect, useRef } from "react";

const VERT = `attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}`;

// Soft blobs of colored light seen through diagonal fluted glass. Each slat offsets and
// stretches what is behind it (the refraction), more so per color channel near its edges.
const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;

const float SLATS = 9.0;

float blob(vec2 p, vec2 c, float r) {
  vec2 d = p - c;
  return exp(-dot(d, d) / (r * r));
}

// The liquid behind the glass
vec3 scene(vec2 p, float t) {
  // Logo tiles: blue, light cyan, deep blue
  vec3 blue = vec3(0.16, 0.50, 1.0);
  vec3 cyan  = vec3(0.30, 0.78, 1.0);
  vec3 deep = vec3(0.08, 0.28, 0.70);
  vec3 col = vec3(0.0);
  col += blue * blob(p, vec2(0.15 + 0.35 * sin(t * 0.21), 0.05 + 0.2 * cos(t * 0.17)), 0.24);
  col += cyan  * blob(p, vec2(-0.25 + 0.3 * cos(t * 0.13), 0.2 * sin(t * 0.19 + 1.0)), 0.16) * 1.2;
  col += deep * blob(p, vec2(0.6 + 0.25 * sin(t * 0.11 + 2.0), -0.3 + 0.2 * sin(t * 0.23)), 0.2) * 0.8;
  col += blue * blob(p, vec2(-0.7 + 0.2 * sin(t * 0.09), -0.35 + 0.15 * cos(t * 0.15)), 0.18) * 0.4;
  return col;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float t = uTime;

  vec2 n = normalize(vec2(1.0, -0.62));      // across the slats
  float s = dot(uv, n) * SLATS / 1.6;
  float f = fract(s);
  float id = floor(s);

  // Refraction: each slat magnifies its strip and shifts it along n; channels split near the edges
  float bend = (f - 0.5) / SLATS * 1.6;
  vec2 base = uv - n * bend * 3.2 + n * 0.02 * sin(id * 1.7);
  float split = 0.035 * pow(abs(f - 0.5) * 2.0, 3.0);
  vec3 col = vec3(
    scene(base + n * split, t).r,
    scene(base, t).g,
    scene(base - n * split, t).b
  );

  // Glass shading: dark seam at the leading edge, faint sheen across the slat
  col *= smoothstep(0.0, 0.07, f) * (0.65 + 0.35 * smoothstep(0.0, 0.6, f));
  col += vec3(0.03, 0.045, 0.06) * smoothstep(0.85, 1.0, f);

  col = 1.0 - exp(-col * 1.4);
  col *= 1.0 - 0.3 * dot(uv, uv);
  col += vec3(0.010, 0.012, 0.016);
  gl_FragColor = vec4(col, 1.0);
}`;

export default function FlutedGlassShader({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    // Software WebGL (no GPU, e.g. Lighthouse/PageSpeed or disabled acceleration) runs this shader on the CPU
    // and blocks the main thread every frame, so it gets one still frame instead of the loop
    const fast = canvas.getContext("webgl", { antialias: false, failIfMajorPerformanceCaveat: true });
    const gl = fast ?? canvas.getContext("webgl", { antialias: false });
    if (!gl) return; // the CSS gradient behind the canvas stays as the fallback
    // Chrome hands SwiftShader out as a Vulkan device, so the caveat flag alone misses it; the renderer name doesn't
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = String(gl.getParameter(info ? info.UNMASKED_RENDERER_WEBGL : gl.RENDERER));
    const software = !fast || /swiftshader|llvmpipe|softpipe|software|basic render/i.test(renderer);

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) console.error("[FlutedGlassShader]", gl.getShaderInfoLog(sh));
      return sh;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("[FlutedGlassShader] link failed", gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");

    const reduce = software || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // ponytail: fixed DPR cap; drop to 1 if low-end phones stutter. Software WebGL's still frame renders at 1x to keep it cheap.
    const dpr = software ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
    let raf = 0;
    let visible = false; // set by the IntersectionObserver's first callback
    const start = performance.now();

    const draw = (now: number) => {
      gl.uniform1f(uTime, reduce ? 8 : (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      canvas.style.opacity = "1";
    };
    const loop = (now: number) => {
      draw(now);
      raf = visible && !reduce ? requestAnimationFrame(loop) : 0;
    };
    const resize = () => {
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      if (visible && !raf) draw(performance.now()); // off screen, the next visible frame redraws
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    // Draws only on screen: starts (or, when still, draws one frame) as it comes into view and pauses when
    // scrolled away, so the GPU idles and the footer's copy costs nothing on load
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      // Free GPU objects but keep the context: React can re-run this effect on the same canvas
      // (e.g. returning to a page), and a lost context would make every later compile fail.
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`opacity-0 transition-opacity duration-1000 ${className}`} />;
}
