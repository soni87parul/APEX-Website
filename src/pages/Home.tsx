import { Hero } from '../components/sections/Hero';
import { PlatformStrip } from '../components/sections/PlatformStrip';
import { Pathways } from '../components/sections/Pathways';
import { Capabilities } from '../components/sections/Capabilities';
import { PlatformExplorer } from '../components/sections/PlatformExplorer';
import { Audiences } from '../components/sections/Audiences';
import { Ecosystem } from '../components/sections/Ecosystem';
import { EventsPreview } from '../components/sections/EventsPreview';
import { Enquiry } from '../components/sections/Enquiry';

export function Home() {
  return (
    <>
      <Hero />
      <PlatformStrip />
      <Pathways />
      <Capabilities />
      <PlatformExplorer />
      <Audiences />
      <Ecosystem />
      <EventsPreview />
      <Enquiry />
    </>
  );
}
