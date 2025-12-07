export const menuConfig = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: "Dashboard",
    roles: ["super-admin", "admin", "doctor", "nurse"],
    module: "dashboard" // always enabled
  },
  {
    label: "Appointments",
    path: "/appointments",
    icon: "Event",
    roles: ["super-admin", "admin", "doctor"],
    module: "appointments"
  },
  {
  label: "Calendar",
  path: "/calendar",
  icon: "CalendarMonth",
  roles: ["super-admin", "admin", "doctor", "nurse"],
  module: "calendar",
  },
  {
    label: "Patients",
    path: "/patients",
    icon: "People",
    roles: ["super-admin", "admin", "doctor", "nurse"],
    module: "patients"
  },
  {
    label: "Doctors",
    path: "/doctors",
    icon: "MedicalInformation",
    roles: ["super-admin", "admin"],
    module: "doctors"
  },
  {
    label: "Nurses",
    path: "/nurses",
    icon: "Badge",
    roles: ["super-admin", "admin"],
    module: "nurses"
  },
  {
    label: "Billing",
    path: "/billing",
    icon: "Payments",
    roles: ["super-admin", "admin"],
    module: "billing"
  },
  {
    label: "Pharmacy",
    path: "/pharmacy",
    icon: "Medication",
    roles: ["super-admin", "admin", "nurse"],
    module: "pharmacy"
  },
  {
    label: "Laboratory",
    path: "/labs",
    icon: "Biotech",
    roles: ["super-admin", "admin"],
    module: "labs"
  },
  {
    label: "Settings",
    path: "/settings",
    icon: "Settings",
    roles: ["super-admin", "admin"],
    module: "settings" 
  },
];
