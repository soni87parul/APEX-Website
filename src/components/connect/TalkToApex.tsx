import { AnimatePresence, motion } from 'motion/react'
import { MessageCircle } from 'lucide-react'
import { useScrolled } from '../../hooks/useScrolled'

/** Small persistent action that appears once the visitor has left the hero. */
export function TalkToApex({ onOpen }: { onOpen: () => void }) {
  const visible = useScrolled(typeof window === 'undefined' ? 600 : window.innerHeight * 0.8)
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={onOpen}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          className="fixed bottom-4 right-4 z-30 inline-flex min-h-11 items-center gap-2 rounded-full border border-cream/15 bg-raised/90 px-4 text-sm text-cream shadow-lg shadow-charcoal/40 backdrop-blur hover:border-cream/40 sm:bottom-6 sm:right-6"
        >
          <MessageCircle aria-hidden className="size-4 text-amber" />
          Talk to APEX
        </motion.button>
      )}
    </AnimatePresence>
  )
}
