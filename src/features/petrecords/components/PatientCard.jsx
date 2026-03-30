import React from "react";
import {
  Box, Paper, Stack, Avatar, Typography, Chip,
  IconButton, Tooltip, alpha,
} from "@mui/material";
import {
  Visibility, Edit, Phone, LocationOn,
  Vaccines, MonitorHeart,
} from "@mui/icons-material";

const PRIMARY = "#2A7F6F";
const FONT    = "'Nunito', sans-serif";

const SPECIES_COLORS = {
  Dog:     "#2A7F6F",
  Cat:     "#7B5EA7",
  Bird:    "#3A6186",
  Rabbit:  "#A8505F",
  Fish:    "#1D6E8A",
  Hamster: "#B06B2A",
  Reptile: "#4A7A3A",
  Other:   "#5A5A6E",
};

const VAX_COLORS = {
  Yes:     { bg: "#E8F5E9", color: "#2E7D32" },
  Partial: { bg: "#FFF8E1", color: "#F57F17" },
  No:      { bg: "#FFEBEE", color: "#C62828" },
  Unknown: { bg: "#F3F4F6", color: "#6B7280" },
};

const PatientCard = ({ patient, onView, onEdit }) => {
  const accentColor = SPECIES_COLORS[patient.species] || PRIMARY;
  const vaxStyle    = VAX_COLORS[patient.vaccinated]  || VAX_COLORS.Unknown;

  return (
    <Paper elevation={0} sx={{
      borderRadius: "16px",
      border: "1.5px solid",
      borderColor: alpha(accentColor, 0.18),
      overflow: "hidden",
      transition: "all 0.22s ease",
      "&:hover": {
        borderColor: alpha(accentColor, 0.4),
        boxShadow: `0 6px 24px ${alpha(accentColor, 0.12)}`,
        transform: "translateY(-2px)",
      },
    }}>
      {/* Top accent bar */}
      <Box sx={{ height: 4, bgcolor: accentColor, opacity: 0.7 }} />

      <Box sx={{ p: 2.5 }}>
        {/* Header row */}
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" mb={2}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Avatar sx={{
              bgcolor: alpha(accentColor, 0.12),
              width: 48, height: 48, fontSize: "1.6rem",
              border: `2px solid ${alpha(accentColor, 0.2)}`,
            }}>
              {patient.emoji}
            </Avatar>
            <Box>
              <Typography fontWeight={800} sx={{ fontFamily: FONT, fontSize: "1rem", color: "#1A2E22", lineHeight: 1.2 }}>
                {patient.name}
              </Typography>
              <Typography variant="caption" sx={{ fontFamily: FONT, color: "text.secondary" }}>
                {patient.breed} · {patient.age}
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={0.5}>
            <Tooltip title="View Details" arrow>
              <IconButton size="small" onClick={() => onView(patient)}
                sx={{ color: accentColor, "&:hover": { bgcolor: alpha(accentColor, 0.1) } }}>
                <Visibility fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit Record" arrow>
              <IconButton size="small" onClick={() => onEdit(patient)}
                sx={{ color: "text.secondary", "&:hover": { bgcolor: alpha("#000", 0.05) } }}>
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        {/* Info rows */}
        <Stack spacing={0.8} mb={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Phone sx={{ fontSize: 14, color: "text.disabled" }} />
            <Typography variant="caption" sx={{ fontFamily: FONT, color: "text.secondary" }}>
              <strong style={{ color: "#1A2E22" }}>{patient.ownerName}</strong> · {patient.ownerContact}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <LocationOn sx={{ fontSize: 14, color: "text.disabled" }} />
            <Typography variant="caption" sx={{ fontFamily: FONT, color: "text.secondary" }}>
              {patient.city} · {patient.gender}
            </Typography>
          </Stack>
          {patient.conditions && patient.conditions !== "None" && (
            <Stack direction="row" alignItems="center" spacing={1}>
              <MonitorHeart sx={{ fontSize: 14, color: "#C62828" }} />
              <Typography variant="caption" sx={{ fontFamily: FONT, color: "#C62828", fontWeight: 600 }}>
                {patient.conditions}
              </Typography>
            </Stack>
          )}
        </Stack>

        {/* Footer chips */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={0.8}>
          <Stack direction="row" spacing={0.8}>
            <Chip
              icon={<Vaccines sx={{ fontSize: "13px !important" }} />}
              label={patient.vaccinated}
              size="small"
              sx={{
                height: 22, fontSize: "0.68rem", fontWeight: 700,
                fontFamily: FONT,
                bgcolor: vaxStyle.bg, color: vaxStyle.color,
                "& .MuiChip-icon": { color: vaxStyle.color },
              }}
            />
            <Chip
              label={patient.species}
              size="small"
              sx={{
                height: 22, fontSize: "0.68rem", fontWeight: 700,
                fontFamily: FONT,
                bgcolor: alpha(accentColor, 0.1), color: accentColor,
              }}
            />
          </Stack>

          <Typography variant="caption" sx={{ fontFamily: FONT, color: "text.disabled", fontSize: "0.68rem" }}>
            {patient.id}
          </Typography>
        </Stack>
      </Box>
    </Paper>
  );
};

export default PatientCard;