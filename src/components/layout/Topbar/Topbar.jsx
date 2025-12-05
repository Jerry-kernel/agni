import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Tooltip,
  alpha,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Topbar = ({ onDrawerToggle }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Search bar styling (MUI custom)
  const Search = (props) => (
    <Box
      sx={{
        position: "relative",
        borderRadius: 1,
        backgroundColor: (theme) => alpha(theme.palette.common.white, 0.15),
        "&:hover": {
          backgroundColor: (theme) => alpha(theme.palette.common.white, 0.25),
        },
        marginRight: 2,
        marginLeft: 0,
        width: "auto",
        display: "flex",
        alignItems: "center",
        padding: "0 8px",
      }}
      {...props}
    />
  );

  const SearchIconWrapper = () => (
    <Box sx={{ pointerEvents: "none", display: "flex", alignItems: "center" }}>
      <SearchIcon />
    </Box>
  );

  const StyledInputBase = (props) => (
    <InputBase
      placeholder="Search…"
      inputProps={{ "aria-label": "search" }}
      sx={{
        color: "inherit",
        ml: 1,
        flex: 1,
      }}
      {...props}
    />
  );

  return (
    <AppBar
      position="sticky"
      color="primary"
      elevation={3}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        borderRadius: 0, 
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left: Drawer toggle + Brand */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onDrawerToggle}
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700 }}>
            AGNI
          </Typography>
        </Box>

        {/* Right: Search + Notifications + User */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Search */}
          <Search>
            <SearchIconWrapper />
            <StyledInputBase />
          </Search>

          {/* Notifications */}
          <IconButton color="inherit" aria-label="show notifications">
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* User Avatar */}
          <Tooltip title="Open profile menu">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="User Name" src="/static/images/avatar/1.jpg" />
            </IconButton>
          </Tooltip>

          <Menu
            sx={{ mt: "45px" }}
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>Settings</MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
