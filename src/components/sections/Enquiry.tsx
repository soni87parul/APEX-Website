import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import {
  enquiryCopy,
  objectives,
  organisationTypes,
  technologyAreas,
  timelines,
} from '../../content/enquiry';
import { sections } from '../../content/site';
import { useEnquiry } from '../../lib/enquiry-context';
import {
  submitEnquiry,
  validateStep,
  type EnquiryData,
  type FieldErrors,
} from '../../lib/submit-enquiry';

const empty: EnquiryData = {
  objective: '',
  technologyArea: '',
  organisationType: '',
  description: '',
  timeline: '',
  name: '',
  email: '',
  organisation: '',
  country: '',
  consent: false,
  website: '',
};

type Step = 1 | 2 | 3;
type Outcome = 'idle' | 'submitting' | 'sent' | 'not-connected' | 'error';
const stepNames = ['Your objective', 'Your project', 'Contact details'];

/** Section 06: three-step enquiry. Data is kept across steps; success only after a real endpoint confirms. */
export function Enquiry({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) {
  const { objective, requestId } = useEnquiry();
  const [step, setStep] = useState<Step>(1);
  const [data, setData] = useState<EnquiryData>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [outcome, setOutcome] = useState<Outcome>('idle');
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const moved = useRef(false);
  const s = sections.enquiry;
  const Heading = headingLevel;

  // A CTA elsewhere on the page preselected an objective: show step 1 with it chosen.
  useEffect(() => {
    if (!objective || requestId === 0) return;
    setData((d) => ({ ...d, objective }));
    setStep(1);
    setOutcome('idle');
    setErrors({});
  }, [objective, requestId]);

  // Move focus to the new step's heading after Next/Back so keyboard and screen-reader users follow along.
  useEffect(() => {
    if (moved.current) stepHeadingRef.current?.focus();
  }, [step, outcome]);

  const update = <K extends keyof EnquiryData>(key: K, value: EnquiryData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
    if (outcome === 'not-connected' || outcome === 'error') setOutcome('idle');
  };

  const focusFirstError = (errs: FieldErrors) => {
    const first = Object.keys(errs)[0];
    if (!first) return;
    requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    });
  };

  const next = () => {
    const errs = validateStep(step, data);
    setErrors(errs);
    if (Object.keys(errs).length) return focusFirstError(errs);
    moved.current = true;
    setStep((s) => (s < 3 ? ((s + 1) as Step) : s));
  };

  const back = () => {
    moved.current = true;
    setErrors({});
    setOutcome('idle');
    setStep((s) => (s > 1 ? ((s - 1) as Step) : s));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) return next();
    const errs = validateStep(3, data);
    setErrors(errs);
    if (Object.keys(errs).length) return focusFirstError(errs);
    setOutcome('submitting');
    const result = await submitEnquiry(data);
    moved.current = true;
    setOutcome(result);
  };

  const reset = () => {
    moved.current = true;
    setData(empty);
    setStep(1);
    setOutcome('idle');
  };

  const fieldProps = (name: keyof EnquiryData) => ({
    name,
    id: `enq-${name}`,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `enq-${name}-error` : undefined,
  });

  const errorFor = (name: keyof EnquiryData) =>
    errors[name] ? (
      <p className="field__error" id={`enq-${name}-error`}>
        {errors[name]}
      </p>
    ) : null;

  const selectedObjective = objectives.find((o) => o.id === data.objective);
  const progress = outcome === 'sent' ? 100 : Math.round((step / 3) * 100);

  return (
    <section
      id="work-with-apex"
      className="section section--amber enquiry"
      aria-labelledby="enquiry-title"
    >
      <div className="wrap enquiry__grid">
        <div className="enquiry__intro" data-reveal>
          <p className="eyebrow eyebrow--dark">{s.eyebrow}</p>
          <Heading id="enquiry-title">{s.title}</Heading>
          <p className="enquiry__lede">{s.intro}</p>
          <ol className="enquiry__flow">
            {s.steps.map((st) => (
              <li key={st.label}>
                <span className="mono-label">{st.label}</span>
                {st.text}
              </li>
            ))}
          </ol>
        </div>

        <div className="enquiry__panel" ref={panelRef}>
          {outcome === 'sent' ? (
            <div className="enquiry__done">
              <div className="enquiry__bar" aria-hidden="true">
                <i style={{ width: '100%' }} />
              </div>
              <span className="enquiry__check" aria-hidden="true">
                <Check size={28} />
              </span>
              <h3 ref={stepHeadingRef} tabIndex={-1}>
                {enquiryCopy.successTitle}
              </h3>
              <p>{enquiryCopy.successText}</p>
              <div className="enquiry__done-actions">
                <a href="/#capabilities" className="btn btn--ghost btn--block">
                  Explore capabilities
                </a>
                <button type="button" className="btn btn--primary btn--block" onClick={reset}>
                  Start another enquiry
                </button>
              </div>
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit} aria-labelledby="enquiry-step-title">
              <div className="enquiry__meta">
                {step > 1 ? (
                  <button type="button" className="enquiry__back" onClick={back}>
                    <ArrowLeft aria-hidden="true" size={16} /> Back
                  </button>
                ) : (
                  <span className="mono-label">Step 1 of 3 · {stepNames[0]}</span>
                )}
                {step > 1 ? (
                  <span className="mono-label">
                    Step {step} of 3 · {stepNames[step - 1]}
                  </span>
                ) : (
                  <span className="mono-label mono-label--muted">{progress}%</span>
                )}
              </div>
              <div
                className="enquiry__bar"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
                aria-label="Enquiry progress"
              >
                <i style={{ width: `${progress}%` }} />
              </div>

              {step === 1 && (
                <fieldset
                  className="enquiry__step"
                  aria-describedby={errors.objective ? 'enq-objective-error' : undefined}
                >
                  <legend>
                    <h3 id="enquiry-step-title" ref={stepHeadingRef} tabIndex={-1}>
                      What would you like to do?
                    </h3>
                  </legend>
                  <div className="options">
                    {objectives.map((o) => (
                      <label key={o.id} className="option">
                        <input
                          type="radio"
                          name="objective"
                          value={o.id}
                          checked={data.objective === o.id}
                          onChange={() => update('objective', o.id)}
                          aria-invalid={errors.objective ? true : undefined}
                        />
                        <span>{o.label}</span>
                        <i aria-hidden="true" />
                      </label>
                    ))}
                  </div>
                  {errorFor('objective')}
                </fieldset>
              )}

              {step === 2 && (
                <div className="enquiry__step">
                  <h3 id="enquiry-step-title" ref={stepHeadingRef} tabIndex={-1}>
                    {selectedObjective?.step2Title ?? 'Tell us about your project'}
                  </h3>
                  <div className="field">
                    <label htmlFor="enq-technologyArea">Technology area</label>
                    <select
                      {...fieldProps('technologyArea')}
                      value={data.technologyArea}
                      onChange={(e) => update('technologyArea', e.target.value)}
                    >
                      <option value="">Select</option>
                      {technologyAreas.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                    {errorFor('technologyArea')}
                  </div>
                  <div className="field">
                    <label htmlFor="enq-organisationType">Organisation type</label>
                    <select
                      {...fieldProps('organisationType')}
                      value={data.organisationType}
                      onChange={(e) => update('organisationType', e.target.value)}
                    >
                      <option value="">Select</option>
                      {organisationTypes.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                    {errorFor('organisationType')}
                  </div>
                  <div className="field">
                    <label htmlFor="enq-description">What would you like to achieve?</label>
                    <textarea
                      {...fieldProps('description')}
                      rows={4}
                      maxLength={1500}
                      placeholder="For example: a feasibility study on a fermentation-derived protein"
                      value={data.description}
                      onChange={(e) => update('description', e.target.value)}
                    />
                    {errorFor('description')}
                  </div>
                  <div className="field">
                    <label htmlFor="enq-timeline">
                      Timeline <span className="field__optional">(optional)</span>
                    </label>
                    <select
                      {...fieldProps('timeline')}
                      value={data.timeline}
                      onChange={(e) => update('timeline', e.target.value)}
                    >
                      <option value="">Select</option>
                      {timelines.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="enquiry__step">
                  <h3 id="enquiry-step-title" ref={stepHeadingRef} tabIndex={-1}>
                    How can we reach you?
                  </h3>
                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="enq-name">Full name</label>
                      <input
                        {...fieldProps('name')}
                        autoComplete="name"
                        value={data.name}
                        onChange={(e) => update('name', e.target.value)}
                      />
                      {errorFor('name')}
                    </div>
                    <div className="field">
                      <label htmlFor="enq-email">Work email</label>
                      <input
                        {...fieldProps('email')}
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        value={data.email}
                        onChange={(e) => update('email', e.target.value)}
                      />
                      {errorFor('email')}
                    </div>
                  </div>
                  <div className="field-row">
                    <div className="field">
                      <label htmlFor="enq-organisation">Organisation</label>
                      <input
                        {...fieldProps('organisation')}
                        autoComplete="organization"
                        value={data.organisation}
                        onChange={(e) => update('organisation', e.target.value)}
                      />
                      {errorFor('organisation')}
                    </div>
                    <div className="field">
                      <label htmlFor="enq-country">
                        Country <span className="field__optional">(optional)</span>
                      </label>
                      <input
                        {...fieldProps('country')}
                        autoComplete="country-name"
                        value={data.country}
                        onChange={(e) => update('country', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="hp" aria-hidden="true">
                    <label htmlFor="enq-website">Leave this field empty</label>
                    <input
                      id="enq-website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={data.website}
                      onChange={(e) => update('website', e.target.value)}
                    />
                  </div>
                  <div className="field field--check">
                    <input
                      {...fieldProps('consent')}
                      type="checkbox"
                      checked={data.consent}
                      onChange={(e) => update('consent', e.target.checked)}
                    />
                    <label htmlFor="enq-consent">
                      I agree that APEX may use these details to respond to my enquiry.
                    </label>
                    {errorFor('consent')}
                  </div>
                </div>
              )}

              {(outcome === 'not-connected' || outcome === 'error') && (
                <div className="enquiry__notice" role="alert">
                  <strong>
                    {outcome === 'not-connected'
                      ? enquiryCopy.notConnectedTitle
                      : enquiryCopy.errorTitle}
                  </strong>
                  <p>
                    {outcome === 'not-connected'
                      ? enquiryCopy.notConnectedText
                      : enquiryCopy.errorText}
                  </p>
                </div>
              )}

              <div className="enquiry__actions">
                <span className="enquiry__hint">
                  {step === 1 ? enquiryCopy.timeHint : `Step ${step} of 3`}
                </span>
                <button
                  type="submit"
                  className="btn btn--primary"
                  disabled={outcome === 'submitting'}
                >
                  {step < 3 ? 'Continue' : outcome === 'submitting' ? 'Sending…' : 'Send enquiry'}
                  <ArrowRight aria-hidden="true" size={16} />
                </button>
              </div>
              <p className="enquiry__privacy" data-claim="requires-approval">
                {enquiryCopy.privacy}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
