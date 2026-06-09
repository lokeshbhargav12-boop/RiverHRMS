import { PrismaClient } from "@prisma/client";
import { hashPassword } from "@/lib/auth";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.interviewPack.deleteMany().catch(() => {});
  await prisma.resume.deleteMany().catch(() => {});
  await prisma.candidate.deleteMany().catch(() => {});
  await prisma.job.deleteMany().catch(() => {});
  await prisma.subscription.deleteMany().catch(() => {});
  await prisma.invoice.deleteMany().catch(() => {});
  await prisma.user.deleteMany().catch(() => {});
  await prisma.tenant.deleteMany().catch(() => {});

  // Create demo tenant
  const tenant = await prisma.tenant.create({
    data: {
      name: "Neyvin Technologies",
      slug: "neyvin",
    },
  });

  console.log(`Created tenant: ${tenant.id}`);

  // Create demo users with hashed passwords
  const adminUser = await prisma.user.create({
    data: {
      email: "admin@river.demo",
      password: await hashPassword("demo123"),
      name: "Ananya Menon",
      role: "client_admin",
      tenantId: tenant.id,
    },
  });

  const recruiterUser = await prisma.user.create({
    data: {
      email: "recruiter@river.demo",
      password: await hashPassword("demo123"),
      name: "Rohit Sharma",
      role: "recruiter",
      tenantId: tenant.id,
    },
  });

  const managerUser = await prisma.user.create({
    data: {
      email: "manager@river.demo",
      password: await hashPassword("demo123"),
      name: "Meera Iyer",
      role: "hiring_manager",
      tenantId: tenant.id,
    },
  });

  const financeUser = await prisma.user.create({
    data: {
      email: "finance@river.demo",
      password: await hashPassword("demo123"),
      name: "Vikram Rao",
      role: "finance",
      tenantId: tenant.id,
    },
  });

  const candidateUser = await prisma.user.create({
    data: {
      email: "candidate@river.demo",
      password: await hashPassword("demo123"),
      name: "Priya Nair",
      role: "candidate",
      tenantId: tenant.id,
    },
  });

  console.log("Created 5 demo users");

  // Create demo jobs
  const job1 = await prisma.job.create({
    data: {
      title: "Senior React Engineer",
      description: "Looking for an experienced React developer with Next.js experience",
      department: "Engineering",
      status: "OPEN",
      applicants: 84,
      fit: 91,
      tenantId: tenant.id,
    },
  });

  const job2 = await prisma.job.create({
    data: {
      title: "Payroll Operations Lead",
      description: "Lead payroll operations and statutory compliance",
      department: "Finance",
      status: "OPEN",
      applicants: 32,
      fit: 76,
      tenantId: tenant.id,
    },
  });

  const job3 = await prisma.job.create({
    data: {
      title: "Talent Acquisition Partner",
      description: "Full-cycle recruiter for technical roles",
      department: "People",
      status: "Approval",
      applicants: 48,
      fit: 83,
      tenantId: tenant.id,
    },
  });

  const job4 = await prisma.job.create({
    data: {
      title: "HRMS Implementation Consultant",
      description: "Consultant for HRMS platform deployment",
      department: "Delivery",
      status: "Draft",
      applicants: 19,
      fit: 88,
      tenantId: tenant.id,
    },
  });

  console.log("Created 4 demo jobs");

  // Create demo candidates
  const candidate1 = await prisma.candidate.create({
    data: {
      name: "Aarav Patel",
      email: "aarav@example.com",
      experience: 5,
      education: "B.Tech Computer Science",
      summary: "Full-stack developer with React expertise",
      skills: "React,Next.js,TypeScript",
      fit: 91,
      stage: "Manager review",
      tenantId: tenant.id,
      jobs: { connect: [{ id: job1.id }] },
    },
  });

  const candidate2 = await prisma.candidate.create({
    data: {
      name: "Sara Khan",
      email: "sara@example.com",
      experience: 3,
      education: "MBA HR",
      summary: "HR operations specialist with tech industry experience",
      skills: "HRMS,Onboarding,Compliance",
      fit: 89,
      stage: "Interview pack ready",
      tenantId: tenant.id,
      jobs: { connect: [{ id: job4.id }] },
    },
  });

  const candidate3 = await prisma.candidate.create({
    data: {
      name: "Dev Malhotra",
      email: "dev@example.com",
      experience: 7,
      education: "CA",
      summary: "Payroll expert with statutory compliance knowledge",
      skills: "Payroll,Compliance,Finance",
      fit: 75,
      stage: "Recruiter screen",
      tenantId: tenant.id,
      jobs: { connect: [{ id: job2.id }] },
    },
  });

  const candidate4 = await prisma.candidate.create({
    data: {
      name: "Neha Thomas",
      email: "neha@example.com",
      experience: 4,
      education: "B.Tech, MBA",
      summary: "Technical recruiter with engineering background",
      skills: "Sourcing,Technical Recruiting,ATS",
      fit: 84,
      stage: "Shortlisted",
      tenantId: tenant.id,
      jobs: { connect: [{ id: job3.id }] },
    },
  });

  console.log("Created 4 demo candidates");

  // Create demo interview packs
  const interviewPack1 = await prisma.interviewPack.create({
    data: {
      candidateId: candidate1.id,
      jobId: job1.id,
      questions: JSON.stringify([
        "Explain React Virtual DOM and how it improves performance.",
        "Describe your experience with Next.js App Router.",
        "How do you handle state management in large applications?",
        "Walk us through a complex frontend optimization you implemented.",
      ]),
      depth: "Advanced",
      owner: "Meera Iyer",
      status: "GENERATED",
    },
  });

  const interviewPack2 = await prisma.interviewPack.create({
    data: {
      candidateId: candidate3.id,
      jobId: job2.id,
      questions: JSON.stringify([
        "Explain PF/ESI calculation process.",
        "How do you handle payroll for multi-state operations?",
        "Describe your experience with compliance audits.",
      ]),
      depth: "Functional",
      owner: "Vikram Rao",
      status: "GENERATED",
    },
  });

  console.log("Created 2 demo interview packs");

  // Create demo subscriptions
  const subscription1 = await prisma.subscription.create({
    data: {
      tenantId: tenant.id,
      plan: "Growth",
      seats: 35,
      status: "ACTIVE",
      startDate: new Date("2026-01-01"),
      endDate: new Date("2026-12-31"),
    },
  });

  const subscription2 = await prisma.subscription.create({
    data: {
      tenantId: tenant.id,
      plan: "Voice Add-on",
      seats: 1,
      status: "ACTIVE",
      startDate: new Date("2026-03-01"),
      endDate: new Date("2026-12-31"),
    },
  });

  console.log("Created 2 demo subscriptions");

  // Create demo invoices
  const invoice1 = await prisma.invoice.create({
    data: {
      tenantId: tenant.id,
      plan: "Growth",
      amount: 75000,
      seats: 35,
      status: "Paid",
      due: new Date("2026-05-31"),
    },
  });

  const invoice2 = await prisma.invoice.create({
    data: {
      tenantId: tenant.id,
      plan: "Growth",
      amount: 75000,
      seats: 35,
      status: "UNPAID",
      due: new Date("2026-06-30"),
    },
  });

  const invoice3 = await prisma.invoice.create({
    data: {
      tenantId: tenant.id,
      plan: "Voice Add-on",
      amount: 25000,
      seats: 1,
      status: "UNPAID",
      due: new Date("2026-06-12"),
    },
  });

  console.log("Created 3 demo invoices");

  // Create demo audit logs
  await prisma.auditLog.createMany({
    data: [
      { tenantId: tenant.id, action: "Recruiter generated ATS score for Aarav Patel.", details: "{}", createdAt: new Date() },
      { tenantId: tenant.id, action: "Hiring Manager approved React shortlist.", details: "{}", createdAt: new Date() },
      { tenantId: tenant.id, action: "Finance enabled recurring billing retry.", details: "{}", createdAt: new Date() },
      { tenantId: tenant.id, action: "Client Admin updated approval chain for Engineering.", details: "{}", createdAt: new Date() },
      { tenantId: tenant.id, action: "Candidate uploaded a new resume PDF.", details: "{}", createdAt: new Date() },
    ],
  });

  console.log("Created 5 demo audit logs");

  console.log("\nSeed completed successfully!");
  console.log("Tenant ID:", tenant.id);
  console.log("You can log in with any of these accounts (password: demo123):");
  console.log("  admin@river.demo (Client Admin)");
  console.log("  recruiter@river.demo (Recruiter)");
  console.log("  manager@river.demo (Hiring Manager)");
  console.log("  finance@river.demo (Finance)");
  console.log("  candidate@river.demo (Candidate)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
