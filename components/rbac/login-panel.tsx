"use client";

import { ArrowRight, BriefcaseBusiness, Building2, CircleDollarSign, Loader2, Sparkles, UserCheck, UsersRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Role } from "@/lib/rbac-client";

type LoginUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  tenantName: string;
  title: string;
};

const roleIcons = {
  client_admin: Building2,
  recruiter: UsersRound,
  hiring_manager: BriefcaseBusiness,
  finance: CircleDollarSign,
  candidate: Sparkles
};

const roleNames = {
  client_admin: "Client Admin",
  recruiter: "Recruiter",
  hiring_manager: "Hiring Manager",
  finance: "Finance",
  candidate: "Candidate"
};

export function LoginPanel({ users }: { users: LoginUser[] }) {
  const router = useRouter();
  const [selected, setSelected] = useState(users[0]?.id ?? "");
  const [loading, setLoading] = useState(false);
  const activeUser = users.find((user) => user.id === selected) ?? users[0];

  async function login() {
    setLoading(true);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: selected })
    });
    const data = (await response.json()) as { redirectTo?: string };
    router.push(data.redirectTo ?? "/dashboard");
    router.refresh();
  }

  return (
    <section className="login-card">
      <div className="login-card-head">
        <UserCheck size={24} />
        <div>
          <h2>Choose a demo role</h2>
          <p>Each role enters the same tenant with different permissions, menus, and workflow actions.</p>
        </div>
      </div>
      <div className="role-picker">
        {users.map((user) => {
          const Icon = roleIcons[user.role];
          const active = selected === user.id;
          return (
            <button key={user.id} className={active ? "active" : ""} type="button" onClick={() => setSelected(user.id)}>
              <Icon size={22} />
              <span>{roleNames[user.role]}</span>
              <small>{user.title}</small>
            </button>
          );
        })}
      </div>
      <div className="selected-user">
        <span>Signing in as</span>
        <strong>{activeUser.name}</strong>
        <small>{activeUser.email}</small>
      </div>
      <button className="login-submit" type="button" onClick={login} disabled={loading}>
        {loading ? <Loader2 className="spin" size={18} /> : <ArrowRight size={18} />}
        Enter RBAC workspace
      </button>
    </section>
  );
}
