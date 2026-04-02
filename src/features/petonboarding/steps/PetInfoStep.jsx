import React from "react";
import { Grid, MenuItem, InputAdornment, Typography, alpha } from "@mui/material";
import { Pets, Badge, Cake, Scale, Palette, QrCode, Tag } from "@mui/icons-material";
import { VetField, SectionLabel, SpeciesCard } from "../components/Atoms";
import { SPECIES, GENDERS, AGE_UNITS, WEIGHT_UNITS } from "../constants/options";

const PRIMARY = "#2A7F6F";
const adorn = (icon) => (
  <InputAdornment position="start">
    {React.cloneElement(icon, { sx: { fontSize: 16, color: alpha(PRIMARY, 0.5) } })}
  </InputAdornment>
);

const PetInfoStep = ({ data, errors, setField }) => {
  const bind = (name) => ({
    value: data[name] ?? "",
    onChange: (e) => setField(name, e.target.value),
    error: !!errors[name],
    helperText: errors[name] || "",
  });

  return (
    <>
      <SectionLabel icon={<Pets />} label="Pet Information" subtitle="Basic identification details about the animal patient" />

      <Typography sx={{ fontSize: "0.82rem", fontWeight: 700, color: errors.species ? "error.main" : "text.secondary", mb: 1, fontFamily: "'Nunito',sans-serif" }}>
        Species *{errors.species ? ` — ${errors.species}` : ""}
      </Typography>
      <Grid container spacing={1.2} mb={3}>
        {SPECIES.map((s) => (
          <Grid item xs={3} sm={1.5} key={s.value}>
            <SpeciesCard item={s} selected={data.species === s.value} onClick={(v) => setField("species", v)} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{xs:12, sm:6}}>
          <VetField label="Pet Name *" {...bind("name")} InputProps={{ startAdornment: adorn(<Badge />) }} />
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <VetField label="Breed" {...bind("breed")} placeholder="e.g. Labrador Retriever" />
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <VetField label="Date of Birth" type="date" {...bind("dob")} InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid size={{xs:6, sm:3}}>
          <VetField label="Age" type="number" {...bind("age")} InputProps={{ startAdornment: adorn(<Cake />) }} />
        </Grid>
        <Grid size={{xs:6, sm:3}}>
          <VetField label="Age Unit" select {...bind("ageUnit")}>
            {AGE_UNITS.map((u) => <MenuItem key={u} value={u}>{u}</MenuItem>)}
          </VetField>
        </Grid>
        <Grid size={{xs:6, sm:3}}>
          <VetField label="Weight" type="number" {...bind("weight")} InputProps={{ startAdornment: adorn(<Scale />) }} />
        </Grid>
        <Grid size={{xs:6, sm:3}}>
          <VetField label="Unit" select {...bind("weightUnit")}>
            {WEIGHT_UNITS.map((u) => <MenuItem key={u} value={u}>{u}</MenuItem>)}
          </VetField>
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <VetField label="Gender *" select {...bind("gender")}>
            {GENDERS.map((g) => <MenuItem key={g} value={g}>{g === "Male" ? "♂  Male" : "♀  Female"}</MenuItem>)}
          </VetField>
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <VetField label="Coat / Fur Color" {...bind("color")} InputProps={{ startAdornment: adorn(<Palette />) }} placeholder="e.g. Golden, Tricolor" />
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <VetField label="Microchip / RFID ID" {...bind("microchipId")} InputProps={{ startAdornment: adorn(<QrCode />) }} />
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <VetField label="Registration / Tag No." {...bind("registrationNo")} InputProps={{ startAdornment: adorn(<Tag />) }} placeholder="Municipal / kennel club no." />
        </Grid>
      </Grid>
    </>
  );
};

export default PetInfoStep;