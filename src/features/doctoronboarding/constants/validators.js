const req   = (v, l) => !v?.trim() ? `${l} is required` : null;
const phone = (v, l) => !v?.trim() ? `${l} is required` : !/^\+?[\d\s\-()\\.]{7,15}$/.test(v) ? "Enter a valid phone number" : null;
const email = (v)    => !v?.trim() ? "Email is required" : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "Enter a valid email" : null;
const posNum= (v, l) => v && (isNaN(v) || Number(v) < 0) ? `${l} must be a valid number` : null;

const collect = (pairs) => Object.fromEntries(pairs.filter(([, e]) => e));

export const validators = [
  // Step 0 – Personal
  (d) => collect([
    ["firstName", req(d.firstName, "First name")],
    ["lastName",  req(d.lastName,  "Last name")],
    ["gender",    req(d.gender,    "Gender")],
    ["phone",     phone(d.phone,   "Phone number")],
    ["email",     email(d.email)],
  ]),
  // Step 1 – Professional
  (d) => collect([
    ["regNumber",       req(d.regNumber,       "Registration number")],
    ["regCouncil",      req(d.regCouncil,      "Registration council")],
    ["qualification",   req(d.qualification,   "Qualification")],
    ["specialization",  req(d.specialization,  "Specialization")],
    ["experience",      req(d.experience,      "Experience")],
  ]),
  // Step 2 – Clinic & Fees
  (d) => collect([
    ["department",      req(d.department,      "Department")],
    ["employmentType",  req(d.employmentType,  "Employment type")],
    ["joiningDate",     req(d.joiningDate,     "Joining date")],
    ["consultationFee", posNum(d.consultationFee, "Consultation fee")],
  ]),
  // Step 3 – Availability (optional)
  () => ({}),
  // Step 4 – Documents (optional)
  () => ({}),
  // Step 5 – Review
  () => ({}),
];
