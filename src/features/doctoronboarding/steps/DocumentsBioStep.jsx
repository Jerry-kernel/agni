import React from "react";
import {
  Grid, Box, Stack, Typography, Chip, alpha, Paper,
} from "@mui/material";
import { Description, Upload, CheckCircle } from "@mui/icons-material";
import { DocField, SectionLabel } from "../components/Atoms";

const COLOR = "#7B5EA7";
const FONT  = "'Nunito', sans-serif";

const DOC_FIELDS = [
  { key: "degreeCertificate",      label: "Degree Certificate",          required: true  },
  { key: "registrationCertificate",label: "Registration Certificate",    required: true  },
  { key: "identityProof",          label: "Identity Proof (Aadhar/PAN)", required: false },
  { key: "signatureFile",          label: "Digital Signature",           required: false },
];

const UploadBox = ({ label, required, uploaded, onUpload }) => (
  <Paper
    elevation={0}
    onClick={onUpload}
    sx={{
      border: `1.5px dashed ${uploaded ? alpha("#2E7D32", 0.4) : alpha(COLOR, 0.25)}`,
      borderRadius: "12px", p: 2.5, cursor: "pointer", textAlign: "center",
      bgcolor: uploaded ? alpha("#2E7D32", 0.04) : alpha(COLOR, 0.02),
      transition: "all 0.2s",
      "&:hover": { borderColor: COLOR, bgcolor: alpha(COLOR, 0.05) },
    }}
  >
    {uploaded ? (
      <Stack alignItems="center" spacing={0.5}>
        <CheckCircle sx={{ fontSize: 28, color: "#2E7D32" }} />
        <Typography sx={{ fontFamily: FONT, fontSize: "0.78rem", fontWeight: 700, color: "#2E7D32" }}>
          Uploaded
        </Typography>
      </Stack>
    ) : (
      <Stack alignItems="center" spacing={0.5}>
        <Upload sx={{ fontSize: 28, color: alpha(COLOR, 0.4) }} />
        <Typography sx={{ fontFamily: FONT, fontSize: "0.78rem", fontWeight: 600, color: "text.secondary" }}>
          {label}
        </Typography>
        {required && (
          <Chip label="Required" size="small" sx={{ height: 18, fontSize: "0.6rem", fontWeight: 700, bgcolor: alpha(COLOR, 0.1), color: COLOR, fontFamily: FONT }} />
        )}
        <Typography variant="caption" color="text.disabled" sx={{ fontFamily: FONT }}>
          PDF or JPG · Max 5MB
        </Typography>
      </Stack>
    )}
  </Paper>
);

const DocumentsBioStep = ({ data, errors, setField }) => {
  const bind = (name) => ({
    value: data[name] ?? "",
    onChange: (e) => setField(name, e.target.value),
    error: !!errors[name],
    helperText: errors[name] || "",
    color: COLOR,
  });

  return (
    <>
      <SectionLabel icon={<Description />} label="Documents & Bio" color={COLOR} subtitle="Upload verification documents and add a professional bio" />

      {/* Upload boxes */}
      <Grid container spacing={2} mb={3}>
        {DOC_FIELDS.map((doc) => (
          <Grid size={{xs:6, sm:6}} key={doc.key}>
            <UploadBox
              label={doc.label}
              required={doc.required}
              uploaded={!!data[doc.key]}
              onUpload={() => setField(doc.key, "uploaded")} // replace with real file handler
            />
          </Grid>
        ))}
      </Grid>

      {/* Bio & Achievements */}
      <Grid container spacing={2}>
        <Grid size={{xs:12}}>
          <DocField
            label="Professional Bio"
            multiline rows={3}
            {...bind("bio")}
            placeholder="Brief description of the doctor's background, expertise and approach to veterinary care…"
          />
        </Grid>
        <Grid size={{xs:12}}>
          <DocField
            label="Achievements & Awards"
            multiline rows={2}
            {...bind("achievements")}
            placeholder="e.g. Best Veterinarian Award 2022, Published research in IJVS…"
          />
        </Grid>
        <Grid size={{xs:12}}>
          <DocField
            label="Additional Notes"
            multiline rows={2}
            {...bind("notes")}
            placeholder="Any other relevant information…"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default DocumentsBioStep;