import React from "react";
import { Grid, MenuItem, Typography, alpha } from "@mui/material";
import { MedicalServices, WorkHistory } from "@mui/icons-material";
import { DocField, SectionLabel, MultiChipSelect } from "../components/Atoms";
import {
  QUALIFICATIONS, SPECIALIZATIONS, DESIGNATIONS,
  REG_COUNCILS, LANGUAGES,
} from "../constants/options";

const COLOR = "#1B5E8C";
const FONT  = "'Nunito', sans-serif";

const ProfessionalStep = ({ data, errors, setField }) => {
  const bind = (name) => ({
    value: data[name] ?? "",
    onChange: (e) => setField(name, e.target.value),
    error: !!errors[name],
    helperText: errors[name] || "",
  });

  return (
    <>
      <SectionLabel icon={<MedicalServices />} label="Professional Details" color={COLOR} subtitle="Qualifications, specialization and registration" />

      <Grid container spacing={2}>
        {/* Registration */}
        <Grid size={{xs:12, sm:6}}>
          <DocField label="Vet Registration Number *" {...bind("regNumber")} placeholder="e.g. TN-VCI-2019-00123" />
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <DocField label="Registration Council *" select {...bind("regCouncil")}>
            {REG_COUNCILS.map((r) => <MenuItem key={r} value={r} sx={{ fontFamily: FONT }}>{r}</MenuItem>)}
          </DocField>
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <DocField label="Registration Year" type="number" {...bind("regYear")} placeholder="e.g. 2019" />
        </Grid>

        {/* Qualification */}
        <Grid size={{xs:12, sm:6}}>
          <DocField label="Highest Qualification *" select {...bind("qualification")}>
            {QUALIFICATIONS.map((q) => <MenuItem key={q} value={q} sx={{ fontFamily: FONT }}>{q}</MenuItem>)}
          </DocField>
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <DocField label="Specialization *" select {...bind("specialization")}>
            {SPECIALIZATIONS.map((s) => <MenuItem key={s} value={s} sx={{ fontFamily: FONT }}>{s}</MenuItem>)}
          </DocField>
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <DocField label="Sub-Specialization" {...bind("subSpecialization")} placeholder="e.g. Feline Cardiology" />
        </Grid>

        {/* Experience */}
        <Grid size={{xs:12, sm:6}}>
          <DocField label="Years of Experience *" type="number" {...bind("experience")} />
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <DocField label="Designation" select {...bind("designation")}>
            {DESIGNATIONS.map((d) => <MenuItem key={d} value={d} sx={{ fontFamily: FONT }}>{d}</MenuItem>)}
          </DocField>
        </Grid>

        {/* Languages */}
        <Grid size={{xs:12}}>
          <Typography sx={{ fontFamily: FONT, fontSize: "0.82rem", fontWeight: 700, color: "text.secondary", mb: 1 }}>
            Languages Spoken
          </Typography>
          <MultiChipSelect
            options={LANGUAGES}
            selected={data.languagesSpoken}
            onChange={(val) => setField("languagesSpoken", val)}
            color={COLOR}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ProfessionalStep;