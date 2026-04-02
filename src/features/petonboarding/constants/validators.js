const req   = (v, l) => !v?.trim() ? `${l} is required` : null;
const phone = (v, l) => !v?.trim() ? `${l} is required` : !/^\+?[\d\s\-()\\.]{7,15}$/.test(v) ? "Enter a valid phone number" : null;
const email = (v)    => v?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "Enter a valid email" : null;
const posNum= (v, l) => v && (isNaN(v) || Number(v) <= 0) ? `${l} must be positive` : null;

const collect = (pairs) => Object.fromEntries(pairs.filter(([, e]) => e));

export const validators = [
  (d) => collect([
    ["name",    req(d.name,    "Pet name")],
    ["species", req(d.species, "Species")],
    ["gender",  req(d.gender,  "Gender")],
    ["age",     posNum(d.age,    "Age")],
    ["weight",  posNum(d.weight, "Weight")],
  ]),
  (d) => collect([
    ["ownerName",    req(d.ownerName,      "Owner name")],
    ["ownerContact", phone(d.ownerContact, "Contact number")],
    ["ownerEmail",   email(d.ownerEmail)],
  ]),
  () => ({}),
  () => ({}),
  () => ({}),
];