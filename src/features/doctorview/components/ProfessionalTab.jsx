import React from "react";
import { Box, Grid, Paper, Stack, Chip, Typography, alpha } from "@mui/material";
import {
  MedicalServices, School, WorkHistory,
  LocalHospital, CurrencyRupee, Timer,
} from "@mui/icons-material";
import { InfoRow, SectionHead } from "../components/InfoRow";

const PRIMARY = "#1B5E8C";
const FONT    = "'Nunito', sans-serif";

const ProfessionalTab = ({ doctor }) => (
  <Grid container spacing={2.5}>
    <Grid size={{xs:12, md:6}}>
      <Paper elevation={0} sx={{ p: 2.5, borderRadius: "14px", border: `1.5px solid ${alpha(PRIMARY, 0.12)}`, height: "100%" }}>
        <SectionHead label="Qualifications & Specialization" />
        <InfoRow icon={<School />}          label="Highest Qualification" value={doctor.qualification}      color={PRIMARY} />
        <InfoRow icon={<MedicalServices />} label="Specialization"        value={doctor.specialization}    color={PRIMARY} />
        <InfoRow icon={<MedicalServices />} label="Sub-Specialization"    value={doctor.subSpecialization} color={PRIMARY} />
        <InfoRow icon={<WorkHistory />}     label="Experience"            value={`${doctor.experience} years`} color={PRIMARY} />
        <InfoRow icon={<WorkHistory />}     label="Designation"           value={doctor.designation}       color={PRIMARY} />

        <SectionHead label="Registration" />
        <InfoRow icon={<MedicalServices />} label="Reg. Number"  value={doctor.regNumber}  color={PRIMARY} />
        <InfoRow icon={<MedicalServices />} label="Council"      value={doctor.regCouncil} color={PRIMARY} />
        <InfoRow icon={<MedicalServices />} label="Reg. Year"    value={doctor.regYear}    color={PRIMARY} />
      </Paper>
    </Grid>

    <Grid size={{xs:12, md:6}}>
      <Paper elevation={0} sx={{ p: 2.5, borderRadius: "14px", border: `1.5px solid ${alpha("#2A7F6F", 0.15)}`, mb: 2 }}>
        <SectionHead label="Clinic Assignment" color="#2A7F6F" />
        <InfoRow icon={<LocalHospital />}  label="Department"       value={doctor.department}       color="#2A7F6F" />
        <InfoRow icon={<WorkHistory />}    label="Employment Type"  value={doctor.employmentType}   color="#2A7F6F" />
        <InfoRow icon={<WorkHistory />}    label="Joining Date"     value={doctor.joiningDate}      color="#2A7F6F" />
        <InfoRow icon={<Timer />}          label="Consultation Dur." value={`${doctor.consultationDuration} min`} color="#2A7F6F" />
      </Paper>

      {/* Fee cards */}
      <Paper elevation={0} sx={{ p: 2.5, borderRadius: "14px", border: `1.5px solid ${alpha("#8B6914", 0.15)}` }}>
        <SectionHead label="Fee Structure" color="#8B6914" />
        <Stack spacing={1.5} mt={1}>
          {[
            { label: "Consultation", value: doctor.consultationFee, color: "#2A7F6F" },
            { label: "Follow-up",    value: doctor.followUpFee,     color: "#3A6186" },
            { label: "Emergency",    value: doctor.emergencyFee,    color: "#A8505F" },
          ].map(({ label, value, color }) => (
            <Stack key={label} direction="row" alignItems="center" justifyContent="space-between"
              sx={{ px: 2, py: 1.2, borderRadius: "10px", bgcolor: alpha(color, 0.05), border: `1px solid ${alpha(color, 0.15)}` }}>
              <Typography sx={{ fontFamily: FONT, fontSize: "0.83rem", fontWeight: 600, color: "text.secondary" }}>
                {label}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={0.3}>
                <CurrencyRupee sx={{ fontSize: 14, color }} />
                <Typography fontWeight={800} sx={{ fontFamily: FONT, color, fontSize: "0.95rem" }}>
                  {Number(value).toLocaleString()}
                </Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Paper>
    </Grid>
  </Grid>
);

export default ProfessionalTab;