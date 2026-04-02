import React from "react";
import {
  Drawer, Box, Stack, Avatar, Typography, Chip,
  IconButton, Divider, alpha, Button,
} from "@mui/material";
import {
  Close, Edit, Pets, Phone, Email, LocationOn,
  Vaccines, MonitorHeart, Scale, QrCode,
  CalendarMonth, Person,
} from "@mui/icons-material";

const FONT = "'Nunito', sans-serif";

const SPECIES_COLORS = {
  Dog:"#2A7F6F", Cat:"#7B5EA7", Bird:"#3A6186",
  Rabbit:"#A8505F", Fish:"#1D6E8A", Other:"#5A5A6E",
};

const VAX_COLORS = {
  Yes:     { bg:"#E8F5E9", color:"#2E7D32" },
  Partial: { bg:"#FFF8E1", color:"#F57F17" },
  No:      { bg:"#FFEBEE", color:"#C62828" },
  Unknown: { bg:"#F3F4F6", color:"#6B7280" },
};

const InfoRow = ({ icon, label, value }) => {
  if (!value) return null;
  return (
    <Stack direction="row" alignItems="flex-start" spacing={1.5} py={0.9}>
      <Box sx={{ color: "text.disabled", mt: 0.2, flexShrink: 0 }}>
        {React.cloneElement(icon, { sx: { fontSize: 17 } })}
      </Box>
      <Box>
        <Typography variant="caption" sx={{ fontFamily: FONT, color: "text.disabled", display: "block", lineHeight: 1 }}>
          {label}
        </Typography>
        <Typography sx={{ fontFamily: FONT, fontSize: "0.875rem", fontWeight: 600, color: "#1A2E22" }}>
          {value}
        </Typography>
      </Box>
    </Stack>
  );
};

const SectionHead = ({ label }) => (
  <Typography sx={{
    fontFamily: FONT, fontSize: "0.72rem", fontWeight: 800,
    color: "text.disabled", letterSpacing: "0.08em",
    textTransform: "uppercase", mt: 2.5, mb: 0.5,
  }}>
    {label}
  </Typography>
);

const PatientDrawer = ({ patient, open, onClose, onEdit }) => {
  if (!patient) return null;
  const color    = SPECIES_COLORS[patient.species] || "#2A7F6F";
  const vaxStyle = VAX_COLORS[patient.vaccinated]  || VAX_COLORS.Unknown;

  return (
    <Drawer anchor="right" open={open} onClose={onClose}
      PaperProps={{ sx: { width: { xs: "100vw", sm: 420 }, borderLeft: `1px solid ${alpha(color, 0.2)}` } }}>

      {/* Header */}
      <Box sx={{ bgcolor: alpha(color, 0.06), px: 3, pt: 3, pb: 2.5, borderBottom: `1px solid ${alpha(color, 0.12)}` }}>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{
              bgcolor: alpha(color, 0.14), width: 60, height: 60,
              fontSize: "2rem", border: `2px solid ${alpha(color, 0.25)}`,
            }}>
              {patient.emoji}
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={800} sx={{ fontFamily: FONT, color: "#1A2E22" }}>
                {patient.name}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontFamily: FONT }}>
                {patient.breed} · {patient.gender}
              </Typography>
              <Box mt={0.8}>
                <Chip label={patient.id} size="small" sx={{
                  height: 20, fontSize: "0.65rem", fontWeight: 700,
                  bgcolor: alpha(color, 0.1), color, fontFamily: FONT,
                }} />
              </Box>
            </Box>
          </Stack>
          <IconButton onClick={onClose} size="small">
            <Close fontSize="small" />
          </IconButton>
        </Stack>

        {/* Quick status chips */}
        <Stack direction="row" spacing={1} mt={2} flexWrap="wrap" gap={0.8}>
          <Chip label={`Vax: ${patient.vaccinated}`} size="small" sx={{
            height: 22, fontSize: "0.68rem", fontWeight: 700, fontFamily: FONT,
            bgcolor: vaxStyle.bg, color: vaxStyle.color,
          }} />
          <Chip label={patient.neutered === "Yes" ? "Neutered" : "Not Neutered"} size="small" sx={{
            height: 22, fontSize: "0.68rem", fontWeight: 700, fontFamily: FONT,
            bgcolor: patient.neutered === "Yes" ? "#E8F5E9" : "#F3F4F6",
            color: patient.neutered === "Yes" ? "#2E7D32" : "#6B7280",
          }} />
          <Chip
            label={patient.status}
            size="small"
            sx={{
              height: 22, fontSize: "0.68rem", fontWeight: 700, fontFamily: FONT,
              bgcolor: patient.status === "Active" ? alpha(color, 0.1) : "#F3F4F6",
              color: patient.status === "Active" ? color : "#6B7280",
            }}
          />
        </Stack>
      </Box>

      {/* Body */}
      <Box sx={{ px: 3, pb: 3, overflowY: "auto", flex: 1 }}>
        <SectionHead label="Pet Details" />
        <Divider sx={{ mb: 1 }} />
        <InfoRow icon={<Pets />}         label="Species / Breed"   value={`${patient.species} — ${patient.breed}`} />
        <InfoRow icon={<CalendarMonth />} label="Age / Date"        value={patient.age} />
        <InfoRow icon={<Scale />}         label="Weight"            value={patient.weight} />
        <InfoRow icon={<QrCode />}        label="Microchip ID"      value={patient.microchipId || "—"} />

        <SectionHead label="Owner Details" />
        <Divider sx={{ mb: 1 }} />
        <InfoRow icon={<Person />}        label="Owner Name"        value={patient.ownerName} />
        <InfoRow icon={<Phone />}         label="Contact"           value={patient.ownerContact} />
        <InfoRow icon={<Email />}         label="Email"             value={patient.ownerEmail || "—"} />
        <InfoRow icon={<LocationOn />}    label="City"              value={patient.city} />

        <SectionHead label="Medical Details" />
        <Divider sx={{ mb: 1 }} />
        <InfoRow icon={<Vaccines />}      label="Vaccination"       value={patient.vaccinated} />
        <InfoRow icon={<CalendarMonth />} label="Last Visit"        value={patient.lastVisit} />
        <InfoRow icon={<CalendarMonth />} label="Next Due"          value={patient.nextDue || "—"} />
        <InfoRow icon={<MonitorHeart />}  label="Blood Group"       value={patient.bloodGroup} />
        <InfoRow icon={<MonitorHeart />}  label="Conditions"        value={patient.conditions} />
      </Box>

      {/* Footer action */}
      <Box sx={{ px: 3, py: 2, borderTop: `1px solid ${alpha(color, 0.12)}` }}>
        <Button fullWidth variant="contained" startIcon={<Edit />} onClick={() => onEdit(patient)}
          sx={{
            bgcolor: color, fontFamily: FONT, fontWeight: 700,
            borderRadius: "12px", textTransform: "none",
            "&:hover": { filter: "brightness(0.9)" },
          }}>
          Edit Patient Record
        </Button>
      </Box>
    </Drawer>
  );
};

export default PatientDrawer;