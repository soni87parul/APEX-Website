import { useId } from 'react';

/** Original diagram: bench, pilot and manufacturing scales, with where APEX support sits. Not to scale. */
export function ScaleDiagram({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, '');
  const t = `${uid}-t`;
  const d = `${uid}-d`;
  const grid = `${uid}-grid`;
  return (
    <svg
      className={`diagram ${className ?? ''}`}
      viewBox="0 0 480 360"
      role="img"
      aria-labelledby={`${t} ${d}`}
    >
      <title id={t}>From bench to manufacturing readiness</title>
      <desc id={d}>
        Three vessels of increasing size: laboratory bench, pilot trials with partners, and a
        manufacturing facility. APEX supports the first two and helps plan the third; manufacturing
        is carried out by the company or its manufacturing partner.
      </desc>
      <defs>
        <pattern id={grid} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" className="dg-grid" />
        </pattern>
      </defs>
      <rect width="480" height="360" fill={`url(#${grid})`} />
      <path d="M24 262 H456" className="dg-line dg-line--faint" />

      {/* bench flask */}
      <path d="M68 196 V214 L50 258 H110 L92 214 V196 Z" className="dg-line dg-line--strong" />
      <path d="M56 244 L60 234 H100 L104 244 L108 254 H52 Z" className="dg-fill-accent" />

      {/* pilot vessel */}
      <path
        d="M178 150 H250 V232 Q250 254 214 254 Q178 254 178 232 Z"
        className="dg-line dg-line--strong"
      />
      <path d="M179 186 H249 V232 Q249 253 214 253 Q179 253 179 232 Z" className="dg-fill-sage" />
      <line x1="214" y1="128" x2="214" y2="232" className="dg-line" />
      <rect x="202" y="118" width="24" height="12" className="dg-solid" />

      {/* manufacturing vessel (dashed: not APEX) */}
      <path
        d="M318 82 H434 V218 Q434 256 376 256 Q318 256 318 218 Z"
        className="dg-line dg-line--dashed"
      />
      <line x1="376" y1="58" x2="376" y2="220" className="dg-line dg-line--faint" />

      {/* arrows */}
      <path d="M124 226 H164" className="dg-line dg-line--accent" markerEnd={`url(#${uid}-arr)`} />
      <path d="M264 206 H304" className="dg-line dg-line--accent" markerEnd={`url(#${uid}-arr)`} />
      <defs>
        <marker
          id={`${uid}-arr`}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto"
        >
          <path d="M0 0 L10 5 L0 10 Z" className="dg-arrowhead" />
        </marker>
      </defs>

      <g className="dg-label dg-label--center">
        <text x="80" y="290" className="dg-label--strong">
          Bench
        </text>
        <text x="80" y="308">
          Research and
        </text>
        <text x="80" y="324">
          development
        </text>
        <text x="214" y="290" className="dg-label--strong">
          Pilot
        </text>
        <text x="214" y="308">
          Samples and data,
        </text>
        <text x="214" y="324">
          with partners
        </text>
        <text x="376" y="290" className="dg-label--strong">
          Manufacturing
        </text>
        <text x="376" y="308">
          Your facility or a
        </text>
        <text x="376" y="324">
          manufacturing partner
        </text>
      </g>
      <path d="M40 40 H272" className="dg-line dg-line--accent" />
      <path d="M40 34 V46 M272 34 V46" className="dg-line dg-line--accent" />
      <text x="156" y="28" className="dg-label dg-label--center dg-label--accent">
        APEX support
      </text>
      <path d="M300 40 H452" className="dg-line dg-line--dashed" />
      <text x="376" y="28" className="dg-label dg-label--center">
        APEX helps you plan
      </text>
    </svg>
  );
}
