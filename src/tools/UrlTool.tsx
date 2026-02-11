import { useMemo, useState } from "react";

export default function UrlTool() {
  const [input, setInput] = useState("https://user:pass@example.com:8080/path?search=devknife&mode=1#top");

  const { url, error } = useMemo(() => {
    try {
      const parsed = new URL(input);
      const params = Array.from(parsed.searchParams.entries());
      return {
        url: {
          href: parsed.href,
          origin: parsed.origin,
          protocol: parsed.protocol,
          username: parsed.username,
          password: parsed.password,
          host: parsed.host,
          hostname: parsed.hostname,
          port: parsed.port,
          pathname: parsed.pathname,
          search: parsed.search,
          hash: parsed.hash,
          params
        },
        error: ""
      };
    } catch (err) {
      return { url: null, error: (err as Error).message };
    }
  }, [input]);

  return (
    <div className="grid">
      <div className="card">
        <label>URL</label>
        <input value={input} onChange={(event) => setInput(event.target.value)} />
        {error ? <p className="muted">{error}</p> : null}
      </div>
      <div className="card">
        <label>Parsed Parts</label>
        {url ? (
          <div className="output">
            {Object.entries(url)
              .filter(([key]) => key !== "params")
              .map(([key, value]) => `${key}: ${value}`)
              .join("\n")}
            {"\n"}
            params:
            {"\n"}
            {url.params.length
              ? url.params.map(([key, value]) => `  ${key}: ${value}`).join("\n")
              : "  -"}
          </div>
        ) : (
          <p className="muted">Enter a valid URL to see details.</p>
        )}
      </div>
    </div>
  );
}
