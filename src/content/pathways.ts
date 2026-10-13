import type { PathwayId, Status } from './types';

export type FoundationId = 'labs' | 'process' | 'testing' | 'pilot' | 'regulatory' | 'training';

export const foundation: {
  id: FoundationId;
  no: string;
  title: string;
  short: string;
  text: string;
}[] = [
  {
    id: 'labs',
    no: '01',
    title: 'Research laboratories',
    short: 'Labs',
    text: 'Shared laboratory space, utilities and aseptic work areas.',
  },
  {
    id: 'process',
    no: '02',
    title: 'Process development',
    short: 'Process',
    text: 'From experiment to a documented, repeatable process.',
  },
  {
    id: 'testing',
    no: '03',
    title: 'Testing and analytics',
    short: 'Testing',
    text: 'Characterisation, quality and food-safety testing support.',
  },
  {
    id: 'pilot',
    no: '04',
    title: 'Pilot and scale-up support',
    short: 'Pilot',
    text: 'Pilot trials and scale-up planning with partners. Not commercial manufacturing.',
  },
  {
    id: 'regulatory',
    no: '05',
    title: 'Regulatory guidance',
    short: 'Regulatory',
    text: 'Guidance on FSSAI requirements and market entry. APEX does not grant approvals.',
  },
  {
    id: 'training',
    no: '06',
    title: 'Training and industry network',
    short: 'Network',
    text: 'Skills, collaboration and introductions across the ecosystem.',
  },
];

export type Pathway = {
  id: PathwayId;
  no: string;
  family: string;
  title: string;
  text: string;
  applications: string;
  /** Visual: a client photo id, or an original SVG diagram when no authentic, licensed photo exists. */
  visual:
    | { kind: 'photo'; image: string; caption: string }
    | { kind: 'diagram'; diagram: 'bioreactor' | 'extrusion'; caption: string };
  /** Which shared modules the pathway draws on, and (draft) how ready each is. REQUIRES APPROVAL. */
  uses: Partial<Record<FoundationId, Status>>;
};

export const pathways: Pathway[] = [
  {
    id: 'cellular',
    no: '01',
    family: 'Cellular agriculture',
    title: 'Cultivated meat',
    text: 'Cell-line work, growth-media development and cell-culture research for cultivated meat, seafood and cell-based ingredients.',
    applications: 'Cultivated meat and seafood · growth-media development · cell-based fats',
    visual: { kind: 'photo', image: 'cell-culture-plate', caption: 'ClearMeat research' },
    uses: {
      labs: 'foundation',
      process: 'foundation',
      testing: 'foundation',
      pilot: 'development',
      regulatory: 'partner',
      training: 'foundation',
    },
  },
  {
    id: 'fermentation',
    no: '02',
    family: 'Fermentation',
    title: 'Precision fermentation',
    text: 'Strain and process development for biomass and precision-fermented proteins and functional ingredients, from flask to pilot-ready parameters.',
    applications: 'Mycoprotein · dairy and egg proteins · functional ingredients',
    visual: {
      kind: 'diagram',
      diagram: 'bioreactor',
      caption: 'Diagram · stirred-tank bioreactor',
    },
    uses: {
      labs: 'foundation',
      process: 'foundation',
      testing: 'foundation',
      pilot: 'partner',
      regulatory: 'partner',
    },
  },
  {
    id: 'plant',
    no: '03',
    family: 'Plant-based',
    title: 'Plant protein',
    text: 'Ingredient characterisation, formulation and processing trials using Indian pulses, oilseeds and grains, for domestic and export markets.',
    applications: 'Textured pulse proteins · plant-based meat and dairy · protein ingredients',
    visual: {
      kind: 'diagram',
      diagram: 'extrusion',
      caption: 'Diagram · plant-protein texturisation',
    },
    uses: {
      labs: 'foundation',
      process: 'foundation',
      testing: 'foundation',
      pilot: 'partner',
      regulatory: 'partner',
    },
  },
];

export const statusLabels: Record<Status, string> = {
  foundation: 'Current research foundation',
  partner: 'Partner-supported',
  development: 'In development',
};
