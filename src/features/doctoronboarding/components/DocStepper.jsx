import React from "react";
import {
  Stepper, Step, StepLabel, StepConnector,
  stepConnectorClasses, Avatar, Typography,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import {
  Person, MedicalServices, LocalHospital,
  CalendarMonth, Description, CheckCircle,
} from "@mui/icons-material";
import { STEPS } from "../constants/options";

const PRIMARY = "#1B5E8C";
const AMBER   = "#E8A838";
const FONT    = "'Nunito', sans-serif";

const ICONS = [
  <Person />, <MedicalServices />, <LocalHospital />,
  <CalendarMonth />, <Description />, <CheckCircle />,
];

const Connector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: { top: 20 },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3, border: 0, borderRadius: 2,
    backgroundColor: alpha(PRIMARY, 0.12),
    transition: "background-color 0.4s",
  },
  [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line}`]:    { background: `linear-gradient(90deg, ${PRIMARY}, ${AMBER})` },
  [`&.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]: { background: `linear-gradient(90deg, #0D3D5F, ${PRIMARY})` },
}));

const StepIcon = ({ active, completed, icon }) => (
  <Avatar sx={{
    width: 42, height: 42,
    bgcolor: completed ? PRIMARY : active ? AMBER : alpha(PRIMARY, 0.09),
    color:   completed || active ? "#fff" : alpha(PRIMARY, 0.4),
    boxShadow: active     ? `0 0 0 4px ${alpha(AMBER, 0.22)}`
             : completed  ? `0 0 0 4px ${alpha(PRIMARY, 0.14)}`
             : "none",
    transition: "all 0.3s",
  }}>
    {ICONS[Number(icon) - 1] && React.cloneElement(ICONS[Number(icon) - 1], { fontSize: "small" })}
  </Avatar>
);

const DocStepper = ({ activeStep, onStepClick }) => (
  <Stepper activeStep={activeStep} alternativeLabel connector={<Connector />} sx={{ mb: 4 }}>
    {STEPS.map((label, i) => (
      <Step key={label}
        onClick={() => i < activeStep && onStepClick?.(i)}
        sx={{ cursor: i < activeStep ? "pointer" : "default" }}
      >
        <StepLabel StepIconComponent={StepIcon}>
          <Typography sx={{
            fontFamily: FONT, fontSize: "0.7rem",
            fontWeight: activeStep === i ? 800 : 500,
            color: activeStep === i ? PRIMARY : i < activeStep ? "#0D3D5F" : "text.secondary",
            transition: "color 0.2s",
          }}>
            {label}
          </Typography>
        </StepLabel>
      </Step>
    ))}
  </Stepper>
);

export default DocStepper;