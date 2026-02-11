import FeatureIcon from "./FeatureIcon";

interface ToolMeta {
  id: string;
  name: string;
  description: string;
}

interface HomeProps {
  tools: ToolMeta[];
  onSelect: (id: string) => void;
  showHero?: boolean;
}

export default function Home({ tools, onSelect, showHero = true }: HomeProps) {
  return (
    <div className="home">
      {showHero ? (
        <div className="home-hero">
          <h2>Chào mừng đến với Devknife Toolbox</h2>
          <p className="muted">Bộ công cụ hữu ích cho lập trình viên, hỗ trợ làm việc offline</p>
        </div>
      ) : null}
      <div className="home-grid">
        {tools.map((tool) => (
          <button key={tool.id} className="feature-card" type="button" onClick={() => onSelect(tool.id)}>
            <div className="feature-icon">
              <FeatureIcon id={tool.id} size={22} />
            </div>
            <div className="feature-body">
              <div className="feature-title">{tool.name}</div>
              <div className="feature-desc muted">{tool.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
