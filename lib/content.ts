import {
  BadgeIndianRupee,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Building2,
  ChartNoAxesCombined,
  CheckCircle2,
  CircleDollarSign,
  ClipboardCheck,
  FileSearch,
  Fingerprint,
  Headphones,
  Layers3,
  LockKeyhole,
  Mic2,
  Network,
  PanelsTopLeft,
  ReceiptText,
  Scale,
  ShieldCheck,
  Sparkles,
  UserCheck,
  UsersRound,
  Workflow
} from "lucide-react";

export const navItems = [
  { label: "Platform", href: "#platform" },
  { label: "HRMS", href: "#hrms" },
  { label: "Workflows", href: "#workflows" },
  { label: "Packages", href: "#packages" },
  { label: "Roadmap", href: "#roadmap" }
];

export const heroMetrics = [
  { label: "Manual screening effort", value: "2x-4x", detail: "potential reduction" },
  { label: "Product modules", value: "12+", detail: "hiring and HRMS layers" },
  { label: "Deployment model", value: "SaaS", detail: "multi-tenant ready" }
];

export const pains = [
  "Too much recruiter time spent reading resumes that never progress.",
  "No unified ATS score, fit score, and recommendation engine.",
  "Hiring managers receive inconsistent interview questions and weak candidate context.",
  "Finance teams lack subscription visibility and spend governance.",
  "Large clients need different roles, policies, approvals, and dashboards."
];

export const solutions = [
  "Upload PDF resumes and parse them into structured candidate intelligence.",
  "Generate ATS scores, role-fit confidence, and recommended matches automatically.",
  "Create AI interview packs tailored to role, skills, and seniority.",
  "Secure every flow with JWT authentication and role-based access control.",
  "Use voice agents and workflow automation to support candidates and teams."
];

export const coreModules = [
  {
    title: "AI Resume Analyzer",
    icon: FileSearch,
    summary: "Turns raw resumes into normalized, searchable candidate intelligence.",
    bullets: ["Extracts skills, titles, experience, education, and keywords.", "Highlights relevance, gaps, and risk signals.", "Creates the structured base for scoring and automation."]
  },
  {
    title: "AI Job Matcher",
    icon: BriefcaseBusiness,
    summary: "Matches candidates to the best-fit roles and recruiters to best-fit candidates.",
    bullets: ["Uses skills, experience, role context, and preferences.", "Reduces irrelevant submissions.", "Supports hiring prioritization and internal mobility."]
  },
  {
    title: "Interview Generator",
    icon: ClipboardCheck,
    summary: "Produces consistent interview packs by job, seniority, and business context.",
    bullets: ["Covers technical, functional, and managerial roles.", "Adapts depth to experience level.", "Can expand into scorecards and evaluation templates."]
  },
  {
    title: "ATS Resume Scoring",
    icon: ChartNoAxesCombined,
    summary: "Gives every resume a transparent score against a selected job description.",
    bullets: ["Supports sorting, filtering, and shortlisting.", "Shows improvement signals to candidates.", "Creates shared context for enterprise review teams."]
  },
  {
    title: "PDF Upload & Parsing",
    icon: ReceiptText,
    summary: "The core intake channel for candidate and recruiter resume workflows.",
    bullets: ["Converts documents into reusable records.", "Feeds every AI feature with structured data.", "Can extend to bulk upload, email ingestion, and APIs."]
  },
  {
    title: "Auth, Billing & UI",
    icon: LockKeyhole,
    summary: "Subscription-ready SaaS foundation with secure role-specific dashboards.",
    bullets: ["JWT-secured session handling.", "Razorpay subscriptions and plan upgrades.", "Responsive dashboards for every role."]
  }
];

export const hrmsModules = [
  {
    title: "Joining & Onboarding",
    icon: UserCheck,
    items: ["Offer acceptance workflow", "Document collection", "Joining checklist", "Policy acknowledgments", "AI onboarding assistant"]
  },
  {
    title: "Attendance, Leave & Shifts",
    icon: Fingerprint,
    items: ["Attendance tracking", "Shift planning", "Holiday calendars", "Approval routing", "Anomaly alerts"]
  },
  {
    title: "Payroll & Statutory Processing",
    icon: BadgeIndianRupee,
    items: ["Salary structures", "Reimbursements", "Deductions", "Payslip generation", "Payroll exception support"]
  },
  {
    title: "KPI & Performance",
    icon: Scale,
    items: ["Goal setting", "Check-ins", "Appraisal workflows", "AI review summaries", "Trend visibility"]
  },
  {
    title: "Employee Services",
    icon: Headphones,
    items: ["Employee directory", "Document vault", "Letters", "Policy center", "Request management"]
  },
  {
    title: "Exit & Full and Final",
    icon: CheckCircle2,
    items: ["Resignation handling", "Clearance workflow", "Asset return", "Severance workflow", "Finance validation"]
  }
];

export const roles = [
  { role: "Client Admin", value: "Controls operations, access, plans, and business rules.", icon: Building2 },
  { role: "Recruiter", value: "Runs sourcing, screening, scoring, and interview creation.", icon: UsersRound },
  { role: "Hiring Manager", value: "Reviews AI-ranked candidates and approves shortlists.", icon: PanelsTopLeft },
  { role: "Finance", value: "Tracks subscription, seats, invoices, and payment recovery.", icon: CircleDollarSign },
  { role: "Candidate", value: "Uploads resume, checks fit, and receives interview preparation support.", icon: Sparkles }
];

export const workflows = [
  {
    label: "Recruiting Workflow",
    title: "Resume to shortlist",
    icon: Workflow,
    text: "Upload PDF, parse profile, score fit, generate shortlist, and route to reviewer."
  },
  {
    label: "Candidate Workflow",
    title: "Guided application",
    icon: Mic2,
    text: "Voice assistant explains role fit, application progress, and interview preparation."
  },
  {
    label: "Billing Workflow",
    title: "Subscription expansion",
    icon: Network,
    text: "Increase plan value with seats, automation packs, voice agents, and policy controls."
  }
];

export const packages = [
  {
    name: "Starter",
    audience: "For growing teams",
    price: "Rs 25,000",
    suffix: "/ month",
    featured: false,
    features: ["PDF resume upload and parsing", "AI resume analyzer", "ATS scoring for core roles", "Basic recruiter dashboard", "JWT authentication", "Standard support"]
  },
  {
    name: "Growth",
    audience: "Best fit for serious hiring teams",
    price: "Connect",
    suffix: "with sales team",
    featured: true,
    features: ["Everything in Starter", "AI job matcher", "Candidate recommendations", "AI interview question generator", "Multi-role dashboards", "Approval workflows", "Razorpay recurring billing", "Advanced analytics"]
  },
  {
    name: "Enterprise",
    audience: "For multi-brand and high-volume hiring",
    price: "Connect",
    suffix: "with sales team",
    featured: false,
    features: ["Everything in Growth", "Google ADK voice assistants", "Agentic workflow orchestration", "Custom RBAC", "Compliance logic and audit controls", "Dedicated onboarding", "Premium SLA"]
  }
];

export const addOns = [
  "Voice assistant per client brand or geography",
  "Custom job-board or HRMS integrations",
  "Dedicated analytics pack and executive reporting",
  "White-label branding and custom domain setup",
  "Advanced compliance workflow and approval matrix"
];

export const phases = [
  {
    phase: "Phase 1",
    title: "Foundation",
    icon: ShieldCheck,
    items: ["JWT authentication", "Tenant setup and user roles", "Resume upload and parsing", "Core recruiter dashboard"]
  },
  {
    phase: "Phase 2",
    title: "AI Decision Layer",
    icon: BrainCircuit,
    items: ["ATS scoring", "Job matching engine", "Interview question generation", "Manager review workflows"]
  },
  {
    phase: "Phase 3",
    title: "Advanced Platform Layer",
    icon: Bot,
    items: ["Razorpay subscriptions", "Finance dashboards", "Google ADK voice assistant", "Enterprise workflow automation"]
  }
];

export const adoptionPath = [
  "Start with screening efficiency, structured candidate data, and hiring speed.",
  "Add workflow automation when the client needs more scale and coordination.",
  "Add voice agents when candidate engagement becomes strategic.",
  "Add enterprise controls when multiple teams, brands, or approval layers are involved.",
  "Add analytics and finance visibility when leadership needs ROI clarity."
];

export const platformStack = [
  { label: "Tenant Core", value: "Organizations, roles, rules, branding", icon: Layers3 },
  { label: "AI Layer", value: "Resume analysis, scoring, matching, interviews", icon: BrainCircuit },
  { label: "Workflow Layer", value: "Approvals, handoffs, voice, automation", icon: Workflow },
  { label: "Revenue Layer", value: "Plans, seats, Razorpay, invoices", icon: CircleDollarSign }
];
