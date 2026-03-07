import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  InputBase,
  Badge,
  Avatar,
  Menu,
  MenuItem,
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
    sx={{
      color: "inherit",
      width: { xs: "100px", md: "200px" },
      transition: "width 0.3s",
      "&:focus": {
        width: { md: "260px" },
      },
    }}
    {...props}
  />
);



const Topbar = ({ onDrawerToggle }) => {
    const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="fixed"
      elevation={3}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        borderRadius: 0,
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={onDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" fontWeight={700}>
          AGNI
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

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