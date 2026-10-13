import { Audiences } from '../components/sections/Audiences';
import { Enquiry } from '../components/sections/Enquiry';

/** /work-with-apex: the enquiry as its own page, preceded by the four audience journeys. */
export function WorkWithApex() {
  return (
    <div className="page-offset">
      <Enquiry headingLevel="h1" />
      <Audiences detailed />
    </div>
  );
}
