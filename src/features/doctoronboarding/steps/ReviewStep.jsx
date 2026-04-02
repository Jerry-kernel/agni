import React from "react";
import { Box, Stack, Avatar, Typography, Paper, Alert, Chip, alpha } from "@mui/material";
import {
  Person, MedicalServices, LocalHospital,
  CalendarMonth, CheckCircle,
} from "@mui/icons-material";
import { SectionLabel } from "../components/Atoms";

const FONT = "'Nunito', sans-serif";

const Row = ({ label, value, idx, color }) => {
  if (!value) return null;
  return (
    <Stack direction="row" alignItems="flex-start"
      sx={{ px: 2.5, py: 0.9, bgcolor: idx % 2 === 0 ? alpha(color, 0.025) : "transparent" }}>
      <Typography sx={{ fontFamily: FONT, fontSize: "0.77rem", color: "text.secondary", width: 190, flexShrink: 0 }}>
        {label}
      </Typography>
      <Typography sx={{ fontFamily: FONT, fontSize: "0.82rem", fontWeight: 600 }}>
        {value}
      </Typography>
    </Stack>
  );
};

const Section = ({ title, icon, color, rows }) => {
  if (!rows.some(([, v]) => v)) return null;
  return (
    <Box mb={2.5}>
      <Stack direction="row" alignItems="center" spacing={1} mb={1}>
        <Avatar sx={{ bgcolor: alpha(color, 0.12), color, width: 28, height: 28 }}>
          {React.cloneElement(icon, { sx: { fontSize: 15 } })}
        </Avatar>
        <Typography fontWeight={700} sx={{ fontFamily: FONT, color, fontSize: "0.88rem" }}>
          {title}
        </Typography>
      </Stack>
      <Paper elevation={0} sx={{ borderRadius: "12px", border: `1px solid ${alpha(color, 0.15)}`, overflow: "hidden" }}>
        {rows.map(([label, value], i) => (
          <Row key={label} label={label} value={value} idx={i} color={color} />
        ))}
      </Paper>
    </Box>
  );
};

const ReviewStep = ({ data, errors }) => {
  const d = data;
  return (
    <>
      <SectionLabel icon={<CheckCircle />} label="Review & Confirm" color="#E8A838" subtitle="Verify all details before registering the doctor" />

      {errors._form && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: "10px", fontFamily: FONT }}>{errors._form}</Alert>
      )}

      {/* Quick summary */}
      <Stack direction="row" alignItems="center" spacing={2} mb={3}
        sx={{ p: 2, borderRadius: "14px", bgcolor: alpha("#1B5E8C", 0.05), border: `1px solid ${alpha("#1B5E8C", 0.15)}` }}>
        <Avatar sx={{ bgcolor: alpha("#1B5E8C", 0.12), color: "#1B5E8C", width: 52, height: 52, fontSize: "1.4rem" }}>
          👨‍⚕️
        </Avatar>
        <Box>
          <Typography fontWeight={800} sx={{ fontFamily: FONT, color: "#1A2E22", fontSize: "1.05rem" }}>
            Dr. {[d.firstName, d.lastName].filter(Boolean).join(" ") || "—"}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontFamily: FONT }}>
            {[d.specialization, d.qualification].filter(Boolean).join(" · ") || "—"}
          </Typography>
          <Box mt={0.5}>
            {d.department && <Chip label={d.department} size="small" sx={{ height: 20, fontSize: "0.65rem", fontWeight: 700, bgcolor: alpha("#2A7F6F", 0.1), color: "#2A7F6F", fontFamily: FONT, mr: 0.5 }} />}
            {d.employmentType && <Chip label={d.employmentType} size="small" sx={{ height: 20, fontSize: "0.65rem", fontWeight: 700, bgcolor: alpha("#3A6186", 0.1), color: "#3A6186", fontFamily: FONT }} />}
          </Box>
        </Box>
      </Stack>

      <Section title="Personal Details" icon={<Person />} color="#1B5E8C" rows={[
        ["Full Name",     [d.firstName, d.lastName].filter(Boolean).join(" ")],
        ["Date of Birth", d.dob],
        ["Gender",        d.gender],
        ["Phone",         d.phone],
        ["Alt Phone",     d.altPhone],
        ["Email",         d.email],
        ["Address",       [d.addressLine1, d.addressLine2, d.city, d.state, d.pincode].filter(Boolean).join(", ")],
      ]} />

      <Section title="Professional Details" icon={<MedicalServices />} color="#7B5EA7" rows={[
        ["Registration No.",  d.regNumber],
        ["Council",           d.regCouncil],
        ["Reg. Year",         d.regYear],
        ["Qualification",     d.qualification],
        ["Specialization",    d.specialization],
        ["Sub-Specialization",d.subSpecialization],
        ["Experience",        d.experience ? `${d.experience} years` : ""],
        ["Designation",       d.designation],
        ["Languages",         (d.languagesSpoken || []).join(", ")],
      ]} />

      <Section title="Clinic & Fees" icon={<LocalHospital />} color="#2A7F6F" rows={[
        ["Department",          d.department],
        ["Employment Type",     d.employmentType],
        ["Joining Date",        d.joiningDate],
        ["Consultation Dur.",   d.consultationDuration ? `${d.consultationDuration} min` : ""],
        ["Consultation Fee",    d.consultationFee ? `₹${d.consultationFee}` : ""],
        ["Follow-up Fee",       d.followUpFee ? `₹${d.followUpFee}` : ""],
        ["Emergency Fee",       d.emergencyFee ? `₹${d.emergencyFee}` : ""],
      ]} />

      <Section title="Availability" icon={<CalendarMonth />} color="#3A6186" rows={[
        ["Available Days",   (d.availableDays || []).join(", ")],
        ["Morning Session",  d.morningStart && d.morningEnd ? `${d.morningStart} – ${d.morningEnd}` : ""],
        ["Evening Session",  d.eveningStart && d.eveningEnd ? `${d.eveningStart} – ${d.eveningEnd}` : ""],
        ["Lunch Break",      d.lunchBreak ? "Yes" : "No"],
      ]} />
    </>
  );
};

export default ReviewStep;