import React from "react";
import { Grid, MenuItem } from "@mui/material";
import { Park } from "@mui/icons-material";
import { VetField, SectionLabel } from "../components/Atoms";
import { DIET_TYPES, FEEDING_FREQS, LIVING_ENVS, EXERCISE_LEVELS, OTHER_PETS_OPTS } from "../constants/options";

const LifestyleStep = ({ data, errors, setField }) => {
  const bind = (name) => ({
    value: data[name] ?? "",
    onChange: (e) => setField(name, e.target.value),
    error: !!errors[name],
    helperText: errors[name] || "",
  });

  return (
    <>
      <SectionLabel icon={<Park />} label="Lifestyle & Diet" color="#A8505F" subtitle="Daily routine, nutrition and environment details" />
      <Grid container spacing={2}>
        <Grid size={{xs:12, sm:6}}>
          <VetField label="Diet Type" select {...bind("dietType")}>
            {DIET_TYPES.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
          </VetField>
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <VetField label="Feeding Frequency" select {...bind("feedingFrequency")}>
            {FEEDING_FREQS.map((f) => <MenuItem key={f} value={f}>{f}</MenuItem>)}
          </VetField>
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <VetField label="Food Brand / Product" {...bind("foodBrand")} placeholder="e.g. Royal Canin, Pedigree" />
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <VetField label="Living Environment" select {...bind("livingEnv")}>
            {LIVING_ENVS.map((e) => <MenuItem key={e} value={e}>{e}</MenuItem>)}
          </VetField>
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <VetField label="Exercise Level" select {...bind("exerciseLevel")}>
            {EXERCISE_LEVELS.map((e) => <MenuItem key={e} value={e}>{e}</MenuItem>)}
          </VetField>
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <VetField label="Other Pets at Home?" select {...bind("otherPets")}>
            {OTHER_PETS_OPTS.map((e) => <MenuItem key={e} value={e}>{e}</MenuItem>)}
          </VetField>
        </Grid>
        <Grid size={{xs:12}}>
          <VetField label="Behavioural Notes" multiline rows={2} {...bind("behaviouralNotes")} placeholder="e.g. Aggressive with strangers, anxious during travel, bite history…" />
        </Grid>
        <Grid size={{xs:12}}>
          <VetField label="Special Care Instructions" multiline rows={2} {...bind("specialCare")} placeholder="e.g. Requires muzzle, noise sensitive, needs sedation for examination…" />
        </Grid>
      </Grid>
    </>
  );
};

export default LifestyleStep;