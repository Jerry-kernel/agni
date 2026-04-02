import React from "react";
import {
  Box, Grid, Paper, Stack, Typography, Chip, alpha,
} from "@mui/material";
import { WbSunny, NightsStay, CalendarMonth } from "@mui/icons-material";

const COLOR = "#3A6186";
const FONT  = "'Nunito', sans-serif";
const DAYS  = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

const TimeBlock = ({ icon, label, start, end, color }) => (
  <Paper elevation={0} sx={{
    p: 2, borderRadius: "12px",
    border: `1.5px solid ${alpha(color, 0.2)}`,
    bgcolor: alpha(color, 0.04),
  }}>
    <Stack direction="row" alignItems="center" spacing={1} mb={1}>
      {React.cloneElement(icon, { sx: { fontSize: 18, color } })}
      <Typography fontWeight={700} sx={{ fontFamily: FONT, fontSize: "0.88rem", color: "#1A2E22" }}>
        {label}
      </Typography>
    </Stack>
    <Typography variant="h6" fontWeight={800} sx={{ fontFamily: FONT, color }}>
      {start} – {end}
    </Typography>
    <Typography variant="caption" color="text.disabled" sx={{ fontFamily: FONT }}>
      {(() => {
        const [sh, sm] = start.split(":").map(Number);
        const [eh, em] = end.split(":").map(Number);
        const mins = (eh * 60 + em) - (sh * 60 + sm);
        return `${Math.floor(mins / 60)}h ${mins % 60 > 0 ? `${mins % 60}m` : ""} session`;
      })()}
    </Typography>
  </Paper>
);

const ScheduleTab = ({ doctor }) => {
  const available = doctor.availableDays || [];
  const off       = DAYS.filter((d) => !available.includes(d));

  return (
    <Grid container spacing={2.5}>
      {/* Days */}
      <Grid size={{xs:12}}>
        <Paper elevation={0} sx={{ p: 2.5, borderRadius: "14px", border: `1.5px solid ${alpha(COLOR, 0.15)}` }}>
          <Typography sx={{ fontFamily: FONT, fontSize: "0.7rem", fontWeight: 800, color: "text.disabled", letterSpacing: "0.08em", textTransform: "uppercase", mb: 2 }}>
            Working Days
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {DAYS.map((day) => {
              const isOn = available.includes(day);
              return (
                <Box key={day} sx={{
                  width: 56, height: 56, borderRadius: "14px",
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  border: "2px solid",
                  borderColor: isOn ? COLOR : alpha("#000", 0.08),
                  bgcolor:     isOn ? alpha(COLOR, 0.08) : "transparent",
                }}>
                  <Typography sx={{ fontFamily: FONT, fontSize: "0.72rem", fontWeight: 800, color: isOn ? COLOR : "text.disabled" }}>
                    {day}
                  </Typography>
                  <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: isOn ? COLOR : alpha("#000", 0.1), mt: 0.5 }} />
                </Box>
              );
            })}
          </Stack>

          <Stack direction="row" spacing={2} mt={2}>
            <Stack direction="row" alignItems="center" spacing={0.8}>
              <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: COLOR }} />
              <Typography variant="caption" sx={{ fontFamily: FONT, color: "text.secondary" }}>
                Available ({available.length} days)
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.8}>
              <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: alpha("#000", 0.15) }} />
              <Typography variant="caption" sx={{ fontFamily: FONT, color: "text.secondary" }}>
                Off ({off.length} days): {off.join(", ") || "None"}
              </Typography>
            </Stack>
          </Stack>
        </Paper>
      </Grid>

      {/* Time slots */}
      <Grid size={{xs:12, sm:6}}>
        <TimeBlock
          icon={<WbSunny />}
          label="Morning Session"
          start={doctor.morningStart}
          end={doctor.morningEnd}
          color="#E8A838"
        />
      </Grid>
      <Grid size={{xs:12, sm:6}}>
        <TimeBlock
          icon={<NightsStay />}
          label="Evening Session"
          start={doctor.eveningStart}
          end={doctor.eveningEnd}
          color="#7B5EA7"
        />
      </Grid>

      {/* Summary */}
      <Grid size={{xs:12}}>
        <Paper elevation={0} sx={{ p: 2, borderRadius: "12px", border: `1px solid ${alpha(COLOR, 0.12)}`, bgcolor: alpha(COLOR, 0.025) }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ sm: "center" }}>
            <CalendarMonth sx={{ color: COLOR, fontSize: 20 }} />
            <Typography sx={{ fontFamily: FONT, fontSize: "0.875rem", color: "text.secondary" }}>
              <strong style={{ color: "#1A2E22" }}>Consultation duration:</strong> {doctor.consultationDuration} min per slot ·{" "}
              <strong style={{ color: "#1A2E22" }}>Lunch break:</strong> {doctor.lunchBreak ? "1:00 PM – 5:00 PM" : "No break"} ·{" "}
              <strong style={{ color: "#1A2E22" }}>Working days:</strong> {available.join(", ")}
            </Typography>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ScheduleTab;