import { useMemo, useState } from "react";

const FIELD_INFO = [
  { label: "Minute", min: 0, max: 59 },
  { label: "Hour", min: 0, max: 23 },
  { label: "Day of Month", min: 1, max: 31 },
  { label: "Month", min: 1, max: 12 },
  { label: "Day of Week", min: 0, max: 6 }
];

function parseField(field: string, min: number, max: number): Set<number> {
  const values = new Set<number>();
  const parts = field.split(",");
  parts.forEach((part) => {
    const [rangePart, stepPart] = part.split("/");
    const step = stepPart ? Number.parseInt(stepPart, 10) : 1;
    if (Number.isNaN(step) || step <= 0) throw new Error(`Invalid step: ${part}`);

    if (rangePart === "*") {
      for (let i = min; i <= max; i += step) values.add(i);
      return;
    }

    if (rangePart.includes("-")) {
      const [start, end] = rangePart.split("-").map((v) => Number.parseInt(v, 10));
      if (Number.isNaN(start) || Number.isNaN(end)) throw new Error(`Invalid range: ${part}`);
      for (let i = start; i <= end; i += step) {
        if (i >= min && i <= max) values.add(i);
      }
      return;
    }

    const value = Number.parseInt(rangePart, 10);
    if (Number.isNaN(value)) throw new Error(`Invalid value: ${part}`);
    if (value < min || value > max) throw new Error(`Out of range: ${part}`);
    values.add(value);
  });
  return values;
}

function parseCron(expr: string) {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) throw new Error("Cron must have 5 fields: min hour day month weekday");
  const [minField, hourField, domField, monthField, dowField] = parts;
  return {
    minutes: parseField(minField, 0, 59),
    hours: parseField(hourField, 0, 23),
    dom: parseField(domField, 1, 31),
    month: parseField(monthField, 1, 12),
    dow: parseField(dowField, 0, 6),
    raw: parts
  };
}

function matchesCron(date: Date, cron: ReturnType<typeof parseCron>) {
  const minute = date.getMinutes();
  const hour = date.getHours();
  const dom = date.getDate();
  const month = date.getMonth() + 1;
  const dow = date.getDay();

  const domMatch = cron.dom.has(dom);
  const dowMatch = cron.dow.has(dow);
  const domIsAll = cron.raw[2] === "*";
  const dowIsAll = cron.raw[4] === "*";

  const dayMatch = domIsAll || dowIsAll ? (domIsAll ? dowMatch : domMatch) : domMatch || dowMatch;

  return cron.minutes.has(minute) && cron.hours.has(hour) && cron.month.has(month) && dayMatch;
}

function getNextRuns(expr: string, count: number) {
  const cron = parseCron(expr);
  const result: Date[] = [];
  let cursor = new Date();
  cursor.setSeconds(0, 0);

  let guard = 0;
  while (result.length < count && guard < 500000) {
    cursor = new Date(cursor.getTime() + 60000);
    if (matchesCron(cursor, cron)) result.push(new Date(cursor));
    guard += 1;
  }
  return { cron, result };
}

export default function CronTool() {
  const [expr, setExpr] = useState("*/15 9-18 * * 1-5");

  const { error, cron, runs } = useMemo(() => {
    try {
      const { cron, result } = getNextRuns(expr, 5);
      return { error: "", cron, runs: result };
    } catch (err) {
      return { error: (err as Error).message, cron: null, runs: [] };
    }
  }, [expr]);

  return (
    <div className="grid">
      <div className="card">
        <label>Cron Expression</label>
        <input value={expr} onChange={(event) => setExpr(event.target.value)} />
        <p className="muted">Format: minute hour day month weekday (0=Sun). Day-of-month and day-of-week use OR when both set.</p>
        {error ? <p className="muted">{error}</p> : null}
      </div>
      <div className="card">
        <label>Parsed Fields</label>
        {cron ? (
          <div className="output">
            {[
              { label: FIELD_INFO[0].label, values: Array.from(cron.minutes) },
              { label: FIELD_INFO[1].label, values: Array.from(cron.hours) },
              { label: FIELD_INFO[2].label, values: Array.from(cron.dom) },
              { label: FIELD_INFO[3].label, values: Array.from(cron.month) },
              { label: FIELD_INFO[4].label, values: Array.from(cron.dow) }
            ]
              .map((entry) => `${entry.label}: ${entry.values.length ? entry.values.join(", ") : "-"}`)
              .join("\n")}
          </div>
        ) : (
          <p className="muted">Enter a valid cron expression.</p>
        )}
      </div>
      <div className="card">
        <label>Next 5 Runs</label>
        {runs.length ? (
          <div className="output">{runs.map((date) => date.toString()).join("\n")}</div>
        ) : (
          <p className="muted">No upcoming runs found.</p>
        )}
      </div>
    </div>
  );
}
