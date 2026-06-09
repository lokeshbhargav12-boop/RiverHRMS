import prisma from "@/lib/prisma";
import { comparePassword, generateToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Support login by userId (demo) or email/password
    if (body.userId) {
      const user = await prisma.user.findUnique({
        where: { id: body.userId },
      });
      if (!user) {
        return Response.json({ error: "User not found" }, { status: 404 });
      }
      const token = generateToken(user);
      return Response.json({ token, user: { id: user.id, email: user.email, role: user.role } }, { status: 200, headers: { 'Set-Cookie': `river_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400` } });
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
    return Response.json({ token, user: { id: user.id, email: user.email, role: user.role } }, { status: 200, headers: { 'Set-Cookie': `river_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400` } });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
