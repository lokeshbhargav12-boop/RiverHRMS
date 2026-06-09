import { cookies } from "next/headers";
import { AccessDenied } from "@/components/rbac/app-shell";
import { jobs } from "@/lib/mock-data";
import { can, decodeSession } from "@/lib/rbac";

export default async function JobsPage() {
  const user = decodeSession((await cookies()).get("river_session")?.value)!;
  if (!can(user, "view_jobs")) {
    return <AccessDenied title="Jobs are not visible to this role" />;
  }

  return (
    <section className="panel page-panel">
      <div className="panel-head">
        <div>
          <span>Job matcher</span>
          <h2>Open roles and fit signals</h2>
        </div>
        {can(user, "manage_jobs") && <button className="app-button">Create job</button>}
      </div>
      <div className="data-table job-table">
        {jobs.map((job) => (
          <div key={job.id}>
            <strong>{job.title}</strong>
            <span>{job.department}</span>
            <span>{job.applicants} applicants</span>
            <span>{job.fit}% fit</span>
            <span className={`status ${job.status.toLowerCase()}`}>{job.status}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
