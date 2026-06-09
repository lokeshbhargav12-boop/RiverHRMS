import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const tenantId = searchParams.get("tenantId");

    if (!tenantId) {
      return Response.json({ error: "tenantId is required" }, { status: 400 });
    }

    const candidates = await prisma.candidate.findMany({
      where: { tenantId },
      orderBy: { createdAt: "desc" },
    });

    return Response.json(candidates);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, experience, education, summary, tenantId } = body;

    if (!name || !email || !tenantId) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const candidate = await prisma.candidate.create({
      data: {
        name,
        email,
        experience: experience || 0,
        education,
        summary,
        skills: body.skills || "",
        tenant: { connect: { id: tenantId } },
        stage: "APPLIED",
      },
    });

    return Response.json(candidate, { status: 201 });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}