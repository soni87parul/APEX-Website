import { Hero } from '../components/sections/Hero';
import { Pathways } from '../components/sections/Pathways';
import { Capabilities } from '../components/sections/Capabilities';
import { PlatformExplorer } from '../components/sections/PlatformExplorer';
import { Audiences } from '../components/sections/Audiences';
import { Enquiry } from '../components/sections/Enquiry';
import { Ecosystem } from '../components/sections/Ecosystem';

export function Home() {
  return (
    <>
      <Hero />
      <Pathways />
      <Capabilities />
      <PlatformExplorer />
      <Audiences />
      <Enquiry />
      <Ecosystem />
    </>
  );
}
