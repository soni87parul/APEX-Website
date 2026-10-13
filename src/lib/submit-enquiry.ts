import type { ObjectiveId } from '../content/types';

export type EnquiryData = {
  objective: ObjectiveId | '';
  technologyArea: string;
  organisationType: string;
  description: string;
  timeline: string;
  name: string;
  email: string;
  organisation: string;
  country: string;
  consent: boolean;
  /** Honeypot. Real visitors never see or fill it; the backend should discard enquiries where it is set. */
  website: string;
};

export type SubmitResult = 'sent' | 'not-connected' | 'error';

/**
 * Sends the enquiry to the endpoint in VITE_ENQUIRY_ENDPOINT. Success is reported only when that endpoint
 * answers 2xx. With no endpoint configured (the default until the owner approves a provider) nothing is sent and
 * the caller shows a "not connected" message, never a fake confirmation.
 */
export async function submitEnquiry(data: EnquiryData): Promise<SubmitResult> {
  const endpoint = import.meta.env.VITE_ENQUIRY_ENDPOINT as string | undefined;
  if (!endpoint) return 'not-connected';
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...data, submittedFrom: window.location.href }),
    });
    return res.ok ? 'sent' : 'error';
  } catch {
    return 'error';
  }
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type FieldErrors = Partial<Record<keyof EnquiryData, string>>;

export function validateStep(step: 1 | 2 | 3, d: EnquiryData): FieldErrors {
  const e: FieldErrors = {};
  if (step === 1 && !d.objective) e.objective = 'Choose what you would like to do.';
  if (step === 2) {
    if (!d.technologyArea) e.technologyArea = 'Choose a technology area.';
    if (!d.organisationType) e.organisationType = 'Choose your organisation type.';
    if (d.description.trim().length < 20)
      e.description = 'Add a short description (at least 20 characters).';
  }
  if (step === 3) {
    if (!d.name.trim()) e.name = 'Enter your name.';
    if (!EMAIL.test(d.email.trim()))
      e.email = 'Enter a valid work email, for example name@company.com.';
    if (!d.organisation.trim()) e.organisation = 'Enter your organisation.';
    if (!d.consent) e.consent = 'Please confirm we may use your details to reply.';
  }
  return e;
}
