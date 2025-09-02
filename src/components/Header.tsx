"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { setCookie, getCookie } from "@/lib/cookies";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/escape-room", label: "Escape Room" },
  { href: "/coding-races", label: "Coding Races" },
  { href: "/court-room", label: "Court Room" },
];

<ThemeToggle/>
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // On first load, if a lastTab cookie exists and it's a known route, go there.
  useEffect(() => {
    const saved = getCookie("lastTab");
    const known = LINKS.some((l) => l.href === saved);
    if (known && saved && pathname !== saved) {
      router.replace(saved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

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
<ThemeToggle />

      {/* Menu */}
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
            {LINKS.map((l) => {
              const isActive = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setCookie("lastTab", l.href)}
                    aria-current={isActive ? "page" : undefined}
                    style={{
                      padding: "6px 10px",
                      borderRadius: 6,
                      border: "1px solid #ccc",
                      background: isActive ? "#eee" : "#fff",
                      fontWeight: isActive ? 700 : 400,
                    }}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
