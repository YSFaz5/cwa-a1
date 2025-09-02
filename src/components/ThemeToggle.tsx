"use client";

import { useEffect, useState } from "react";

type ThemeChoice = "light" | "dark" | "system";

export default function ThemeToggle() {
  const [choice, setChoice] = useState<ThemeChoice>("system");

  // Apply the theme choice to <body data-theme="...">
  const applyTheme = (next: ThemeChoice) => {
    if (typeof window === "undefined") return;

    if (next === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.body.setAttribute("data-theme", prefersDark ? "dark" : "light");
    } else {
      document.body.setAttribute("data-theme", next);
    }
  };

  // On first mount: load from localStorage or system
  useEffect(() => {
    const saved = (localStorage.getItem("theme-choice") as ThemeChoice) || "system";
    setChoice(saved);
    applyTheme(saved);

    // Listen to system changes when on 'system'
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (saved === "system") applyTheme("system");
    };
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When user changes choice
  const onChange = (next: ThemeChoice) => {
    setChoice(next);
    localStorage.setItem("theme-choice", next);
    applyTheme(next);
  };

  return (
    <div style={{ marginLeft: 12 }}>
      <label htmlFor="themeSel" style={{ marginRight: 6 }}>Theme</label>
      <select
        id="themeSel"
        aria-label="Select site theme"
        value={choice}
        onChange={(e) => onChange(e.target.value as ThemeChoice)}
      >
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}
