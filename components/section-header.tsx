type SectionHeaderProps = {
  kicker: string;
  title: string;
  text: string;
};

export function SectionHeader({ kicker, title, text }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <span>{kicker}</span>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}
