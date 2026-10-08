// Editable site copy. Everything public-facing lives here so wording can be
// reviewed and approved without touching components.

export const navItems = [
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'infrastructure', label: 'Infrastructure' },
  { id: 'ecosystem', label: 'Ecosystem' },
] as const

export const hero = {
  eyebrow: 'Alternative protein infrastructure · India',
  headline: { lead: 'The infrastructure platform', accent: 'for alternative protein', tail: 'in India.' },
  proposition:
    'If you want to build, develop, scale or manufacture alternative protein in India, APEX is the infrastructure platform you plug into.',
  services: ['Research access', 'Contract R&D', 'Pilot and scale-up support', 'India market entry', 'Training'],
  // Wording pending verification with NIFTEM / MoFPI before launch.
  operatorCredit: 'Run and managed by ClearMeat in partnership with NIFTEM, within the MoFPI ecosystem.',
}

export const stages = ['Research', 'Develop', 'Validate', 'Pilot', 'Scale', 'Market'] as const
export type Stage = (typeof stages)[number]

export const pathways = [
  { id: 'cellular', label: 'Cellular / cultivated' },
  { id: 'fermentation', label: 'Fermentation' },
  { id: 'plant', label: 'Plant-based' },
] as const

export type PathwayId = (typeof pathways)[number]['id']

// Find Your Pathway. Wording deliberately describes support offered, not
// guaranteed capacity or outcomes; service availability still to be confirmed.
export const objectives = [
  {
    id: 'access',
    prompt: 'Get lab access without building a facility',
    service: 'Access',
    title: 'Pay-per-seat research access',
    summary:
      'A research seat with shared equipment and utilities, so your team can start work without building its own lab.',
    note: 'Ingredients and consumables are charged separately.',
    engagement: 'Seat-based access, arranged around your project.',
    audience: 'Often used by startups and research teams',
    stages: ['Research', 'Develop'],
    cta: 'Ask about access',
  },
  {
    id: 'develop',
    prompt: 'Outsource or extend our R&D',
    service: 'Develop',
    title: 'Contract R&D',
    summary:
      'Project-based product and process development, prototyping and validation, scoped with your team.',
    note: 'Scope, milestones and deliverables are agreed per project.',
    engagement: 'A defined project with an agreed scope.',
    audience: 'Often used by corporate R&D teams',
    stages: ['Develop', 'Validate'],
    cta: 'Discuss an R&D project',
  },
  {
    id: 'scale',
    prompt: 'Move from bench towards pilot and scale-up',
    service: 'Scale',
    title: 'Pilot work and scale-up support',
    summary:
      'Pilot-stage work, with scale-up and manufacturing support matched to your process and stage of development.',
    note: 'What is possible depends on your process. We confirm fit before any commitment.',
    engagement: 'A feasibility conversation first, then a scoped pilot plan.',
    audience: 'For teams with a validated product or process',
    stages: ['Pilot', 'Scale'],
    cta: 'Explore scale-up',
  },
  {
    id: 'enter',
    prompt: 'Enter the Indian market',
    service: 'Enter India',
    title: 'Market-entry and regulatory support',
    summary:
      'Help with localisation, ecosystem connections and navigating regulatory pathways in India.',
    note: 'We guide the process; regulatory outcomes rest with the authorities.',
    engagement: 'Advisory support, which can be combined with R&D or pilot work.',
    audience: 'Often used by global companies',
    stages: ['Validate', 'Market'],
    cta: 'Talk about India entry',
  },
  {
    id: 'learn',
    prompt: 'Build our team’s technical capability',
    service: 'Learn',
    title: 'Training and workshops',
    summary: 'Technical training, workshops and capability-building for companies and institutions.',
    note: 'Formats are tailored to the group.',
    engagement: 'Workshops or a tailored programme.',
    audience: 'For companies, universities and institutions',
    stages: ['Research'],
    cta: 'Ask about training',
  },
] as const satisfies readonly {
  id: string
  prompt: string
  service: string
  title: string
  summary: string
  note: string
  engagement: string
  audience: string
  stages: readonly Stage[]
  cta: string
}[]

export type Objective = (typeof objectives)[number]
export type ObjectiveId = Objective['id']

export const connectEntryPoints = [
  ...objectives.map((o) => ({ id: o.id as string, label: o.cta })),
  { id: 'other', label: 'Something else' },
]

// Homepage order after the hero. Rendered as labelled stubs until each is built.
export const homeSections = [
  { id: 'journey', n: '02', title: 'One connected journey', intent: 'Research to market on the same line as the hero, with what APEX supports at each stage, stated accurately.', tone: 'light' },
  { id: 'capabilities', n: '03', title: 'Capabilities', intent: 'Access, Develop, Scale, Enter India, Learn, plus technology pathways and a quiet ClearX9 note. Each opens the enquiry preselected.', tone: 'dark' },
  { id: 'infrastructure', n: '04', title: 'Infrastructure explorer', intent: 'Capability zones with licensed conceptual imagery. No inventories, capacities or square footage.', tone: 'dark' },
  { id: 'ecosystem', n: '05', title: 'APEX Ecosystem', intent: 'Institutional context, then wider organisations, with "And growing". Logos only once permissions are confirmed.', tone: 'light' },
  { id: 'connect', n: '06', title: 'What are you trying to build?', intent: 'Final conversion with service-led options, email and WhatsApp, plus a small updates strip.', tone: 'dark' },
] as const
