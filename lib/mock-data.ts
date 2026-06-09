export const jobs = [
  { id: "J-1024", title: "Senior React Engineer", department: "Engineering", status: "Open", applicants: 84, fit: 91 },
  { id: "J-1025", title: "Payroll Operations Lead", department: "Finance", status: "Open", applicants: 32, fit: 76 },
  { id: "J-1026", title: "Talent Acquisition Partner", department: "People", status: "Approval", applicants: 48, fit: 83 },
  { id: "J-1027", title: "HRMS Implementation Consultant", department: "Delivery", status: "Draft", applicants: 19, fit: 88 }
];

export const candidates = [
  { name: "Aarav Patel", role: "Senior React Engineer", ats: 94, match: 91, stage: "Manager review", risk: "Low" },
  { name: "Sara Khan", role: "HRMS Consultant", ats: 87, match: 89, stage: "Interview pack ready", risk: "Low" },
  { name: "Dev Malhotra", role: "Payroll Lead", ats: 78, match: 75, stage: "Recruiter screen", risk: "Medium" },
  { name: "Neha Thomas", role: "TA Partner", ats: 82, match: 84, stage: "Shortlisted", risk: "Low" }
];

export const interviews = [
  { pack: "Senior React Engineer", questions: 18, depth: "Advanced", owner: "Meera Iyer", status: "Approved" },
  { pack: "Payroll Operations Lead", questions: 14, depth: "Functional", owner: "Vikram Rao", status: "Draft" },
  { pack: "TA Partner", questions: 16, depth: "Managerial", owner: "Rohit Sharma", status: "Ready" }
];

export const invoices = [
  { id: "INV-2308", plan: "Growth", amount: "Rs 75,000", seats: 35, status: "Paid", due: "May 31, 2026" },
  { id: "INV-2309", plan: "Growth", amount: "Rs 75,000", seats: 35, status: "Upcoming", due: "Jun 30, 2026" },
  { id: "INV-2310", plan: "Voice Add-on", amount: "Rs 25,000", seats: 1, status: "Pending", due: "Jun 12, 2026" }
];

export const hrmsTiles = [
  { label: "Onboarding", value: "12", detail: "joining tasks pending" },
  { label: "Attendance", value: "4", detail: "exceptions today" },
  { label: "Payroll", value: "98%", detail: "inputs completed" },
  { label: "Performance", value: "27", detail: "reviews in cycle" },
  { label: "Employee services", value: "16", detail: "open requests" },
  { label: "Exit", value: "3", detail: "clearance workflows" }
];

export const auditEvents = [
  "Recruiter generated ATS score for Aarav Patel.",
  "Hiring Manager approved React shortlist.",
  "Finance enabled recurring billing retry.",
  "Client Admin updated approval chain for Engineering.",
  "Candidate uploaded a new resume PDF."
];
