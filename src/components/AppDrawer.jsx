// AppDrawer.jsx
import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Box,
} from "@mui/material";
import * as Icons from "@mui/icons-material";
import { NavLink, useLocation } from "react-router-dom";

const DRAWER_WIDTH = 240;
const COLLAPSED_WIDTH = 64;

export default function AppDrawer({ open, modules }) {
  const location = useLocation();

  const renderIcon = (iconName) => {
    const Icon = Icons[iconName] || Icons.Menu;
    return <Icon fontSize="small" />;
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? DRAWER_WIDTH : COLLAPSED_WIDTH,
        flexShrink: 0,
        whiteSpace: "nowrap",
        "& .MuiDrawer-paper": {
          width: open ? DRAWER_WIDTH : COLLAPSED_WIDTH,
          overflowX: "hidden",
          top: 64, // matches Topbar height
          height: "calc(100vh - 64px)",
          transition: (theme) =>
            theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.standard,
            }),
        },
      }}
    >
      <List sx={{ pt: 1 }}>
        {Object.keys(modules)
          .filter((key) => modules[key].enabled)
          .map((key) => {
            const item = modules[key];
            const isActive = location.pathname.startsWith(item.path);

            return (
              <Tooltip
                key={key}
                title={!open ? item.label : ""}
                placement="right"
                arrow
              >
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  selected={isActive}
                  sx={{
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    "&.Mui-selected": {
                      backgroundColor: "primary.main",
                      color: "primary.contrastText",
                      "& .MuiListItemIcon-root": {
                        color: "primary.contrastText",
                      },
                    },
                    "&.Mui-selected:hover": {
                      backgroundColor: "primary.dark",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {renderIcon(item.icon)}
                  </ListItemIcon>

                  {open && <ListItemText primary={item.label} />}
                </ListItemButton>
              </Tooltip>
            );
          })}
      </List>
    </Drawer>
  );
}
