import React from "react";
import {
  Paper, Stack, Avatar, Typography, Chip,
  IconButton, Tooltip, Box, alpha, Divider,
} from "@mui/material";
import {
  Star, Visibility, Edit, Phone,
  Circle, CalendarMonth, Groups,
} from "@mui/icons-material";

const PRIMARY = "#1B5E8C";
const FONT    = "'Nunito', sans-serif";

const SPEC_COLORS = {
  "Small Animal Medicine":       "#2A7F6F",
  "Veterinary Surgery":          "#A8505F",
  "Avian Medicine":              "#3A6186",
  "Veterinary Dermatology":      "#7B5EA7",
  "General Veterinary Practice": "#1B5E8C",
  "Veterinary Dentistry":        "#8B6914",
  "Exotic Animal Medicine":      "#1A6E6E",
  "Veterinary Radiology":        "#4A5568",
};

const AVATAR_COLORS = [
  "#1B5E8C","#2A7F6F","#7B5EA7","#A8505F",
  "#3A6186","#8B6914","#1A6E6E","#4A5568",
];

const DoctorCard = ({ doctor, index, onView, onEdit }) => {
  const color     = SPEC_COLORS[doctor.specialization] || PRIMARY;
  const avatarBg  = AVATAR_COLORS[index % AVATAR_COLORS.length];
  const isActive  = doctor.status === "Active";

  return (
    <Paper elevation={0} sx={{
      borderRadius: "16px", overflow: "hidden",
      border: "1.5px solid", borderColor: alpha(color, 0.2),
      transition: "all 0.22s ease",
      cursor: "pointer",
      "&:hover": {
        borderColor: alpha(color, 0.45),
        boxShadow: `0 8px 28px ${alpha(color, 0.14)}`,
        transform: "translateY(-3px)",
      },
    }}
      onClick={() => onView(doctor)}
    >
      {/* Top accent */}
      <Box sx={{ height: 4, background: `linear-gradient(90deg, ${color}, ${alpha(color, 0.4)})` }} />

      <Box sx={{ p: 2.5 }}>
        {/* Header */}
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" mb={2}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Avatar sx={{
              bgcolor: avatarBg, width: 50, height: 50,
              fontSize: "1.1rem", fontWeight: 800, fontFamily: FONT,
              border: `2px solid ${alpha(avatarBg, 0.3)}`,
            }}>
              {doctor.avatar}
            </Avatar>
            <Box>
              <Typography fontWeight={800} sx={{ fontFamily: FONT, fontSize: "0.95rem", color: "#1A2E22", lineHeight: 1.2 }}>
                Dr. {doctor.firstName} {doctor.lastName}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontFamily: FONT }}>
                {doctor.qualification} · {doctor.experience}y exp
              </Typography>
            </Box>
          </Stack>

          {/* Actions */}
          <Stack direction="row" spacing={0.3} onClick={(e) => e.stopPropagation()}>
            <Tooltip title="View Profile" arrow>
              <IconButton size="small" onClick={() => onView(doctor)}
                sx={{ color, "&:hover": { bgcolor: alpha(color, 0.1) } }}>
                <Visibility sx={{ fontSize: 17 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit" arrow>
              <IconButton size="small" onClick={() => onEdit(doctor)}
                sx={{ color: "text.secondary", "&:hover": { bgcolor: alpha("#000", 0.05) } }}>
                <Edit sx={{ fontSize: 17 }} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        {/* Specialization chip */}
        <Chip label={doctor.specialization} size="small" sx={{
          mb: 1.5, bgcolor: alpha(color, 0.09), color,
          fontWeight: 700, fontFamily: FONT, fontSize: "0.7rem", height: 22,
          maxWidth: "100%",
        }} />

        {/* Dept + employment */}
        <Typography variant="caption" color="text.secondary" sx={{ fontFamily: FONT, display: "block", mb: 1.5, fontSize: "0.76rem" }}>
          {doctor.department} · {doctor.employmentType}
        </Typography>

        {/* Phone */}
        <Stack direction="row" alignItems="center" spacing={0.8} mb={2}>
          <Phone sx={{ fontSize: 13, color: "text.disabled" }} />
          <Typography variant="caption" sx={{ fontFamily: FONT, color: "text.secondary", fontWeight: 600 }}>
            {doctor.phone}
          </Typography>
        </Stack>

        <Divider sx={{ borderColor: alpha(color, 0.1), mb: 2 }} />

        {/* Stats row */}
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Star sx={{ fontSize: 14, color: "#F59E0B" }} />
            <Typography fontWeight={800} sx={{ fontFamily: FONT, fontSize: "0.83rem", color: "#1A2E22" }}>
              {doctor.rating}
            </Typography>
            <Typography variant="caption" color="text.disabled" sx={{ fontFamily: FONT }}>
              ({doctor.reviews})
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Groups sx={{ fontSize: 14, color: "text.disabled" }} />
            <Typography variant="caption" fontWeight={700} sx={{ fontFamily: FONT, color: "text.secondary" }}>
              {doctor.totalPatients} patients
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Circle sx={{ fontSize: 8, color: isActive ? "#2E7D32" : "#9E9E9E" }} />
            <Typography variant="caption" fontWeight={700} sx={{ fontFamily: FONT, color: isActive ? "#2E7D32" : "#9E9E9E", fontSize: "0.72rem" }}>
              {doctor.status}
            </Typography>
          </Stack>
        </Stack>

        {/* Today chip */}
        {doctor.appointmentsToday > 0 && (
          <Box mt={1.5}>
            <Chip
              icon={<CalendarMonth sx={{ fontSize: "12px !important" }} />}
              label={`${doctor.appointmentsToday} appts today`}
              size="small"
              sx={{ bgcolor: alpha(color, 0.07), color, fontWeight: 700, fontFamily: FONT, fontSize: "0.68rem", height: 22 }}
            />
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default DoctorCard;