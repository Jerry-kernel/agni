import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import * as Icons from "@mui/icons-material";
import { menuConfig } from "./menuconfig";

const Sidebar = ({ open, drawerWidth, onClose }) => {
  const renderIcon = (iconName) => {
    const IconComponent = Icons[iconName] || Icons["Menu"];
    return <IconComponent />;
  };

  return (
    <Drawer
      variant="persistent"
      open={open}
      onClose={onClose}          // 🔥 IMPORTANT to close drawer on click outside
      ModalProps={{
        keepMounted: true,
        hideBackdrop: true,     // hides dull background
      }}
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <List>
        {menuConfig.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {({ isActive }) => (
              <ListItemButton selected={isActive}>
                <ListItemIcon>{renderIcon(item.icon)}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            )}
          </NavLink>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;