"use client";

import { useState } from "react";
import { generateTabsHTML, type TabSpec } from "@/lib/generateTabs";

export default function HomePage() {
  const [tabs, setTabs] = useState<TabSpec[]>([
    { label: "Tab 1", content: "First tab content" },
    { label: "Tab 2", content: "Second tab content" },
  ]);
  const [defaultIndex, setDefaultIndex] = useState(0);

  const addTab = () =>
    setTabs([...tabs, { label: `Tab ${tabs.length + 1}`, content: "" }]);

  const update = (i: number, key: keyof TabSpec, val: string) => {
    const copy = [...tabs];
    copy[i] = { ...copy[i], [key]: val };
    setTabs(copy);
  };

  const html = generateTabsHTML(tabs, defaultIndex);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(html);
    alert("Copied! Paste into a new file called Hello.html and open it in your browser.");
  };

  return (
    <section style={{ padding: "16px" }}>
      <h1>Tabs Generator</h1>

      <div style={{ display: "grid", gap: 10, maxWidth: 800 }}>
        {tabs.map((t, i) => (
          <div key={i} style={{ border: "1px solid var(--border)", padding: 10, borderRadius: 8 }}>
            <label>
              Label:&nbsp;
              <input
                value={t.label}
                onChange={(e) => update(i, "label", e.target.value)}
                aria-label={`Label for Tab ${i + 1}`}
              />
            </label>
            <br />
            <label>
              Content:&nbsp;
              <input
                value={t.content || ""}
                onChange={(e) => update(i, "content", e.target.value)}
                aria-label={`Content for Tab ${i + 1}`}
                style={{ width: "100%" }}
              />
            </label>
          </div>
        ))}

        <div>
          <button onClick={addTab} style={{ marginRight: 8 }}>+ Add Tab</button>

          <label>
            Default Active Tab Index:&nbsp;
            <input
              type="number"
              min={0}
              max={tabs.length - 1}
              value={defaultIndex}
              onChange={(e) => setDefaultIndex(Number(e.target.value))}
              style={{ width: 60 }}
            />
          </label>
        </div>

        <button onClick={copyToClipboard}>Copy HTML</button>

        <h2>Preview (generated HTML string)</h2>
        <pre
          aria-label="Generated HTML preview"
          style={{
            whiteSpace: "pre-wrap",
            border: "1px solid var(--border)",
            padding: 10,
            borderRadius: 8,
            maxHeight: 360,
            overflow: "auto",
          }}
        >
{html}
        </pre>
      </div>
    </section>
  );
}
