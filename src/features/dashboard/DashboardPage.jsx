import {
  Box,
  Grid,
  Paper,
  Typography,
  Divider,
  Button,
  Chip,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import PetsIcon from "@mui/icons-material/Pets";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AddIcon from "@mui/icons-material/Add";

import { LineChart, BarChart, PieChart } from "@mui/x-charts";

const DashboardPage = () => {
  const appointments = [
    { pet: "Buddy", owner: "John Doe", type: "Checkup", status: "Completed" },
    { pet: "Luna", owner: "Sarah Brown", type: "Vaccination", status: "Pending" },
    { pet: "Rocky", owner: "Mike Smith", type: "Surgery", status: "In Progress" },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* HEADER */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight="bold">
          Veterinary Hospital Dashboard
        </Typography>

        <Stack direction="row" spacing={1}>
          <Button variant="contained" startIcon={<AddIcon />}>
            New Appointment
          </Button>
          <Button variant="outlined" startIcon={<AddIcon />}>
            Add Pet
          </Button>
        </Stack>
      </Stack>

      {/* KPI CARDS */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {[
          { label: "Total Pets", value: "1,540", icon: <PetsIcon />, color: "primary" },
          { label: "Veterinarians", value: "12", icon: <LocalHospitalIcon />, color: "success" },
          { label: "Appointments Today", value: "46", icon: <EventAvailableIcon />, color: "warning" },
          { label: "Monthly Revenue", value: "$92,300", icon: <MonetizationOnIcon />, color: "error" },
        ].map((item, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper sx={{ p: 2, display: "flex", alignItems: "center" }}>
              <Box sx={{ mr: 2, color: `${item.color}.main` }}>
                {item.icon}
              </Box>
              <Box>
                <Typography variant="body2">{item.label}</Typography>
                <Typography variant="h6" fontWeight="bold">
                  {item.value}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* CHARTS */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 2 }}>
            <Typography fontWeight="bold">Appointments Trend</Typography>
            <Divider sx={{ my: 1 }} />

            <LineChart
              height={250}
              series={[
                { data: [20, 35, 40, 55, 70, 60, 80], label: "Appointments" },
              ]}
              xAxis={[
                {
                  scaleType: "point",
                  data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                },
              ]}
            />
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 2 }}>
            <Typography fontWeight="bold">Pets by Species</Typography>
            <Divider sx={{ my: 1 }} />

            <PieChart
              height={250}
              series={[
                {
                  data: [
                    { id: 0, value: 60, label: "Dogs" },
                    { id: 1, value: 25, label: "Cats" },
                    { id: 2, value: 10, label: "Birds" },
                    { id: 3, value: 5, label: "Others" },
                  ],
                },
              ]}
            />
          </Paper>
        </Grid>
      </Grid>

      {/* TABLE + SIDE */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper sx={{ p: 2 }}>
            <Typography fontWeight="bold">Today’s Appointments</Typography>
            <Divider sx={{ my: 1 }} />

            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Pet</TableCell>
                  <TableCell>Owner</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {appointments.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.pet}</TableCell>
                    <TableCell>{row.owner}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        size="small"
                        color={
                          row.status === "Completed"
                            ? "success"
                            : row.status === "Pending"
                            ? "warning"
                            : "info"
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Paper sx={{ p: 2 }}>
            <Typography fontWeight="bold">Top Treatments</Typography>
            <Divider sx={{ my: 1 }} />

            <BarChart
              height={250}
              series={[{ data: [40, 30, 25, 15], label: "Cases" }]}
              xAxis={[
                {
                  scaleType: "band",
                  data: ["Vaccination", "Surgery", "Dental", "Checkup"],
                },
              ]}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
