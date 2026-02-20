// src/components/FeatureCard.jsx
export default function FeatureCard({ icon, title, desc }) {
  return (
    <div className="feature-card">
      {icon && <div className="feature-icon">{icon}</div>}
      <h3 className="feature-title">{title}</h3>
      <p className="feature-desc">{desc}</p>
    </div>
  );
}
