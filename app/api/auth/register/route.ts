import prisma from "@/lib/prisma";
import { hashPassword, generateToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name, role, tenantId } = body;

    if (!email || !password) {
      return Response.json({ error: "Missing email or password" }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
        tenantId,
      },
    });

    const token = generateToken(user);

    return Response.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}