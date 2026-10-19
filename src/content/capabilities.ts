import type { ObjectiveId, Status } from './types';

export type Capability = {
  id: string;
  title: string;
  text: string;
  who: string;
};

/** The seven services, kept in full; the homepage shows them inside the five groups below. */
export const capabilities: Capability[] = [
  {
    id: 'infrastructure',
    title: 'Shared research infrastructure',
    text: 'Laboratory space, equipment and utilities on flexible terms, including pay-per-seat access for early-stage teams.',
    who: 'Startups · researchers',
  },
  {
    id: 'contract-rnd',
    title: 'Contract R&D',
    text: 'Scoped research programmes delivered by APEX scientists, from feasibility studies to media and process optimisation.',
    who: 'Corporate R&D · international',
  },
  {
    id: 'development',
    title: 'Product and process development',
    text: 'Turn a promising result into a documented, repeatable process and a prototype product.',
    who: 'Startups · corporates',
  },
  {
    id: 'pilot',
    title: 'Pilot-production support',
    text: 'Pilot trials with APEX and partners to produce samples and data. This is pilot-scale support, not commercial manufacturing.',
    who: 'Startups · corporates',
  },
  {
    id: 'scale',
    title: 'Scale-up and manufacturing readiness',
    text: 'Equipment planning, techno-economic input and partner introductions for a credible route to manufacturing in India.',
    who: 'Scaling companies',
  },
  {
    id: 'india-entry',
    title: 'India market entry and regulatory guidance',
    text: 'Orientation on FSSAI novel-food regulation, technology localisation, sourcing and local partners.',
    who: 'International companies',
  },
  {
    id: 'training',
    title: 'Training and collaboration',
    text: 'Hands-on training, joint research and knowledge exchange with institutions and public programmes.',
    who: 'Institutions · government',
  },
];

export type CapabilityGroup = {
  id: string;
  no: string;
  title: string;
  summary: string;
  /** Plain-language limit shown with the group, where a claim needs one. */
  qualifier?: string;
  includes: string[];
  /** Draft readiness. REQUIRES APPROVAL. */
  status: Status;
  objective: ObjectiveId;
  cta: string;
};

export const capabilityGroups: CapabilityGroup[] = [
  {
    id: 'access',
    no: '01',
    title: 'Access shared labs',
    summary: 'Research space and equipment without building your own facility first.',
    includes: ['infrastructure'],
    status: 'foundation',
    objective: 'infrastructure',
    cta: 'Ask about access',
  },
  {
    id: 'develop',
    no: '02',
    title: 'Contract R&D and development',
    summary: 'Scoped research, then a documented, repeatable process and prototype.',
    includes: ['contract-rnd', 'development'],
    status: 'foundation',
    objective: 'rnd',
    cta: 'Discuss an R&D project',
  },
  {
    id: 'scale',
    no: '03',
    title: 'Pilot and scale readiness',
    summary: 'Samples and scale data, and a credible plan towards manufacturing in India.',
    qualifier: 'Pilot-scale support with partners. Not commercial manufacturing.',
    includes: ['pilot', 'scale'],
    status: 'partner',
    objective: 'pilot',
    cta: 'Explore pilot support',
  },
  {
    id: 'india',
    no: '04',
    title: 'India entry and regulatory orientation',
    summary: 'Localisation, sourcing, partners and the FSSAI novel-food route.',
    qualifier: 'Guidance only. Approvals are issued by the relevant authority, not APEX.',
    includes: ['india-entry'],
    status: 'partner',
    objective: 'india-entry',
    cta: 'Explore India entry',
  },
  {
    id: 'learn',
    no: '05',
    title: 'Training and collaboration',
    summary: 'Hands-on training, joint research and knowledge exchange.',
    includes: ['training'],
    status: 'foundation',
    objective: 'training',
    cta: 'Discuss training',
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
