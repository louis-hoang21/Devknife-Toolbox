import { useMemo, useState } from "react";
import CopyButton from "../components/CopyButton";
import { md5Hex } from "../lib/md5";

export default function Md5Tool() {
  const [input, setInput] = useState("Hello Devknife");

  const output = useMemo(() => md5Hex(input), [input]);

  return (
    <div className="card">
      <div className="grid two">
        <div>
          <label>Input</label>
          <textarea value={input} onChange={(event) => setInput(event.target.value)} />
        </div>
        <div>
          <label>MD5 Digest</label>
          <textarea value={output} readOnly />
          <div style={{ marginTop: 8 }}>
            <CopyButton value={output} />
          </div>
        </div>
      </div>
    </div>
  );
}
