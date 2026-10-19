import { useId } from 'react';

/**
 * Original schematic of a stirred-tank bioreactor. Explains fermentation; it does not depict APEX equipment.
 */
export function BioreactorDiagram({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, '');
  const t = `${uid}-t`;
  const d = `${uid}-d`;
  const grid = `${uid}-grid`;
  const liquid = `${uid}-liquid`;
  return (
    <svg
      className={`diagram ${className ?? ''}`}
      viewBox="0 0 480 360"
      role="img"
      aria-labelledby={`${t} ${d}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <title id={t}>Schematic of a stirred-tank bioreactor</title>
      <desc id={d}>
        A jacketed vessel with a motor-driven impeller shaft, a gas sparger at the base, probes for
        pH, dissolved oxygen and temperature, a feed line, an exhaust line and a harvest valve.
      </desc>
      <defs>
        <pattern id={grid} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" className="dg-grid" />
        </pattern>
        <linearGradient id={liquid} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" className="dg-liquid-top" />
          <stop offset="1" className="dg-liquid-bottom" />
        </linearGradient>
      </defs>
      <rect width="480" height="360" fill={`url(#${grid})`} />

      {/* motor and shaft */}
      <rect x="216" y="28" width="48" height="30" rx="3" className="dg-solid" />
      <line x1="240" y1="58" x2="240" y2="272" className="dg-line dg-line--strong" />

      {/* jacket and vessel */}
      <path
        d="M150 92 V262 Q150 312 240 312 Q330 312 330 262 V92"
        className="dg-line dg-line--faint"
      />
      <path
        d="M162 80 H318 V258 Q318 300 240 300 Q162 300 162 258 Z"
        className="dg-line dg-line--strong"
      />
      {/* liquid */}
      <path
        d="M163 150 Q182 143 201 150 T240 150 T279 150 T317 150 V258 Q317 299 240 299 Q163 299 163 258 Z"
        fill={`url(#${liquid})`}
      />

      {/* impellers */}
      <g className="dg-accent">
        <rect x="212" y="186" width="56" height="7" rx="1" />
        <rect x="212" y="246" width="56" height="7" rx="1" />
      </g>

      {/* baffles */}
      <line x1="172" y1="120" x2="172" y2="270" className="dg-line dg-line--faint" />
      <line x1="308" y1="120" x2="308" y2="270" className="dg-line dg-line--faint" />

      {/* sparger and bubbles */}
      <path d="M200 284 H280" className="dg-line dg-line--accent" />
      <path d="M86 330 H170 Q200 330 200 300 V284" className="dg-line dg-line--accent" />
      <g className="dg-bubbles">
        <circle cx="214" cy="270" r="3" />
        <circle cx="232" cy="230" r="2.5" />
        <circle cx="256" cy="262" r="3" />
        <circle cx="270" cy="216" r="2" />
        <circle cx="222" cy="206" r="2" />
        <circle cx="250" cy="176" r="2.5" />
        <circle cx="284" cy="240" r="2" />
        <circle cx="200" cy="232" r="2" />
        <circle cx="262" cy="160" r="2" />
      </g>

      {/* probes */}
      <path d="M196 80 V136" className="dg-line" />
      <path d="M284 80 V160" className="dg-line" />
      <circle cx="196" cy="140" r="4" className="dg-solid" />
      <circle cx="284" cy="164" r="4" className="dg-solid" />

      {/* feed (left) and exhaust (right) */}
      <path d="M72 68 H180 V80" className="dg-line" />
      <path d="M300 80 V60 H408" className="dg-line" />
      {/* harvest */}
      <path d="M240 312 V330 H392" className="dg-line" />
      <rect x="232" y="318" width="16" height="10" className="dg-solid" />

      {/* labels */}
      <g className="dg-label">
        <text x="276" y="40">
          Motor and drive
        </text>
        <text x="20" y="64">
          Feed
        </text>
        <text x="412" y="64">
          Exhaust
        </text>
        <text x="20" y="334">
          Air / O₂
        </text>
        <text x="398" y="334">
          Harvest
        </text>
        <text x="342" y="168">
          pH · DO · temp
        </text>
        <text x="342" y="196">
          Impeller
        </text>
        <text x="342" y="226">
          Culture broth
        </text>
        <text x="342" y="288">
          Sparger
        </text>
      </g>
      <g className="dg-leader">
        <path d="M288 164 H336" />
        <path d="M268 190 H336" />
        <path d="M318 222 H336" />
        <path d="M280 284 H336" />
      </g>
    </svg>
  );
}
