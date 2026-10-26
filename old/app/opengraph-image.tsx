import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Skorbit Labs: we design, build and ship digital products end to end";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Outfit is the site's heading font. If Google Fonts is unreachable at build, fall back to the default font.
async function loadOutfit(weight: number): Promise<ArrayBuffer | null> {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Outfit:wght@${weight}`)).text();
    const url = css.match(/src: url\((.+?)\) format/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const [logo, bold, regular] = await Promise.all([
    readFile(join(process.cwd(), "app/icon.png")),
    loadOutfit(700),
    loadOutfit(400),
  ]);
  const fonts = [
    ...(bold ? [{ name: "Outfit", data: bold, weight: 700 as const }] : []),
    ...(regular ? [{ name: "Outfit", data: regular, weight: 400 as const }] : []),
  ];
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          color: "#F2F2F3",
          fontFamily: "Outfit",
          position: "relative",
          background:
            "radial-gradient(circle at 88% 30%, rgba(14,165,233,0.35) 0%, rgba(14,165,233,0) 45%), linear-gradient(135deg, #07090d 0%, #0b1320 55%, #0c2236 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={300} height={300} alt="" style={{ position: "absolute", right: 70, top: 60, opacity: 0.9 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={72} height={72} alt="" />
          <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: -0.5 }}>Skorbit Labs</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 12 }}>
          <div style={{ width: 96, height: 4, borderRadius: 4, background: "#38BDF8" }} />
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 62, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.5, maxWidth: 800 }}>
            We design, build and ship digital products end to end.
          </div>
          <div style={{ fontSize: 30, color: "#A1A1AA", maxWidth: 820 }}>
            A senior product studio for web, mobile and AI. One team from first sketch to scale.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#7DD3FC" }}>
          <span>Strategy · Design · Engineering · Growth</span>
          <span style={{ color: "#6B7280" }}>Book a call</span>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
