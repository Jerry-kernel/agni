import React from "react";
import {
  Box, Container, Stack, Avatar, Typography,
  Paper, alpha, useMediaQuery, useTheme,
} from "@mui/material";
import { Settings } from "@mui/icons-material";

import { useSettings }     from "./hooks/useSettings";
import SettingsSidebar     from "./components/SettingsSidebar";
import OrgProfile          from "./pages/OrgProfile";
import AnimalMaster    from "./pages/AnimalMaster";
import FeatureSettings     from "./pages/FeatureSettings";
import UsersRoles          from "./pages/UsersRoles";
import ServicesPricing     from "./pages/ServicesPricing";


// Map key → component
const PAGE_MAP = {
  "org-profile":     <OrgProfile />,
  "animal":       <AnimalMaster />,
  "features":        <FeatureSettings />,
  "users-roles":     <UsersRoles />,
  "services-pricing":<ServicesPricing />,
};

const ModuleSettings = () => {
  const { activeKey, setActiveKey, activeTab } = useSettings();
  const theme    = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      
      <Box sx={{
        minHeight: "100vh",
        background: "linear-gradient(150deg, #EAF5F2 0%, #EDF5FB 60%, #F5F0FA 100%)",
        py: 4, px: 2,
      }}>
        <Container maxWidth="lg">

          {/* Page Header */}
          <Stack direction="row" alignItems="center" spacing={2} mb={4}>
            <Avatar sx={{ bgcolor: "#2A7F6F", width: 52, height: 52, boxShadow: "0 6px 20px rgba(42,127,111,0.32)" }}>
              <Settings />
            </Avatar>
            <Box>
              <Typography variant="h5" sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, color: "#1A2E22", lineHeight: 1.2 }}>
                Settings
              </Typography>
              <Typography variant="caption" color="text.secondary" >
                Manage your clinic configuration
              </Typography>
            </Box>
          </Stack>

          {/* Layout: sidebar + content */}
          <Stack direction={{ xs: "column", md: "row" }} spacing={3} alignItems="flex-start">

            {/* Sidebar */}
            <SettingsSidebar activeKey={activeKey} onSelect={setActiveKey} />

            {/* Content panel */}
            <Box flex={1} minWidth={0}>
              <Paper elevation={0} sx={{
                borderRadius: "18px", p: { xs: 2.5, sm: 4 },
                border: `1.5px solid ${alpha(activeTab?.color || "#2A7F6F", 0.14)}`,
                boxShadow: `0 12px 48px ${alpha(activeTab?.color || "#2A7F6F", 0.07)}`,
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              }}>
                {/* Sub-page header */}
                <Stack direction="row" alignItems="center" spacing={1.5} mb={3}>
                  <Avatar sx={{
                    bgcolor: alpha(activeTab?.color || "#2A7F6F", 0.12),
                    color: activeTab?.color || "#2A7F6F",
                    width: 38, height: 38,
                  }}>
                    {activeTab?.icon && React.cloneElement(activeTab.icon, { sx: { fontSize: 20 } })}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: "#1A2E22", lineHeight: 1.2 }}>
                      {activeTab?.label}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" >
                      {activeTab?.subtitle}
                    </Typography>
                  </Box>
                </Stack>

                {/* Active sub-page */}
                {PAGE_MAP[activeKey]}
              </Paper>
            </Box>

          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default ModuleSettings;