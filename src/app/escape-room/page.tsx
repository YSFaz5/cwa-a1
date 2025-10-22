"use client";
import { useEffect, useState } from "react";

type Stage = 1 | 2 | 3;

export default function EscapeRoomPage() {
  // TIMER
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  // STAGES
  const [stage, setStage] = useState<Stage>(1);

  
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const start = () => setRunning(true);
  const pause = () => setRunning(false);
  const reset = () => { setRunning(false); setSeconds(0); };
  const nextStage = () => setStage(s => (s < 3 ? (s + 1) as Stage : s));
  const prevStage = () => setStage(s => (s > 1 ? (s - 1) as Stage : s));

  return (
    <section
      aria-label="Escape Room Game"
  style={{
    padding: 16,
    background: `
      linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
      url("/escape-bg.jpg") center/cover no-repeat
    `,
    minHeight: "80vh",
    color: "white", // make text visible
    border: "1px solid var(--border)",
    borderRadius: 8,

      }}
    >
      <h1>Escape Room</h1>

      
      <div style={{ marginBottom: 12 }}>
        <button onClick={start}>Start</button>
        <button onClick={pause} style={{ marginLeft: 8 }}>Pause</button>
        <button onClick={reset} style={{ marginLeft: 8 }}>Reset</button>
        <span style={{ marginLeft: 12 }} aria-live="polite">Time: {seconds}s</span>
      </div>

      
      <div style={{ marginBottom: 12 }}>
        <button onClick={prevStage} disabled={stage === 1}>← Prev</button>
        <span style={{ margin: "0 10px" }}>Stage {stage} of 3</span>
        <button onClick={nextStage} disabled={stage === 3}>Next →</button>
      </div>

      
      {stage === 1 && (
        <div>
          <h2>Stage 1 — Fix Formatting</h2>
          <p>Explain how you’d fix spacing/indent issues in a snippet.</p>
        </div>
      )}
      {stage === 2 && (
        <div>
          <h2>Stage 2 — Generate Numbers</h2>
          <p>Describe generating numbers 0..1000 (pseudo-code is fine).</p>
        </div>
      )}
      {stage === 3 && (
        <div>
          <h2>Stage 3 — Data Conversion</h2>
          <p>Explain JSON → CSV steps (headers, commas, quoting).</p>
          <button onClick={() => alert("Congrats! You escaped!")}>Finish</button>
        </div>
      )}

      
      <div style={{ marginTop: 16 }}>
        <button onClick={() => saveProgress("escape", stage, seconds)}>
  Save progress
      </button>
      </div>
    </section>
  );
}
async function saveProgress(type: "escape", stage: number, seconds: number) {
  const res = await fetch("/api/sessions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, stage, seconds }),
  });
  if (!res.ok) {
    alert("Save failed");
    return;
  }
  const data = await res.json();
  alert("Saved: " + data.id);
}
