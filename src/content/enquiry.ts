import type { ObjectiveId } from './types';

export const objectives: { id: ObjectiveId; label: string; step2Title: string }[] = [
  {
    id: 'infrastructure',
    label: 'Access research infrastructure',
    step2Title: 'Tell us about the work you need space for',
  },
  { id: 'rnd', label: 'Discuss an R&D project', step2Title: 'Tell us about your R&D project' },
  { id: 'pilot', label: 'Explore pilot development', step2Title: 'Tell us about your pilot plans' },
  {
    id: 'india-entry',
    label: 'Explore India entry',
    step2Title: 'Tell us about your plans for India',
  },
  {
    id: 'partnership',
    label: 'Discuss a partnership',
    step2Title: 'Tell us about the partnership you have in mind',
  },
  {
    id: 'training',
    label: 'Request training or technical collaboration',
    step2Title: 'Tell us what you would like to learn or build together',
  },
];

export const technologyAreas = [
  'Cultivated meat or cell-based ingredients',
  'Precision or biomass fermentation',
  'Plant protein',
  'More than one area',
  'Not sure yet',
];

export const organisationTypes = [
  'Startup',
  'Corporate R&D',
  'International company',
  'Research institution',
  'Government body',
  'Other',
];

export const timelines = [
  'Within 3 months',
  '3 to 6 months',
  '6 to 12 months',
  'Exploring for now',
];

export const enquiryCopy = {
  privacy:
    'We use your details only to respond to your enquiry. A full privacy notice will be linked here before launch.',
  timeHint: 'Takes about two minutes',
  successTitle: 'Thank you. Your enquiry has been received.',
  successText: 'The APEX team will review your objective and reply with a suggested next step.',
  notConnectedTitle: 'Online enquiries are not connected yet.',
  notConnectedText:
    'This preview does not send enquiries anywhere, so nothing has been submitted. Your answers are still in the form.',
  errorTitle: 'Your enquiry could not be sent.',
  errorText: 'Please check your connection and try again. Your answers are still in the form.',
};
