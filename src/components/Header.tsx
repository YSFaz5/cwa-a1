"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/escape-room", label: "Escape Room" },
  { href: "/coding-races", label: "Coding Races" },
  { href: "/court-room", label: "Court Room" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        padding: "12px 16px",
        borderBottom: "1px solid #ddd",
        background: "white",
      }}
    >
      {/* Student Number top-left */}
      <div style={{ fontWeight: "bold", marginRight: "16px" }}>20510660</div>

      {/* Hamburger button */}
      <button
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        style={{ marginLeft: "auto", padding: "8px 12px" }}
      >
        ☰
      </button>

      {/* Menu links */}
      {open && (
        <nav>
          <ul
            style={{
              display: "flex",
              listStyle: "none",
              gap: "12px",
              margin: 0,
              padding: 0,
            }}
          >
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
