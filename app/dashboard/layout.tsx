import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/rbac/app-shell";
import { decodeSession } from "@/lib/rbac";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const user = decodeSession(cookieStore.get("river_session")?.value);

  if (!user) {
    redirect("/login");
  }

  return <AppShell user={user}>{children}</AppShell>;
}
