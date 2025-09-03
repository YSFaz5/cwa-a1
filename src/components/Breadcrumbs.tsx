"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Breadcrumbs() {
  const path = usePathname();
  const parts = path.split("/").filter(Boolean);
  return (
    <nav aria-label="Breadcrumb" style={{ margin: "8px 0" }}>
      <Link href="/">Home</Link>
      {parts.map((p, i) => {
        const href = "/" + parts.slice(0, i + 1).join("/");
        const title = p.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
        return <span key={href}> / <Link href={href}>{title}</Link></span>;
      })}
    </nav>
  );
}
