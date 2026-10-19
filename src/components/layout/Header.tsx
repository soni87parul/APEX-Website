import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { nav, footer } from '../../content/site';
import { Logo } from '../ui/Logo';

/** Sticky header: transparent over the hero, solid once the page scrolls. Stable height throughout. */
export function Header({ solidAlways = false }: { solidAlways?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 16);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const openMenu = () => {
    dialogRef.current?.showModal();
    document.documentElement.classList.add('menu-open');
  };
  const closeMenu = () => dialogRef.current?.close();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      document.documentElement.classList.remove('menu-open');
      menuButtonRef.current?.focus();
    };
    dialog.addEventListener('close', onClose);
    return () => dialog.removeEventListener('close', onClose);
  }, []);

  return (
    <header className={`site-header${scrolled || solidAlways ? ' is-solid' : ''}`}>
      <div className="wrap site-header__inner">
        <a href="/" className="site-header__brand">
          <Logo name="apex-dark" className="site-header__logo" alt="APEX home" />
        </a>
        <nav aria-label="Main" className="site-header__nav">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="/#work-with-apex" className="btn btn--primary btn--sm site-header__cta">
          Work With APEX <ArrowRight aria-hidden="true" size={16} />
        </a>
        <button
          ref={menuButtonRef}
          type="button"
          className="site-header__menu-btn"
          aria-label="Open menu"
          aria-haspopup="dialog"
          onClick={openMenu}
        >
          <Menu aria-hidden="true" size={22} />
        </button>
      </div>

      <dialog ref={dialogRef} className="mobile-menu" aria-label="Menu">
        <div className="mobile-menu__top">
          <Logo name="apex-dark" className="mobile-menu__logo" />
          <button
            type="button"
            className="mobile-menu__close"
            aria-label="Close menu"
            onClick={closeMenu}
          >
            <X aria-hidden="true" size={22} />
          </button>
        </div>
        <nav aria-label="Mobile">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={closeMenu}>
                  {item.label}
                  <ArrowRight aria-hidden="true" size={18} />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="/#work-with-apex" className="btn btn--primary btn--block" onClick={closeMenu}>
          Work With APEX <ArrowRight aria-hidden="true" size={16} />
        </a>
        <p className="mobile-menu__note">{footer.line}</p>
      </dialog>
    </header>
  );
}
