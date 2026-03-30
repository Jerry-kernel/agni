import React from "react";
import { Box, Container, Paper, Stack, Avatar, Typography, Chip, alpha } from "@mui/material";
import { Pets, Business } from "@mui/icons-material";

import { usePetForm }  from "./hooks/usePetForm";
import { useStepper }  from "./hooks/useStepper";
import VetStepper      from "./components/VetStepper";
import FormNav         from "./components/FormNav";
import SuccessScreen   from "./SuccessScreen";

import { PetInfoStep, OwnerInfoStep, MedicalInfoStep, LifestyleStep, ReviewStep } from "./steps";

const PRIMARY = "#2A7F6F";
const FONT    = "'Nunito', sans-serif";


const STEPS = [PetInfoStep, OwnerInfoStep, MedicalInfoStep, LifestyleStep, ReviewStep];

const PetOnboardingPage = () => {
  const formHook = usePetForm();
  const { state, setField, reset } = formHook;
  const { data, errors, status, extra } = state;

  const { step, isFirstStep, isLastStep, submitting, next, back, goTo, submit } = useStepper(formHook);

  const StepComponent = STEPS[step];

  if (status === "success") {
    return <SuccessScreen petName={data.name} patientId={extra?.id} onReset={reset} />;
  }

  return (
    <>
      
      <Box sx={{
        minHeight: "100vh",
        background: "linear-gradient(150deg, #EAF5F2 0%, #EDF5FB 55%, #F5F0FA 100%)",
        py: 5, px: 2,
      }}>
        <Container maxWidth="md">

          {/* Header */}
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4} flexWrap="wrap" gap={2}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ bgcolor: PRIMARY, width: 52, height: 52, boxShadow: `0 6px 20px ${alpha(PRIMARY, 0.32)}` }}>
                <Pets />
              </Avatar>
              <Box>
                <Typography variant="h5" sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, color: "#1A2E22", lineHeight: 1.2 }}>
                  Pet Onboarding
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontFamily: FONT }}>
                  New Patient Registration
                </Typography>
              </Box>
            </Stack>
            {/* <Chip
              icon={<Business sx={{ fontSize: "15px !important" }} />}
              label="VetCare Hospital"
              sx={{ bgcolor: alpha(PRIMARY, 0.08), color: "#1D6258", fontWeight: 700, fontFamily: FONT, border: `1px solid ${alpha(PRIMARY, 0.2)}` }}
            /> */}
          </Stack>

          {/* Stepper */}
          <VetStepper activeStep={step} onStepClick={goTo} />

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

export default PetOnboardingPage;