import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const tenantId = searchParams.get("tenantId");

    if (!tenantId) {
      return Response.json({ error: "tenantId is required" }, { status: 400 });
    }

    // In a real implementation, these would be filtered by users belonging to the tenantId
    const hrmsData = {
      attendance: await prisma.attendance.findMany(),
      payroll: await prisma.payroll.findMany(),
      performance: await prisma.performance.findMany(),
    };

    return Response.json(hrmsData);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, userId, data, tenantId } = body;

    if (!type || !userId || !data || !tenantId) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    let result;
    if (type === "ATTENDANCE") {
      result = await prisma.attendance.create({ 
        data: { userId, date: new Date(), status: data.status } 
      });
    } else if (type === "PAYROLL") {
      result = await prisma.payroll.create({ 
        data: { userId, month: data.month, amount: data.amount, status: data.status } 
      });
    } else if (type === "PERFORMANCE") {
      result = await prisma.performance.create({ 
        data: { userId, cycle: data.cycle, score: data.score, review: data.review } 
      });
    } else {
      return Response.json({ error: "Invalid HRMS type" }, { status: 400 });
    }

    return Response.json(result, { status: 201 });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}