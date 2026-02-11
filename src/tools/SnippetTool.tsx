import { useEffect, useState } from "react";

interface Snippet {
  id: string;
  title: string;
  tags: string;
  language: string;
  content: string;
  createdAt: string;
}

const storageKey = "devknife-snippets";

export default function SnippetTool() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [language, setLanguage] = useState("plain");
  const [content, setContent] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) setSnippets(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(snippets));
  }, [snippets]);

  const addSnippet = () => {
    if (!title.trim() || !content.trim()) return;
    const snippet: Snippet = {
      id: crypto.randomUUID(),
      title: title.trim(),
      tags: tags.trim(),
      language,
      content,
      createdAt: new Date().toISOString()
    };
    setSnippets([snippet, ...snippets]);
    setTitle("");
    setTags("");
    setLanguage("plain");
    setContent("");
  };

  const removeSnippet = (id: string) => {
    setSnippets(snippets.filter((snippet) => snippet.id !== id));
  };

  return (
    <div className="grid">
      <div className="card">
        <label>New Snippet</label>
        <div className="grid two">
          <div>
            <label>Title</label>
            <input value={title} onChange={(event) => setTitle(event.target.value)} />
          </div>
          <div>
            <label>Language</label>
            <input value={language} onChange={(event) => setLanguage(event.target.value)} />
          </div>
        </div>
        <div style={{ marginTop: 12 }}>
          <label>Tags (comma separated)</label>
          <input value={tags} onChange={(event) => setTags(event.target.value)} />
        </div>
        <div style={{ marginTop: 12 }}>
          <label>Content</label>
          <textarea value={content} onChange={(event) => setContent(event.target.value)} style={{ minHeight: 160 }} />
        </div>
        <div style={{ marginTop: 12 }}>
          <button className="primary" type="button" onClick={addSnippet}>
            Save Snippet
          </button>
        </div>
      </div>
      <div className="card">
        <label>Saved Snippets</label>
        {snippets.length === 0 ? (
          <p className="muted">No snippets yet.</p>
        ) : (
          <div className="grid">
            {snippets.map((snippet) => (
              <div key={snippet.id} className="output">
                <strong>{snippet.title}</strong> ({snippet.language})
                {"\n"}
                Tags: {snippet.tags || "-"}
                {"\n"}
                Created: {new Date(snippet.createdAt).toLocaleString()}
                {"\n"}
                {snippet.content}
                {"\n"}
                <button className="danger" type="button" onClick={() => removeSnippet(snippet.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
