import { createContext, useCallback, useContext, useState } from 'react';
import type { ObjectiveId } from '../content/types';

type EnquiryContextValue = {
  objective: ObjectiveId | null;
  /** Preselects an objective and scrolls to the enquiry panel. */
  startEnquiry: (objective: ObjectiveId) => void;
  setObjective: (objective: ObjectiveId | null) => void;
  /** Bumped each time a CTA starts an enquiry, so the form can reset to step 1 and take focus. */
  requestId: number;
};

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [objective, setObjective] = useState<ObjectiveId | null>(null);
  const [requestId, setRequestId] = useState(0);

  const startEnquiry = useCallback((next: ObjectiveId) => {
    setObjective(next);
    setRequestId((n) => n + 1);
  }, []);

  return (
    <EnquiryContext.Provider value={{ objective, startEnquiry, setObjective, requestId }}>
      {children}
    </EnquiryContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error('useEnquiry must be used inside EnquiryProvider');
  return ctx;
}
