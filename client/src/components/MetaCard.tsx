type MetaCardProps = {
  label: string;
  value: string;
};

export default function MetaCard({ label, value }: MetaCardProps) {
  return (
    <div className="meta-card">
      <div className="meta-label">{label}</div>
      <div className="meta-val">{value}</div>
    </div>
  );
}
