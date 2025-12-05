
import React, { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  Divider,
} from "@mui/material";

const initialModules = [
  { name: "Bill", enabled: true },
  { name: "Appointment", enabled: true },
  { name: "OPD", enabled: true },
  { name: "IPD", enabled: true },
  { name: "Pharmacy", enabled: false },
  { name: "Pathology", enabled: false },
  { name: "Radiology", enabled: false },
  { name: "Blood Bank", enabled: false },
  { name: "Ambulance", enabled: false },
  { name: "Front Office", enabled: false },
  { name: "Birth Death Record", enabled: false },
  { name: "Referral", enabled: false },
  { name: "TPA Management", enabled: false },
  { name: "Income", enabled: true },
  { name: "Expense", enabled: true },
  { name: "Messaging", enabled: false },
  { name: "Inventory", enabled: false },
  { name: "Download Center", enabled: false },
  { name: "Certificate", enabled: false },
  { name: "Front CMS", enabled: false },
  { name: "Live Consultation", enabled: false },
  { name: "Patient", enabled: true },
  { name: "Chat", enabled: false },
  { name: "Calendar To Do List", enabled: false },
];

const SettingsModules = () => {
  const [modules, setModules] = useState(initialModules);

  const handleToggle = (index) => {
    const newModules = [...modules];
    newModules[index].enabled = !newModules[index].enabled;
    setModules(newModules);
    // Here you can also dispatch an action or call API to save changes
  };

  return (
    <Box maxWidth="800px" mx="auto" mt={6} p={3}>
      <Typography variant="h4" mb={3} fontWeight="bold" textAlign="center">
        Module Settings
      </Typography>

      <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: "primary.main" }}>
              <TableRow>
                <TableCell sx={{ color: "common.white", fontWeight: "bold" }}>
                  Module Name
                </TableCell>
                <TableCell
                  sx={{ color: "common.white", fontWeight: "bold" }}
                  align="center"
                >
                  Enabled
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {modules.map(({ name, enabled }, index) => (
                <TableRow
                  key={name}
                  hover
                  sx={{
                    bgcolor: index % 2 === 0 ? "grey.50" : "common.white",
                    transition: "background-color 0.3s",
                  }}
                >
                  <TableCell sx={{ fontSize: "1rem" }}>{name}</TableCell>
                  <TableCell align="center">
                    <Switch
                      color="success"
                      checked={enabled}
                      onChange={() => handleToggle(index)}
                      inputProps={{ "aria-label": `${name} toggle` }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default SettingsModules;
