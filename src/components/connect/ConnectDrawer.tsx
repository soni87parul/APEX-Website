import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { connectEntryPoints } from '../../content/site'
import { useDialog } from '../../hooks/useDialog'

type Props = { open: boolean; topic: string | null; onClose: () => void }

// Shell only. Questions, destinations, privacy notice and backend are pending
// approval, so nothing here submits or stores data.
export function ConnectDrawer({ open, topic, onClose }: Props) {
  const ref = useDialog<HTMLDivElement>(open, onClose)

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.div
            className="absolute inset-0 bg-charcoal/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-labelledby="connect-title"
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-creamsoft text-charcoal"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-hairline px-6 py-4">
              <p className="label text-charcoal/60">Connect with APEX</p>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex size-11 items-center justify-center rounded-full border border-charcoal/15"
              >
                <X aria-hidden className="size-5" />
                <span className="sr-only">Close</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-8">
              <h2 id="connect-title" className="font-display text-4xl leading-tight">
                What are you trying to build?
              </h2>
              <p className="mt-3 text-sm text-charcoal/65">Choose a starting point. A few specific questions follow.</p>
              <ul className="mt-8 grid gap-2">
                {connectEntryPoints.map((entry) => {
                  const on = entry.id === topic
                  return (
                    <li key={entry.id}>
                      <div
                        className={`flex min-h-12 items-center gap-3 rounded-lg border px-4 text-sm ${
                          on ? 'border-amber bg-amber/10' : 'border-hairline'
                        }`}
                      >
                        <span aria-hidden className={`size-2.5 border ${on ? 'border-amber bg-amber' : 'border-charcoal/30'}`} />
                        {entry.label}
                        {on && <span className="label ml-auto text-charcoal/50">Selected</span>}
                      </div>
                    </li>
                  )
                })}
              </ul>
              <p className="mt-8 rounded-lg bg-hairline/50 p-4 text-xs leading-relaxed text-charcoal/75">
                Preview only. The enquiry questions, email and WhatsApp details, and privacy handling are waiting
                for approval, so this panel does not collect anything yet.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
