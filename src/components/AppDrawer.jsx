// AppDrawer.jsx
import React from "react";
import { Drawer, List, ListItemButton, ListItemText } from "@mui/material";

export default function AppDrawer({ open, modules }) {
  return (
    <Drawer variant="permanent" open={open}>
      <List>
        {Object.keys(modules)
          .filter((key) => modules[key].enabled)
          .map((key) => (
            <ListItemButton key={key}>
              <ListItemText primary={modules[key].label} />
            </ListItemButton>
          ))}
      </List>
    </Drawer>
  );
}
