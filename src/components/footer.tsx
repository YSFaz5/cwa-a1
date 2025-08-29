export default function Footer() {
  const today = new Date().toLocaleDateString();

  return (
    <footer
      style={{
        marginTop: "24px",
        padding: "16px",
        borderTop: "1px solid #ddd",
        fontSize: "14px",
        textAlign: "center",
      }}
      aria-label="Site footer"
    >
      <div>
        © {new Date().getFullYear()} — <strong>Yousa Faiyaz</strong> — 20510660 — {today}
      </div>
    </footer>
  );
}
