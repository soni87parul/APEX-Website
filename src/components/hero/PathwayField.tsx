import { motion } from 'motion/react'
import { pathways, stages, type PathwayId, type Stage } from '../../content/site'

// Illustrative concept, not a facility plan: three technology pathways enter
// separately, plug into one shared infrastructure band, and run on to market.
// The stages a visitor's objective touches are lit, tying the diagram to
// Find Your Pathway.
const W = 1200
const H = 260
const col = W / stages.length
const join = col * 2

const routes: Record<PathwayId, string> = {
  cellular: `M0 36 H${join - 40} Q${join} 36 ${join} 76 V78 Q${join} 108 ${join + 40} 108 H${W}`,
  fermentation: `M0 130 H${W}`,
  plant: `M0 224 H${join - 40} Q${join} 224 ${join} 184 V182 Q${join} 152 ${join + 40} 152 H${W}`,
}

const nodeY: Record<PathwayId, [number, number]> = {
  cellular: [36, 108],
  fermentation: [130, 130],
  plant: [224, 152],
}

const color: Record<PathwayId, string> = {
  cellular: 'rgb(var(--cellular))',
  fermentation: 'rgb(var(--fermentation))',
  plant: 'rgb(var(--plant))',
}

export function PathwayField({ activeStages }: { activeStages: readonly Stage[] }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-full w-full overflow-visible"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Illustration: cellular, fermentation and plant-based pathways join one shared APEX infrastructure band on the way from research to market."
    >
      <defs>
        <pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="rgb(var(--cream))" strokeOpacity="0.07" strokeWidth="1" />
        </pattern>
        <linearGradient id="fade" x1="0" x2="1">
          <stop offset="0" stopColor="rgb(var(--charcoal))" stopOpacity="1" />
          <stop offset="0.07" stopColor="rgb(var(--charcoal))" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Stage columns; the visitor's selected stages are lit */}
      {stages.map((stage, i) => {
        const on = activeStages.includes(stage)
        return (
          <g key={stage}>
            <rect
              x={col * i}
              y={0}
              width={col}
              height={H}
              fill="rgb(var(--amber))"
              style={{ opacity: on ? 0.05 : 0, transition: 'opacity 500ms ease' }}
            />
            {i > 0 && (
              <line x1={col * i} x2={col * i} y1={0} y2={H} stroke="rgb(var(--cream))" strokeOpacity="0.08" strokeDasharray="2 6" />
            )}
          </g>
        )
      })}

      {/* Shared infrastructure band */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }}>
        <rect x={join} y={92} width={W - join} height={76} fill="url(#hatch)" />
        <line x1={join} x2={W} y1={92} y2={92} stroke="rgb(var(--cream))" strokeOpacity="0.18" />
        <line x1={join} x2={W} y1={168} y2={168} stroke="rgb(var(--cream))" strokeOpacity="0.18" />
      </motion.g>

      {pathways.map((p, i) => {
        const [y0, y1] = nodeY[p.id]
        return (
          <g key={p.id}>
            <motion.path
              d={routes[p.id]}
              fill="none"
              stroke={color[p.id]}
              strokeOpacity={p.id === 'fermentation' ? 0.85 : 1}
              strokeWidth={1.5}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.15 + i * 0.15, duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
            />
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 + i * 0.15, duration: 0.6 }}>
              {stages.map((stage, s) => {
                const x = col * s + col / 2
                const y = s < 2 ? y0 : y1
                const on = activeStages.includes(stage)
                return (
                  <rect
                    key={stage}
                    x={x - 4}
                    y={y - 4}
                    width={8}
                    height={8}
                    stroke={color[p.id]}
                    strokeWidth={1.25}
                    style={{ fill: on ? color[p.id] : 'rgb(var(--charcoal))', transition: 'fill 400ms ease' }}
                  />
                )
              })}
            </motion.g>
          </g>
        )
      })}

      <rect x={0} y={0} width={W} height={H} fill="url(#fade)" pointerEvents="none" />
    </svg>
  )
}
