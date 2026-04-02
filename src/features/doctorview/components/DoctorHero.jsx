import React from "react";
import {
  Box, Stack, Avatar, Typography, Chip, Button,
  IconButton, Tooltip, alpha,
} from "@mui/material";
import {
  Edit, Star, Phone, Email, Badge,
  VerifiedUser, Circle,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const PRIMARY = "#1B5E8C";
const FONT    = "'Nunito', sans-serif";

const DoctorHero = ({ doctor, onToggleStatus }) => {
  const navigate = useNavigate();
  const isActive = doctor.status === "Active";

  return (
    <Box sx={{
      borderRadius: "20px",
      overflow: "hidden",
      border: `1.5px solid ${alpha(PRIMARY, 0.15)}`,
      boxShadow: `0 8px 32px ${alpha(PRIMARY, 0.1)}`,
      mb: 3,
    }}>
      {/* Banner */}
      <Box sx={{
        height: 110,
        // background: `linear-gradient(135deg, ${PRIMARY} 0%, #0D3D5F 60%, #7B5EA7 100%)`,
        position: "relative",
      }}>
        {/* Edit button */}
        <Stack direction="row" spacing={1} sx={{ position: "absolute", top: 14, right: 14 }}>
          <Tooltip title="Edit Profile" arrow>
            <IconButton
              size="small"
              onClick={() => navigate(`/doctors/${doctor.id}/edit`)}
              sx={{ bgcolor: "rgba(255,255,255,0.15)", color: "#fff", "&:hover": { bgcolor: "rgba(255,255,255,0.25)" } }}
            >
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      {/* Profile content */}
      <Box sx={{ bgcolor: "white", px: { xs: 2.5, sm: 3.5 }, pb: 3 }}>
        <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "center", sm: "flex-end" }} spacing={2.5} sx={{ mt: "-42px", mb: 2.5 }}>
          {/* Avatar */}
          <Avatar sx={{
            width: 84, height: 84, fontSize: "2rem",
            bgcolor: alpha(PRIMARY, 0.12), color: PRIMARY,
            border: "4px solid white",
            boxShadow: `0 4px 16px ${alpha(PRIMARY, 0.2)}`,
            flexShrink: 0,
          }}>
            👨‍⚕️
          </Avatar>

          {/* Name + meta */}
          <Box flex={1} sx={{ textAlign: { xs: "center", sm: "left" } }}>
            <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap" justifyContent={{ xs: "center", sm: "flex-start" }}>
              <Typography variant="h5" fontWeight={800} sx={{ fontFamily: "'Playfair Display', serif", color: "#1A2E22" }}>
                Dr. {doctor.firstName} {doctor.lastName}
              </Typography>
              <VerifiedUser sx={{ fontSize: 18, color: PRIMARY }} />
            </Stack>
            <Typography sx={{ fontFamily: FONT, color: "text.secondary", fontSize: "0.9rem" }}>
              {doctor.designation} · {doctor.specialization}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1} mt={0.8} flexWrap="wrap" justifyContent={{ xs: "center", sm: "flex-start" }}>
              <Chip label={doctor.department} size="small"
                sx={{ bgcolor: alpha(PRIMARY, 0.09), color: PRIMARY, fontWeight: 700, fontFamily: FONT, height: 22 }} />
              <Chip label={doctor.employmentType} size="small"
                sx={{ bgcolor: alpha("#7B5EA7", 0.09), color: "#7B5EA7", fontWeight: 700, fontFamily: FONT, height: 22 }} />
              <Chip label={`${doctor.experience} yrs exp`} size="small"
                sx={{ bgcolor: alpha("#2A7F6F", 0.09), color: "#2A7F6F", fontWeight: 700, fontFamily: FONT, height: 22 }} />
            </Stack>
          </Box>

          {/* Status + rating */}
          <Stack alignItems={{ xs: "center", sm: "flex-end" }} spacing={1}>
            {/* Rating */}
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Star sx={{ fontSize: 16, color: "#F59E0B" }} />
              <Typography fontWeight={800} sx={{ fontFamily: FONT, fontSize: "0.95rem", color: "#1A2E22" }}>
                {doctor.rating}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontFamily: FONT }}>
                ({doctor.reviews} reviews)
              </Typography>
            </Stack>

            {/* Status toggle */}
            <Chip
              icon={<Circle sx={{ fontSize: "8px !important" }} />}
              label={doctor.status}
              onClick={onToggleStatus}
              size="small"
              sx={{
                bgcolor: isActive ? alpha("#2E7D32", 0.1) : alpha("#9E9E9E", 0.1),
                color:   isActive ? "#2E7D32" : "#757575",
                fontWeight: 700, fontFamily: FONT, cursor: "pointer", height: 26,
                "& .MuiChip-icon": { color: isActive ? "#2E7D32" : "#9E9E9E" },
                "&:hover": { opacity: 0.85 },
              }}
            />
          </Stack>
        </Stack>

        {/* Contact strip */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{
          pt: 2, borderTop: `1px solid ${alpha(PRIMARY, 0.08)}`,
        }}>
          {[
            { icon: <Badge />,  label: doctor.id            },
            { icon: <Phone />,  label: doctor.phone         },
            { icon: <Email />,  label: doctor.email         },
          ].map(({ icon, label }) => (
            <Stack key={label} direction="row" alignItems="center" spacing={1}>
              {React.cloneElement(icon, { sx: { fontSize: 15, color: alpha(PRIMARY, 0.5) } })}
              <Typography variant="caption" sx={{ fontFamily: FONT, color: "text.secondary", fontWeight: 600 }}>
                {label}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default DoctorHero;