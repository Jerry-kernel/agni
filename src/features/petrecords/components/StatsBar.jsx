import React from "react";
import { Grid, Paper, Stack, Typography, Avatar, alpha } from "@mui/material";
import { Pets, Vaccines, MonitorHeart, TrendingUp } from "@mui/icons-material";
import { MOCK_PATIENTS } from "../constants/mockData";

const FONT = "'Nunito', sans-serif";

const StatCard = ({ icon, label, value, color }) => (
  <Paper elevation={0} sx={{
    p: 2, borderRadius: "14px",
    border: "1.5px solid", borderColor: alpha(color, 0.18),
    bgcolor: alpha(color, 0.04),
  }}>
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <Avatar sx={{ bgcolor: alpha(color, 0.14), color, width: 40, height: 40 }}>
        {React.cloneElement(icon, { fontSize: "small" })}
      </Avatar>
      <Box>
        <Typography variant="h6" fontWeight={800} sx={{ fontFamily: FONT, color, lineHeight: 1 }}>
          {value}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ fontFamily: FONT }}>
          {label}
        </Typography>
      </Box>
    </Stack>
  </Paper>
);

import { Box } from "@mui/material";

const StatsBar = () => {
  const total     = MOCK_PATIENTS.length;
  const active    = MOCK_PATIENTS.filter((p) => p.status === "Active").length;
  const vaccinated= MOCK_PATIENTS.filter((p) => p.vaccinated === "Yes").length;
  const withConds = MOCK_PATIENTS.filter((p) => p.conditions && p.conditions !== "None").length;

  return (
    <Grid container spacing={2} mb={3}>
      <Grid size={{xs:6, sm:3}}><StatCard icon={<Pets />}        label="Total Patients"   value={total}      color="#2A7F6F" /></Grid>
      <Grid size={{xs:6, sm:3}}><StatCard icon={<TrendingUp />}  label="Active"           value={active}     color="#3A6186" /></Grid>
      <Grid size={{xs:6, sm:3}}><StatCard icon={<Vaccines />}    label="Vaccinated"       value={vaccinated} color="#1D6E4A" /></Grid>
      <Grid size={{xs:6, sm:3}}><StatCard icon={<MonitorHeart />}label="With Conditions"  value={withConds}  color="#A8505F" /></Grid>
    </Grid>
  );
};

export default StatsBar;