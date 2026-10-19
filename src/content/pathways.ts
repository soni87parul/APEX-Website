import type { PathwayId, Status } from './types';

/**
 * Pathway panel visual. `photo` is an authentic, approved image id. `pending` marks a slot still waiting for a
 * rights-cleared real photograph (see docs/APEX_IMAGE_ASSET_REGISTER.md); it renders as a labelled placeholder,
 * never as a stand-in picture.
 */
export type PathwayVisual =
  | { kind: 'photo'; image: string; caption: string; alt: string; position?: string }
  | { kind: 'pending'; need: string };

export type Pathway = {
  id: PathwayId;
  no: string;
  family: string;
  title: string;
  /** One sentence for the panel. */
  text: string;
  applications: string;
  visual: PathwayVisual;
  /** Draft readiness shown on the panel. REQUIRES APPROVAL. */
  status: Status;
};

export const pathways: Pathway[] = [
  {
    id: 'cellular',
    no: '01',
    family: 'Cellular agriculture',
    title: 'Cultivated proteins',
    text: 'Cell-line work, growth-media development and cell-culture research for cultivated meat, seafood and cell-based ingredients.',
    applications: 'Cultivated meat and seafood · growth media · cell-based fats',
    visual: {
      kind: 'photo',
      image: 'cell-culture-plate',
      caption: 'Cell culture · ClearMeat laboratory',
      alt: 'A 12-well cell-culture plate with pink growth medium and handwritten labels',
    },
    status: 'foundation',
  },
  {
    id: 'fermentation',
    no: '02',
    family: 'Biomass and precision fermentation',
    title: 'Fermentation',
    text: 'Strain and process development for biomass and precision-fermented proteins, from flask to pilot-ready parameters.',
    applications: 'Mycoprotein · dairy and egg proteins · functional ingredients',
    visual: {
      kind: 'pending',
      need: 'Real stainless-steel bioreactor or fermentation facility, licensed',
    },
    status: 'foundation',
  },
  {
    id: 'plant',
    no: '03',
    family: 'Plant-based',
    title: 'Plant-based proteins',
    text: 'Ingredient characterisation, formulation and processing trials using Indian pulses, oilseeds and grains.',
    applications: 'Textured pulse proteins · plant-based meat and dairy · protein ingredients',
    visual: {
      kind: 'pending',
      need: 'Real plant-protein processing, extrusion or product R&D, licensed',
    },
    status: 'foundation',
  },
];

export const statusLabels: Record<Status, string> = {
  foundation: 'Current research foundation',
  partner: 'Partner-supported',
  development: 'In development',
};
