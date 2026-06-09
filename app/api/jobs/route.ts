import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const tenantId = searchParams.get("tenantId");

    if (!tenantId) {
      return Response.json({ error: "tenantId is required" }, { status: 400 });
    }

    const jobs = await prisma.job.findMany({
      where: { tenantId },
      orderBy: { createdAt: "desc" },
    });

    return Response.json(jobs);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, department, status, tenantId } = body;

    if (!title || !description || !department || !tenantId) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const job = await prisma.job.create({
      data: {
        title,
        description,
        department,
        status: status || "OPEN",
        tenantId,
      },
    });

    return Response.json(job, { status: 201 });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}