import React, { useState } from "react";
import { Switch, FormControlLabel, Typography, Paper, Box } from "@mui/material";

export default function SettingsPage({ modules, setModules }) {
  const handleToggle = (key) => {
    setModules((prev) => ({
      ...prev,
      [key]: { ...prev[key], enabled: !prev[key].enabled },
    }));
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 400 }}>
      <Typography variant="h5" gutterBottom>
        Settings 
      </Typography>

      {Object.keys(modules).map((key) => (
        <Box key={key}>
          <FormControlLabel
            control={
              <Switch
                checked={modules[key].enabled}
                onChange={() => handleToggle(key)}
              />
            }
            label={modules[key].label}
          />
        </Box>
      ))}
    </Paper>
  );
}
