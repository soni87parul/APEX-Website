import { useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { WorkWithApex } from './pages/WorkWithApex';
import { Events } from './pages/Events';
import { NotFound } from './pages/NotFound';
import { EnquiryProvider } from './lib/enquiry-context';
import { applySeo } from './lib/seo';
import { useReveal } from './hooks/useReveal';

const routes: Record<string, () => JSX.Element> = {
  '/': Home,
  '/work-with-apex': WorkWithApex,
  '/events': Events,
};

export function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  const Page = routes[path] ?? NotFound;

  useEffect(() => applySeo(path), [path]);
  useReveal(path);

  return (
    <EnquiryProvider>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header solidAlways={path !== '/' && path !== '/events'} />
      <main id="main" tabIndex={-1}>
        <Page />
      </main>
      <Footer />
    </EnquiryProvider>
  );
}
