import { useState } from "react";

const starter = `<!doctype html>
<html>
  <head>
    <style>
      body { font-family: system-ui; padding: 24px; }
      h1 { color: #32d6a3; }
    </style>
  </head>
  <body>
    <h1>Hello from Devknife Tools</h1>
    <p>Drop in HTML to preview it instantly.</p>
  </body>
</html>`;

export default function HtmlPreviewTool() {
  const [html, setHtml] = useState(starter);

  return (
    <div className="grid">
      <div className="card">
        <label>HTML Input</label>
        <textarea value={html} onChange={(event) => setHtml(event.target.value)} style={{ minHeight: 220 }} />
      </div>
      <div className="card">
        <label>Live Preview</label>
        <iframe
          title="HTML Preview"
          srcDoc={html}
          style={{ width: "100%", minHeight: 300, border: "none", borderRadius: 12, background: "white" }}
          sandbox="allow-scripts"
        />
      </div>
    </div>
  );
}
