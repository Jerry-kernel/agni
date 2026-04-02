import React from "react";
import {
  Grid, MenuItem, InputAdornment, Box,
  Typography, Avatar, Stack, alpha,
} from "@mui/material";
import {
  Person, Phone, Email, Home, CameraAlt, Cake,
} from "@mui/icons-material";
import { DocField, SectionLabel } from "../components/Atoms";
import { GENDERS } from "../constants/options";

const COLOR = "#1B5E8C";
const FONT  = "'Nunito', sans-serif";

const adorn = (icon, top = false) => (
  <InputAdornment position="start" sx={top ? { alignSelf: "flex-start", mt: 1 } : {}}>
    {React.cloneElement(icon, { sx: { fontSize: 16, color: alpha(COLOR, 0.5) } })}
  </InputAdornment>
);

const PersonalInfoStep = ({ data, errors, setField }) => {
  const bind = (name) => ({
    value: data[name] ?? "",
    onChange: (e) => setField(name, e.target.value),
    error: !!errors[name],
    helperText: errors[name] || "",
  });

  return (
    <>
      <SectionLabel icon={<Person />} label="Personal Information" color={COLOR} subtitle="Doctor's personal and contact details" />

      {/* Photo upload */}
      <Stack direction="row" alignItems="center" spacing={3} mb={3}>
        <Box sx={{ position: "relative" }}>
          <Avatar sx={{
            width: 80, height: 80, fontSize: "2rem",
            bgcolor: alpha(COLOR, 0.1), color: COLOR,
            border: `2px dashed ${alpha(COLOR, 0.3)}`,
          }}>
            <Person sx={{ fontSize: 36 }} />
          </Avatar>
          <Avatar sx={{
            position: "absolute", bottom: -4, right: -4,
            width: 26, height: 26, bgcolor: COLOR, cursor: "pointer",
          }}>
            <CameraAlt sx={{ fontSize: 14 }} />
          </Avatar>
        </Box>
        <Box>
          <Typography fontWeight={700} sx={{ fontFamily: FONT, color: "#1A2E22", fontSize: "0.9rem" }}>
            Profile Photo
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontFamily: FONT }}>
            JPG or PNG · Max 2MB · Recommended 300×300px
          </Typography>
        </Box>
      </Stack>

      <Grid container spacing={2}>
        <Grid size={{xs:12, sm:6}}>
          <DocField label="First Name *" {...bind("firstName")}
            InputProps={{ startAdornment: adorn(<Person />) }} />
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <DocField label="Last Name *" {...bind("lastName")} />
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <DocField label="Date of Birth" type="date" {...bind("dob")}
            InputLabelProps={{ shrink: true }}
            InputProps={{ startAdornment: adorn(<Cake />) }} />
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <DocField label="Gender *" select {...bind("gender")}>
            {GENDERS.map((g) => <MenuItem key={g} value={g} sx={{ fontFamily: FONT }}>{g}</MenuItem>)}
          </DocField>
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <DocField label="Primary Phone *" {...bind("phone")}
            InputProps={{ startAdornment: adorn(<Phone />) }} />
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <DocField label="Alternate Phone" {...bind("altPhone")}
            InputProps={{ startAdornment: adorn(<Phone />) }} />
        </Grid>
        <Grid size={{xs:12}}>
          <DocField label="Email Address *" type="email" {...bind("email")}
            InputProps={{ startAdornment: adorn(<Email />) }} />
        </Grid>
        <Grid size={{xs:12}}>
          <DocField label="Address Line 1" {...bind("addressLine1")}
            InputProps={{ startAdornment: adorn(<Home />, true) }} />
        </Grid>
        <Grid size={{xs:12}}>
          <DocField label="Address Line 2" {...bind("addressLine2")}
            placeholder="Apartment, landmark…" />
        </Grid>
        <Grid size={{xs:12, sm:4}}><DocField label="City"    {...bind("city")}    /></Grid>
        <Grid size={{xs:12, sm:4}}><DocField label="State"   {...bind("state")}   /></Grid>
        <Grid size={{xs:12, sm:4}}><DocField label="Pincode" {...bind("pincode")} /></Grid>
      </Grid>
    </>
  );
};

export default PersonalInfoStep;