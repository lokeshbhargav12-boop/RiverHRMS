import {
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CalendarCheck,
  CreditCard,
  FileSearch,
  LayoutDashboard,
  LogOut,
  Settings,
  UserRound,
  UsersRound
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { can, permissionLabels, roleLabels, rolePermissions, type DemoUser } from "@/lib/rbac";

const allNav = [
  { href: "/dashboard", label: "Command Center", icon: LayoutDashboard, permission: "view_dashboard" as const },
  { href: "/dashboard/candidates", label: "Candidates", icon: FileSearch, permission: "manage_candidates" as const },
  { href: "/dashboard/jobs", label: "Jobs", icon: BriefcaseBusiness, permission: "view_jobs" as const },
  { href: "/dashboard/interviews", label: "Interviews", icon: CalendarCheck, permission: "generate_interviews" as const },
  { href: "/dashboard/hrms", label: "HRMS Ops", icon: UsersRound, permission: "view_hrms" as const },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard, permission: "view_billing" as const },
  { href: "/dashboard/admin", label: "Tenant Admin", icon: Settings, permission: "manage_tenant" as const }
];

export function AppShell({ user, children }: { user: DemoUser; children: React.ReactNode }) {
  const nav = allNav.filter((item) => can(user, item.permission));
  const permissions = rolePermissions[user.role];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link className="sidebar-brand" href="/dashboard">
          <Image src="/logo_HR.png" alt="Neyvin Technologies" width={68} height={56} />
          <div>
            <strong>RIVER HRMS</strong>
            <span>{user.tenantName}</span>
          </div>
        </Link>
        <nav className="app-nav" aria-label="Workspace navigation">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <Link href={item.href} key={item.href}>
                <Icon size={19} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="permission-card">
          <span>Active role</span>
          <strong>{roleLabels[user.role]}</strong>
          <div>
            {permissions.slice(0, 7).map((permission) => (
              <small key={permission}>{permissionLabels[permission]}</small>
            ))}
          </div>
        </div>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <div>
            <span>Multi-tenant workspace</span>
            <h1>{roleLabels[user.role]} Dashboard</h1>
          </div>
          <div className="topbar-actions">
            <div className="user-pill">
              {user.role === "client_admin" ? <Building2 size={18} /> : <UserRound size={18} />}
              <div>
                <strong>{user.name}</strong>
                <span>{user.title}</span>
              </div>
            </div>
            <form action="/api/auth/logout" method="post">
              <button className="logout-button" type="submit" aria-label="Logout">
                <LogOut size={18} />
              </button>
            </form>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}

export function MetricTile({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <article className="metric-tile">
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </article>
  );
}

export function AccessDenied({ title }: { title: string }) {
  return (
    <section className="access-denied">
      <BarChart3 size={30} />
      <h2>{title}</h2>
      <p>Your current role does not include permission for this module. Switch demo roles from the login screen to inspect access differences.</p>
    </section>
  );
}
