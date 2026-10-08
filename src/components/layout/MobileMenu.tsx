import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { navItems } from '../../content/site'
import { useDialog } from '../../hooks/useDialog'
import { Wordmark } from '../ui/Wordmark'

type Props = { open: boolean; active: string | null; onClose: () => void; onConnect: () => void }

export function MobileMenu({ open, active, onClose, onConnect }: Props) {
  const ref = useDialog<HTMLDivElement>(open, onClose)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-50 flex flex-col bg-charcoal lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="container-site flex h-16 items-center justify-between">
            <Wordmark compact />
            <button
              type="button"
              onClick={onClose}
              className="inline-flex size-11 items-center justify-center rounded-full border border-cream/20"
            >
              <X aria-hidden className="size-5" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <nav aria-label="Mobile" className="container-site flex-1 overflow-y-auto pt-6">
            <ol className="border-t border-cream/10">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  className="border-b border-cream/10"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.35 }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={onClose}
                    aria-current={active === item.id ? 'location' : undefined}
                    className="block py-4"
                  >
                    <span className="font-display text-[2rem] leading-none">{item.label}</span>
                  </a>
                </motion.li>
              ))}
            </ol>
          </nav>

          <div className="container-site grid gap-3 pb-8 pt-6">
            <a
              href="#work-with-apex"
              onClick={onClose}
              className="flex min-h-12 items-center justify-center rounded-full border border-cream/25 text-sm font-medium"
            >
              Work With APEX
            </a>
            <button
              type="button"
              onClick={onConnect}
              className="min-h-12 rounded-full bg-cream text-sm font-medium text-charcoal"
            >
              Connect with APEX
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
