import { cookies } from "next/headers";
import { AccessDenied } from "@/components/rbac/app-shell";
import { hrmsTiles } from "@/lib/mock-data";
import { can, decodeSession } from "@/lib/rbac";

export default async function HrmsPage() {
  const user = decodeSession((await cookies()).get("river_session")?.value)!;
  if (!can(user, "view_hrms")) {
    return <AccessDenied title="HRMS operations are not enabled for this role" />;
  }

  return (
    <section className="panel page-panel">
      <div className="panel-head">
        <div>
          <span>AI assistive HRMS</span>
          <h2>Joining to full and final settlement</h2>
        </div>
        {can(user, "manage_hrms") && <button className="app-button">Configure policies</button>}
      </div>
      <div className="metric-grid">
        {hrmsTiles.map((tile) => (
          <article className="metric-tile" key={tile.label}>
            <span>{tile.label}</span>
            <strong>{tile.value}</strong>
            <small>{tile.detail}</small>
          </article>
        ))}
      </div>
      <div className="workflow-grid">
        {["Offer acceptance", "Document collection", "Attendance exception", "Payroll review", "Performance check-in", "Exit clearance"].map((item) => (
          <article className="workflow-card compact" key={item}>
            <span>Workflow</span>
            <h3>{item}</h3>
            <p>Role-based routing, AI nudges, and human approval checkpoints.</p>
          </article>
        ))}
      </div>
    </section>
  );
}
