import React from "react";
import { Grid, Paper, Stack, Avatar, Typography, alpha } from "@mui/material";
import { Groups, CheckCircle, WorkspacePremium, Star } from "@mui/icons-material";

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
      <Stack>
        <Typography variant="h6" fontWeight={800} sx={{ fontFamily: FONT, color, lineHeight: 1 }}>
          {value}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ fontFamily: FONT }}>
          {label}
        </Typography>
      </Stack>
    </Stack>
  </Paper>
);

const StatsBar = ({ stats }) => (
  <Grid container spacing={2} mb={3}>
    <Grid size={{xs:6, sm:3}}><StatCard icon={<Groups />}           label="Total Doctors"   value={stats.total}     color="#1B5E8C" /></Grid>
    <Grid size={{xs:6, sm:3}}><StatCard icon={<CheckCircle />}      label="Active"          value={stats.active}    color="#2A7F6F" /></Grid>
    <Grid size={{xs:6, sm:3}}><StatCard icon={<WorkspacePremium />} label="Full-time"       value={stats.fullTime}  color="#7B5EA7" /></Grid>
    <Grid size={{xs:6, sm:3}}><StatCard icon={<Star />}             label="Avg. Rating"     value={stats.avgRating} color="#E8A838" /></Grid>
  </Grid>
);

export default StatsBar;