import {
  Camera,
  ExternalLink,
  FileText,
  MessageSquareText,
  Newspaper,
  PlayCircle,
  Star,
} from 'lucide-react';
import { eventsPage, mediaItems, type MediaType } from '../../content/events';

const icons: Record<MediaType, typeof FileText> = {
  linkedin: MessageSquareText,
  instagram: Camera,
  news: Newspaper,
  video: PlayCircle,
  article: FileText,
  success_story: Star,
};

/**
 * Curated posts, news and videos as link cards. No third-party scripts or pasted HTML: official embeds can be
 * added later behind a click, and these cards stay as the fallback.
 */
export function MediaInsights() {
  return (
    <section className="ev-media" aria-labelledby="media-title">
      <div className="wrap">
        <div className="ev-media__head">
          <h2 id="media-title">{eventsPage.mediaTitle}</h2>
          <p>{eventsPage.mediaIntro}</p>
        </div>
        <ul className="ev-media__list">
          {mediaItems.map((m) => {
            const Icon = icons[m.type];
            const body = (
              <>
                <span className="ev-media__source">
                  <Icon aria-hidden="true" size={16} /> {m.source}
                  {m.date && <> · {m.date}</>}
                  {m.sample && <em className="ev-media__sample">Sample card</em>}
                </span>
                <h3>{m.headline}</h3>
                <p>{m.excerpt}</p>
                {m.url && (
                  <span className="ev-media__go">
                    Open <ExternalLink aria-hidden="true" size={14} />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </span>
                )}
              </>
            );
            return (
              <li key={m.id} className="ev-media__card">
                {m.url ? (
                  <a href={m.url} target="_blank" rel="noopener noreferrer">
                    {body}
                  </a>
                ) : (
                  <div>{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
