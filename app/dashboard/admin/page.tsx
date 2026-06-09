import { cookies } from "next/headers";
import { AccessDenied } from "@/components/rbac/app-shell";
import { can, decodeSession, demoUsers, permissionLabels, roleLabels, rolePermissions } from "@/lib/rbac";

export default async function AdminPage() {
  const user = decodeSession((await cookies()).get("river_session")?.value)!;
  if (!can(user, "manage_tenant")) {
    return <AccessDenied title="Tenant administration is restricted" />;
  }

  return (
    <section className="panel page-panel">
      <div className="panel-head">
        <div>
          <span>Tenant control plane</span>
          <h2>Users, roles, permissions, and policies</h2>
        </div>
        <button className="app-button">Invite user</button>
      </div>
      <div className="admin-grid">
        {demoUsers.map((tenantUser) => (
          <article className="admin-user" key={tenantUser.id}>
            <strong>{tenantUser.name}</strong>
            <span>{tenantUser.email}</span>
            <small>{roleLabels[tenantUser.role]}</small>
          </article>
        ))}
      </div>
      <div className="permission-matrix">
        {Object.entries(rolePermissions).map(([role, permissions]) => (
          <article key={role}>
            <h3>{roleLabels[role as keyof typeof roleLabels]}</h3>
            <div>
              {permissions.map((permission) => (
                <span key={permission}>{permissionLabels[permission]}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
