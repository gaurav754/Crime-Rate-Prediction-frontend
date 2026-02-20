// src/components/charts/TrendsChart.jsx
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function TrendsChart({ data }) {
  const labels = data.map(d => d.month);
  const values = data.map(d => d.crimes);
  return (
    <div className="card">
      <h3>Historical Trends</h3>
      <Bar
        data={{
          labels,
          datasets: [{ label: 'Crimes', data: values, backgroundColor: 'rgba(59,130,246,0.5)' }]
        }}
        options={{ responsive: true, plugins: { legend: { display: false } } }}
      />
    </div>
  );
}
