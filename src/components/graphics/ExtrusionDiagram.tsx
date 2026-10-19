import { useId } from 'react';

const stages = [
  { no: '01', label: 'Ingredients', x: 58 },
  { no: '02', label: 'Hydration and mixing', x: 168 },
  { no: '03', label: 'Extrusion', x: 318 },
  { no: '04', label: 'Cooling die', x: 470 },
  { no: '05', label: 'Product development', x: 590 },
];

/**
 * Original process diagram of plant-protein texturisation (high-moisture extrusion). Stands in for a
 * photograph until an accurate, licensed one is found. It does not depict APEX equipment.
 */
export function ExtrusionDiagram({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const uid = useId().replace(/:/g, '');
  const t = `${uid}-t`;
  const d = `${uid}-d`;
  const grid = `${uid}-grid`;
  return (
    <svg
      className={`diagram ${className ?? ''}`}
      viewBox="0 0 660 320"
      role="img"
      aria-labelledby={`${t} ${d}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <title id={t}>Plant-protein texturisation process</title>
      <desc id={d}>
        Plant-protein ingredients are hydrated and mixed, sheared and heated in a twin-screw
        extruder, aligned into fibres in a long cooling die, and then used for product development.
      </desc>
      <defs>
        <pattern id={grid} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" className="dg-grid" />
        </pattern>
      </defs>
      <rect width="660" height="320" fill={`url(#${grid})`} />

      {/* hopper with ingredients */}
      <path d="M30 52 H96 L74 112 H52 Z" className="dg-line dg-line--strong" />
      <g className="dg-grains">
        <circle cx="50" cy="64" r="4" />
        <circle cx="62" cy="70" r="3.5" />
        <circle cx="74" cy="63" r="4" />
        <circle cx="84" cy="70" r="3" />
        <circle cx="58" cy="82" r="3.5" />
        <circle cx="70" cy="86" r="3" />
        <circle cx="64" cy="98" r="3" />
      </g>
      <path d="M63 112 V140" className="dg-line dg-line--strong" />

      {/* water injection */}
      <path d="M168 54 V124" className="dg-line dg-line--accent" />
      <path d="M160 54 H176" className="dg-line dg-line--accent" />
      <g className="dg-drops">
        <path d="M168 92 q-5 8 0 12 q5 -4 0 -12" />
        <path d="M168 70 q-4 6 0 9 q4 -3 0 -9" />
      </g>

      {/* barrel */}
      <rect x="40" y="140" width="380" height="56" rx="3" className="dg-line dg-line--strong" />
      {/* heating zones */}
      <g className="dg-zones">
        <rect x="200" y="132" width="64" height="8" />
        <rect x="272" y="132" width="64" height="8" />
        <rect x="344" y="132" width="64" height="8" />
        <rect x="200" y="196" width="64" height="8" />
        <rect x="272" y="196" width="64" height="8" />
        <rect x="344" y="196" width="64" height="8" />
      </g>
      {/* screw flights */}
      <line x1="48" y1="168" x2="412" y2="168" className="dg-line" />
      <path
        d="M60 150 L72 186 M84 150 L96 186 M108 150 L120 186 M132 150 L144 186 M156 150 L168 186 M180 150 L192 186 M204 150 L214 186 M224 150 L234 186 M244 150 L252 186 M262 150 L270 186 M280 150 L288 186 M298 150 L305 186 M314 150 L321 186 M330 150 L337 186 M346 150 L352 186 M360 150 L366 186 M374 150 L380 186 M388 150 L394 186"
        className="dg-line dg-line--accent"
      />
      {/* drive */}
      <rect x="8" y="150" width="32" height="36" rx="2" className="dg-solid" />

      {/* cooling die */}
      <rect x="420" y="150" width="120" height="36" className="dg-line dg-line--strong" />
      <g className="dg-fibres">
        <path d="M428 158 H532" />
        <path d="M428 165 H532" />
        <path d="M428 172 H532" />
        <path d="M428 179 H532" />
      </g>
      <path d="M436 142 H524" className="dg-line dg-line--faint" />
      <path d="M436 194 H524" className="dg-line dg-line--faint" />
      <text x="480" y="134" className="dg-label dg-label--center">
        cooling water
      </text>

      {/* fibrous product */}
      <g className="dg-product">
        <rect x="560" y="146" width="80" height="12" rx="6" />
        <rect x="566" y="164" width="72" height="12" rx="6" />
        <rect x="560" y="182" width="64" height="12" rx="6" />
      </g>

      {/* stage rail */}
      <path d="M58 250 H600" className="dg-line dg-line--faint" />
      {stages.map((s) => (
        <g key={s.no}>
          <circle cx={s.x} cy={250} r={5} className="dg-node" />
          <text
            x={s.x}
            y={compact ? 276 : 278}
            className="dg-label dg-label--center dg-label--accent"
          >
            {s.no}
          </text>
          <text
            x={s.x}
            y={compact ? 294 : 298}
            className="dg-label dg-label--center dg-label--strong"
          >
            {s.label}
          </text>
        </g>
      ))}
      <g className="dg-label">
        <text x="28" y="40">
          Pulse protein, fibre
        </text>
        <text x="180" y="62">
          Water
        </text>
        <text x="200" y="226">
          Heat and shear zones
        </text>
      </g>
    </svg>
  );
}
