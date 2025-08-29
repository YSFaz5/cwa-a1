export default function AboutPage() {
  return (
    <section style={{ padding: "16px" }}>
      <h1>About this website</h1>
      <p><strong>Yousa Faiyaz</strong> — 20510660</p>

      <video controls width={720} aria-label="How to use this website">
        <source src="/how-to.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
    </section>
  );
}
