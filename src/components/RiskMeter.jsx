// src/components/RiskMeter.jsx
export default function RiskMeter({ probability, level }) {
  const color = level === 'High' ? '#dc2626' : level === 'Medium' ? '#f59e0b' : '#10b981';
  return (
    <div className="card">
      <h3>Risk Result</h3>
      <div className="risk-meter">
        <div className="risk-bar" style={{ width: `${probability}%`, background: color }} />
      </div>
      <p>Level: <strong style={{ color }}>{level}</strong> • Probability: <strong>{probability}%</strong></p>
    </div>
  );
}
