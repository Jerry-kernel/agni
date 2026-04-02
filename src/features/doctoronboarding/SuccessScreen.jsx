import React from "react";
import { Box, Paper, Typography, Button, Stack, Avatar, Divider, alpha } from "@mui/material";
import { CheckCircle, Add, OpenInNew } from "@mui/icons-material";

const PRIMARY = "#1B5E8C";
const PRIM_DK = "#0D3D5F";
const FONT    = "'Nunito', sans-serif";

const SuccessScreen = ({ doctorName, doctorId, onReset }) => (
  <Box sx={{
    minHeight: "100vh",
    background: "linear-gradient(150deg, #E3F2FD 0%, #EDE7F6 55%, #E8F5E9 100%)",
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
        <Typography sx={{ position: "absolute", bottom: -4, right: -4, fontSize: "2rem", lineHeight: 1 }}>
          👨‍⚕️
        </Typography>
      </Box>

      <Typography variant="h4" sx={{ fontFamily: "'Playfair Display', serif", color: PRIM_DK, fontWeight: 800, mb: 0.5 }}>
        Doctor Registered!
      </Typography>
      <Typography sx={{ fontFamily: FONT, color: "text.secondary" }}>
        <strong style={{ color: "#1A2E22" }}>Dr. {doctorName || "Doctor"}</strong> has been successfully added to the system.
      </Typography>

      {doctorId && (
        <Box sx={{ mt: 2, px: 2.5, py: 1.5, borderRadius: "10px", bgcolor: alpha(PRIMARY, 0.06), border: `1px dashed ${alpha(PRIMARY, 0.3)}`, display: "inline-block" }}>
          <Typography variant="caption" sx={{ fontFamily: FONT, color: "text.secondary", display: "block" }}>Doctor ID</Typography>
          <Typography sx={{ fontFamily: FONT, fontWeight: 800, color: PRIM_DK, fontSize: "1rem", letterSpacing: "0.06em" }}>
            {doctorId}
          </Typography>
        </Box>
      )}

      <Divider sx={{ my: 3, borderColor: alpha(PRIMARY, 0.12) }} />

      <Stack spacing={1.5}>
        <Button variant="contained" startIcon={<Add />} onClick={onReset}
          sx={{ bgcolor: PRIMARY, fontFamily: FONT, fontWeight: 700, borderRadius: "12px", textTransform: "none", py: 1.2, "&:hover": { bgcolor: PRIM_DK } }}>
          Register Another Doctor
        </Button>
        <Button variant="outlined" endIcon={<OpenInNew />}
          sx={{ borderColor: alpha(PRIMARY, 0.35), color: PRIMARY, fontFamily: FONT, fontWeight: 600, borderRadius: "12px", textTransform: "none", py: 1.2, "&:hover": { borderColor: PRIMARY, bgcolor: alpha(PRIMARY, 0.04) } }}>
          View Doctor Profile
        </Button>
      </Stack>
    </Paper>
  </Box>
);

export default SuccessScreen;