import type { Config } from 'tailwindcss'

// Design tokens live as CSS variables in src/styles/index.css so the palette
// can be swapped once brand colours are approved.
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: token('charcoal'),
        raised: token('raised'),
        cream: token('cream'),
        creamsoft: token('creamsoft'),
        amber: token('amber'),
        sage: token('sage'),
        stone: token('stone'),
        hairline: token('hairline'),
        cellular: token('cellular'),
        fermentation: token('fermentation'),
        plant: token('plant'),
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Inter Tight"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        label: '0.14em',
      },
      maxWidth: {
        site: '88rem',
      },
    },
  },
  plugins: [],
} satisfies Config
