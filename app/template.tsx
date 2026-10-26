"use client";

import { ViewTransition } from "react";

// Remounts on every navigation, so the old page exits and the new one enters in the same view transition.
// The browser keeps a snapshot of the old page on screen while an edge sweeps down with the curtain menu's
// motion, swapping old for new as it passes. Animations live in globals.css (page-in / page-out).
// bg keeps the incoming snapshot opaque so it covers the old page instead of blending with it.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <div className="bg-(--bg)">{children}</div>
    </ViewTransition>
  );
}
