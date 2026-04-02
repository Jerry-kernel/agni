import React from "react";
import { Stack, Button, Box, CircularProgress, alpha } from "@mui/material";
import { ArrowBack, ArrowForward, CheckCircle } from "@mui/icons-material";
import { STEPS } from "../constants/options";

const PRIMARY  = "#1B5E8C";
const PRIM_DK  = "#0D3D5F";
const AMBER    = "#E8A838";
const AMBER_DK = "#CF912E";
const FONT     = "'Nunito', sans-serif";

const FormNav = ({ step, isFirstStep, isLastStep, submitting, onBack, onNext, onSubmit }) => (
  <Stack direction="row" justifyContent="space-between" alignItems="center" mt={4} pt={3}
    sx={{ borderTop: `1px solid ${alpha(PRIMARY, 0.1)}` }}>

    <Button onClick={onBack} disabled={isFirstStep} startIcon={<ArrowBack />}
      sx={{ color: PRIMARY, px: 3, fontFamily: FONT, fontWeight: 700, borderRadius: "12px", textTransform: "none",
        "&:hover": { bgcolor: alpha(PRIMARY, 0.06) },
        "&.Mui-disabled": { color: alpha(PRIMARY, 0.3) },
      }}>
      Back
    </Button>

    {/* Progress pills */}
    <Stack direction="row" spacing={0.8} alignItems="center">
      {STEPS.map((_, i) => (
        <Box key={i} sx={{
          height: 8, borderRadius: 4,
          width: i === step ? 22 : 8,
          bgcolor: i === step ? PRIMARY : i < step ? alpha(PRIMARY, 0.35) : alpha(PRIMARY, 0.12),
          transition: "all 0.3s ease",
        }} />
      ))}
    </Stack>

    {isLastStep ? (
      <Button onClick={onSubmit} disabled={submitting} variant="contained"
        endIcon={submitting ? <CircularProgress size={15} color="inherit" /> : <CheckCircle />}
        sx={{
          bgcolor: AMBER, color: "#fff", px: 3, minWidth: 160,
          fontFamily: FONT, fontWeight: 700, borderRadius: "12px", textTransform: "none",
          boxShadow: `0 4px 14px ${alpha(AMBER, 0.38)}`,
          "&:hover": { bgcolor: AMBER_DK },
          "&.Mui-disabled": { bgcolor: alpha(AMBER, 0.5), color: "#fff" },
        }}>
        {submitting ? "Registering…" : "Register Doctor"}
      </Button>
    ) : (
      <Button onClick={onNext} variant="contained" endIcon={<ArrowForward />}
        sx={{
          bgcolor: PRIMARY, px: 3, minWidth: 130,
          fontFamily: FONT, fontWeight: 700, borderRadius: "12px", textTransform: "none",
          boxShadow: `0 4px 14px ${alpha(PRIMARY, 0.3)}`,
          "&:hover": { bgcolor: PRIM_DK },
        }}>
        Continue
      </Button>
    )}
  </Stack>
);

export default FormNav;