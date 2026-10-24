import type { ObjectiveId } from '../../content/types';
import { useEnquiry } from '../../lib/enquiry-context';

type Props = {
  objective: ObjectiveId;
  className?: string;
  children: React.ReactNode;
};

/**
 * A link to the enquiry panel that preselects an objective. Without JavaScript it is still a working
 * anchor link to the form.
 */
export function EnquiryLink({ objective, className, children }: Props) {
  const { startEnquiry } = useEnquiry();
  return (
    <a href="#work-with-apex" className={className} onClick={() => startEnquiry(objective)}>
      {children}
    </a>
  );
}
