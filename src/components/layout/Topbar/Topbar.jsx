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

/* 🔹 Extracted styled helpers */
const Search = (props) => (
  <Box
    sx={{
      position: "relative",
      borderRadius: 1,
      backgroundColor: (theme) => alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: (theme) => alpha(theme.palette.common.white, 0.25),
      },
      px: 1,
      display: { xs: "none", md: "flex" },
      alignItems: "center",
      minWidth: 200,
    }}
    {...props}
  />
);

const SearchIconWrapper = () => (
  <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
    <SearchIcon fontSize="small" />
  </Box>
);

const StyledInputBase = (props) => (
  <InputBase
    placeholder="Search…"
    inputProps={{ "aria-label": "search" }}
    sx={{ color: "inherit", width: "100%" }}
    {...props}
  />
);

const Topbar = ({ onDrawerToggle, showMenuButton = true }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="sticky"
      color="primary"
      elevation={3}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {showMenuButton && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={onDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" fontWeight={700} noWrap>
            AGNI
          </Typography>
        </Box>

        {/* RIGHT */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Search>
            <SearchIconWrapper />
            <StyledInputBase />
          </Search>

          <IconButton color="inherit">
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Tooltip title="Account settings">
            <IconButton onClick={handleOpenUserMenu} size="small">
              <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
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
