import type { ObjectiveId, Status } from './types';

export type PlatformTab = {
  id: string;
  no: string;
  tab: string;
  area: string;
  title: string;
  text: string;
  facts: { label: string; value: string }[];
  /** Draft status badges. REQUIRES APPROVAL. */
  statuses: { status: Status; label: string }[];
  /** Optional explanatory schematic, shown behind a disclosure and labelled as illustrative. */
  diagram?: 'bioreactor' | 'extrusion' | 'regulatory';
  cta: { label: string; objective: ObjectiveId };
  note?: string;
};

export const platformTabs: PlatformTab[] = [
  {
    id: 'cellular',
    no: '01',
    tab: 'Cultivated',
    area: 'Area 01 · Cellular agriculture',
    title: 'Cultivated meat research',
    text: "Aseptic laboratory capability for cultivated meat and cell-based protein research, built on ClearMeat's experience in cell culture and growth media.",
    facts: [
      {
        label: 'Typical work',
        value:
          'Cell-line maintenance, proliferation studies, growth-media screening and optimisation',
      },
      {
        label: 'Who uses it',
        value: 'Cultivated-meat startups, corporate R&D teams, research institutions',
      },
      {
        label: 'Access models',
        value: 'Pay-per-seat research access, contract R&D, collaborative projects',
      },
      { label: 'Equipment', value: 'Confirmed per project on enquiry' },
    ],
    statuses: [
      { status: 'foundation', label: 'Current research foundation' },
      { status: 'development', label: 'Scale-up: in development' },
    ],
    cta: { label: 'Discuss cultivated-meat research', objective: 'rnd' },
  },
  {
    id: 'fermentation',
    no: '02',
    tab: 'Fermentation',
    area: 'Area 02 · Fermentation',
    title: 'Precision fermentation and bioprocess',
    text: 'Process development for microbial biomass and precision-fermented proteins, from strain screening to pilot-ready parameters.',
    facts: [
      {
        label: 'Typical work',
        value:
          'Media and feedstock optimisation, fermentation process development, downstream processing trials with partners',
      },
      {
        label: 'Who uses it',
        value: 'Fermentation startups, ingredient companies, corporate R&D teams',
      },
      {
        label: 'Access models',
        value: 'Contract R&D, collaborative projects, pilot trials with partners',
      },
      { label: 'Equipment', value: 'Confirmed per project on enquiry' },
    ],
    statuses: [
      { status: 'foundation', label: 'Current research foundation' },
      { status: 'partner', label: 'Pilot: partner-supported' },
    ],
    diagram: 'bioreactor',
    cta: { label: 'Discuss a fermentation project', objective: 'rnd' },
    note: 'Schematic diagram for explanation. It does not depict APEX equipment.',
  },
  {
    id: 'plant',
    no: '03',
    tab: 'Plant-based',
    area: 'Area 03 · Plant-based',
    title: 'Plant protein formulation and processing',
    text: 'Characterisation, formulation and processing trials for plant-based foods built on Indian crops and ingredients.',
    facts: [
      {
        label: 'Typical work',
        value:
          'Ingredient and functionality testing, formulation and sensory evaluation, texturisation trials with partners',
      },
      { label: 'Who uses it', value: 'Plant-based brands, ingredient processors, food companies' },
      {
        label: 'Access models',
        value: 'Contract R&D, product development, partner-supported trials',
      },
      { label: 'Equipment', value: 'Confirmed per project on enquiry' },
    ],
    statuses: [
      { status: 'foundation', label: 'Current research foundation' },
      { status: 'partner', label: 'Texturisation: partner-supported' },
    ],
    diagram: 'extrusion',
    cta: { label: 'Discuss a plant-protein project', objective: 'rnd' },
    note: 'Process diagram for explanation. It does not depict APEX equipment.',
  },
  {
    id: 'regulatory',
    no: '04',
    tab: 'Regulatory and India entry',
    area: 'Area 04 · All pathways',
    title: 'Regulatory guidance and market-entry support',
    text: 'Practical guidance on the Indian regulatory route for novel foods and ingredients, and on entering the Indian market.',
    facts: [
      {
        label: 'Typical work',
        value:
          'Orientation on FSSAI novel-food requirements, data and documentation planning, introductions to regulatory specialists',
      },
      {
        label: 'Who uses it',
        value: 'International companies, startups preparing a first submission',
      },
      { label: 'Access models', value: 'Advisory engagement, alongside R&D or pilot work' },
      { label: 'Approvals', value: 'Issued by the relevant authority, not by APEX' },
    ],
    statuses: [{ status: 'partner', label: 'Partner-supported' }],
    diagram: 'regulatory',
    cta: { label: 'Explore India entry', objective: 'india-entry' },
    note: 'APEX provides guidance and coordination; regulatory approvals are issued by the relevant authority, not APEX.',
  },
];

export const regulatoryFlow = [
  {
    no: '01',
    title: 'Technical data',
    text: 'Your composition, process and safety data, gathered in one place.',
  },
  {
    no: '02',
    title: 'Gap assessment',
    text: 'What the dossier needs that the data does not yet show.',
  },
  {
    no: '03',
    title: 'Dossier planning',
    text: 'Studies, documents and a realistic sequence to close the gaps.',
  },
  {
    no: '04',
    title: 'Specialist review',
    text: 'Introductions to regulatory specialists who review the dossier.',
  },
  {
    no: '05',
    title: 'Applicant submission',
    text: 'You submit to the regulator. The authority decides.',
  },
];

/** Inside APEX mosaic. Authentic ClearMeat photographs only; each is used once on the homepage. */
export const insidePhotos: { image: string; caption: string; alt: string; position?: string }[] = [
  {
    image: 'research-team',
    caption: 'ClearMeat research team',
    alt: 'ClearMeat researchers in lab coats working together at a laboratory bench',
    position: '50% 62%',
  },
  {
    image: 'media-preparation',
    caption: 'Growth-media preparation',
    alt: 'Red growth medium being vacuum-filtered into glass bottles inside a biosafety cabinet',
  },
];

/** REQUIRES APPROVAL: each highlight must be confirmed by APEX before publication. */
export const insideHighlights = [
  {
    title: 'Aseptic cell-culture laboratory',
    text: 'Biosafety cabinets and cell-culture work at ClearMeat.',
  },
  { title: 'Growth-media development', text: 'In-house media work, including the ClearX9 range.' },
  { title: 'Institutional partnership', text: 'Research collaboration with NIFTEM-Kundli.' },
  { title: 'Equipment per project', text: 'Specific equipment is confirmed for each enquiry.' },
];
