export const INITIAL_STATE = {
  // Pet
  name: "", species: "", breed: "", dob: "",
  age: "", ageUnit: "Years", gender: "",
  weight: "", weightUnit: "kg",
  color: "", microchipId: "", registrationNo: "",

  // Owner
  ownerName: "", ownerContact: "", ownerEmail: "",
  alternateContact: "", emergencyContactName: "", emergencyContact: "",
  addressLine1: "", addressLine2: "", city: "", state: "", pincode: "",
  referredBy: "",

  // Medical
  vaccinated: "", lastVaccinationDate: "", nextVaccinationDue: "",
  neutered: "", neuteredDate: "",
  bloodGroup: "", lastVetVisit: "", previousVetClinic: "",
  insuranceProvider: "", insuranceId: "",
  allergies: "", existingConditions: "", currentMedications: "", notes: "",

  // Lifestyle
  dietType: "", feedingFrequency: "", foodBrand: "",
  livingEnv: "", exerciseLevel: "", otherPets: "",
  behaviouralNotes: "", specialCare: "",
};