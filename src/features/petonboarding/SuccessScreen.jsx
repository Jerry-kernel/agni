import React from "react";
import { Box, Paper, Typography, Button, Stack, Avatar, Divider, alpha } from "@mui/material";
import { CheckCircle, Add, OpenInNew } from "@mui/icons-material";

const PRIMARY  = "#2A7F6F";
const PRIM_DK  = "#1D6258";
const FONT     = "'Nunito', sans-serif";

const SuccessScreen = ({ petName, patientId, onReset }) => (
  <Box sx={{
    minHeight: "100vh",
    background: "linear-gradient(150deg, #EAF5F2 0%, #EDF5FB 55%, #F5F0FA 100%)",
    display: "flex", alignItems: "center", justifyContent: "center", p: 2,
  }}>
    <Paper elevation={0} sx={{
      textAlign: "center", p: { xs: 4, sm: 6 },
      borderRadius: "24px", maxWidth: 440, width: "100%",
      border: `2px solid ${alpha(PRIMARY, 0.18)}`,
      boxShadow: `0 12px 48px ${alpha(PRIMARY, 0.09)}`,
    }}>
      <Box sx={{ position: "relative", display: "inline-flex", mb: 2.5 }}>
        <Avatar sx={{ bgcolor: alpha(PRIMARY, 0.1), width: 88, height: 88, boxShadow: `0 0 0 10px ${alpha(PRIMARY, 0.07)}` }}>
          <CheckCircle sx={{ fontSize: 50, color: PRIMARY }} />
        </Avatar>
        <Typography sx={{ position: "absolute", bottom: -4, right: -4, fontSize: "2rem", lineHeight: 1 }}>🐾</Typography>
      </Box>

      <Typography variant="h4" sx={{ fontFamily: "'Playfair Display', serif", color: PRIM_DK, fontWeight: 800, mb: 0.5 }}>
        Registered!
      </Typography>
      <Typography sx={{ fontFamily: FONT, color: "text.secondary" }}>
        <strong style={{ color: "#1A2E22" }}>{petName || "Your pet"}</strong> has been added as a patient.
      </Typography>

      {patientId && (
        <Box sx={{ mt: 2, px: 2.5, py: 1.5, borderRadius: "10px", bgcolor: alpha(PRIMARY, 0.06), border: `1px dashed ${alpha(PRIMARY, 0.3)}`, display: "inline-block" }}>
          <Typography variant="caption" sx={{ fontFamily: FONT, color: "text.secondary", display: "block" }}>Patient ID</Typography>
          <Typography sx={{ fontFamily: FONT, fontWeight: 800, color: PRIM_DK, fontSize: "1rem", letterSpacing: "0.06em" }}>
            {patientId}
          </Typography>
        </Box>
      )}

      <Divider sx={{ my: 3, borderColor: alpha(PRIMARY, 0.12) }} />

      <Stack spacing={1.5}>
        <Button variant="contained" startIcon={<Add />} onClick={onReset}
          sx={{ bgcolor: PRIMARY, fontFamily: FONT, fontWeight: 700, borderRadius: "12px", textTransform: "none", py: 1.2, "&:hover": { bgcolor: PRIM_DK } }}>
          Register Another Pet
        </Button>
        <Button variant="outlined" endIcon={<OpenInNew />}
          sx={{ borderColor: alpha(PRIMARY, 0.35), color: PRIMARY, fontFamily: FONT, fontWeight: 600, borderRadius: "12px", textTransform: "none", py: 1.2, "&:hover": { borderColor: PRIMARY, bgcolor: alpha(PRIMARY, 0.04) } }}>
          View Patient Record
        </Button>
      </Stack>
    </Paper>
  </Box>
);

export default SuccessScreen;