import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Avatar,
  IconButton,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";

// ===== Options =====
const hospitalTypes = [
  "General Veterinary Hospital",
  "Specialty Clinic",
  "Animal Emergency Center",
  "Mobile Veterinary Service",
];

const countries = [
  { code: "IN", label: "India" },
  { code: "US", label: "United States" },
  { code: "UK", label: "United Kingdom" },
];

const statesByCountry = {
  IN: ["Maharashtra", "Karnataka", "Delhi", "Tamil Nadu"],
  US: ["California", "New York", "Texas", "Florida"],
  UK: ["England", "Scotland", "Wales", "Northern Ireland"],
};

// ===== File Upload Component =====
const FileUpload = ({ label, file, onChange, accept }) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" mb={1} fontWeight={600}>
        {label}
      </Typography>
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 2,
          borderRadius: 2,
          cursor: "pointer",
          minHeight: 80,
          bgcolor: "#f9f9f9",
          "&:hover": { bgcolor: "#f0f0f0" },
        }}
        onClick={() => document.getElementById(label).click()}
      >
        <input
          type="file"
          id={label}
          accept={accept}
          onChange={onChange}
          style={{ display: "none" }}
        />
        {preview ? (
          <Box sx={{ position: "relative", width: 60, height: 60 }}>
            {accept.includes("image") && (
              <Avatar
                src={preview}
                variant="rounded"
                sx={{ width: "100%", height: "100%" }}
              />
            )}
            {!accept.includes("image") && (
              <UploadFileIcon sx={{ fontSize: 48, color: "gray" }} />
            )}
            <IconButton
              aria-label="delete"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onChange({ target: { files: [] } });
              }}
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                bgcolor: "rgba(255,255,255,0.7)",
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        ) : (
          <UploadFileIcon sx={{ fontSize: 48, color: "gray" }} />
        )}
        <Typography color="text.secondary" sx={{ userSelect: "none" }}>
          {preview ? file.name : `Click to upload ${label.toLowerCase()}`}
        </Typography>
      </Paper>
    </Box>
  );
};

// ===== Onboarding Wizard =====
const steps = [
  "Hospital Info",
  "Contact Info",
  "License & Certificates",
  "Address",
  "Review & Submit",
];

const OnboardingWizard = () => {
  const [activeStep, setActiveStep] = useState(0);

  const [formData, setFormData] = useState({
    hospitalName: "",
    hospitalLogo: null,
    hospitalType: "",
    yearOfOpening: "",
    email: "",
    primaryMobile: "",
    secondaryMobile: "",
    licenseNumber: "",
    certificate: null,
    websiteUrl: "",
    address: "",
    country: "",
    state: "",
    district: "",
    pincode: "",
  });

  const [availableStates, setAvailableStates] = useState([]);

  // Update states when country changes
  useEffect(() => {
    if (formData.country) {
      setAvailableStates(statesByCountry[formData.country] || []);
      setFormData((prev) => ({ ...prev, state: "" }));
    }
  }, [formData.country]);

  const handleChange = (field) => (event) => {
    const value =
      event.target.type === "file"
        ? event.target.files[0] || null
        : event.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = () => {
    console.log("Submitted Data:", formData);
    alert("Onboarding Completed! Check console for data.");
  };

  // ===== Render Step Content =====
  const getStepContent = (step) => {
    switch (step) {
      case 0: // Hospital Info
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              label="Hospital Name"
              fullWidth
              required
              value={formData.hospitalName}
              onChange={handleChange("hospitalName")}
            />
            <FileUpload
              label="Hospital Logo"
              file={formData.hospitalLogo}
              onChange={handleChange("hospitalLogo")}
              accept="image/*"
            />
            <FormControl fullWidth required>
              <InputLabel>Hospital Type</InputLabel>
              <Select
                value={formData.hospitalType}
                onChange={handleChange("hospitalType")}
              >
                {hospitalTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Year of Opening"
              type="number"
              inputProps={{ min: 1800, max: new Date().getFullYear() }}
              fullWidth
              required
              value={formData.yearOfOpening}
              onChange={handleChange("yearOfOpening")}
            />
          </Box>
        );

      case 1: // Contact Info
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              value={formData.email}
              onChange={handleChange("email")}
            />
            <TextField
              label="Primary Mobile"
              type="tel"
              fullWidth
              required
              value={formData.primaryMobile}
              onChange={handleChange("primaryMobile")}
            />
            <TextField
              label="Secondary Mobile"
              type="tel"
              fullWidth
              value={formData.secondaryMobile}
              onChange={handleChange("secondaryMobile")}
            />
            <TextField
              label="Website URL"
              type="url"
              fullWidth
              value={formData.websiteUrl}
              onChange={handleChange("websiteUrl")}
            />
          </Box>
        );

      case 2: // License & Certificates
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              label="License Number"
              fullWidth
              required
              value={formData.licenseNumber}
              onChange={handleChange("licenseNumber")}
            />
            <FileUpload
              label="Certificate"
              file={formData.certificate}
              onChange={handleChange("certificate")}
              accept=".pdf,image/*"
            />
          </Box>
        );

      case 3: // Address
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              label="Address"
              multiline
              rows={3}
              fullWidth
              required
              value={formData.address}
              onChange={handleChange("address")}
            />
            <FormControl fullWidth required>
              <InputLabel>Country</InputLabel>
              <Select
                value={formData.country}
                onChange={handleChange("country")}
              >
                {countries.map(({ code, label }) => (
                  <MenuItem key={code} value={code}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth required disabled={!formData.country}>
              <InputLabel>State</InputLabel>
              <Select
                value={formData.state}
                onChange={handleChange("state")}
              >
                {availableStates.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="District"
              fullWidth
              required
              value={formData.district}
              onChange={handleChange("district")}
            />
            <TextField
              label="Pincode"
              fullWidth
              required
              value={formData.pincode}
              onChange={handleChange("pincode")}
            />
          </Box>
        );

      case 4: // Review & Submit
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h6">Review Your Details:</Typography>
            {Object.entries(formData).map(([key, value]) => (
              <Paper
                key={key}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "#f9f9f9",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography fontWeight={600}>{key.replace(/([A-Z])/g, " $1")}</Typography>
                <Typography>{value?.name || value || "—"}</Typography>
              </Paper>
            ))}
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", py: 5, px: { xs: 2, md: 4 } }}>
      <Typography
        variant="h4"
        fontWeight={700}
        textAlign="center"
        mb={4}
        color="primary"
      >
        Veterinary Hospital Onboarding
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3, mb: 3 }}>
        {getStepContent(activeStep)}
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ borderRadius: 3, px: 4 }}
        >
          Back
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ borderRadius: 3, px: 4 }}
          >
            Submit
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleNext}
            sx={{ borderRadius: 3, px: 4 }}
          >
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default OnboardingWizard;
