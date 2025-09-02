// src/lib/generateTabs.ts
export type TabSpec = { label: string; content?: string };

export function generateTabsHTML(tabs: TabSpec[], defaultIndex = 0) {
  const safe = (s: string) => (s ?? "").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const btns = tabs.map((t, i) => `
    <button role="tab"
      id="tabbtn-${i}"
      aria-selected="${i===defaultIndex}"
      aria-controls="panel-${i}"
      onclick="openTab(${i})"
      style="padding:8px 12px;border:1px solid #ccc;background:${i===defaultIndex?'#eee':'#fff'};cursor:pointer;border-radius:6px;outline-offset:2px;margin-right:8px;">
      ${safe(t.label || `Tab ${i+1}`)}
    </button>`).join('');

  const panels = tabs.map((t, i) => `
    <div id="panel-${i}" role="tabpanel" aria-labelledby="tabbtn-${i}"
      style="display:${i===defaultIndex?'block':'none'};padding:12px;border:1px solid #ddd;border-radius:8px;margin-top:10px;">
      ${safe(t.content || `Content for ${t.label || `Tab ${i+1}`}`)}
    </div>`).join('');

  const js = `
<script>
  (function(){
    window.openTab = function(i){
      var count = ${tabs.length};
      for (var k=0;k<count;k++){
        var btn = document.getElementById('tabbtn-'+k);
        var panel = document.getElementById('panel-'+k);
        if(!btn||!panel) continue;
        var active = (k===i);
        btn.setAttribute('aria-selected', active);
        btn.style.background = active ? '#eee' : '#fff';
        panel.style.display = active ? 'block' : 'none';
      }
    };
  })();
</script>`.trim();

  const html = `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Tabs</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="font-family:system-ui,Arial,sans-serif;line-height:1.4;margin:24px;background:#fff;color:#111;">
  <h1 style="margin-bottom:12px;">Tabs Demo</h1>
  <div role="tablist" aria-label="Sample Tabs" style="display:flex;flex-wrap:wrap;">
    ${btns}
  </div>
  ${panels}
  ${js}
</body>
</html>`.trim();

  return html;
}
