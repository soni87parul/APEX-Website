/** Shared content types. All copy lives in src/content so editors never need to touch components. */

/**
 * Capability readiness labels. Every use is a draft until APEX confirms it (see docs/CONTENT_CLAIMS.md).
 * foundation = current research foundation, partner = partner-supported, development = in development.
 */
export type Status = 'foundation' | 'partner' | 'development';

export type PathwayId = 'cellular' | 'fermentation' | 'plant';

export type ObjectiveId =
  'infrastructure' | 'rnd' | 'pilot' | 'india-entry' | 'partnership' | 'training';

/** Marks text that must be approved by APEX before publication. Rendered as data-claim for review mode. */
export type Approval = 'approved' | 'requires-approval';
