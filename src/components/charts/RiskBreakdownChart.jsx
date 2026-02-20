// src/components/charts/RiskBreakdownChart.jsx
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function RiskBreakdownChart({ probability }) {
  const low = Math.max(0, 100 - probability - 10);
  const medium = Math.max(0, 110 - low - probability);
  return (
    <div className="card">
      <h3>Risk Breakdown</h3>
      <Doughnut
        data={{
          labels: ['Low', 'Medium', 'High'],
          datasets: [{ data: [low, medium, probability], backgroundColor: ['#10b981', '#f59e0b', '#ef4444'] }]
        }}
        options={{ plugins: { legend: { position: 'bottom' } } }}
      />
    </div>
  );
}
