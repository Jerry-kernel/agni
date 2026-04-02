import React from "react";
import {
  Box, Container, Paper, Tabs, Tab,
  Stack, Button, alpha, Typography, Avatar,
} from "@mui/material";
import { ArrowBack, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { useDoctorView, TABS } from "./hooks/useDoctorView";
import DoctorHero        from "./components/DoctorHero";
import OverviewTab       from "./components/OverviewTab";
import ProfessionalTab   from "./components/ProfessionalTab";
import ScheduleTab       from "./components/ScheduleTab";
import PatientsTab       from "./components/PatientsTab";
import AppointmentsTab   from "./components/AppointmentsTab";

const PRIMARY = "#1B5E8C";
const FONT    = "'Nunito', sans-serif";

const Fonts = () => (
  <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Nunito:wght@400;500;600;700;800&display=swap');`}</style>
);

const TAB_COLORS = {
  overview:     PRIMARY,
  professional: "#7B5EA7",
  schedule:     "#3A6186",
  patients:     "#2A7F6F",
  appointments: "#7B5EA7",
};

const DoctorViewPage = () => {
  const navigate = useNavigate();
  const {
    doctor, patients, upcoming,
    activeTab, setActiveTab, toggleStatus,
  } = useDoctorView();

  const tabColor = TAB_COLORS[activeTab] || PRIMARY;

  const renderContent = () => {
    switch (activeTab) {
      case "overview":      return <OverviewTab      doctor={doctor} />;
      case "professional":  return <ProfessionalTab  doctor={doctor} />;
      case "schedule":      return <ScheduleTab      doctor={doctor} />;
      case "patients":      return <PatientsTab      patients={patients} />;
      case "appointments":  return <AppointmentsTab  upcoming={upcoming} totalToday={doctor.appointmentsToday} />;
      default:              return null;
    }
  };

  return (
    <>
      <Fonts />
      <Box sx={{
        minHeight: "100vh",
        background: "linear-gradient(150deg, #E3F2FD 0%, #EDE7F6 55%, #E8F5E9 100%)",
        py: 4, px: 2,
      }}>
        <Container maxWidth="lg">

          {/* Top bar */}
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3} flexWrap="wrap" gap={2}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate("/doctors")}
              sx={{ color: PRIMARY, fontFamily: FONT, fontWeight: 700, borderRadius: "12px", textTransform: "none", "&:hover": { bgcolor: alpha(PRIMARY, 0.07) } }}
            >
              Back to Doctors
            </Button>
            <Button
              variant="contained"
              startIcon={<Edit />}
              onClick={() => navigate(`/doctors/${doctor.id}/edit`)}
              sx={{
                bgcolor: PRIMARY, fontFamily: FONT, fontWeight: 700,
                borderRadius: "12px", textTransform: "none", px: 3,
                boxShadow: `0 4px 14px ${alpha(PRIMARY, 0.3)}`,
                "&:hover": { bgcolor: "#0D3D5F" },
              }}
            >
              Edit Profile
            </Button>
          </Stack>

          {/* Hero */}
          <DoctorHero doctor={doctor} onToggleStatus={toggleStatus} />

          {/* Tabs + content */}
          <Paper elevation={0} sx={{
            borderRadius: "18px",
            border: `1.5px solid ${alpha(tabColor, 0.14)}`,
            boxShadow: `0 8px 32px ${alpha(tabColor, 0.07)}`,
            overflow: "hidden",
            transition: "border-color 0.3s, box-shadow 0.3s",
          }}>
            {/* Tab bar */}
            <Tabs
              value={activeTab}
              onChange={(_, v) => setActiveTab(v)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                px: 1, pt: 1,
                borderBottom: `1px solid ${alpha(tabColor, 0.1)}`,
                "& .MuiTab-root": {
                  fontFamily: FONT, fontWeight: 700, fontSize: "0.83rem",
                  textTransform: "none", borderRadius: "10px",
                  minHeight: 44, mr: 0.5,
                  transition: "all 0.18s",
                },
                "& .Mui-selected": { color: `${tabColor} !important` },
                "& .MuiTabs-indicator": { bgcolor: tabColor, height: 3, borderRadius: 2 },
              }}
            >
              {TABS.map((tab) => (
                <Tab key={tab.key} value={tab.key} label={tab.label} />
              ))}
            </Tabs>

            {/* Content */}
            <Box sx={{ p: { xs: 2.5, sm: 3 } }}>
              {renderContent()}
            </Box>
          </Paper>

        </Container>
      </Box>
    </>
  );
};

export default DoctorViewPage;