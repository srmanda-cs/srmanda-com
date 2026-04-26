import GhostNumber from "./GhostNumber";

export default function SectionHeader({
  number,
  label,
  tag,
}: {
  number: string;
  label: string;
  tag?: string;
}) {
  return (
    <div className="section-header-wrap">
      <GhostNumber number={number} />
      <div className="section-header">
        <span className="section-header-num mono">{number}</span>
        <span className="section-header-label mono">{label}</span>
        <span className="section-header-line" />
        {tag && <span className="section-header-tag mono">{tag}</span>}
      </div>
    </div>
  );
}
