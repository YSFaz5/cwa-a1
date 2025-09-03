"use client";

import { useState } from "react";

export default function SkipLink() {
  const [visible, setVisible] = useState(false);

  return (
    <a
      href="#main"
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      style={{
        position: "absolute",
        left: 8,
        top: 8,
        padding: "6px 10px",
        background: "var(--bg)",
        border: "1px solid var(--border)",
        clipPath: visible ? "none" : "inset(50%)",
        zIndex: 1000,
      }}
    >
      Skip to content
    </a>
  );
}
