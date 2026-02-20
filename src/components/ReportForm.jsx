// src/components/ReportForm.jsx
import { useState } from 'react';

export default function ReportForm({ onSubmit }) {
  const [form, setForm] = useState({ type: 'Theft', location: '', description: '', severity: 'Low' });

  const submit = (e) => {
    e.preventDefault();
    if (!form.location || !form.description) return;
    onSubmit({ ...form, reportedBy: 'Community Member', timestamp: new Date().toISOString() });
    setForm({ type: 'Theft', location: '', description: '', severity: 'Low' });
  };

  return (
    <form className="card" onSubmit={submit}>
      <h3>Report an Incident</h3>
      <div className="row"><label>Type</label>
        <select value={form.type} onChange={(e)=>setForm({...form,type:e.target.value})}>
          {['Theft','Burglary','Assault','Fraud','Vandalism','Drug Offense','Vehicle Theft','Domestic Violence'].map(t=><option key={t}>{t}</option>)}
        </select>
      </div>
      <div className="row"><label>Location</label>
        <input value={form.location} onChange={(e)=>setForm({...form,location:e.target.value})} placeholder="Area, City"/>
      </div>
      <div className="row"><label>Description</label>
        <textarea value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} rows={3}/>
      </div>
      <div className="row"><label>Severity</label>
        <select value={form.severity} onChange={(e)=>setForm({...form,severity:e.target.value})}>
          {['Low','Medium','High','Critical'].map(s=><option key={s}>{s}</option>)}
        </select>
      </div>
      <button type="submit">Submit Report</button>
    </form>
  );
}
