import { brand, footer } from '../../content/site';
import { Logo } from '../ui/Logo';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__inner">
        <div className="site-footer__text">
          <p>
            <strong>APEX</strong> · <span data-claim="requires-approval">{brand.expanded}</span>
          </p>
          <p>{footer.line}</p>
          <p className="site-footer__small">
            {footer.privacy} © {new Date().getFullYear()} ClearMeat.{' '}
            <a href="/work-with-apex">Work With APEX</a>
          </p>
        </div>
        <div className="site-footer__logos">
          <Logo name="apex-dark" className="site-footer__apex" />
          <span className="site-footer__plate">
            <Logo name="clearmeat" />
          </span>
          <Logo name="niftem-white" className="site-footer__niftem" />
        </div>
      </div>
    </footer>
  );
}
