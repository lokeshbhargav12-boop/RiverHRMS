import { cookies } from "next/headers";
import { AccessDenied } from "@/components/rbac/app-shell";
import { invoices } from "@/lib/mock-data";
import { can, decodeSession } from "@/lib/rbac";

export default async function BillingPage() {
  const user = decodeSession((await cookies()).get("river_session")?.value)!;
  if (!can(user, "view_billing")) {
    return <AccessDenied title="Billing is restricted to admin and finance roles" />;
  }

  return (
    <section className="panel page-panel">
      <div className="panel-head">
        <div>
          <span>Razorpay subscriptions</span>
          <h2>Plans, seats, invoices, and payment recovery</h2>
        </div>
        {can(user, "manage_billing") && <button className="app-button">Update plan</button>}
      </div>
      <div className="billing-summary">
        <div><span>Current plan</span><strong>Growth</strong></div>
        <div><span>Seats</span><strong>35</strong></div>
        <div><span>Automation packs</span><strong>3</strong></div>
        <div><span>Voice agents</span><strong>1</strong></div>
      </div>
      <div className="data-table">
        {invoices.map((invoice) => (
          <div key={invoice.id}>
            <strong>{invoice.id}</strong>
            <span>{invoice.plan}</span>
            <span>{invoice.amount}</span>
            <span>{invoice.seats} seats</span>
            <span className={`status ${invoice.status.toLowerCase()}`}>{invoice.status}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
