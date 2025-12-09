import React from "react";
import { Box, CssBaseline } from "@mui/material";
import Sidebar from "../components/layout/sidebar/Sidebar";
import Topbar from "../components/layout/Topbar/Topbar";
import { Outlet } from "react-router-dom";

const drawerWidth = 240;

const MainLayout = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: drawerWidth, flexShrink: 0, bgcolor: "background.paper" }}
      >
        <Sidebar />
      </Box>

      {/* Main content wrapper */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Topbar */}
        <Box>
          <Topbar />
        </Box>

        {/* Page content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "#f5f5f5", 
            p: 2,
            overflow: "auto",
          }}
        >
          {/* Render the nested routes here */}
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
