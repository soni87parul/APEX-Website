import { useState } from 'react'
import { Menu } from 'lucide-react'
import { navItems } from '../../content/site'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrolled } from '../../hooks/useScrolled'
import { Wordmark } from '../ui/Wordmark'
import { MobileMenu } from './MobileMenu'

const sectionIds = navItems.map((item) => item.id)

export function SiteHeader({ onConnect }: { onConnect: () => void }) {
  const scrolled = useScrolled()
  const active = useActiveSection(sectionIds)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled ? 'border-b border-cream/10 bg-charcoal/80 backdrop-blur-md' : 'border-b border-transparent'
        }`}
      >
        <div className="container-site flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
          <a href="#top" aria-label="APEX home" className="text-cream">
            <Wordmark />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = active === item.id
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? 'location' : undefined}
                      className={`relative rounded-full px-3 py-2 text-[0.8125rem] transition-colors duration-300 ${
                        isActive ? 'text-cream' : 'text-cream/60 hover:text-cream'
                      }`}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-amber transition-transform duration-500 ${
                          isActive ? 'scale-x-100' : 'scale-x-0'
                        }`}
                      />
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#work-with-apex"
              className="hidden rounded-full px-3 py-2 text-[0.8125rem] text-cream/80 transition-colors hover:text-cream lg:inline-block"
            >
              Work With APEX
            </a>
            <button
              type="button"
              onClick={onConnect}
              className="hidden min-h-10 rounded-full bg-cream px-4 text-[0.8125rem] font-medium text-charcoal transition-colors duration-300 hover:bg-amber sm:inline-flex sm:items-center"
            >
              Connect
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="inline-flex size-11 items-center justify-center rounded-full border border-cream/20 text-cream lg:hidden"
            >
              <Menu aria-hidden className="size-5" />
              <span className="sr-only">Open menu</span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        active={active}
        onClose={() => setMenuOpen(false)}
        onConnect={() => {
          setMenuOpen(false)
          onConnect()
        }}
      />
    </>
  )
}
