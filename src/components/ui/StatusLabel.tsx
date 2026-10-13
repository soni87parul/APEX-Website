import type { Status } from '../../content/types';

/** Readiness badge. Every status is a draft until APEX confirms it (docs/CONTENT_CLAIMS.md). */
export function StatusLabel({ status, children }: { status: Status; children: React.ReactNode }) {
  return (
    <span className={`status status--${status}`} data-claim="requires-approval">
      {children}
    </span>
  );
}

export function StatusLegend({ note }: { note?: string }) {
  return (
    <div className="status-legend">
      <ul>
        <li>
          <i className="status-key status-key--foundation" aria-hidden="true" /> Current research
          foundation
        </li>
        <li>
          <i className="status-key status-key--partner" aria-hidden="true" /> Partner-supported
        </li>
        <li>
          <i className="status-key status-key--development" aria-hidden="true" /> In development
        </li>
      </ul>
      {note && <p>{note}</p>}
    </div>
  );
}
