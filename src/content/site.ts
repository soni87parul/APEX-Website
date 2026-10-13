import type { Approval } from './types';

export const SITE_URL = 'https://apex.clearmeat.org';

export const brand = {
  short: 'APEX',
  /** REQUIRES APPROVAL: the logo reads "Alt Protein Excellence Hub"; earlier briefs say "Alternative Protein Excellence". */
  expanded: 'Alt Protein Excellence Hub',
  expandedApproval: 'requires-approval' as Approval,
  operator: 'ClearMeat',
  partner: 'NIFTEM-Kundli',
  ministry: 'Ministry of Food Processing Industries (MoFPI)',
};

export const nav = [
  { label: 'Platform', href: '/#platform' },
  { label: 'Pathways', href: '/#pathways' },
  { label: 'Capabilities', href: '/#capabilities' },
  { label: 'Inside the platform', href: '/#inside' },
  { label: 'Ecosystem', href: '/#ecosystem' },
];

export const hero = {
  eyebrow: 'Alternative protein infrastructure · India',
  headlineLead: 'From protein innovation to',
  headlineAccent: 'industrial reality.',
  sub: "India's integrated infrastructure platform for alternative proteins.",
  lede: 'APEX connects specialised research infrastructure, bioprocess and product development, pilot-production support and industry collaboration, helping teams progress from research towards manufacturing readiness in India.',
  primaryCta: { label: 'Explore capabilities', href: '#capabilities' },
  secondaryCta: { label: 'Work With APEX', href: '#work-with-apex' },
  photoCaption: 'ClearMeat research laboratory',
  ticker: [
    { no: '01', label: 'Cultivated meat', text: 'Cell-culture and growth-media research' },
    {
      no: '02',
      label: 'Precision fermentation',
      text: 'Biomass and precision-fermentation development',
    },
    { no: '03', label: 'Plant protein', text: 'Formulation and food-processing trials' },
  ],
  /** REQUIRES APPROVAL: exact partnership wording and "within the MoFPI ecosystem". */
  institutional: {
    label: 'Institutional partner',
    text: 'Run and managed by ClearMeat in partnership with NIFTEM-Kundli, an institution under the Ministry of Food Processing Industries.',
    approval: 'requires-approval' as Approval,
  },
};

export const sections = {
  pathways: {
    eyebrow: 'Three technology pathways',
    title: 'Three routes to new protein. One shared foundation.',
    intro:
      'Cultivated meat, precision fermentation and plant protein need different biology and equipment, but they share much of the same groundwork: laboratories, process development, testing, pilot planning and regulatory know-how. APEX provides that foundation once, so each team builds only what is unique to its product.',
  },
  capabilities: {
    eyebrow: 'APEX capabilities',
    title: 'Capabilities as modules you combine.',
    intro:
      'Start with one module, such as research infrastructure access, and add contract R&D, pilot support or market-entry guidance as your programme grows. Each engagement is scoped with your team, so you use only what you need.',
  },
  journey: {
    eyebrow: 'The support journey',
    title: 'From first experiment towards manufacturing readiness.',
    intro:
      'Most programmes move through five stages. APEX can support each one, directly or with partners. This is a support journey, not a promise that every stage is delivered in-house today.',
  },
  inside: {
    eyebrow: 'Inside the platform',
    title: 'Explore what APEX supports.',
    intro:
      'Choose a technology area to see the work it supports, how to access it and how developed it is today. Labels separate the current research foundation from capabilities being developed with partners.',
    statusNote: 'Statuses are drafts and will be confirmed by APEX before publication.',
  },
  audiences: {
    eyebrow: 'Who APEX works with',
    title: 'Four ways teams work with APEX.',
  },
  enquiry: {
    eyebrow: 'Work With APEX',
    title: 'Build your alternative-protein programme in India.',
    intro:
      'Tell us what you are trying to achieve. We will point you to the right capability, the right people and a realistic next step, whether you are a startup, a corporate R&D team, an international company or a research institution.',
    steps: [
      { label: 'Step 1', text: 'Choose your objective' },
      { label: 'Step 2', text: 'A few questions about your project' },
      { label: 'Step 3', text: 'Contact details' },
      { label: 'Then', text: 'We reply with a next step' },
    ],
  },
  ecosystem: {
    eyebrow: 'APEX ecosystem',
    title: 'Built on institutional partnership.',
    /** REQUIRES APPROVAL: institutional wording. */
    intro:
      'APEX is run and managed by ClearMeat in partnership with NIFTEM-Kundli, connecting laboratory research with India’s food-processing sector.',
    collaboratorsNote:
      'Industry collaborators will be added once each relationship and logo permission is confirmed.',
  },
};

export const ecosystem = [
  {
    id: 'clearmeat',
    role: 'Runs and manages APEX',
    name: 'ClearMeat',
    text: 'Operates the platform and leads technical delivery, drawing on its cultivated-meat and growth-media research.',
    logo: 'clearmeat',
    href: 'https://clearmeat.org',
    approval: 'requires-approval' as Approval,
  },
  {
    id: 'niftem',
    role: 'Institutional partner',
    name: 'NIFTEM-Kundli',
    text: 'National Institute of Food Technology Entrepreneurship and Management, Kundli: partner institution for research and collaboration.',
    logo: 'niftem',
    href: 'https://niftem.ac.in',
    approval: 'requires-approval' as Approval,
  },
  {
    id: 'mofpi',
    role: 'Context, not operator',
    name: 'MoFPI ecosystem',
    text: 'NIFTEM-Kundli is an institution under the Ministry of Food Processing Industries. APEX is not a government body and is not operated by MoFPI.',
    logo: null,
    href: 'https://www.mofpi.gov.in',
    approval: 'requires-approval' as Approval,
  },
] as const;

export const footer = {
  line: 'Run and managed by ClearMeat in partnership with NIFTEM-Kundli.',
  privacy: 'Privacy notice to be published before launch.',
};
