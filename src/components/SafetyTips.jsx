// src/components/SafetyTips.jsx
export default function SafetyTips({ tips }) {
  return (
    <div className="card">
      <h3>Safety Tips</h3>
      <ul className="bulleted">
        {tips.map((t, i) => <li key={i}>{t}</li>)}
      </ul>
    </div>
  );
}
