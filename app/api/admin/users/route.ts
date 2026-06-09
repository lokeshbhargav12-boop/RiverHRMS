import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const tenantId = searchParams.get("tenantId");

    if (!tenantId) {
      return Response.json({ error: "tenantId is required" }, { status: 400 });
    }

    const users = await prisma.user.findMany({
      where: { tenantId },
    });

    return Response.json(users);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name, role, tenantId } = body;

    if (!email || !password || !name || !role || !tenantId) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: {
        email,
        password: "TemporaryPassword123!", 
        name,
        role,
        tenantId,
      },
    });

    return Response.json(user, { status: 201 });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}