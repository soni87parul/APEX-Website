/**
 * Events page content. The shapes mirror the planned CMS tables (hero_campaigns, promo_blocks, gallery_albums,
 * gallery_items, media_items, partner_logos) so that, once the admin backend is approved, this file is replaced
 * by an API response of the same shape and the components do not change.
 *
 * Everything below is PREVIEW content: no real event, date, venue or post is stated. Placeholder images are
 * labelled on the image itself and must be replaced with genuine APEX event photos before launch.
 */

export type EventStatus = 'upcoming' | 'live' | 'completed' | 'report_available';

export type ResponsiveImage = {
  /** Base path without width and extension, e.g. /images/placeholders/event-banner */
  src: string;
  widths: number[];
  width: number;
  height: number;
  alt: string;
  /** CSS object-position, set per campaign in the admin (desktop and mobile). */
  focal?: { desktop: string; mobile: string };
  placeholder?: boolean;
  /**
   * AI-generated concept used as a temporary layout image. Rendered with a visible "Concept image · not an APEX
   * event" label. Never allowed in the gallery, which takes genuine event photographs only.
   */
  concept?: boolean;
};

export type HeroCampaign = {
  id: string;
  active: boolean;
  status: EventStatus;
  eyebrow: string;
  headline: string;
  body: string;
  /** Optional: shown only when real details exist. */
  date?: string;
  venue?: string;
  image: ResponsiveImage;
  cta: { label: string; url: string } | null;
  /** Shown instead of the CTA once the event is over and a report is published. */
  report?: { label: string; url: string };
};

export type PromoBlock = {
  visible: boolean;
  eyebrow: string;
  headline: string;
  text: string;
  cta: { label: string; url: string } | null;
  image: ResponsiveImage;
};

export type GalleryItem = {
  id: string;
  image: ResponsiveImage;
  caption: string;
  /** Optional video: poster is the image; url opens on the platform (no third-party script on our page). */
  videoUrl?: string;
};

export type GalleryAlbum = {
  id: string;
  title: string;
  year: string;
  items: GalleryItem[];
};

export type MediaType = 'linkedin' | 'instagram' | 'news' | 'video' | 'article' | 'success_story';

export type MediaItem = {
  id: string;
  type: MediaType;
  headline: string;
  excerpt: string;
  source: string;
  date?: string;
  /** Public URL. Empty while the item is a sample. */
  url: string;
  sample?: boolean;
};

/** Concept image from the APEX Visual Asset Repository (see src/content/images.ts). */
const concept = (id: string, alt: string): ResponsiveImage => ({
  src: `/images/apex/${id}`,
  widths: [324],
  width: 324,
  height: 180,
  alt,
  concept: true,
});

const ph = (id: string, width: number, height: number, alt: string): ResponsiveImage => ({
  src: `/images/placeholders/${id}`,
  widths: [Math.round(width / 2), width],
  width,
  height,
  alt,
  placeholder: true,
});

export const heroCampaigns: HeroCampaign[] = [
  {
    id: 'flagship-preview',
    active: true,
    status: 'upcoming',
    eyebrow: 'Featured event',
    headline: 'APEX flagship event',
    body: 'The featured event, its dates, venue and registration link are set in the admin. Before the event this button opens registration; afterwards it can point to the event report.',
    // Temporary concept image; replaced by an admin-uploaded, approved event poster or photo.
    image: {
      ...concept(
        'conference-stage-concept',
        'Illustrative conference stage and audience, not an APEX event',
      ),
      focal: { desktop: '50% 40%', mobile: '60% 50%' },
    },
    cta: null,
  },
];

export const promo: PromoBlock = {
  visible: true,
  eyebrow: 'Next at APEX',
  headline: 'Speaker reveals, registration openings and announcements',
  text: 'A quiet strip for what is coming next. It is edited separately from the featured event and can be hidden.',
  cta: null,
  image: concept('panel-discussion-concept', 'Illustrative panel discussion, not an APEX event'),
};

const galleryShapes: [number, number][] = [
  [1600, 1067],
  [1067, 1600],
  [1600, 900],
  [1200, 1200],
];

const galleryItems = (from: number, count: number): GalleryItem[] =>
  Array.from({ length: count }, (_, k) => {
    const i = from + k;
    const [w, h] = galleryShapes[(i - 1) % galleryShapes.length];
    const id = `gallery-${String(i).padStart(2, '0')}`;
    return {
      id,
      image: ph(id, w, h, `Placeholder for event photo ${i}`),
      caption: `Placeholder caption ${i}: who, what and where, written in the admin.`,
    };
  });

/**
 * Genuine event photographs only, uploaded after each event. Empty until the first real album exists.
 * Concept images (`concept: true`) must never be added here.
 */
export const albums: GalleryAlbum[] = [];

/**
 * Labelled layout tiles, shown only in review mode (?review) while `albums` is empty, so the gallery layout
 * can be judged. Never shown to the public and never presented as event coverage.
 */
export const layoutDemoAlbums: GalleryAlbum[] = [
  { id: 'demo-a', title: 'Layout demo A', year: 'Demo', items: galleryItems(1, 8) },
  { id: 'demo-b', title: 'Layout demo B', year: 'Demo', items: galleryItems(9, 4) },
];

export const mediaItems: MediaItem[] = [
  {
    id: 'sample-linkedin',
    type: 'linkedin',
    headline: 'A LinkedIn post from APEX or ClearMeat',
    excerpt:
      'Paste a public post URL in the admin. If the embed is unavailable, this card is shown instead.',
    source: 'LinkedIn',
    url: '',
    sample: true,
  },
  {
    id: 'sample-news',
    type: 'news',
    headline: 'A news article about APEX',
    excerpt: 'External coverage appears as a link card with source, date and a short summary.',
    source: 'News',
    url: '',
    sample: true,
  },
  {
    id: 'sample-video',
    type: 'video',
    headline: 'An event video or talk',
    excerpt: 'Videos open on their platform, so the page loads no third-party player until asked.',
    source: 'Video',
    url: '',
    sample: true,
  },
];

export const eventsPage = {
  galleryTitle: 'Photos and video',
  galleryIntro: 'Moments from APEX events, workshops and visits.',
  galleryEmpty: 'Photos from APEX events will appear here after each event.',
  mediaTitle: 'Media and insights',
  mediaIntro: 'Selected posts, news and videos.',
  noHero: {
    headline: 'APEX events',
    body: 'Summits, workshops and site visits for India’s alternative-protein community.',
  },
};

export const statusText: Record<EventStatus, string> = {
  upcoming: 'Upcoming',
  live: 'Happening now',
  completed: 'Completed',
  report_available: 'Report available',
};

/** Homepage events teaser image. Temporary concept until a genuine event photo is approved. */
export const eventsPreviewImage: ResponsiveImage = concept(
  'conference-audience-concept',
  'Illustrative conference audience, not an APEX event',
);
