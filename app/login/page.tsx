import Image from "next/image";
import { LoginPanel } from "@/components/rbac/login-panel";
import { demoUsers } from "@/lib/rbac";

export default function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-hero">
        <div className="login-brand">
          <Image src="/logo_HR.png" alt="Neyvin Technologies" width={160} height={132} priority />
          <div>
            <span>Neyvin Technologies</span>
            <h1>RIVER HRMS</h1>
            <p>Multi-tenant AI hiring and HRMS platform with practical role-based access control.</p>
          </div>
        </div>
        <div className="login-capabilities">
          <span>AI resume analysis</span>
          <span>ATS scoring</span>
          <span>Job matching</span>
          <span>Interview packs</span>
          <span>Razorpay billing</span>
          <span>Google ADK voice workflows</span>
        </div>
      </section>
      <LoginPanel users={demoUsers} />
    </main>
  );
}
