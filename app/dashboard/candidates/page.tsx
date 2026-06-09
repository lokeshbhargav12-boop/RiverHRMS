import { cookies } from "next/headers";
import { AccessDenied } from "@/components/rbac/app-shell";
import { candidates } from "@/lib/mock-data";
import { can, decodeSession } from "@/lib/rbac";

export default async function CandidatesPage() {
  const user = decodeSession((await cookies()).get("river_session")?.value)!;
  if (!can(user, "manage_candidates") && user.role !== "candidate") {
    return <AccessDenied title="Candidate workspace is restricted" />;
  }

  return (
    <section className="panel page-panel">
      <div className="panel-head">
        <div>
          <span>Resume intelligence</span>
          <h2>{user.role === "candidate" ? "My application fit" : "Candidate pipeline"}</h2>
        </div>
        {can(user, "upload_resume") && <button className="app-button">Upload PDF resume</button>}
      </div>
      <div className="candidate-grid">
        {candidates.map((candidate) => (
          <article key={candidate.name} className="candidate-card">
            <div>
              <strong>{user.role === "candidate" ? "Your active profile" : candidate.name}</strong>
              <span>{candidate.role}</span>
            </div>
            <div className="score-row">
              <span>ATS {candidate.ats}</span>
              <span>Match {candidate.match}%</span>
              <span>Risk {candidate.risk}</span>
            </div>
            <p>{candidate.stage}</p>
            <div className="card-actions">
              {can(user, "score_resume") && <button>Run ATS score</button>}
              {can(user, "generate_interviews") && <button>Generate interview</button>}
              {can(user, "approve_shortlist") && <button>Approve shortlist</button>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
