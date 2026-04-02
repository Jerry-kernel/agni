import React from "react";
import { Box, Stack, Avatar, Typography, Paper, Alert, alpha } from "@mui/material";
import { Pets, Person, MedicalServices, Park, CheckCircle } from "@mui/icons-material";
import { SectionLabel } from "../components/Atoms";

const FONT = "'Nunito', sans-serif";

const Row = ({ label, value, idx, color }) => {
  if (!value) return null;
  return (
    <Stack direction="row" alignItems="flex-start"
      sx={{ px: 2.5, py: 0.9, bgcolor: idx % 2 === 0 ? alpha(color, 0.025) : "transparent" }}>
      <Typography sx={{ fontFamily: FONT, fontSize: "0.77rem", color: "text.secondary", width: 175, flexShrink: 0 }}>
        {label}
      </Typography>
      <Typography sx={{ fontFamily: FONT, fontSize: "0.82rem", fontWeight: 600 }}>
        {value}
      </Typography>
    </Stack>
  );
};

const Section = ({ title, icon, color, rows }) => {
  if (!rows.some(([, v]) => v)) return null;
  return (
    <Box mb={2.5}>
      <Stack direction="row" alignItems="center" spacing={1} mb={1}>
        <Avatar sx={{ bgcolor: alpha(color, 0.12), color, width: 28, height: 28 }}>
          {React.cloneElement(icon, { sx: { fontSize: 15 } })}
        </Avatar>
        <Typography fontWeight={700} sx={{ fontFamily: FONT, color, fontSize: "0.88rem" }}>
          {title}
        </Typography>
      </Stack>
      <Paper elevation={0} sx={{ borderRadius: "12px", border: `1px solid ${alpha(color, 0.15)}`, overflow: "hidden" }}>
        {rows.map(([label, value], i) => (
          <Row key={label} label={label} value={value} idx={i} color={color} />
        ))}
      </Paper>
    </Box>
  );
};

const ReviewStep = ({ data, errors }) => {
  const d = data;
  return (
    <>
      <SectionLabel icon={<CheckCircle />} label="Review & Confirm" color="#E8A838" subtitle="Verify all details before submitting the patient record" />

      {errors._form && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: "10px", fontFamily: FONT }}>{errors._form}</Alert>
      )}

      <Section title="Pet Details" icon={<Pets />} color="#2A7F6F" rows={[
        ["Name",           d.name],
        ["Species",        d.species],
        ["Breed",          d.breed],
        ["Date of Birth",  d.dob],
        ["Age",            d.age ? `${d.age} ${d.ageUnit}` : ""],
        ["Weight",         d.weight ? `${d.weight} ${d.weightUnit}` : ""],
        ["Gender",         d.gender],
        ["Color",          d.color],
        ["Microchip ID",   d.microchipId],
        ["Reg. No.",       d.registrationNo],
      ]} />

      <Section title="Owner Details" icon={<Person />} color="#3A6186" rows={[
        ["Owner Name",    d.ownerName],
        ["Contact",       d.ownerContact],
        ["Alternate",     d.alternateContact],
        ["Email",         d.ownerEmail],
        ["Emergency",     [d.emergencyContactName, d.emergencyContact].filter(Boolean).join(" — ")],
        ["Address",       [d.addressLine1, d.addressLine2, d.city, d.state, d.pincode].filter(Boolean).join(", ")],
        ["Referred By",   d.referredBy],
      ]} />

      <Section title="Medical Details" icon={<MedicalServices />} color="#7B5EA7" rows={[
        ["Vaccinated",       d.vaccinated],
        ["Last Vaccination", d.lastVaccinationDate],
        ["Next Due",         d.nextVaccinationDue],
        ["Neutered",         d.neutered],
        ["Blood Group",      d.bloodGroup],
        ["Last Vet Visit",   d.lastVetVisit],
        ["Prev. Clinic",     d.previousVetClinic],
        ["Insurance",        [d.insuranceProvider, d.insuranceId].filter(Boolean).join(" — ")],
        ["Allergies",        d.allergies],
        ["Conditions",       d.existingConditions],
        ["Medications",      d.currentMedications],
        ["Notes",            d.notes],
      ]} />

      <Section title="Lifestyle & Diet" icon={<Park />} color="#A8505F" rows={[
        ["Diet",          d.dietType],
        ["Feeding",       d.feedingFrequency],
        ["Food Brand",    d.foodBrand],
        ["Living Env.",   d.livingEnv],
        ["Exercise",      d.exerciseLevel],
        ["Other Pets",    d.otherPets],
        ["Behaviour",     d.behaviouralNotes],
        ["Special Care",  d.specialCare],
      ]} />
    </>
  );
};

export default ReviewStep;