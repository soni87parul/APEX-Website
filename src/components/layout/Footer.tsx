import { hero, navItems } from '../../content/site'
import { Wordmark } from '../ui/Wordmark'

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream">
      <div className="container-site grid gap-8 border-t border-cream/10 py-12 md:grid-cols-12">
        <div className="md:col-span-6">
          <Wordmark compact />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/60">{hero.operatorCredit}</p>
        </div>
        <nav aria-label="Footer" className="md:col-span-6 md:justify-self-end">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-cream/70">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="hover:text-cream">{item.label}</a>
              </li>
            ))}
            <li><a href="#work-with-apex" className="hover:text-cream">Work With APEX</a></li>
          </ul>
        </nav>
        <p className="label text-cream/35 md:col-span-12">© {new Date().getFullYear()} APEX · Alternative Protein Excellence</p>
      </div>
    </footer>
  )
}
