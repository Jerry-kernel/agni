import React from "react";
import { TextField, Box, Stack, Avatar, Typography, alpha } from "@mui/material";

const PRIMARY = "#2A7F6F";
const FONT    = "'Nunito', sans-serif";

// ── VetField ──────────────────────────────────────────────────────────────────
export const VetField = React.forwardRef(function VetField(props, ref) {
  return (
    <TextField
      ref={ref}
      variant="outlined"
      size="small"
      fullWidth
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
          fontFamily: FONT,
          fontSize: "0.875rem",
          backgroundColor: alpha(PRIMARY, 0.025),
          "&:hover fieldset":       { borderColor: alpha(PRIMARY, 0.4) },
          "&.Mui-focused fieldset": { borderColor: PRIMARY, borderWidth: "1.5px" },
          "&.Mui-focused":          { boxShadow: `0 0 0 3px ${alpha(PRIMARY, 0.12)}` },
        },
        "& .MuiInputLabel-root":             { fontFamily: FONT, fontSize: "0.875rem" },
        "& .MuiInputLabel-root.Mui-focused": { color: PRIMARY },
        "& .MuiFormHelperText-root":          { fontFamily: FONT, fontSize: "0.72rem" },
        ...props.sx,
      }}
      {...props}
    />
  );
});

// ── SectionLabel ──────────────────────────────────────────────────────────────
export const SectionLabel = ({ icon, label, subtitle, color = PRIMARY }) => (
  <Stack spacing={0} mb={3} mt={0.5}>
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <Avatar sx={{ bgcolor: alpha(color, 0.12), color, width: 36, height: 36 }}>
        {React.cloneElement(icon, { sx: { fontSize: 19 } })}
      </Avatar>
      <Typography fontWeight={700} sx={{ fontFamily: FONT, color, fontSize: "1.02rem" }}>
        {label}
      </Typography>
      <Box flex={1} height="1.5px" bgcolor={alpha(color, 0.15)} borderRadius={1} />
    </Stack>
    {subtitle && (
      <Typography variant="caption" color="text.secondary" sx={{ fontFamily: FONT, pl: 6.5, mt: 0.3 }}>
        {subtitle}
      </Typography>
    )}
  </Stack>
);

// ── SpeciesCard ───────────────────────────────────────────────────────────────
export const SpeciesCard = ({ item, selected, onClick }) => (
  <Box
    role="button" tabIndex={0} aria-pressed={selected}
    onClick={() => onClick(item.value)}
    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick(item.value)}
    sx={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", border: "2px solid", borderRadius: "12px",
      py: 1.5, cursor: "pointer", userSelect: "none",
      borderColor: selected ? PRIMARY : alpha("#000", 0.1),
      bgcolor:     selected ? alpha(PRIMARY, 0.07) : "transparent",
      boxShadow:   selected ? `0 0 0 3px ${alpha(PRIMARY, 0.18)}` : "none",
      transition: "all 0.18s ease",
      "&:hover": { borderColor: PRIMARY, bgcolor: alpha(PRIMARY, 0.04) },
      "&:focus-visible": { outline: `2px solid ${PRIMARY}`, outlineOffset: 2 },
    }}
  >
    <Typography fontSize="1.5rem" lineHeight={1}>{item.emoji}</Typography>
    <Typography sx={{ fontFamily: FONT, fontSize: "0.7rem", fontWeight: selected ? 800 : 500, color: selected ? PRIMARY : "text.secondary", mt: 0.5 }}>
      {item.value}
    </Typography>
  </Box>
);