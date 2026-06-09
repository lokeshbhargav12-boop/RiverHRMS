import { cookies } from "next/headers";
import { AccessDenied } from "@/components/rbac/app-shell";
import { interviews } from "@/lib/mock-data";
import { can, decodeSession } from "@/lib/rbac";

export default async function InterviewsPage() {
  const user = decodeSession((await cookies()).get("river_session")?.value)!;
  if (!can(user, "generate_interviews")) {
    return <AccessDenied title="Interview generation is restricted" />;
  }

  return (
    <section className="panel page-panel">
      <div className="panel-head">
        <div>
          <span>AI interview generator</span>
          <h2>Question packs and manager scorecards</h2>
        </div>
        <button className="app-button">Generate pack</button>
      </div>
      <div className="interview-grid">
        {interviews.map((item) => (
          <article key={item.pack} className="workflow-card compact">
            <span>{item.status}</span>
            <h3>{item.pack}</h3>
            <p>{item.questions} questions · {item.depth} depth · Owner {item.owner}</p>
            <button>Open scorecard</button>
          </article>
        ))}
      </div>
    </section>
  );
}
