import { Suspense, useEffect, useMemo, useState } from "react";
import { listen } from "@tauri-apps/api/event";
import tools from "./tools";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./components/Home";
import FeatureIcon from "./components/FeatureIcon";

const HOME_ID = "home";
const THEME_KEY = "devknife:theme";
type ThemeMode = "dark" | "light";

export default function App() {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState(HOME_ID);
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return "dark";
    const stored = window.localStorage.getItem(THEME_KEY);
    return stored === "light" ? "light" : "dark";
  });

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    let unlisten: Array<() => void> = [];

    const setup = async () => {
      try {
        unlisten.push(
          await listen("menu:about", () => {
            window.alert("Devknife Toolbox");
          })
        );
        unlisten.push(
          await listen("menu:reload", () => {
            window.location.reload();
          })
        );
        unlisten.push(
          await listen("menu:report-issue", () => {
            window.open("https://github.com/louis-hoang21", "_blank");
          })
        );
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    void setup();

    return () => {
      unlisten.forEach((fn) => fn());
      unlisten = [];
    };
  }, []);

  const filteredTools = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tools;
    return tools.filter((tool) => tool.name.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    if (activeId === HOME_ID) return;
    if (!filteredTools.find((tool) => tool.id === activeId)) {
      setActiveId(filteredTools[0]?.id ?? HOME_ID);
    }
  }, [activeId, filteredTools]);

  const navItems = [{ id: HOME_ID, name: "Trang chủ" }, ...filteredTools];

  const activeTool =
    activeId === HOME_ID ? null : filteredTools.find((tool) => tool.id === activeId) ?? filteredTools[0] ?? tools[0];
  const isHome = activeId === HOME_ID || !activeTool;
  const ActiveTool = activeTool?.component;
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <p>Devknife <span>Toolbox</span></p> <p className="muted-verion"><i>v0.1.0</i></p>
        </div>
        {isHome ? (
          <p className="muted header-subtitle">Bộ công cụ hữu ích cho lập trình viên, hỗ trợ làm việc offline</p>
        ) : activeTool?.description ? (
          <p className="muted header-subtitle">{activeTool.description}</p>
        ) : null}
        <input
          className="search"
          placeholder="Tìm kiếm..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="tool-list">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`tool-button ${item.id === activeId ? "active" : ""}`}
              onClick={() => setActiveId(item.id)}
              type="button"
            >
              <FeatureIcon id={item.id} size={18} className="nav-icon" />
              {item.name}
            </button>
          ))}
        </div>
      </aside>
      <main className="main">
        <div className="header">
          <div className="header-title">
            <h1>{isHome ? "Chào mừng đến với Devknife Toolbox" : activeTool?.name}</h1>
          </div>
          <div className="header-actions">
            <button
              className="theme-toggle"
              type="button"
              onClick={() => setTheme(nextTheme)}
              aria-label={`Switch to ${nextTheme} mode`}
              title={`Switch to ${nextTheme} mode`}
            >
              <svg className="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14.5 2.5a9 9 0 1 0 7 13.8 7 7 0 0 1-7-13.8z" />
              </svg>
            </button>
          </div>
        </div>
        {isHome ? (
          <Home tools={tools} onSelect={(id) => setActiveId(id)} showHero={false} />
        ) : (
          <ErrorBoundary>
            <Suspense fallback={<div className="card">Loading tool...</div>}>
              {ActiveTool ? <ActiveTool /> : null}
            </Suspense>
          </ErrorBoundary>
        )}
      </main>
    </div>
  );
}
