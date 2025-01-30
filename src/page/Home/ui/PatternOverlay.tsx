import React from "react";
import { patternOverlayUrl } from "../model/svg";

export default function PatternOverlay() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url(${patternOverlayUrl})`,
        backgroundRepeat: 'repeat',
        backgroundSize: '24px',
      }}
    />
  );
}
