import { useState } from "react";
import CopyButton from "../components/CopyButton";
import { ulid } from "../lib/uuid";

export default function UlidTool() {
  const [value, setValue] = useState(ulid());

  return (
    <div className="card">
      <div className="grid two">
        <div>
          <label>ULID Output</label>
          <div className="output">{value}</div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
          <button className="primary" type="button" onClick={() => setValue(ulid())}>
            Generate ULID
          </button>
          <CopyButton value={value} />
        </div>
      </div>
    </div>
  );
}
