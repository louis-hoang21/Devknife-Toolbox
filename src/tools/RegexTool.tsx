import { useMemo, useState } from "react";

export default function RegexTool() {
  const [pattern, setPattern] = useState("(Devknife)\\s+(Tools)");
  const [flags, setFlags] = useState("gi");
  const [text, setText] = useState("Devknife Tools makes tooling feel fast. devknife tools!");

  const { matches, error } = useMemo(() => {
    try {
      const regex = new RegExp(pattern, flags);
      const matches = Array.from(text.matchAll(regex)).map((match) => ({
        match: match[0],
        index: match.index ?? 0,
        groups: match.slice(1)
      }));
      return { matches, error: "" };
    } catch (err) {
      return { matches: [], error: (err as Error).message };
    }
  }, [pattern, flags, text]);

  return (
    <div className="grid">
      <div className="card">
        <div className="grid two">
          <div>
            <label>Pattern</label>
            <input value={pattern} onChange={(event) => setPattern(event.target.value)} />
          </div>
          <div>
            <label>Flags</label>
            <input value={flags} onChange={(event) => setFlags(event.target.value)} />
          </div>
        </div>
        <div style={{ marginTop: 12 }}>
          <label>Test Text</label>
          <textarea value={text} onChange={(event) => setText(event.target.value)} />
        </div>
      </div>
      <div className="card">
        <label>Matches</label>
        {error ? <p className="muted">{error}</p> : null}
        {matches.length === 0 ? (
          <p className="muted">No matches found.</p>
        ) : (
          <div className="grid">
            {matches.map((match, idx) => (
              <div key={`${match.match}-${match.index}-${idx}`} className="output">
                <strong>Match:</strong> {match.match}
                {"\n"}
                <strong>Index:</strong> {match.index}
                {"\n"}
                <strong>Groups:</strong> {match.groups.length ? match.groups.join(", ") : "-"}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
