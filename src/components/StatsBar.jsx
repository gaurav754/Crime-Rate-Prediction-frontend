import { Link } from "react-router-dom";

export default function StatsBar({ stats }) {
  return (
    <div className="stats">
      <div className="stat">
        <span>Total reports</span>
        <strong>{stats.totalReports}</strong>
      </div>
      <div className="stat">
        <span>Active alerts</span>
        <strong>{stats.activeAlerts}</strong>
      </div>
      <div className="stat">
        <span>Members</span>
        <strong>{stats.communityMembers}</strong>
      </div>
      <div className="stat">
        <span>Predictions</span>
        <strong>{stats.predictionsMade}</strong>
      </div>
    </div>
  );
}
