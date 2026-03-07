import React, { useState } from "react";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import Sidebar from "../components/layout/sidebar/Sidebar";
import Topbar from "../components/layout/Topbar/Topbar";
import { Outlet } from "react-router-dom";

const drawerWidth = 240;

const MainLayout = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Topbar onDrawerToggle={handleDrawerToggle} />

      <Sidebar
        open={open}
        drawerWidth={drawerWidth}
        onClose={handleDrawerClose}  // 🔥 pass handler
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: open ? `${drawerWidth}px` : 0,
          transition: "margin 0.3s ease",
          width: "100%",
        }}
      >
        <Toolbar />
        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;