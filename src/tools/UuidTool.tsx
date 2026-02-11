import { useState } from "react";
import CopyButton from "../components/CopyButton";
import { uuidv1, uuidv4 } from "../lib/uuid";

export default function UuidTool() {
  const [value, setValue] = useState(uuidv4());

  return (
    <div className="card">
      <div className="grid two">
        <div>
          <label>UUID Output</label>
          <div className="output">{value}</div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
          <button className="primary" type="button" onClick={() => setValue(uuidv4())}>
            Generate v4
          </button>
          <button className="ghost" type="button" onClick={() => setValue(uuidv1())}>
            Generate v1
          </button>
          <CopyButton value={value} />
        </div>
      </div>
    </div>
  );
}
