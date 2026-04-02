import React from "react";
import {
  Box, Container, Paper, Stack, Avatar,
  Typography, Chip, alpha,
} from "@mui/material";
import { MedicalServices, Business } from "@mui/icons-material";

import { useDoctorForm } from "./hooks/useDoctorForm";
import { useStepper }    from "./hooks/useStepper";
import DocStepper        from "./components/DocStepper";
import FormNav           from "./components/FormNav";
import SuccessScreen     from "./SuccessScreen";

import {
  PersonalInfoStep, ProfessionalStep, ClinicFeesStep,
  AvailabilityStep, DocumentsBioStep, ReviewStep,
} from "./steps";

const PRIMARY = "#1B5E8C";
const FONT    = "'Nunito', sans-serif";

const Fonts = () => (
  <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Nunito:wght@400;500;600;700;800&display=swap');`}</style>
);

const STEPS = [
  PersonalInfoStep,
  ProfessionalStep,
  ClinicFeesStep,
  AvailabilityStep,
  DocumentsBioStep,
  ReviewStep,
];

const DoctorOnboardingPage = () => {
  const formHook = useDoctorForm();
  const { state, setField, reset } = formHook;
  const { data, errors, status, extra } = state;

  const { step, isFirstStep, isLastStep, submitting, next, back, goTo, submit } = useStepper(formHook);

  const StepComponent = STEPS[step];

  if (status === "success") {
    return (
      <SuccessScreen
        doctorName={[data.firstName, data.lastName].filter(Boolean).join(" ")}
        doctorId={extra?.id}
        onReset={reset}
      />
    );
  }

  return (
    <>
      <Fonts />
      <Box sx={{
        minHeight: "100vh",
        background: "linear-gradient(150deg, #E3F2FD 0%, #EDE7F6 55%, #E8F5E9 100%)",
        py: 5, px: 2,
      }}>
        <Container maxWidth="md">

          {/* Page Header */}
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4} flexWrap="wrap" gap={2}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{
                bgcolor: PRIMARY, width: 52, height: 52,
                boxShadow: `0 6px 20px ${alpha(PRIMARY, 0.32)}`,
              }}>
                <MedicalServices />
              </Avatar>
              <Box>
                <Typography variant="h5" sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 800, color: "#1A2E22", lineHeight: 1.2,
                }}>
                  Doctor Onboarding
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontFamily: FONT }}>
                  New Doctor Registration
                </Typography>
              </Box>
            </Stack>
            {/* <Chip
              icon={<Business sx={{ fontSize: "15px !important" }} />}
              label="VetCare Hospital"
              sx={{
                bgcolor: alpha(PRIMARY, 0.08), color: PRIMARY,
                fontWeight: 700, fontFamily: FONT,
                border: `1px solid ${alpha(PRIMARY, 0.2)}`,
              }}
            /> */}
          </Stack>

          {/* Stepper */}
          <DocStepper activeStep={step} onStepClick={goTo} />

          {/* Form card */}
          <Paper elevation={0} sx={{
            borderRadius: "20px",
            p: { xs: 3, sm: 4 },
            border: `1.5px solid ${alpha(PRIMARY, 0.14)}`,
            boxShadow: `0 12px 48px ${alpha(PRIMARY, 0.08)}`,
          }}>
            <StepComponent data={data} errors={errors} setField={setField} />

            <FormNav
              step={step}
              isFirstStep={isFirstStep}
              isLastStep={isLastStep}
              submitting={submitting}
              onBack={back}
              onNext={next}
              onSubmit={submit}
            />
          </Paper>

        </Container>
      </Box>
    </>
  );
};

export default DoctorOnboardingPage;