import prisma from "@/lib/prisma";
import { comparePassword, generateToken } from "@/lib/auth";
import { encodeSession, demoUsers } from "@/lib/rbac";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Support login by userId (demo) or email/password
    if (body.userId) {
      // Demo login: find the user in the static demoUsers array instead of the DB.
      const demoUser = demoUsers.find((u) => u.id === body.userId);
      if (!demoUser) {
        // Fallback to DB lookup for any real users that might exist.
        const dbUser = await prisma.user.findUnique({
          where: { id: body.userId },
        });
        if (!dbUser) {
          return Response.json({ error: "User not found" }, { status: 404 });
        }
        const token = generateToken(dbUser);
        const sessionCookie = encodeSession(dbUser);
        return Response.json({ token, user: { id: dbUser.id, email: dbUser.email, role: dbUser.role } }, { status: 200, headers: { 'Set-Cookie': `river_session=${sessionCookie}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400` } });
      }
      const token = generateToken(demoUser);
      const sessionCookie = encodeSession(demoUser);
      return Response.json({ token, user: { id: demoUser.id, email: demoUser.email, role: demoUser.role } }, { status: 200, headers: { 'Set-Cookie': `river_session=${sessionCookie}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400` } });
    }

    const { email, password } = body;
    if (!email || !password) {
      return Response.json({ error: "Missing email or password" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) {
      return Response.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = generateToken(user);
    const sessionCookie = encodeSession(user);
    return Response.json({ token, user: { id: user.id, email: user.email, role: user.role } }, { status: 200, headers: { 'Set-Cookie': `river_session=${sessionCookie}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400` } });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
