// src/components/ReportsList.jsx
export default function ReportsList({ reports }) {
  return (
    <div className="card">
      <h3>Recent Reports</h3>
      <ul className="list">
        {reports.map(r => (
          <li key={r.id}>
            <div className="list-row">
              <strong>{r.type}</strong>
              <span>{r.severity}</span>
            </div>
            <div className="muted">{r.location} • {new Date(r.timestamp).toLocaleString()}</div>
            <p>{r.description}</p>
            <div className="muted">By {r.reportedBy}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
