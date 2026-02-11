import { useEffect, useState } from "react";

const starter = `# Devknife Tools

- **Markdown Preview** with live rendering
- Works in Tauri native apps


a code block:

\`\`\`ts
console.log("Hello");
\`\`\`
`;

let markedModule: any | null = null;
const loadMarked = async () => {
  if (!markedModule) {
    markedModule = await import("marked");
  }
  return markedModule;
};

export default function MarkdownTool() {
  const [markdown, setMarkdown] = useState(starter);
  const [html, setHtml] = useState("");

  useEffect(() => {
    const run = async () => {
      const mod = await loadMarked();
      const parser = mod.marked ?? mod.default ?? mod;
      const parsed = parser.parse ? parser.parse(markdown, { breaks: true }) : parser(markdown);
      setHtml(parsed as string);
    };
    void run();
  }, [markdown]);

  return (
    <div className="grid">
      <div className="card">
        <label>Markdown Input</label>
        <textarea value={markdown} onChange={(event) => setMarkdown(event.target.value)} style={{ minHeight: 220 }} />
      </div>
      <div className="card">
        <label>Preview</label>
        <div
          className="output"
          style={{ background: "white", color: "#101621" }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
