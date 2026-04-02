import React from "react";
import { Grid, MenuItem, InputAdornment, alpha } from "@mui/material";
import { LocalHospital, CurrencyRupee, Timer } from "@mui/icons-material";
import { DocField, SectionLabel } from "../components/Atoms";
import { DEPARTMENTS, EMPLOYMENT_TYPES, CONSULTATION_DURATIONS } from "../constants/options";

const COLOR = "#2A7F6F";
const FONT  = "'Nunito', sans-serif";

const adorn = (icon) => (
  <InputAdornment position="start">
    {React.cloneElement(icon, { sx: { fontSize: 16, color: alpha(COLOR, 0.5) } })}
  </InputAdornment>
);

const ClinicFeesStep = ({ data, errors, setField }) => {
  const bind = (name) => ({
    value: data[name] ?? "",
    onChange: (e) => setField(name, e.target.value),
    error: !!errors[name],
    helperText: errors[name] || "",
    color: COLOR,
  });

  return (
    <>
      <SectionLabel icon={<LocalHospital />} label="Clinic Assignment & Fees" color={COLOR} subtitle="Department, employment type and consultation charges" />

      <Grid container spacing={2}>
        {/* Clinic */}
        <Grid size={{xs:6, sm:6}}>
          <DocField label="Department *" select {...bind("department")}>
            {DEPARTMENTS.map((d) => <MenuItem key={d} value={d} sx={{ fontFamily: FONT }}>{d}</MenuItem>)}
          </DocField>
        </Grid>
        <Grid size={{xs:6, sm:6}}>
          <DocField label="Employment Type *" select {...bind("employmentType")}>
            {EMPLOYMENT_TYPES.map((e) => <MenuItem key={e} value={e} sx={{ fontFamily: FONT }}>{e}</MenuItem>)}
          </DocField>
        </Grid>
        <Grid size={{xs:6, sm:6}}>
          <DocField label="Joining Date *" type="date" {...bind("joiningDate")} InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid size={{xs:6, sm:6}}>
          <DocField label="Consultation Duration" select {...bind("consultationDuration")}>
            {CONSULTATION_DURATIONS.map((d) => (
              <MenuItem key={d.value} value={d.value} sx={{ fontFamily: FONT }}>{d.label}</MenuItem>
            ))}
          </DocField>
        </Grid>

        {/* Fees */}
        <Grid size={{xs:6, sm:4}}>
          <DocField label="Consultation Fee (₹)" type="number" {...bind("consultationFee")}
            InputProps={{ startAdornment: adorn(<CurrencyRupee />) }} />
        </Grid>
        <Grid size={{xs:6, sm:4}}>
          <DocField label="Follow-up Fee (₹)" type="number" {...bind("followUpFee")}
            InputProps={{ startAdornment: adorn(<CurrencyRupee />) }} />
        </Grid>
        <Grid size={{xs:6, sm:4}}>
          <DocField label="Emergency Fee (₹)" type="number" {...bind("emergencyFee")}
            InputProps={{ startAdornment: adorn(<CurrencyRupee />) }} />
        </Grid>
      </Grid>
    </>
  );
};

export default ClinicFeesStep;