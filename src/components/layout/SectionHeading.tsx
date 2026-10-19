type Props = {
  id?: string;
  eyebrow: string;
  title: string;
  intro?: string;
  as?: 'h1' | 'h2';
};

export function SectionHeading({ id, eyebrow, title, intro, as: Tag = 'h2' }: Props) {
  return (
    <header className="section-heading" data-reveal>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <Tag id={id}>{title}</Tag>
      </div>
      {intro && <p className="section-heading__intro">{intro}</p>}
    </header>
  );
}
