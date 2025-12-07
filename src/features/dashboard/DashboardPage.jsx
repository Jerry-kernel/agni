import { Box, Grid, Paper, Typography, Divider } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const DashboardPage = () => {
  return (
    <Box sx={{ p: 2 }}>
      {/* Page Title */}
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        Admin Dashboard
      </Typography>

      {/* KPI CARDS */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: "flex", alignItems: "center" }}>
            <PeopleIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h6">Total Patients</Typography>
              <Typography variant="h5" fontWeight="bold">
                1,245
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: "flex", alignItems: "center" }}>
            <LocalHospitalIcon color="success" sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h6">Doctors</Typography>
              <Typography variant="h5" fontWeight="bold">
                48
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: "flex", alignItems: "center" }}>
            <EventAvailableIcon color="warning" sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h6">Appointments</Typography>
              <Typography variant="h5" fontWeight="bold">
                320
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: "flex", alignItems: "center" }}>
            <MonetizationOnIcon color="error" sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h6">Revenue</Typography>
              <Typography variant="h5" fontWeight="bold">
                $84,000
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* MAIN CONTENT ROW */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {/* Recent Patients */}
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              Recent Patients
            </Typography>
            <Divider sx={{ my: 1 }} />

            <Box>
              <Typography variant="body1">• John Doe - Fever</Typography>
              <Typography variant="body1">• Sarah Brown - Checkup</Typography>
              <Typography variant="body1">• Michael Smith - Surgery</Typography>
              <Typography variant="body1">• Nancy Wilson - Diabetes follow-up</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Appointments Chart Placeholder */}
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight="bold">
              Appointment Trends
            </Typography>
            <Divider sx={{ my: 1 }} />

            <Box
              sx={{
                height: 200,
                bgcolor: "#eaeaea",
                borderRadius: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "gray",
              }}
            >
              Chart Placeholder
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
