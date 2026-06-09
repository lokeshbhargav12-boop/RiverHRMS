import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const tenantId = searchParams.get("tenantId");

    if (!tenantId) {
      return Response.json({ error: "tenantId is required" }, { status: 400 });
    }

    const subscriptions = await prisma.subscription.findMany({
      where: { tenantId },
    });

    return Response.json(subscriptions);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { tenantId, plan, seats, startDate, endDate } = body;

    if (!tenantId || !plan || !seats || !startDate || !endDate) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const subscription = await prisma.subscription.create({
      data: {
        tenantId,
        plan,
        seats,
        status: "ACTIVE",
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    return Response.json(subscription, { status: 201 });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}