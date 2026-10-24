export function NotFound() {
  return (
    <section className="section section--dark page-offset not-found" aria-labelledby="nf-title">
      <div className="wrap">
        <p className="eyebrow">Page not found</p>
        <h1 id="nf-title">This page does not exist.</h1>
        <p>
          <a href="/" className="btn btn--primary">
            Back to the APEX homepage
          </a>
        </p>
      </div>
    </section>
  );
}
