export const INITIAL_STATE = {
  // Personal
  firstName: "", lastName: "", dob: "", gender: "",
  phone: "", altPhone: "", email: "", photo: null,
  addressLine1: "", addressLine2: "", city: "", state: "", pincode: "",

  // Professional
  regNumber: "", regCouncil: "", regYear: "",
  qualification: "", specialization: "", subSpecialization: "",
  experience: "", designation: "",
  languagesSpoken: [],

  // Clinic
  department: "", employmentType: "", joiningDate: "",
  consultationFee: "", followUpFee: "", emergencyFee: "",
  availableDays: [], consultationDuration: "20",

  // Availability (per day slots)
  morningStart: "09:00", morningEnd: "13:00",
  eveningStart: "17:00", eveningEnd: "21:00",
  lunchBreak: true,

  // Documents
  degreeCertificate: null, registrationCertificate: null,
  identityProof: null, signatureFile: null,

  // Bio
  bio: "", achievements: "", notes: "",
};
