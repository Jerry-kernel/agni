import React from "react";
import { TextField, Box, Stack, Avatar, Typography, alpha } from "@mui/material";

const PRIMARY = "#1B5E8C";
const FONT    = "'Nunito', sans-serif";

// ── DocField ──────────────────────────────────────────────────────────────────
export const DocField = React.forwardRef(function DocField({ color = PRIMARY, sx, ...props }, ref) {
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
          backgroundColor: alpha(color, 0.03),
          "&:hover fieldset":       { borderColor: alpha(color, 0.4) },
          "&.Mui-focused fieldset": { borderColor: color, borderWidth: "1.5px" },
          "&.Mui-focused":          { boxShadow: `0 0 0 3px ${alpha(color, 0.1)}` },
          "&.Mui-error fieldset":   { borderColor: "#d32f2f" },
        },
        "& .MuiInputLabel-root":             { fontFamily: FONT, fontSize: "0.875rem" },
        "& .MuiInputLabel-root.Mui-focused": { color },
        "& .MuiFormHelperText-root":          { fontFamily: FONT, fontSize: "0.72rem" },
        ...sx,
      }}
      {...props}
    />
  );
});

// ── SectionLabel ──────────────────────────────────────────────────────────────
export const SectionLabel = ({ icon, label, subtitle, color = PRIMARY }) => (
  <Stack spacing={0} mb={2.5} mt={0.5}>
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

// ── DayToggle ─────────────────────────────────────────────────────────────────
export const DayToggle = ({ day, selected, onClick, color = PRIMARY }) => (
  <Box
    role="button" tabIndex={0} aria-pressed={selected}
    onClick={() => onClick(day)}
    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick(day)}
    sx={{
      width: 44, height: 44, borderRadius: "12px",
      display: "flex", alignItems: "center", justifyContent: "center",
      cursor: "pointer", userSelect: "none",
      border: "2px solid",
      borderColor: selected ? color : alpha("#000", 0.1),
      bgcolor:     selected ? alpha(color, 0.1) : "transparent",
      boxShadow:   selected ? `0 0 0 3px ${alpha(color, 0.15)}` : "none",
      transition: "all 0.18s ease",
      "&:hover": { borderColor: color, bgcolor: alpha(color, 0.06) },
      "&:focus-visible": { outline: `2px solid ${color}`, outlineOffset: 2 },
    }}
  >
    <Typography sx={{ fontFamily: FONT, fontSize: "0.72rem", fontWeight: selected ? 800 : 600, color: selected ? color : "text.secondary" }}>
      {day}
    </Typography>
  </Box>
);

// ── MultiChipSelect ───────────────────────────────────────────────────────────
export const MultiChipSelect = ({ options, selected = [], onChange, color = PRIMARY }) => (
  <Stack direction="row" flexWrap="wrap" gap={0.8}>
    {options.map((opt) => {
      const isSelected = selected.includes(opt);
      return (
        <Box
          key={opt}
          role="button" tabIndex={0} aria-pressed={isSelected}
          onClick={() => onChange(isSelected ? selected.filter((s) => s !== opt) : [...selected, opt])}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onChange(isSelected ? selected.filter((s) => s !== opt) : [...selected, opt])}
          sx={{
            px: 1.5, py: 0.6, borderRadius: "20px", cursor: "pointer",
            border: "1.5px solid",
            borderColor: isSelected ? color : alpha("#000", 0.12),
            bgcolor:     isSelected ? alpha(color, 0.1) : "transparent",
            transition: "all 0.15s",
            "&:hover": { borderColor: color },
          }}
        >
          <Typography sx={{ fontFamily: FONT, fontSize: "0.78rem", fontWeight: isSelected ? 700 : 500, color: isSelected ? color : "text.secondary" }}>
            {opt}
          </Typography>
        </Box>
      );
    })}
  </Stack>
);