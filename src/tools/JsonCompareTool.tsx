import { useMemo, useState } from "react";

interface DiffEntry {
  path: string;
  type: "added" | "removed" | "changed";
  from?: unknown;
  to?: unknown;
}

function isObject(value: unknown) {
  return typeof value === "object" && value !== null;
}

function diffValues(a: unknown, b: unknown, path = "$") : DiffEntry[] {
  if (Array.isArray(a) && Array.isArray(b)) {
    const max = Math.max(a.length, b.length);
    const entries: DiffEntry[] = [];
    for (let i = 0; i < max; i += 1) {
      if (i >= a.length) {
        entries.push({ path: `${path}[${i}]`, type: "added", to: b[i] });
      } else if (i >= b.length) {
        entries.push({ path: `${path}[${i}]`, type: "removed", from: a[i] });
      } else {
        entries.push(...diffValues(a[i], b[i], `${path}[${i}]`));
      }
    }
    return entries;
  }

  if (isObject(a) && isObject(b) && !Array.isArray(a) && !Array.isArray(b)) {
    const entries: DiffEntry[] = [];
    const keys = new Set([...Object.keys(a as Record<string, unknown>), ...Object.keys(b as Record<string, unknown>)]);
    keys.forEach((key) => {
      const left = (a as Record<string, unknown>)[key];
      const right = (b as Record<string, unknown>)[key];
      if (!(key in (a as Record<string, unknown>))) {
        entries.push({ path: `${path}.${key}`, type: "added", to: right });
      } else if (!(key in (b as Record<string, unknown>))) {
        entries.push({ path: `${path}.${key}`, type: "removed", from: left });
      } else {
        entries.push(...diffValues(left, right, `${path}.${key}`));
      }
    });
    return entries;
  }

  if (a !== b) {
    return [{ path, type: "changed", from: a, to: b }];
  }

  return [];
}

export default function JsonCompareTool() {
  const [left, setLeft] = useState('{"name":"devknife","items":[1,2,3],"active":true}');
  const [right, setRight] = useState('{"name":"devknife","items":[1,2,4],"active":false,"note":"new"}');

  const { diffs, error } = useMemo(() => {
    try {
      const leftJson = JSON.parse(left);
      const rightJson = JSON.parse(right);
      return { diffs: diffValues(leftJson, rightJson), error: "" };
    } catch (err) {
      return { diffs: [], error: (err as Error).message };
    }
  }, [left, right]);

  return (
    <div className="grid">
      <div className="card">
        <div className="grid two">
          <div>
            <label>JSON A</label>
            <textarea value={left} onChange={(event) => setLeft(event.target.value)} />
          </div>
          <div>
            <label>JSON B</label>
            <textarea value={right} onChange={(event) => setRight(event.target.value)} />
          </div>
        </div>
      </div>
      <div className="card">
        <label>Differences</label>
        {error ? <p className="muted">{error}</p> : null}
        {diffs.length ? (
          <div className="output">
            {diffs.map((diff) => {
              const from = diff.from !== undefined ? JSON.stringify(diff.from) : "-";
              const to = diff.to !== undefined ? JSON.stringify(diff.to) : "-";
              return `${diff.type.toUpperCase()} ${diff.path} | from: ${from} | to: ${to}`;
            }).join("\n")}
          </div>
        ) : (
          <p className="muted">No differences found.</p>
        )}
      </div>
    </div>
  );
}
