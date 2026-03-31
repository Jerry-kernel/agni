import React, { useState } from "react";
import {
  Box, Stack, Typography, Switch, Paper,
  Chip, Button, alpha, LinearProgress, Avatar, Divider,
} from "@mui/material";
import {
  CalendarMonth, MedicalServices, Inventory2, Receipt,
  Vaccines, Science, PetsOutlined, People, Analytics,
  AdminPanelSettings, Chat, Save,
} from "@mui/icons-material";

const COLOR = "#3A6186";
const FONT  = "'Nunito', sans-serif";

const MODULES = [
  { key: "opd",          label: "OPD – Outpatient",          icon: <MedicalServices />,    color: "#2A7F6F", core: true  },
  { key: "ipd",          label: "IPD – Inpatient",           icon: <MedicalServices />,    color: "#2A7F6F", core: true  },
  { key: "appointments", label: "Appointments",              icon: <CalendarMonth />,       color: "#3A6186", core: false },
  { key: "petrecords",   label: "Patient Records",           icon: <PetsOutlined />,        color: "#2A7F6F", core: true  },
  { key: "vaccination",  label: "Vaccination & Preventive",  icon: <Vaccines />,            color: "#1A6E6E", core: false },
  { key: "diagnostics",  label: "Diagnostics & Lab",         icon: <Science />,             color: "#7B5EA7", core: false },
  { key: "pharmacy",     label: "Pharmacy & Dispensing",     icon: <Inventory2 />,          color: "#8B6914", core: false },
  { key: "billing",      label: "Billing & Finance",         icon: <Receipt />,             color: "#4A5568", core: false },
  { key: "doctors",      label: "Doctors Management",        icon: <People />,              color: "#A8505F", core: false },
  { key: "reports",      label: "Reports & Analytics",       icon: <Analytics />,           color: "#5C4B8A", core: false },
  { key: "messaging",    label: "Messaging & Notifications", icon: <Chat />,                color: "#2C5282", core: false },
  { key: "settings",     label: "Settings",                  icon: <AdminPanelSettings />,  color: "#2D4A3E", core: true  },
];

const INITIAL = Object.fromEntries(MODULES.map((m) => [m.key, m.core ? true : ["opd","ipd","petrecords","appointments","billing","settings"].includes(m.key)]));

const FeatureSettings = () => {
  const [enabled, setEnabled] = useState(INITIAL);

  const toggle = (key, isCore) => { if (!isCore) setEnabled((p) => ({ ...p, [key]: !p[key] })); };
  const activeCount = Object.values(enabled).filter(Boolean).length;

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} flexWrap="wrap" gap={1}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Chip label={`${activeCount} / ${MODULES.length} modules active`} size="small"
            sx={{ bgcolor: alpha(COLOR, 0.1), color: COLOR, fontWeight: 700, fontFamily: FONT }} />
        </Stack>
        <Typography variant="caption" color="text.secondary" sx={{ fontFamily: FONT }}>
          Core modules cannot be disabled
        </Typography>
      </Stack>

      {/* Progress */}
      <LinearProgress variant="determinate" value={(activeCount / MODULES.length) * 100}
        sx={{ mb: 3, height: 6, borderRadius: 3, bgcolor: alpha(COLOR, 0.1), "& .MuiLinearProgress-bar": { bgcolor: COLOR, borderRadius: 3 } }} />

      <Stack spacing={1.5}>
        {MODULES.map((mod) => {
          const on = enabled[mod.key];
          return (
            <Paper key={mod.key} elevation={0} sx={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              px: 2.5, py: 1.8, borderRadius: "14px",
              border: "1.5px solid",
              borderColor: on ? alpha(mod.color, 0.25) : alpha("#000", 0.07),
              bgcolor: on ? alpha(mod.color, 0.04) : "transparent",
              transition: "all 0.2s ease",
              "&:hover": { borderColor: alpha(mod.color, on ? 0.35 : 0.15) },
            }}>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Avatar sx={{
                  bgcolor: on ? alpha(mod.color, 0.14) : "rgba(0,0,0,0.05)",
                  color: on ? mod.color : "text.disabled",
                  width: 36, height: 36,
                  transition: "all 0.2s",
                }}>
                  {React.cloneElement(mod.icon, { sx: { fontSize: 18 } })}
                </Avatar>
                <Box>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography sx={{ fontFamily: FONT, fontSize: "0.875rem", fontWeight: on ? 700 : 500, color: on ? "#1A2E22" : "text.secondary", transition: "all 0.2s" }}>
                      {mod.label}
                    </Typography>
                    {mod.core && (
                      <Chip label="Core" size="small" sx={{
                        height: 18, fontSize: "0.62rem", fontWeight: 800,
                        bgcolor: alpha(mod.color, 0.12), color: mod.color,
                        fontFamily: FONT, borderRadius: "4px",
                        "& .MuiChip-label": { px: 0.8 },
                      }} />
                    )}
                  </Stack>
                </Box>
              </Stack>

              <Switch
                checked={on}
                disabled={mod.core}
                onChange={() => toggle(mod.key, mod.core)}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": { color: mod.color },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: mod.color },
                }}
              />
            </Paper>
          );
        })}
      </Stack>

      <Stack direction="row" justifyContent="flex-end" mt={3}>
        <Button variant="contained" startIcon={<Save />}
          sx={{ bgcolor: COLOR, fontFamily: FONT, fontWeight: 700, borderRadius: "12px", textTransform: "none", px: 4, boxShadow: `0 4px 14px ${alpha(COLOR, 0.35)}`, "&:hover": { filter: "brightness(0.9)" } }}>
          Save Settings
        </Button>
      </Stack>
    </Box>
  );
};

export default FeatureSettings;