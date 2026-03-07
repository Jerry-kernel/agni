import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Select,
  FormControl,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const dummyAppointments = [
  {
    id: 1,
    patientName: "Ravi Kumar",
    guardianName: "Suresh Kumar",
    phone: "9876543210",
    doctor: "Dr. Arjun",
    department: "Cardiology",
    date: "2025-01-12",
    slot: "10:30 AM",
    type: "Follow-up",
    status: "Upcoming",
  },
  {
    id: 2,
    patientName: "Priya Sharma",
    guardianName: "Rajesh Sharma",
    phone: "9876543310",
    doctor: "Dr. Priya",
    department: "Orthopedics",
    date: "2025-01-15",
    slot: "05:00 PM",
    type: "Walk-in",
    status: "Completed",
  },
];

const AppointmentsPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [search, setSearch] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("all");

  const handleMenuOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const filteredData = dummyAppointments.filter((item) => {
    const matchesSearch =
      item.patientName.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.includes(search);

    const matchesDoctor =
      doctorFilter === "all" || item.doctor === doctorFilter;

    return matchesSearch && matchesDoctor;
  });

  return (
    <Box>
      {/* Header */}
      <Typography variant="h5" fontWeight={600} mb={2}>
        Appointments
      </Typography>

      {/* Search & Filters */}
      <Box display="flex" gap={2} mb={2}>
        {/* Search */}
        <TextField
          placeholder="Search patient or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />

        {/* Doctor Filter */}
        <FormControl size="small" sx={{ width: 200 }}>
          <Select
            value={doctorFilter}
            onChange={(e) => setDoctorFilter(e.target.value)}
          >
            <MenuItem value="all">All Doctors</MenuItem>
            <MenuItem value="Dr. Arjun">Dr. Arjun</MenuItem>
            <MenuItem value="Dr. Priya">Dr. Priya</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Pet Name</TableCell>
              <TableCell>Guardian Name</TableCell>
              <TableCell>Phone No</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Appointment Date</TableCell>
              <TableCell>Slot</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow key={row.id} hover>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.patientName}</TableCell>
                <TableCell>{row.guardianName}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.doctor}</TableCell>
                <TableCell>{row.department}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.slot}</TableCell>
                <TableCell>{row.type}</TableCell>

                <TableCell>
                  <Chip
                    label={row.status}
                    color={
                      row.status === "Completed"
                        ? "success"
                        : row.status === "Upcoming"
                        ? "primary"
                        : "error"
                    }
                    size="small"
                  />
                </TableCell>

                <TableCell align="right">
                  <IconButton onClick={(e) => handleMenuOpen(e, row)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Action Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => alert("View " + selectedRow?.id)}>View</MenuItem>
        <MenuItem onClick={() => alert("Edit " + selectedRow?.id)}>Edit</MenuItem>
        <MenuItem onClick={() => alert("Cancel " + selectedRow?.id)}>Cancel</MenuItem>
      </Menu>
    </Box>
  );
};

export default AppointmentsPage;
