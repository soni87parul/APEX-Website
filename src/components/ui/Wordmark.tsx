// Text wordmark placeholder until the approved APEX logo files are supplied.
export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-baseline gap-3">
      <span className="font-sans text-[1.35rem] font-semibold tracking-[0.18em]">APEX</span>
      {!compact && (
        <span className="label hidden text-stone xl:inline">Alternative Protein Excellence</span>
      )}
    </span>
  )
}
