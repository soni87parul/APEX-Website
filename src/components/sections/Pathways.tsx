import { ArrowRight, ImageOff } from 'lucide-react';
import { pathways, statusLabels } from '../../content/pathways';
import { sections } from '../../content/site';
import { SectionHeading } from '../layout/SectionHeading';
import { Photo } from '../ui/Photo';
import { PhotoTag } from '../ui/PhotoTag';
import { StatusLabel } from '../ui/StatusLabel';

/** Section 02: three photographic pathway panels. Each opens the matching Inside APEX tab. */
export function Pathways() {
  const s = sections.pathways;
  return (
    <section
      id="pathways"
      className="section section--deep pathways"
      aria-labelledby="pathways-title"
    >
      <div className="wrap">
        <SectionHeading id="pathways-title" eyebrow={s.eyebrow} title={s.title} intro={s.intro} />
        <ul className="pathways__panels">
          {pathways.map((p) => (
            <li key={p.id} className={`pw-panel pw-panel--${p.visual.kind}`} data-reveal>
              <div className="pw-panel__media">
                {p.visual.kind === 'photo' ? (
                  <>
                    <Photo
                      id={p.visual.image}
                      alt={p.visual.alt}
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      position={p.visual.position}
                    />
                    <PhotoTag image={p.visual.image}>{p.visual.caption}</PhotoTag>
                  </>
                ) : (
                  <div className="pw-panel__pending" role="img" aria-label="Photo to come">
                    <ImageOff aria-hidden="true" size={22} strokeWidth={1.5} />
                    <span>Photo pending</span>
                    <small>{p.visual.need}</small>
                  </div>
                )}
              </div>
              <div className="pw-panel__body">
                <span className="pw-panel__family">
                  {p.no} · {p.family}
                </span>
                <h3>
                  <a href={`#inside-${p.id}`} className="pw-panel__link">
                    {p.title}
                  </a>
                </h3>
                <p>{p.text}</p>
                <div className="pw-panel__foot">
                  <StatusLabel status={p.status}>{statusLabels[p.status]}</StatusLabel>
                  <span className="pw-panel__more" aria-hidden="true">
                    Explore <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
