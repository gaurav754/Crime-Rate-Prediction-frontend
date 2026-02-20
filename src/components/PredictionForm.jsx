// src/components/PredictionForm.jsx
import { useState } from 'react';

export default function PredictionForm({ cities, crimeTypes, onPredict }) {
  const [form, setForm] = useState({ city: cities, date: '', type: crimeTypes, timeOfDay: 'Evening' });

  const submit = (e) => {
    e.preventDefault();
    onPredict(form);
  };

  return (
    <form className="card" onSubmit={submit}>
      <div className="row">
        <label>City</label>
        <select value={form.city} onChange={(e)=>setForm({...form, city: e.target.value})}>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="row">
        <label>Date</label>
        <input type="date" value={form.date} onChange={(e)=>setForm({...form, date: e.target.value})}/>
      </div>
      <div className="row">
        <label>Crime type</label>
        <select value={form.type} onChange={(e)=>setForm({...form, type: e.target.value})}>
          {crimeTypes.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div className="row">
        <label>Time of day</label>
        <select value={form.timeOfDay} onChange={(e)=>setForm({...form, timeOfDay: e.target.value})}>
          <option>Morning</option><option>Afternoon</option><option>Evening</option><option>Night</option>
        </select>
      </div>
      <button type="submit">Predict Crime Risk</button>
    </form>
  );
}
