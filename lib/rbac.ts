import "server-only";

export type Role = "client_admin" | "recruiter" | "hiring_manager" | "finance" | "candidate";

export type Permission =
  | "view_dashboard"
  | "manage_tenant"
  | "manage_users"
  | "manage_jobs"
  | "view_jobs"
  | "manage_candidates"
  | "upload_resume"
  | "score_resume"
  | "generate_interviews"
  | "approve_shortlist"
  | "view_billing"
  | "manage_billing"
  | "view_hrms"
  | "manage_hrms";

export type DemoUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  tenantId: string;
  tenantName: string;
  title: string;
};

export const roleLabels: Record<Role, string> = {
  client_admin: "Client Admin",
  recruiter: "Recruiter",
  hiring_manager: "Hiring Manager",
  finance: "Finance",
  candidate: "Candidate"
};

export const demoUsers: DemoUser[] = [
  {
    id: "u-admin",
    name: "Ananya Menon",
    email: "admin@river.demo",
    role: "client_admin",
    tenantId: "neyvin",
    tenantName: "Neyvin Technologies",
    title: "Client Operations Admin"
  },
  {
    id: "u-rec",
    name: "Rohit Sharma",
    email: "recruiter@river.demo",
    role: "recruiter",
    tenantId: "neyvin",
    tenantName: "Neyvin Technologies",
    title: "Senior Recruiter"
  },
  {
    id: "u-manager",
    name: "Meera Iyer",
    email: "manager@river.demo",
    role: "hiring_manager",
    tenantId: "neyvin",
    tenantName: "Neyvin Technologies",
    title: "Engineering Hiring Manager"
  },
  {
    id: "u-finance",
    name: "Vikram Rao",
    email: "finance@river.demo",
    role: "finance",
    tenantId: "neyvin",
    tenantName: "Neyvin Technologies",
    title: "Finance Controller"
  },
  {
    id: "u-candidate",
    name: "Priya Nair",
    email: "candidate@river.demo",
    role: "candidate",
    tenantId: "neyvin",
    tenantName: "Neyvin Technologies",
    title: "Candidate"
  }
];

export const rolePermissions: Record<Role, Permission[]> = {
  client_admin: [
    "view_dashboard",
    "manage_tenant",
    "manage_users",
    "manage_jobs",
    "view_jobs",
    "manage_candidates",
    "upload_resume",
    "score_resume",
    "generate_interviews",
    "approve_shortlist",
    "view_billing",
    "manage_billing",
    "view_hrms",
    "manage_hrms"
  ],
  recruiter: [
    "view_dashboard",
    "manage_jobs",
    "view_jobs",
    "manage_candidates",
    "upload_resume",
    "score_resume",
    "generate_interviews",
    "view_hrms"
  ],
  hiring_manager: ["view_dashboard", "view_jobs", "score_resume", "generate_interviews", "approve_shortlist", "view_hrms"],
  finance: ["view_dashboard", "view_billing", "manage_billing"],
  candidate: ["view_dashboard", "view_jobs", "upload_resume", "score_resume", "generate_interviews"]
};

export const permissionLabels: Record<Permission, string> = {
  view_dashboard: "View dashboard",
  manage_tenant: "Manage tenant",
  manage_users: "Manage users",
  manage_jobs: "Manage jobs",
  view_jobs: "View jobs",
  manage_candidates: "Manage candidates",
  upload_resume: "Upload resume",
  score_resume: "Score resume",
  generate_interviews: "Generate interviews",
  approve_shortlist: "Approve shortlist",
  view_billing: "View billing",
  manage_billing: "Manage billing",
  view_hrms: "View HRMS",
  manage_hrms: "Manage HRMS"
};

export function can(user: DemoUser, permission: Permission) {
  return rolePermissions[user.role].includes(permission);
}

export function encodeSession(user: DemoUser) {
  return Buffer.from(JSON.stringify({ id: user.id }), "utf8").toString("base64url");
}

export function decodeSession(value?: string) {
  if (!value) return null;
  try {
    const parsed = JSON.parse(Buffer.from(value, "base64url").toString("utf8")) as { id?: string };
    return demoUsers.find((user) => user.id === parsed.id) ?? null;
  } catch {
    return null;
  }
}
