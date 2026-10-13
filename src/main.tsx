import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/manrope/wght.css';
import '@fontsource-variable/dm-sans/wght.css';
import '@fontsource/jetbrains-mono/latin-500.css';
import './styles/tokens.css';
import './styles/global.css';
import { App } from './App';

const root = document.documentElement;
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) root.classList.add('motion-ok');
// ?review highlights every claim that still needs owner approval (docs/CONTENT_CLAIMS.md).
if (new URLSearchParams(window.location.search).has('review')) root.classList.add('review-mode');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
