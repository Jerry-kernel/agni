import React from "react";
import { Stack, Typography, Box, alpha } from "@mui/material";

const FONT = "'Nunito', sans-serif";

export const InfoRow = ({ icon, label, value, color = "#1B5E8C" }) => {
  if (!value) return null;
  return (
    <Stack direction="row" alignItems="flex-start" spacing={1.5} py={1}
      sx={{ borderBottom: "1px solid", borderColor: alpha(color, 0.07) }}>
      <Box sx={{ color: alpha(color, 0.5), mt: 0.2, flexShrink: 0 }}>
        {React.cloneElement(icon, { sx: { fontSize: 17 } })}
      </Box>
      <Box flex={1}>
        <Typography variant="caption" sx={{ fontFamily: FONT, color: "text.disabled", display: "block", lineHeight: 1, mb: 0.2 }}>
          {label}
        </Typography>
        <Typography sx={{ fontFamily: FONT, fontSize: "0.875rem", fontWeight: 600, color: "#1A2E22" }}>
          {value}
        </Typography>
      </Box>
    </Stack>
  );
};

export const SectionHead = ({ label, color = "#1B5E8C" }) => (
  <Typography sx={{
    fontFamily: FONT, fontSize: "0.7rem", fontWeight: 800,
    color: "text.disabled", letterSpacing: "0.08em",
    textTransform: "uppercase", mt: 3, mb: 1,
  }}>
    {label}
  </Typography>
);

export const StatCard = ({ value, label, color }) => (
  <Box sx={{
    textAlign: "center", px: 2.5, py: 2,
    borderRadius: "14px", border: "1.5px solid",
    borderColor: alpha(color, 0.2),
    bgcolor: alpha(color, 0.05), flex: 1,
  }}>
    <Typography variant="h5" fontWeight={800} sx={{ fontFamily: FONT, color, lineHeight: 1 }}>
      {value}
    </Typography>
    <Typography variant="caption" color="text.secondary" sx={{ fontFamily: FONT, mt: 0.3, display: "block" }}>
      {label}
    </Typography>
  </Box>
);