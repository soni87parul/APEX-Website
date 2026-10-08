import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'

type Variant = 'solid' | 'ghost'

const styles: Record<Variant, string> = {
  solid: 'bg-cream text-charcoal hover:bg-amber',
  ghost: 'border border-cream/25 text-cream hover:border-cream/60 hover:bg-cream/5',
}

const base =
  'group inline-flex min-h-11 items-center gap-3 rounded-full px-5 text-sm font-medium transition-colors duration-300'

function Inner({ children, arrow }: { children: ReactNode; arrow?: boolean }) {
  return (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      )}
    </>
  )
}

export function ButtonLink({ variant = 'solid', arrow, children, className = '', ...rest }:
  AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; arrow?: boolean }) {
  return (
    <a className={`${base} ${styles[variant]} ${className}`} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </a>
  )
}

export function Button({ variant = 'solid', arrow, children, className = '', ...rest }:
  ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; arrow?: boolean }) {
  return (
    <button type="button" className={`${base} ${styles[variant]} ${className}`} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  )
}
