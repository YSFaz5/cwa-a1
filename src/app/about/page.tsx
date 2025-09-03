export default function AboutPage() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">About</h1>

      <p>
        Hi, my name is <strong>Yousa Faiyaz</strong>, student number <strong>20510660</strong>. 
        This page introduces me and includes a short video.
      </p>

      <video 
        controls 
        width="640" 
        className="rounded border"
      >
        <source src="/how-to.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </main>
  );
}
