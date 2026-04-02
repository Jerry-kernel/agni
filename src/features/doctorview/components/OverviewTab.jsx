import React from "react";
import {
  Box, Grid, Paper, Stack, Typography, Chip,
  Avatar, alpha,
} from "@mui/material";
import {
  Phone, Email, LocationOn, Person,
  CalendarMonth, MedicalServices,
} from "@mui/icons-material";
import { InfoRow, SectionHead, StatCard } from "../components/InfoRow";

const PRIMARY = "#1B5E8C";
const FONT    = "'Nunito', sans-serif";

const OverviewTab = ({ doctor }) => (
  <Grid container spacing={2.5}>
    {/* Left column */}
    <Grid size={{xs:12, md:7}}>
      {/* Stats row */}
      <Stack direction="row" spacing={1.5} mb={2.5}>
        <StatCard value={doctor.totalPatients} label="Total Patients"      color={PRIMARY}   />
        <StatCard value={doctor.appointmentsToday} label="Today's Appts"  color="#2A7F6F"   />
        <StatCard value={`${doctor.experience}y`} label="Experience"      color="#7B5EA7"   />
      </Stack>

      {/* Bio */}
      <Paper elevation={0} sx={{ p: 2.5, borderRadius: "14px", border: `1.5px solid ${alpha(PRIMARY, 0.12)}`, mb: 2.5 }}>
        <Typography sx={{ fontFamily: FONT, fontSize: "0.7rem", fontWeight: 800, color: "text.disabled", letterSpacing: "0.08em", textTransform: "uppercase", mb: 1.5 }}>
          About
        </Typography>
        <Typography sx={{ fontFamily: FONT, fontSize: "0.875rem", color: "text.secondary", lineHeight: 1.75 }}>
          {doctor.bio}
        </Typography>
      </Paper>

      {/* Achievements */}
      {doctor.achievements && (
        <Paper elevation={0} sx={{ p: 2.5, borderRadius: "14px", border: `1.5px solid ${alpha("#E8A838", 0.2)}`, bgcolor: alpha("#E8A838", 0.03) }}>
          <Typography sx={{ fontFamily: FONT, fontSize: "0.7rem", fontWeight: 800, color: "text.disabled", letterSpacing: "0.08em", textTransform: "uppercase", mb: 1.5 }}>
            Achievements & Awards
          </Typography>
          {doctor.achievements.split("·").map((a, i) => (
            <Stack key={i} direction="row" alignItems="flex-start" spacing={1} mb={0.8}>
              <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#E8A838", mt: 0.7, flexShrink: 0 }} />
              <Typography sx={{ fontFamily: FONT, fontSize: "0.83rem", color: "#1A2E22", fontWeight: 500 }}>
                {a.trim()}
              </Typography>
            </Stack>
          ))}
        </Paper>
      )}
    </Grid>

    {/* Right column */}
    <Grid size={{xs:12, md:5}}>
      <Paper elevation={0} sx={{ p: 2.5, borderRadius: "14px", border: `1.5px solid ${alpha(PRIMARY, 0.12)}` }}>
        <SectionHead label="Contact Details" color={PRIMARY} />
        <InfoRow icon={<Phone />}       label="Primary Phone"  value={doctor.phone}       color={PRIMARY} />
        <InfoRow icon={<Phone />}       label="Alt Phone"      value={doctor.altPhone}    color={PRIMARY} />
        <InfoRow icon={<Email />}       label="Email"          value={doctor.email}       color={PRIMARY} />
        <InfoRow icon={<LocationOn />}  label="Address"        value={[doctor.addressLine1, doctor.city, doctor.state, doctor.pincode].filter(Boolean).join(", ")} color={PRIMARY} />

        <SectionHead label="Registration" color={PRIMARY} />
        <InfoRow icon={<MedicalServices />} label="Reg. Number"  value={doctor.regNumber}  color={PRIMARY} />
        <InfoRow icon={<MedicalServices />} label="Council"      value={doctor.regCouncil} color={PRIMARY} />
        <InfoRow icon={<CalendarMonth />}   label="Reg. Year"    value={doctor.regYear}    color={PRIMARY} />

        <SectionHead label="Languages" color={PRIMARY} />
        <Stack direction="row" flexWrap="wrap" gap={0.8} mt={0.5}>
          {(doctor.languagesSpoken || []).map((l) => (
            <Chip key={l} label={l} size="small"
              sx={{ bgcolor: alpha(PRIMARY, 0.08), color: PRIMARY, fontWeight: 700, fontFamily: FONT, height: 24 }} />
          ))}
        </Stack>
      </Paper>
    </Grid>
  </Grid>
);

export default OverviewTab;