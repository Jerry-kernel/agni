import { useCallback } from "react";
import { validators } from "../constants/validators";
import { STEPS } from "../constants/options";

export const useStepper = ({ state, setStep, setErrors, setStatus }) => {
  const { step, data } = state;
  const total       = STEPS.length;
  const isFirstStep = step === 0;
  const isLastStep  = step === total - 1;
  const submitting  = state.status === "submitting";

  const next = useCallback(() => {
    const errs = validators[step]?.(data) ?? {};
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStep(Math.min(step + 1, total - 1));
  }, [step, data, setErrors, setStep, total]);

  const back  = useCallback(() => setStep(Math.max(step - 1, 0)), [step, setStep]);
  const goTo  = useCallback((i) => { if (i < step) setStep(i); }, [step, setStep]);

  const submit = useCallback(() => {
    setStatus("submitting");
    setTimeout(() => setStatus("success", { id: `DOC-${Date.now()}` }), 1400);
  }, [setStatus]);

  return { step, isFirstStep, isLastStep, submitting, next, back, goTo, submit };
};