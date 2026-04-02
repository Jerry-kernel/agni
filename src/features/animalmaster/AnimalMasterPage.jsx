import React from "react";
import {
  Box, Container, Stack, Avatar, Typography,
  Paper, Tabs, Tab, alpha, Chip,
} from "@mui/material";
import { Pets, Category, Palette, Bloodtype } from "@mui/icons-material";

import { useAnimalMaster } from "./hooks/useAnimalMaster";
import SpeciesTab          from "./pages/SpeciesTab";
import BreedsTab           from "./pages/BreedsTab";
import ColorsTab           from "./pages/ColorsTab";
import BloodGroupsTab      from "./pages/BloodGroupsTab";

const FONT = "'Nunito', sans-serif";

const Fonts = () => (
  <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Nunito:wght@400;500;600;700;800&display=swap');`}</style>
);

const TABS = [
  { key: "species",      label: "Species",      icon: <Pets />,      color: "#2A7F6F" },
  { key: "breeds",       label: "Breeds",       icon: <Category />,  color: "#3A6186" },
  { key: "colors",       label: "Coat Colors",  icon: <Palette />,   color: "#7B5EA7" },
  { key: "bloodgroups",  label: "Blood Groups", icon: <Bloodtype />, color: "#A8505F" },
];

const AnimalMasterPage = () => {
  const master = useAnimalMaster();
  const { activeTab, setActiveTab } = master;

  const activeConfig = TABS.find((t) => t.key === activeTab);

  const renderContent = () => {
    switch (activeTab) {
      case "species":
        return (
          <SpeciesTab
            species={master.species}
            onAdd={master.addSpecies}
            onToggle={master.toggleSpecies}
            onDelete={master.deleteSpecies}
          />
        );
      case "breeds":
        return (
          <BreedsTab
            allSpecies={master.allSpecies}
            getBreeds={master.getBreeds}
            onAdd={master.addBreed}
            onDelete={master.deleteBreed}
            onEdit={master.editBreed}
          />
        );
      case "colors":
        return (
          <ColorsTab
            colors={master.colors}
            onAdd={master.addColor}
            onDelete={master.deleteColor}
          />
        );
      case "bloodgroups":
        return (
          <BloodGroupsTab
            allSpecies={master.allSpecies}
            bloodGroups={master.bloodGroups}
            onAdd={master.addBloodGroup}
            onDelete={master.deleteBloodGroup}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Fonts />
      <Box sx={{
        minHeight: "100vh",
        background: "linear-gradient(150deg, #EAF5F2 0%, #EDF5FB 60%, #F5F0FA 100%)",
        py: 4, px: 2,
      }}>
        <Container maxWidth="lg">

          {/* Page Header */}
          <Stack direction="row" alignItems="center" spacing={2} mb={4}>
            <Avatar sx={{ bgcolor: "#2A7F6F", width: 52, height: 52, boxShadow: "0 6px 20px rgba(42,127,111,0.32)" }}>
              <Pets />
            </Avatar>
            <Box>
              <Typography variant="h5" sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, color: "#1A2E22", lineHeight: 1.2 }}>
                Animal Master Data
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontFamily: FONT }}>
                Manage species, breeds, colors and blood groups used across the system
              </Typography>
            </Box>
          </Stack>

          {/* Tab bar */}
          <Paper elevation={0} sx={{
            borderRadius: "16px", mb: 3, overflow: "hidden",
            border: `1.5px solid ${alpha(activeConfig?.color || "#2A7F6F", 0.14)}`,
          }}>
            <Tabs
              value={activeTab}
              onChange={(_, v) => setActiveTab(v)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                px: 1, pt: 1,
                "& .MuiTab-root": {
                  fontFamily: FONT, fontWeight: 700, fontSize: "0.85rem",
                  textTransform: "none", borderRadius: "10px", minHeight: 44,
                  transition: "all 0.18s",
                  mr: 0.5,
                },
                "& .Mui-selected": { color: `${activeConfig?.color} !important` },
                "& .MuiTabs-indicator": { bgcolor: activeConfig?.color, height: 3, borderRadius: 2 },
              }}
            >
              {TABS.map((tab) => (
                <Tab
                  key={tab.key}
                  value={tab.key}
                  label={
                    <Stack direction="row" alignItems="center" spacing={0.8}>
                      {React.cloneElement(tab.icon, { sx: { fontSize: 18 } })}
                      <span>{tab.label}</span>
                    </Stack>
                  }
                />
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

export default AnimalMasterPage;