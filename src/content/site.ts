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
  { label: 'Inside APEX', href: '/#inside' },
  { label: 'Events', href: '/events/' },
  { label: 'Ecosystem', href: '/#ecosystem' },
];

export const hero = {
  eyebrow: 'Alternative protein infrastructure · India',
  headlineLead: 'From protein innovation to',
  headlineAccent: 'industrial reality.',
  sub: "India's shared infrastructure platform for alternative proteins.",
  lede: 'Research infrastructure, contract R&D, process development and pilot support, so your team can move from the lab towards manufacturing readiness in India.',
  primaryCta: { label: 'Explore capabilities', href: '#capabilities' },
  secondaryCta: { label: 'Work With APEX', href: '#work-with-apex' },
  photoCaption: 'ClearMeat research laboratory',
  /** REQUIRES APPROVAL: exact partnership wording and "within the MoFPI ecosystem". */
  institutional: {
    label: 'Institutional partner',
    text: 'Run and managed by ClearMeat in partnership with NIFTEM-Kundli, an institution under the Ministry of Food Processing Industries.',
    approval: 'requires-approval' as Approval,
  },
};

/** The one-line proposition strip under the hero (anchor #platform). */
export const platform = {
  eyebrow: 'The platform',
  statement:
    'If you want to build, develop, scale or manufacture alternative protein in India, APEX is the infrastructure platform you plug into.',
  points: [
    { label: 'Run and managed by', value: 'ClearMeat' },
    { label: 'Institutional partner', value: 'NIFTEM-Kundli' },
    { label: 'Pathways', value: 'Cultivated, fermentation, plant-based' },
  ],
};

export const sections = {
  pathways: {
    eyebrow: 'Three technology pathways',
    title: 'Three routes to new protein, one shared platform.',
    intro:
      'Each pathway needs different biology, but all three draw on the same laboratories, process development, testing, pilot planning and regulatory know-how.',
  },
  capabilities: {
    eyebrow: 'What APEX enables',
    title: 'Use only what your programme needs.',
    intro:
      'Start with one service and add more as you grow. Every engagement is scoped with your team.',
  },
  journey: {
    eyebrow: 'The support journey',
    title: 'From first experiment towards manufacturing readiness.',
    intro:
      'APEX can support each stage, directly or with partners. Not every stage is delivered in-house today.',
  },
  inside: {
    eyebrow: 'Inside APEX',
    title: 'Real research, at the ClearMeat laboratory.',
    intro:
      'Photographs here are from ClearMeat’s own laboratory. Partner and illustrative images are always labelled as such.',
    statusNote: 'Statuses are drafts and will be confirmed by APEX before publication.',
  },
  audiences: {
    eyebrow: 'Who APEX works with',
    title: 'Built for four kinds of team.',
  },
  eventsPreview: {
    eyebrow: 'Events',
    title: 'Where India’s alternative-protein community meets.',
    text: 'Summits, workshops and site visits, with photos, reports and what is coming next.',
    cta: 'See APEX events',
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
    eyebrow: 'Ecosystem',
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
    text: 'Operates the platform and leads technical delivery.',
    logo: 'clearmeat',
    href: 'https://clearmeat.org',
    approval: 'requires-approval' as Approval,
  },
  {
    id: 'niftem',
    role: 'Institutional partner',
    name: 'NIFTEM-Kundli',
    text: 'National Institute of Food Technology Entrepreneurship and Management, Kundli.',
    logo: 'niftem',
    href: 'https://niftem.ac.in',
    approval: 'requires-approval' as Approval,
  },
  {
    id: 'mofpi',
    role: 'Institutional context',
    name: 'MoFPI ecosystem',
    text: 'NIFTEM-Kundli is an institution under India’s Ministry of Food Processing Industries. APEX is not operated by MoFPI.',
    logo: null,
    href: 'https://www.mofpi.gov.in',
    approval: 'requires-approval' as Approval,
  },
] as const;

export const footer = {
  line: 'Run and managed by ClearMeat in partnership with NIFTEM-Kundli.',
  privacy: 'Privacy notice to be published before launch.',
};
