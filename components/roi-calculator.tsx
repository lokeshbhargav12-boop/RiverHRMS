"use client";

import { useMemo, useState } from "react";

export function RoiCalculator() {
  const [resumes, setResumes] = useState(600);
  const [minutes, setMinutes] = useState(8);
  const [efficiency, setEfficiency] = useState(55);

  const result = useMemo(() => {
    const currentHours = (resumes * minutes) / 60;
    const savedHours = currentHours * (efficiency / 100);
    const remainingHours = currentHours - savedHours;
    return {
      currentHours: Math.round(currentHours),
      savedHours: Math.round(savedHours),
      remainingHours: Math.round(remainingHours)
    };
  }, [resumes, minutes, efficiency]);

  return (
    <div className="roi-card">
      <h3>Screening effort estimator</h3>
      <label>
        Monthly resumes
        <input type="range" min="100" max="5000" step="100" value={resumes} onChange={(event) => setResumes(Number(event.target.value))} />
        <strong>{resumes.toLocaleString()}</strong>
      </label>
      <label>
        Minutes per manual review
        <input type="range" min="3" max="25" step="1" value={minutes} onChange={(event) => setMinutes(Number(event.target.value))} />
        <strong>{minutes} min</strong>
      </label>
      <label>
        AI triage efficiency
        <input type="range" min="25" max="80" step="5" value={efficiency} onChange={(event) => setEfficiency(Number(event.target.value))} />
        <strong>{efficiency}%</strong>
      </label>
      <div className="roi-results">
        <div>
          <span>Current effort</span>
          <strong>{result.currentHours}h</strong>
        </div>
        <div>
          <span>Potential saved</span>
          <strong>{result.savedHours}h</strong>
        </div>
        <div>
          <span>After AI triage</span>
          <strong>{result.remainingHours}h</strong>
        </div>
      </div>
    </div>
  );
}
