import { useMemo, useState } from "react";

export default function TimestampTool() {
  const [timestamp, setTimestamp] = useState(String(Math.floor(Date.now() / 1000)));
  const [unit, setUnit] = useState<"seconds" | "milliseconds">("seconds");
  const [dateInput, setDateInput] = useState(new Date().toISOString().slice(0, 19));

  const parsedDate = useMemo(() => {
    const value = Number.parseInt(timestamp, 10);
    if (Number.isNaN(value)) return "Invalid timestamp";
    const ms = unit === "seconds" ? value * 1000 : value;
    return new Date(ms).toString();
  }, [timestamp, unit]);

  const generatedTimestamp = useMemo(() => {
    const date = new Date(dateInput);
    if (Number.isNaN(date.getTime())) return "Invalid date";
    const ms = date.getTime();
    return unit === "seconds" ? Math.floor(ms / 1000).toString() : ms.toString();
  }, [dateInput, unit]);

  return (
    <div className="grid">
      <div className="card">
        <div className="grid two">
          <div>
            <label>Timestamp</label>
            <input value={timestamp} onChange={(event) => setTimestamp(event.target.value)} />
          </div>
          <div>
            <label>Unit</label>
            <select className="form-control" value={unit} onChange={(event) => setUnit(event.target.value as typeof unit)}>
              <option value="seconds">Seconds</option>
              <option value="milliseconds">Milliseconds</option>
            </select>
          </div>
        </div>
        <p className="muted">Parsed: {parsedDate}</p>
      </div>
      <div className="card">
        <label>Date/Time (ISO)</label>
        <input value={dateInput} onChange={(event) => setDateInput(event.target.value)} />
        <p className="muted">Timestamp: {generatedTimestamp}</p>
      </div>
    </div>
  );
}
