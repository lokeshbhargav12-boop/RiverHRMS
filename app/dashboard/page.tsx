import { cookies } from "next/headers";
import { Bot, BrainCircuit, CheckCircle2, Clock, FileSearch, ShieldCheck, Workflow } from "lucide-react";
import { MetricTile } from "@/components/rbac/app-shell";
import { auditEvents, candidates, invoices, jobs } from "@/lib/mock-data";
import { can, decodeSession, roleLabels } from "@/lib/rbac";

export default async function DashboardPage() {
  const user = decodeSession((await cookies()).get("river_session")?.value)!;

  const metrics = [
    { label: "Open jobs", value: String(jobs.filter((job) => job.status === "Open").length), detail: "active hiring plans" },
    { label: "AI-ranked candidates", value: String(candidates.length), detail: "ready for review" },
    { label: "Avg ATS score", value: "85", detail: "across current shortlist" },
    { label: "Workflow health", value: "92%", detail: "handoffs on time" }
  ];

  return (
    <div className="dashboard-grid">
      <section className="welcome-panel">
        <div>
          <span>{roleLabels[user.role]}</span>
          <h2>Welcome back, {user.name.split(" ")[0]}</h2>
          <p>
            This workspace applies tenant and role rules before showing modules, actions, finance details, candidate data,
            and HRMS operations.
          </p>
        </div>
        <div className="ai-chip">
          <Bot size={22} />
          Google ADK voice workflow ready
        </div>
      </section>

      <section className="metric-grid">
        {metrics.map((metric) => (
          <MetricTile key={metric.label} {...metric} />
        ))}
      </section>

      <section className="panel wide">
        <div className="panel-head">
          <div>
            <span>AI decision layer</span>
            <h3>Resume to shortlist pipeline</h3>
          </div>
          <BrainCircuit size={24} />
        </div>
        <div className="kanban-row">
          {["PDF Intake", "Parse Profile", "ATS Score", "Job Match", "Interview Pack", "Manager Approval"].map((step, index) => (
            <div key={step}>
              <strong>{String(index + 1).padStart(2, "0")}</strong>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <div>
            <span>Role actions</span>
            <h3>Allowed for you</h3>
          </div>
          <ShieldCheck size={24} />
        </div>
        <div className="action-list">
          {[
            ["Upload resume", can(user, "upload_resume")],
            ["Score resume", can(user, "score_resume")],
            ["Generate interview", can(user, "generate_interviews")],
            ["Approve shortlist", can(user, "approve_shortlist")],
            ["Manage billing", can(user, "manage_billing")],
            ["Manage tenant", can(user, "manage_tenant")]
          ].map(([label, allowed]) => (
            <div key={String(label)} className={allowed ? "allowed" : "blocked"}>
              {allowed ? <CheckCircle2 size={18} /> : <Clock size={18} />}
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <div>
            <span>Audit trail</span>
            <h3>Recent tenant events</h3>
          </div>
          <Workflow size={24} />
        </div>
        <div className="audit-list">
          {auditEvents.map((event) => (
            <p key={event}>{event}</p>
          ))}
        </div>
      </section>

      {can(user, "view_billing") && (
        <section className="panel wide">
          <div className="panel-head">
            <div>
              <span>Finance visibility</span>
              <h3>Subscription status</h3>
            </div>
            <FileSearch size={24} />
          </div>
          <div className="data-table">
            {invoices.map((invoice) => (
              <div key={invoice.id}>
                <strong>{invoice.id}</strong>
                <span>{invoice.plan}</span>
                <span>{invoice.amount}</span>
                <span>{invoice.status}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
