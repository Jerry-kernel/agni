import React from "react";
import {
  Grid, Stack, Typography, Switch, Paper,
  alpha, Chip,
} from "@mui/material";
import { CalendarMonth, WbSunny, NightsStay } from "@mui/icons-material";
import { DocField, SectionLabel, DayToggle } from "../components/Atoms";
import { DAYS } from "../constants/options";

const COLOR = "#3A6186";
const FONT  = "'Nunito', sans-serif";

const AvailabilityStep = ({ data, errors, setField }) => {
  const bind = (name) => ({
    value: data[name] ?? "",
    onChange: (e) => setField(name, e.target.value),
    color: COLOR,
  });

  const toggleDay = (day) => {
    const current = data.availableDays || [];
    const updated = current.includes(day)
      ? current.filter((d) => d !== day)
      : [...current, day];
    setField("availableDays", updated);
  };

  const selectedDays = data.availableDays || [];

  return (
    <>
      <SectionLabel icon={<CalendarMonth />} label="Availability & Schedule" color={COLOR} subtitle="Working days and consultation time slots" />

      {/* Day selector */}
      <Typography sx={{ fontFamily: FONT, fontSize: "0.82rem", fontWeight: 700, color: "text.secondary", mb: 1.5 }}>
        Available Days
      </Typography>
      <Stack direction="row" spacing={1} mb={1} flexWrap="wrap" gap={1}>
        {DAYS.map((day) => (
          <DayToggle
            key={day} day={day}
            selected={selectedDays.includes(day)}
            onClick={toggleDay}
            color={COLOR}
          />
        ))}
      </Stack>
      <Stack direction="row" spacing={1} mb={3}>
        {["Mon–Fri", "Mon–Sat", "All Days"].map((preset) => (
          <Chip
            key={preset}
            label={preset}
            size="small"
            onClick={() => {
              if (preset === "Mon–Fri") setField("availableDays", ["Mon","Tue","Wed","Thu","Fri"]);
              if (preset === "Mon–Sat") setField("availableDays", ["Mon","Tue","Wed","Thu","Fri","Sat"]);
              if (preset === "All Days") setField("availableDays", [...DAYS]);
            }}
            sx={{ bgcolor: alpha(COLOR, 0.08), color: COLOR, fontWeight: 700, fontFamily: FONT, cursor: "pointer", height: 26, "&:hover": { bgcolor: alpha(COLOR, 0.15) } }}
          />
        ))}
        <Chip
          label="Clear"
          size="small"
          onClick={() => setField("availableDays", [])}
          sx={{ bgcolor: alpha("#000", 0.05), color: "text.secondary", fontWeight: 700, fontFamily: FONT, cursor: "pointer", height: 26 }}
        />
      </Stack>

      {/* Morning slot */}
      <Paper elevation={0} sx={{ p: 2.5, borderRadius: "14px", border: `1.5px solid ${alpha(COLOR, 0.15)}`, bgcolor: alpha(COLOR, 0.02), mb: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <WbSunny sx={{ fontSize: 18, color: "#E8A838" }} />
          <Typography fontWeight={700} sx={{ fontFamily: FONT, fontSize: "0.9rem", color: "#1A2E22" }}>
            Morning Session
          </Typography>
        </Stack>
        <Grid container spacing={2}>
          <Grid size={{xs:6}}><DocField label="Start Time" type="time" {...bind("morningStart")} InputLabelProps={{ shrink: true }} /></Grid>
          <Grid size={{xs:6}}><DocField label="End Time"   type="time" {...bind("morningEnd")}   InputLabelProps={{ shrink: true }} /></Grid>
        </Grid>
      </Paper>

      {/* Evening slot */}
      <Paper elevation={0} sx={{ p: 2.5, borderRadius: "14px", border: `1.5px solid ${alpha(COLOR, 0.15)}`, bgcolor: alpha(COLOR, 0.02), mb: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <NightsStay sx={{ fontSize: 18, color: "#7B5EA7" }} />
          <Typography fontWeight={700} sx={{ fontFamily: FONT, fontSize: "0.9rem", color: "#1A2E22" }}>
            Evening Session
          </Typography>
        </Stack>
        <Grid container spacing={2}>
          <Grid size={{xs:6}}><DocField label="Start Time" type="time" {...bind("eveningStart")} InputLabelProps={{ shrink: true }} /></Grid>
          <Grid size={{xs:6}}><DocField label="End Time"   type="time" {...bind("eveningEnd")}   InputLabelProps={{ shrink: true }} /></Grid>
        </Grid>
      </Paper>

      {/* Lunch break */}
      <Stack direction="row" alignItems="center" justifyContent="space-between"
        sx={{ px: 2.5, py: 1.5, borderRadius: "12px", border: `1px solid ${alpha(COLOR, 0.15)}`, bgcolor: alpha(COLOR, 0.02) }}>
        <Typography sx={{ fontFamily: FONT, fontSize: "0.875rem", fontWeight: 600, color: "#1A2E22" }}>
          Lunch Break (1:00 PM – 5:00 PM gap)
        </Typography>
        <Switch
          checked={data.lunchBreak ?? true}
          onChange={(e) => setField("lunchBreak", e.target.checked)}
          sx={{ "& .MuiSwitch-switchBase.Mui-checked": { color: COLOR }, "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: COLOR } }}
        />
      </Stack>
    </>
  );
};

export default AvailabilityStep;