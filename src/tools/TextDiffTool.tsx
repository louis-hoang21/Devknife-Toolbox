import { useMemo, useState } from "react";

function diffLinesSimple(a: string, b: string) {
  const aLines = a.split("\n");
  const bLines = b.split("\n");
  const output: string[] = [];
  let i = 0;
  let j = 0;
  const lookahead = 3;

  while (i < aLines.length || j < bLines.length) {
    if (i < aLines.length && j < bLines.length && aLines[i] === bLines[j]) {
      output.push(`  ${aLines[i]}`);
      i += 1;
      j += 1;
      continue;
    }

    const nextA = bLines[j] ? aLines.slice(i + 1, i + 1 + lookahead).indexOf(bLines[j]) : -1;
    if (nextA >= 0) {
      for (let k = 0; k < nextA + 1; k += 1) {
        output.push(`- ${aLines[i + k]}`);
      }
      i += nextA + 1;
      continue;
    }

    const nextB = aLines[i] ? bLines.slice(j + 1, j + 1 + lookahead).indexOf(aLines[i]) : -1;
    if (nextB >= 0) {
      for (let k = 0; k < nextB + 1; k += 1) {
        output.push(`+ ${bLines[j + k]}`);
      }
      j += nextB + 1;
      continue;
    }

    if (i < aLines.length) {
      output.push(`- ${aLines[i]}`);
      i += 1;
    }
    if (j < bLines.length) {
      output.push(`+ ${bLines[j]}`);
      j += 1;
    }
  }

  return output.join("\n");
}

export default function TextDiffTool() {
  const [left, setLeft] = useState("Hello Devknife\nLine two\nLine three");
  const [right, setRight] = useState("Hello Devknife\nLine two edited\nLine three\nNew line");

  const output = useMemo(() => diffLinesSimple(left, right), [left, right]);

  return (
    <div className="grid">
      <div className="card">
        <div className="grid two">
          <div>
            <label>Text A</label>
            <textarea value={left} onChange={(event) => setLeft(event.target.value)} />
          </div>
          <div>
            <label>Text B</label>
            <textarea value={right} onChange={(event) => setRight(event.target.value)} />
          </div>
        </div>
      </div>
      <div className="card">
        <label>Diff Output</label>
        <div className="output">{output || "No differences"}</div>
      </div>
    </div>
  );
}
