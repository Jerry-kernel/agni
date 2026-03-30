import React from "react";
import { Grid, MenuItem, InputAdornment } from "@mui/material";
import { MedicalServices, LocalHospital, Shield, Notes } from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import { VetField, SectionLabel } from "../components/Atoms";
import { VACCINATION_OPTS, NEUTERED_OPTS, BLOOD_GROUPS } from "../constants/options";

const COLOR = "#7B5EA7";
const adorn = (icon, top = false) => (
  <InputAdornment position="start" sx={top ? { alignSelf: "flex-start", mt: 1 } : {}}>
    {React.cloneElement(icon, { sx: { fontSize: 16, color: alpha(COLOR, 0.5) } })}
  </InputAdornment>
);

const MedicalInfoStep = ({ data, errors, setField }) => {
  const bind = (name) => ({
    value: data[name] ?? "",
    onChange: (e) => setField(name, e.target.value),
    error: !!errors[name],
    helperText: errors[name] || "",
  });

  return (
    <>
      <SectionLabel icon={<MedicalServices />} label="Medical Information" color={COLOR} subtitle="Health history, vaccinations and existing conditions" />
      <Grid container spacing={2}>
        <Grid size={{xs:12, sm:6}}>
          <VetField label="Vaccination Status" select {...bind("vaccinated")}>
            {VACCINATION_OPTS.map((o) => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
          </VetField>
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <VetField label="Last Vaccination Date" type="date" {...bind("lastVaccinationDate")} InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <VetField label="Next Vaccination Due" type="date" {...bind("nextVaccinationDue")} InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <VetField label="Neutered / Spayed?" select {...bind("neutered")}>
            {NEUTERED_OPTS.map((o) => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
          </VetField>
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <VetField label="Neutering Date" type="date" {...bind("neuteredDate")} InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <VetField label="Blood Group" select {...bind("bloodGroup")}>
            {BLOOD_GROUPS.map((b) => <MenuItem key={b} value={b}>{b}</MenuItem>)}
          </VetField>
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <VetField label="Last Vet Visit Date" type="date" {...bind("lastVetVisit")} InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <VetField label="Previous Vet Clinic" {...bind("previousVetClinic")} InputProps={{ startAdornment: adorn(<LocalHospital />) }} />
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <VetField label="Insurance Provider" {...bind("insuranceProvider")} InputProps={{ startAdornment: adorn(<Shield />) }} />
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <VetField label="Insurance Policy ID" {...bind("insuranceId")} />
        </Grid>
        <Grid size={{xs:12}}>
          <VetField label="Known Allergies" {...bind("allergies")} placeholder="e.g. Penicillin, Pollen, Beef protein" />
        </Grid>
        <Grid size={{xs:12}}>
          <VetField label="Existing Conditions / Diagnoses" multiline rows={2} {...bind("existingConditions")} placeholder="e.g. Diabetes, Hip dysplasia, Heart murmur" />
        </Grid>
        <Grid size={{xs:12}}>
          <VetField label="Current Medications" multiline rows={2} {...bind("currentMedications")} placeholder="Drug name · dose · frequency" />
        </Grid>
        <Grid size={{xs:12}}>
          <VetField label="Additional Clinical Notes" multiline rows={2} {...bind("notes")} InputProps={{ startAdornment: adorn(<Notes />, true) }} />
        </Grid>
      </Grid>
    </>
  );
};

export default MedicalInfoStep;