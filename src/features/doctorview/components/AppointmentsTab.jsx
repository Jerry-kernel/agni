import React from "react";
import {
  Box, Paper, Stack, Avatar, Typography,
  Chip, alpha, LinearProgress,
} from "@mui/material";
import { AccessTime } from "@mui/icons-material";

const COLOR = "#7B5EA7";
const FONT  = "'Nunito', sans-serif";

const TYPE_COLORS = {
  "OPD":        { bg: alpha("#2A7F6F", 0.1), color: "#2A7F6F" },
  "Follow-up":  { bg: alpha("#3A6186", 0.1), color: "#3A6186" },
  "Vaccination":{ bg: alpha("#1A6E6E", 0.1), color: "#1A6E6E" },
  "Surgery":    { bg: alpha("#A8505F", 0.1), color: "#A8505F" },
  "Emergency":  { bg: alpha("#C62828", 0.1), color: "#C62828" },
};

const AppointmentsTab = ({ upcoming, totalToday }) => {
  const completed = 2; // mock
  const progress  = Math.round((completed / totalToday) * 100);

  return (
    <Box>
      {/* Progress bar */}
      <Paper elevation={0} sx={{ p: 2.5, borderRadius: "14px", border: `1.5px solid ${alpha(COLOR, 0.15)}`, mb: 2.5 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1.5}>
          <Typography fontWeight={700} sx={{ fontFamily: FONT, fontSize: "0.9rem", color: "#1A2E22" }}>
            Today's Progress
          </Typography>
          <Typography sx={{ fontFamily: FONT, fontSize: "0.83rem", color: COLOR, fontWeight: 700 }}>
            {completed} / {totalToday} completed
          </Typography>
        </Stack>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 8, borderRadius: 4,
            bgcolor: alpha(COLOR, 0.1),
            "& .MuiLinearProgress-bar": { bgcolor: COLOR, borderRadius: 4 },
          }}
        />
      </Paper>

      {/* Appointment list */}
      <Stack spacing={1.5}>
        {upcoming.map((appt, i) => {
          const typeStyle = TYPE_COLORS[appt.type] || TYPE_COLORS["OPD"];
          const isDone    = i < completed;
          return (
            <Paper key={appt.id} elevation={0} sx={{
              display: "flex", alignItems: "center", gap: 2,
              px: 2.5, py: 1.8, borderRadius: "14px",
              border: "1.5px solid",
              borderColor: isDone ? alpha("#2E7D32", 0.2) : alpha(COLOR, 0.15),
              bgcolor:     isDone ? alpha("#2E7D32", 0.03) : alpha(COLOR, 0.02),
              opacity:     isDone ? 0.65 : 1,
              transition: "all 0.2s",
            }}>
              {/* Token number */}
              <Avatar sx={{
                bgcolor: isDone ? alpha("#2E7D32", 0.12) : alpha(COLOR, 0.12),
                color:   isDone ? "#2E7D32" : COLOR,
                width: 36, height: 36, fontSize: "0.78rem", fontWeight: 800, fontFamily: FONT,
              }}>
                {String(i + 1).padStart(2, "0")}
              </Avatar>

              {/* Time */}
              <Stack direction="row" alignItems="center" spacing={0.5} sx={{ minWidth: 60 }}>
                <AccessTime sx={{ fontSize: 14, color: "text.disabled" }} />
                <Typography sx={{ fontFamily: FONT, fontSize: "0.83rem", fontWeight: 700, color: "#1A2E22" }}>
                  {appt.time}
                </Typography>
              </Stack>

              {/* Pet + owner */}
              <Box flex={1}>
                <Typography sx={{ fontFamily: FONT, fontWeight: 700, fontSize: "0.875rem", color: "#1A2E22" }}>
                  {appt.petName}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontFamily: FONT }}>
                  {appt.owner}
                </Typography>
              </Box>

              {/* Type */}
              <Chip label={appt.type} size="small" sx={{
                bgcolor: typeStyle.bg, color: typeStyle.color,
                fontWeight: 700, fontFamily: FONT, fontSize: "0.68rem", height: 22,
              }} />

              {/* Status */}
              {isDone && (
                <Chip label="Done" size="small" sx={{
                  bgcolor: alpha("#2E7D32", 0.1), color: "#2E7D32",
                  fontWeight: 700, fontFamily: FONT, fontSize: "0.68rem", height: 22,
                }} />
              )}
            </Paper>
          );
        })}
      </Stack>
    </Box>
  );
};

export default AppointmentsTab;