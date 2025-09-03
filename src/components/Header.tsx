"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { setCookie, getCookie } from "@/lib/cookies";
import ThemeToggle from "@/components/ThemeToggle";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/escape-room", label: "Escape Room" },
  { href: "/coding-races", label: "Coding Races" },
  { href: "/court-room", label: "Court Room" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const navRef = useRef<HTMLElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  // On first load, if a lastTab cookie exists and it's a known route, go there.
  useEffect(() => {
    const saved = getCookie("lastTab");
    const known = LINKS.some((l) => l.href === saved);
    if (known && saved && pathname !== saved) {
      router.replace(saved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close menu on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        // return focus to the button for keyboard users
        btnRef.current?.focus();
      }
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Optional: click outside to close
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!open) return;
      const target = e.target as Node;
      const insideButton = btnRef.current?.contains(target);
      const insideNav = navRef.current?.contains(target);
      if (!insideButton && !insideNav) setOpen(false);
    }
    window.addEventListener("mousedown", onClickOutside);
    return () => window.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 16px",
        borderBottom: "1px solid var(--border)",
        background: "var(--bg)",
      }}
    >
      {/* Student Number top-left — change to yours */}
      <div style={{ fontWeight: 700 }}>20510660</div>

      {/* Hamburger button */}
      <button
        ref={btnRef}
        aria-label="Toggle menu"
        aria-expanded={open}
        // <-- wired to nav id
        aria-controls="site-menu"
        onClick={() => setOpen((v) => !v)}
        style={{ marginLeft: "auto", padding: "8px 12px" }}
      >
        ☰
      </button>

      {/* Menu */}
      <nav
        id="site-menu"                   /* <-- id added here */
        aria-label="Main"
        ref={navRef}
        style={{ display: open ? "block" : "none" }}
      >
        <ul
          style={{
            display: "flex",
            listStyle: "none",
            gap: 12,
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
                  onClick={() => {
                    setCookie("lastTab", l.href);
                    setOpen(false); // close menu after choosing a link
                  }}
                  aria-current={isActive ? "page" : undefined}
                  style={{
                    padding: "6px 10px",
                    borderRadius: 6,
                    border: "1px solid var(--border)",
                    background: isActive ? "#eee" : "var(--bg)",
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

      {/* Theme chooser */}
      <ThemeToggle />
    </header>
  );
}
