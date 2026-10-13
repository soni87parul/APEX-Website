import type { ObjectiveId } from './types';

export type Audience = {
  id: string;
  icon: 'rocket' | 'briefcase' | 'globe' | 'landmark';
  title: string;
  text: string;
  cta: string;
  objective: ObjectiveId;
  /** Longer copy for the Work With APEX page. */
  detail: string[];
};

export const audiences: Audience[] = [
  {
    id: 'startups',
    icon: 'rocket',
    title: 'Startups',
    text: 'Use shared infrastructure, including pay-per-seat research access, before building your own facility.',
    cta: 'Access infrastructure',
    objective: 'infrastructure',
    detail: [
      'Shared laboratory access',
      'Process and product development',
      'Pilot support with partners',
    ],
  },
  {
    id: 'corporate',
    icon: 'briefcase',
    title: 'Corporate R&D',
    text: 'Commission contract R&D, product development and process optimisation.',
    cta: 'Discuss an R&D project',
    objective: 'rnd',
    detail: [
      'Scoped contract R&D',
      'Ingredient and process optimisation',
      'Confidential project terms',
    ],
  },
  {
    id: 'international',
    icon: 'globe',
    title: 'International companies',
    text: 'Explore India entry, technology localisation, regulatory pathways and pilot development.',
    cta: 'Explore India entry',
    objective: 'india-entry',
    detail: [
      'Orientation on FSSAI novel-food rules',
      'Local sourcing and partners',
      'Pilot development in India',
    ],
  },
  {
    id: 'institutions',
    icon: 'landmark',
    title: 'Research and government institutions',
    text: 'Collaborate on research, infrastructure access, training and industry-oriented projects.',
    cta: 'Discuss a partnership',
    objective: 'partnership',
    detail: ['Joint research', 'Training programmes', 'Industry-oriented projects'],
  },
];
