import React from "react";
import { Grid, MenuItem, InputAdornment } from "@mui/material";
import { Person, Phone, Email, Home, Badge, PersonSearch } from "@mui/icons-material";
import { alpha } from "@mui/material/styles";
import { VetField, SectionLabel } from "../components/Atoms";
import { REFERRAL_OPTS } from "../constants/options";

const COLOR = "#3A6186";
const adorn = (icon, top = false) => (
  <InputAdornment position="start" sx={top ? { alignSelf: "flex-start", mt: 1 } : {}}>
    {React.cloneElement(icon, { sx: { fontSize: 16, color: alpha(COLOR, 0.5) } })}
  </InputAdornment>
);

const OwnerInfoStep = ({ data, errors, setField }) => {
  const bind = (name) => ({
    value: data[name] ?? "",
    onChange: (e) => setField(name, e.target.value),
    error: !!errors[name],
    helperText: errors[name] || "",
  });

  return (
    <>
      <SectionLabel icon={<Person />} label="Owner / Guardian Information" color={COLOR} subtitle="Primary contact, address and emergency details" />
      <Grid container spacing={2}>
        <Grid size={{xs:12, sm:6}}>
          <VetField label="Owner Full Name *" {...bind("ownerName")} InputProps={{ startAdornment: adorn(<Badge />) }} />
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <VetField label="Primary Contact *" {...bind("ownerContact")} InputProps={{ startAdornment: adorn(<Phone />) }} />
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <VetField label="Alternate Contact" {...bind("alternateContact")} InputProps={{ startAdornment: adorn(<Phone />) }} />
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <VetField label="Email Address" type="email" {...bind("ownerEmail")} InputProps={{ startAdornment: adorn(<Email />) }} />
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <VetField label="Emergency Contact Name" {...bind("emergencyContactName")} InputProps={{ startAdornment: adorn(<PersonSearch />) }} />
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <VetField label="Emergency Contact No." {...bind("emergencyContact")} InputProps={{ startAdornment: adorn(<Phone />) }} />
        </Grid>
        <Grid size={{xs:12}}>
          <VetField label="Address Line 1" {...bind("addressLine1")} InputProps={{ startAdornment: adorn(<Home />, true) }} />
        </Grid>
        <Grid size={{xs:12}}>
          <VetField label="Address Line 2" {...bind("addressLine2")} placeholder="Apartment, suite, landmark…" />
        </Grid>
        <Grid size={{xs:12, sm:4}}><VetField label="City"         {...bind("city")}    /></Grid>
        <Grid size={{xs:12, sm:4}}><VetField label="State"        {...bind("state")}   /></Grid>
        <Grid size={{xs:12, sm:4}}><VetField label="Pincode / ZIP" {...bind("pincode")} /></Grid>
        <Grid size={{xs:12, sm:6}}>
          <VetField label="Referred By" select {...bind("referredBy")}>
            {REFERRAL_OPTS.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
          </VetField>
        </Grid>
      </Grid>
    </>
  );
};

export default OwnerInfoStep;