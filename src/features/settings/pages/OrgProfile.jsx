import React, { useState } from "react";
import {
  Box, Grid, TextField, Typography, Button, Avatar,
  Divider, Stack, Chip, alpha, InputAdornment,
} from "@mui/material";
import {
  Business, Phone, Email, Language, LocationOn,
  CameraAlt, Save, Numbers,
} from "@mui/icons-material";

const COLOR = "#2A7F6F";
const FONT  = "'Nunito', sans-serif";

const adorn = (icon) => (
  <InputAdornment position="start">
    {React.cloneElement(icon, { sx: { fontSize: 16, color: alpha(COLOR, 0.5) } })}
  </InputAdornment>
);

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px", fontFamily: FONT, fontSize: "0.875rem",
    bgcolor: alpha(COLOR, 0.025),
    "&:hover fieldset": { borderColor: alpha(COLOR, 0.4) },
    "&.Mui-focused fieldset": { borderColor: COLOR, borderWidth: "1.5px" },
    "&.Mui-focused": { boxShadow: `0 0 0 3px ${alpha(COLOR, 0.1)}` },
  },
  "& .MuiInputLabel-root.Mui-focused": { color: COLOR },
  "& .MuiInputLabel-root": { fontFamily: FONT, fontSize: "0.875rem" },
};

const SLabel = ({ label }) => (
  <Typography sx={{ fontFamily: FONT, fontSize: "0.72rem", fontWeight: 800, color: "text.disabled", textTransform: "uppercase", letterSpacing: "0.08em", mt: 2.5, mb: 1.5 }}>
    {label}
  </Typography>
);

const OrgProfile = () => {
  const [form, setForm] = useState({
    clinicName: "VetCare Animal Hospital",
    tagline: "Compassionate care for your companions",
    regNumber: "VET-TN-2024-00123",
    gstin: "33AABCV1234F1Z5",
    phone: "+91 98765 43210",
    altPhone: "",
    email: "info@vetcare.in",
    website: "www.vetcare.in",
    addressLine1: "12, Anna Salai",
    addressLine2: "Near Chennai Central",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "600002",
    country: "India",
  });

  const set = (f) => (e) => setForm((p) => ({ ...p, [f]: e.target.value }));

  return (
    <Box>
      {/* Logo upload */}
      <Stack direction="row" alignItems="center" spacing={3} mb={3}>
        <Box sx={{ position: "relative" }}>
          <Avatar sx={{
            width: 80, height: 80, fontSize: "2rem",
            bgcolor: alpha(COLOR, 0.12), color: COLOR,
            border: `2px dashed ${alpha(COLOR, 0.3)}`,
          }}>
            🐾
          </Avatar>
          <Avatar sx={{
            position: "absolute", bottom: -4, right: -4,
            width: 26, height: 26, bgcolor: COLOR, cursor: "pointer",
          }}>
            <CameraAlt sx={{ fontSize: 14 }} />
          </Avatar>
        </Box>
        <Box>
          <Typography fontWeight={800} sx={{ fontFamily: FONT, color: "#1A2E22" }}>Clinic Logo</Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontFamily: FONT }}>PNG or JPG · Max 2MB · Recommended 200×200px</Typography>
          <Box mt={0.8}>
            <Chip label="Upload Logo" size="small" onClick={() => {}}
              sx={{ bgcolor: alpha(COLOR, 0.1), color: COLOR, fontWeight: 700, fontFamily: FONT, cursor: "pointer", height: 24 }} />
          </Box>
        </Box>
      </Stack>

      <Divider sx={{ borderColor: alpha(COLOR, 0.1), mb: 1 }} />

      <SLabel label="Basic Information" />
      <Grid container spacing={2}>
        <Grid size={{xs:12, sm:8}}>
          <TextField label="Clinic / Hospital Name *" value={form.clinicName} onChange={set("clinicName")} size="small" fullWidth sx={fieldSx} InputProps={{ startAdornment: adorn(<Business />) }} />
        </Grid>
        <Grid size={{xs:12, sm:4}}>
          <TextField label="Registration No." value={form.regNumber} onChange={set("regNumber")} size="small" fullWidth sx={fieldSx} InputProps={{ startAdornment: adorn(<Numbers />) }} />
        </Grid>
        <Grid size={{xs:12}}>
          <TextField label="Tagline / Motto" value={form.tagline} onChange={set("tagline")} size="small" fullWidth sx={fieldSx} placeholder="e.g. Compassionate care for your companions" />
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <TextField label="GSTIN" value={form.gstin} onChange={set("gstin")} size="small" fullWidth sx={fieldSx} />
        </Grid>
      </Grid>

      <SLabel label="Contact Details" />
      <Grid container spacing={2}>
        <Grid size={{xs:12, sm:6}}>
          <TextField label="Primary Phone *" value={form.phone} onChange={set("phone")} size="small" fullWidth sx={fieldSx} InputProps={{ startAdornment: adorn(<Phone />) }} />
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <TextField label="Alternate Phone" value={form.altPhone} onChange={set("altPhone")} size="small" fullWidth sx={fieldSx} InputProps={{ startAdornment: adorn(<Phone />) }} />
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <TextField label="Email Address *" value={form.email} onChange={set("email")} size="small" fullWidth sx={fieldSx} InputProps={{ startAdornment: adorn(<Email />) }} />
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <TextField label="Website" value={form.website} onChange={set("website")} size="small" fullWidth sx={fieldSx} InputProps={{ startAdornment: adorn(<Language />) }} />
        </Grid>
      </Grid>

      <SLabel label="Address" />
      <Grid container spacing={2}>
        <Grid size={{xs:12}}>
          <TextField label="Address Line 1 *" value={form.addressLine1} onChange={set("addressLine1")} size="small" fullWidth sx={fieldSx} InputProps={{ startAdornment: adorn(<LocationOn />) }} />
        </Grid>
        <Grid size={{xs:12}}>
          <TextField label="Address Line 2" value={form.addressLine2} onChange={set("addressLine2")} size="small" fullWidth sx={fieldSx} placeholder="Landmark, suite, floor…" />
        </Grid>
        <Grid size={{xs:12, sm:4}}><TextField label="City *"    value={form.city}    onChange={set("city")}    size="small" fullWidth sx={fieldSx} /></Grid>
        <Grid size={{xs:12, sm:4}}><TextField label="State"     value={form.state}   onChange={set("state")}   size="small" fullWidth sx={fieldSx} /></Grid>
        <Grid size={{xs:12, sm:2}}><TextField label="Pincode"   value={form.pincode} onChange={set("pincode")} size="small" fullWidth sx={fieldSx} /></Grid>
        <Grid size={{xs:12, sm:2}}><TextField label="Country"   value={form.country} onChange={set("country")} size="small" fullWidth sx={fieldSx} /></Grid>
      </Grid>

      <Stack direction="row" justifyContent="flex-end" mt={3}>
        <Button variant="contained" startIcon={<Save />}
          sx={{ bgcolor: COLOR, fontFamily: FONT, fontWeight: 700, borderRadius: "12px", textTransform: "none", px: 4, boxShadow: `0 4px 14px ${alpha(COLOR, 0.35)}`, "&:hover": { bgcolor: "#1D6258" } }}>
          Save Changes
        </Button>
      </Stack>
    </Box>
  );
};

export default OrgProfile;