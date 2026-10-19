import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { albums as liveAlbums, eventsPage, layoutDemoAlbums } from '../../content/events';
import { EventImage } from './EventImage';

/** Editorial mosaic with album filter and an accessible lightbox (native dialog, arrows, Escape). */
export function Gallery() {
  const demo =
    liveAlbums.length === 0 && document.documentElement.classList.contains('review-mode');
  const albums = demo ? layoutDemoAlbums : liveAlbums;
  const [albumId, setAlbumId] = useState('all');
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const items =
    albumId === 'all'
      ? albums.flatMap((a) => a.items)
      : albums.find((a) => a.id === albumId)!.items;
  const current = index === null ? null : items[index];

  const open = (i: number, el: HTMLButtonElement) => {
    openerRef.current = el;
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const step = (d: number) =>
    setIndex((i) => (i === null ? i : (i + d + items.length) % items.length));

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      setIndex(null);
      openerRef.current?.focus();
    };
    dialog.addEventListener('close', onClose);
    return () => dialog.removeEventListener('close', onClose);
  }, []);

  return (
    <section className="ev-gallery" aria-labelledby="gallery-title">
      <div className="wrap">
        <div className="ev-gallery__head">
          <div>
            <h2 id="gallery-title">{eventsPage.galleryTitle}</h2>
            <p>{eventsPage.galleryIntro}</p>
          </div>
          {albums.length > 0 && (
            <div className="ev-gallery__albums" role="group" aria-label="Albums">
              {[{ id: 'all', title: 'All' }, ...albums].map((a) => (
                <button
                  key={a.id}
                  type="button"
                  aria-pressed={albumId === a.id}
                  onClick={() => setAlbumId(a.id)}
                >
                  {a.title}
                </button>
              ))}
            </div>
          )}
        </div>

        {demo && (
          <p className="ev-gallery__demo">
            Layout demo, visible in review mode only. Real event photos replace these tiles.
          </p>
        )}
        {albums.length === 0 && <p className="ev-gallery__empty">{eventsPage.galleryEmpty}</p>}

        <ul className="ev-gallery__grid">
          {items.map((it, i) => (
            <li
              key={it.id}
              className={`ev-gallery__item ev-gallery__item--${it.image.width > it.image.height * 1.3 ? 'wide' : it.image.height > it.image.width * 1.3 ? 'tall' : 'square'}${i % 7 === 0 ? ' is-feature' : ''}`}
            >
              <button
                type="button"
                onClick={(e) => open(i, e.currentTarget)}
                aria-label={`Open photo: ${it.caption}`}
              >
                <EventImage image={it.image} sizes="(min-width: 1024px) 33vw, 50vw" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label="Photo viewer"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1);
          if (e.key === 'ArrowLeft') step(-1);
        }}
      >
        {current && (
          <figure className="lightbox__figure">
            <EventImage image={current.image} sizes="100vw" />
            <figcaption>
              {current.caption}
              <span className="lightbox__count">
                {index! + 1} / {items.length}
              </span>
            </figcaption>
          </figure>
        )}
        <button
          type="button"
          className="lightbox__btn lightbox__prev"
          aria-label="Previous photo"
          onClick={() => step(-1)}
        >
          <ChevronLeft aria-hidden="true" size={28} />
        </button>
        <button
          type="button"
          className="lightbox__btn lightbox__next"
          aria-label="Next photo"
          onClick={() => step(1)}
        >
          <ChevronRight aria-hidden="true" size={28} />
        </button>
        <button
          type="button"
          className="lightbox__btn lightbox__close"
          aria-label="Close photo viewer"
          onClick={() => dialogRef.current?.close()}
        >
          <X aria-hidden="true" size={24} />
        </button>
      </dialog>
    </section>
  );
}
