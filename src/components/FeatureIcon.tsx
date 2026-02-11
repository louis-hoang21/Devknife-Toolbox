import type { ReactNode } from "react";

interface FeatureIconProps {
  id: string;
  size?: number;
  className?: string;
}

const baseProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const
};

function IconBase({ children, size, className }: { children: ReactNode; size: number; className?: string }) {
  return (
    <svg {...baseProps} width={size} height={size} className={className}>
      {children}
    </svg>
  );
}

const icons: Record<string, (size: number, className?: string) => JSX.Element> = {
  home: (size, className) => (
    <IconBase size={size} className={className}>
      <path d="M3 10.5l9-7 9 7" />
      <path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
    </IconBase>
  ),
  base64: (size, className) => (
    <IconBase size={size} className={className}>
      <path d="M16 18l5-6-5-6" />
      <path d="M8 6l-5 6 5 6" />
      <path d="M10 4h4" />
      <path d="M10 20h4" />
    </IconBase>
  ),
  jwt: (size, className) => (
    <IconBase size={size} className={className}>
      <circle cx="7" cy="10" r="3" />
      <path d="M10 10h10l2 2-2 2-2-2-2 2-2-2" />
    </IconBase>
  ),
  json: (size, className) => (
    <IconBase size={size} className={className}>
      <path d="M8 4H6a2 2 0 0 0-2 2v3a2 2 0 0 1-2 2 2 2 0 0 1 2 2v3a2 2 0 0 0 2 2h2" />
      <path d="M16 4h2a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2 2 2 0 0 0-2 2v3a2 2 0 0 1-2 2h-2" />
    </IconBase>
  ),
  regex: (size, className) => (
    <IconBase size={size} className={className}>
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <circle cx="4" cy="12" r="2" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <circle cx="12" cy="10" r="2" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <circle cx="20" cy="14" r="2" />
    </IconBase>
  ),
  url: (size, className) => (
    <IconBase size={size} className={className}>
      <path d="M10 13a5 5 0 0 1 0-7l2-2a5 5 0 0 1 7 7l-2 2" />
      <path d="M14 11a5 5 0 0 1 0 7l-2 2a5 5 0 0 1-7-7l2-2" />
    </IconBase>
  ),
  "uri-component": (size, className) => (
    <IconBase size={size} className={className}>
      <path d="M10 13a5 5 0 0 1 0-7l2-2a5 5 0 0 1 7 7l-2 2" />
      <path d="M14 11a5 5 0 0 1 0 7l-2 2a5 5 0 0 1-7-7l2-2" />
      <path d="M8 12h8" />
    </IconBase>
  ),
  uuid: (size, className) => (
    <IconBase size={size} className={className}>
      <polygon points="12 2 20 7 20 17 12 22 4 17 4 7" />
      <circle cx="12" cy="12" r="2" />
    </IconBase>
  ),
  ulid: (size, className) => (
    <IconBase size={size} className={className}>
      <path d="M3 7v6l8 8 10-10-8-8H3z" />
      <circle cx="7.5" cy="9.5" r="1.5" />
    </IconBase>
  ),
  cron: (size, className) => (
    <IconBase size={size} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </IconBase>
  ),
  "json-compare": (size, className) => (
    <IconBase size={size} className={className}>
      <rect x="3" y="5" width="10" height="14" rx="2" />
      <rect x="11" y="3" width="10" height="14" rx="2" />
    </IconBase>
  ),
  rsa: (size, className) => (
    <IconBase size={size} className={className}>
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <path d="M7 11V8a5 5 0 0 1 10 0v3" />
    </IconBase>
  ),
  aes: (size, className) => (
    <IconBase size={size} className={className}>
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <path d="M7 11V8a5 5 0 0 1 10 0v3" />
      <path d="M12 15v2" />
    </IconBase>
  ),
  qr: (size, className) => (
    <IconBase size={size} className={className}>
      <rect x="3" y="3" width="6" height="6" />
      <rect x="15" y="3" width="6" height="6" />
      <rect x="3" y="15" width="6" height="6" />
      <path d="M13 13h2v2h-2zM17 13h4v4h-4zM13 17h2v4h-2z" />
    </IconBase>
  ),
  "html-preview": (size, className) => (
    <IconBase size={size} className={className}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M9 15l-2-2 2-2" />
      <path d="M15 11l2 2-2 2" />
    </IconBase>
  ),
  sha: (size, className) => (
    <IconBase size={size} className={className}>
      <path d="M4 9h16" />
      <path d="M4 15h16" />
      <path d="M8 4l-2 16" />
      <path d="M16 4l-2 16" />
    </IconBase>
  ),
  md5: (size, className) => (
    <IconBase size={size} className={className}>
      <path d="M4 9h16" />
      <path d="M4 15h16" />
      <path d="M8 4l-2 16" />
      <path d="M16 4l-2 16" />
      <circle cx="12" cy="12" r="2" />
    </IconBase>
  ),
  hmac: (size, className) => (
    <IconBase size={size} className={className}>
      <path d="M4 9h16" />
      <path d="M4 15h16" />
      <path d="M8 4l-2 16" />
      <path d="M16 4l-2 16" />
      <path d="M12 8v8" />
    </IconBase>
  ),
  pgp: (size, className) => (
    <IconBase size={size} className={className}>
      <path d="M12 2l7 3v6c0 5-3 9-7 11-4-2-7-6-7-11V5z" />
      <path d="M9 12h6" />
    </IconBase>
  ),
  timestamp: (size, className) => (
    <IconBase size={size} className={className}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
      <path d="M12 11v5l3 2" />
    </IconBase>
  ),
  "port-check": (size, className) => (
    <IconBase size={size} className={className}>
      <path d="M7 3v6" />
      <path d="M17 3v6" />
      <rect x="5" y="9" width="14" height="6" rx="2" />
      <path d="M12 15v6" />
    </IconBase>
  ),
  "text-diff": (size, className) => (
    <IconBase size={size} className={className}>
      <path d="M5 6h6" />
      <path d="M5 12h6" />
      <path d="M5 18h6" />
      <path d="M15 6l4 4" />
      <path d="M19 6l-4 4" />
      <path d="M15 18h4" />
    </IconBase>
  ),
  markdown: (size, className) => (
    <IconBase size={size} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M7 15V9l3 3 3-3v6" />
      <path d="M14 15l2-2 2 2" />
    </IconBase>
  ),
  x509: (size, className) => (
    <IconBase size={size} className={className}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8h8" />
      <path d="M8 12h8" />
      <circle cx="12" cy="16" r="2" />
    </IconBase>
  ),
  snippets: (size, className) => (
    <IconBase size={size} className={className}>
      <rect x="6" y="3" width="12" height="18" rx="2" />
      <path d="M9 7h6" />
      <path d="M9 11h6" />
      <path d="M9 15h6" />
    </IconBase>
  ),
  curl: (size, className) => (
    <IconBase size={size} className={className}>
      <path d="M4 6h16" />
      <path d="M4 18h16" />
      <path d="M7 11l3 3-3 3" />
      <path d="M13 14h4" />
    </IconBase>
  )
};

export default function FeatureIcon({ id, size = 20, className }: FeatureIconProps) {
  const icon = icons[id] ?? icons["home"];
  return icon(size, className);
}
