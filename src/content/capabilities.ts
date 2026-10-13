import type { ObjectiveId, Status } from './types';

export type Capability = {
  id: string;
  no: string;
  title: string;
  text: string;
  who: string;
  /** Visual shown in the image panel when this module is selected. */
  visual:
    | { image: string; caption: string; alt: string; position?: string }
    | { diagram: 'scale' | 'regulatory'; caption: string };
  objective: ObjectiveId;
};

export const capabilities: Capability[] = [
  {
    id: 'infrastructure',
    no: '01',
    title: 'Shared research infrastructure',
    text: 'Laboratory space, equipment and utilities on flexible terms, including pay-per-seat access for early-stage teams.',
    who: 'Startups · researchers',
    visual: {
      image: 'researcher-cabinet',
      caption: 'Shared research infrastructure',
      alt: 'A researcher pipetting into a multi-well plate inside a biosafety cabinet at the ClearMeat laboratory',
    },
    objective: 'infrastructure',
  },
  {
    id: 'contract-rnd',
    no: '02',
    title: 'Contract R&D',
    text: 'Scoped research programmes delivered by APEX scientists, from feasibility studies to media and process optimisation.',
    who: 'Corporate R&D · international',
    visual: {
      image: 'research-team',
      caption: 'Contract R&D with experienced research teams',
      alt: 'ClearMeat researchers in lab coats working together at a laboratory bench',
      position: '50% 72%',
    },
    objective: 'rnd',
  },
  {
    id: 'development',
    no: '03',
    title: 'Product and process development',
    text: 'Turn a promising result into a documented, repeatable process and a prototype product.',
    who: 'Startups · corporates',
    visual: {
      image: 'cell-culture-plate',
      caption: 'From result to repeatable process',
      alt: 'A 12-well cell-culture plate with pink growth medium and handwritten labels',
    },
    objective: 'rnd',
  },
  {
    id: 'pilot',
    no: '04',
    title: 'Pilot-production support',
    text: 'Pilot trials with APEX and partners to produce samples and data. This is pilot-scale support, not commercial manufacturing.',
    who: 'Startups · corporates',
    visual: {
      image: 'media-preparation',
      caption: 'Media preparation for larger runs',
      alt: 'Red growth medium being vacuum-filtered into glass bottles inside a biosafety cabinet',
    },
    objective: 'pilot',
  },
  {
    id: 'scale',
    no: '05',
    title: 'Scale-up and manufacturing readiness',
    text: 'Equipment planning, techno-economic input and partner introductions for a credible route to manufacturing in India.',
    who: 'Scaling companies',
    visual: { diagram: 'scale', caption: 'Diagram · from bench to manufacturing readiness' },
    objective: 'pilot',
  },
  {
    id: 'india-entry',
    no: '06',
    title: 'India market entry and regulatory guidance',
    text: 'Orientation on FSSAI novel-food regulation, technology localisation, sourcing and local partners.',
    who: 'International companies',
    visual: { diagram: 'regulatory', caption: 'Diagram · regulatory support journey' },
    objective: 'india-entry',
  },
  {
    id: 'training',
    no: '07',
    title: 'Training and collaboration',
    text: 'Hands-on training, joint research and knowledge exchange with institutions and public programmes.',
    who: 'Institutions · government',
    visual: {
      image: 'research-team',
      caption: 'Training and collaboration',
      alt: 'ClearMeat researchers in lab coats working together at a laboratory bench',
      position: '50% 72%',
    },
    objective: 'training',
  },
];

export const clearx9 = {
  title: 'ClearX9 growth media',
  /** REQUIRES APPROVAL: product description, variants and any patent wording. */
  text: 'ClearMeat’s cell growth media (Stem, Neuro and standard) are available as specialised inputs for cell-culture programmes.',
  cta: 'Ask about ClearX9',
};

export type JourneyStage = {
  id: string;
  no: string;
  title: string;
  outcome: string;
  detail: string;
  /** Draft readiness label. REQUIRES APPROVAL. */
  status: Status;
  cta: { label: string; objective: ObjectiveId };
};

export const journey: JourneyStage[] = [
  {
    id: 'research',
    no: '01',
    title: 'Research',
    outcome: 'A proven concept',
    detail:
      'Bench work in shared laboratories: cell lines, strains or ingredients screened and characterised.',
    status: 'foundation',
    cta: { label: 'Access research infrastructure', objective: 'infrastructure' },
  },
  {
    id: 'develop',
    no: '02',
    title: 'Develop',
    outcome: 'A repeatable process',
    detail:
      'Media, feedstock and formulation optimisation; the process is documented so it can be repeated and transferred.',
    status: 'foundation',
    cta: { label: 'Discuss an R&D project', objective: 'rnd' },
  },
  {
    id: 'validate',
    no: '03',
    title: 'Validate',
    outcome: 'Data you can rely on',
    detail:
      'Characterisation, quality and food-safety testing, with partner laboratories where specialist analysis is needed.',
    status: 'partner',
    cta: { label: 'Discuss an R&D project', objective: 'rnd' },
  },
  {
    id: 'pilot',
    no: '04',
    title: 'Pilot',
    outcome: 'Samples and scale data',
    detail:
      'Pilot trials with APEX and partners to produce samples and data at a larger scale. Not commercial manufacturing.',
    status: 'partner',
    cta: { label: 'Explore pilot development', objective: 'pilot' },
  },
  {
    id: 'scale',
    no: '05',
    title: 'Scale readiness',
    outcome: 'A credible manufacturing plan',
    detail:
      'Equipment planning, techno-economic input, regulatory planning and introductions to manufacturing partners in India.',
    status: 'development',
    cta: { label: 'Explore pilot development', objective: 'pilot' },
  },
];
