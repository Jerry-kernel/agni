import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import * as Icons from "@mui/icons-material";
import { menuConfig } from "./menuconfig";

const drawerWidth = 240;



const Sidebar = () => {
  const role = useSelector((state) => state.auth.user.role);
  const modules = useSelector((state) => state.settings.modules) || {};


  const filteredMenu = menuConfig.filter((item) => {
    const roleAllowed = item.roles.includes(role);
    const moduleEnabled = modules[item.module] !== false; // undefined means enabled
    return roleAllowed && moduleEnabled;
  });

  const renderIcon = (iconName) => {
    const IconComponent = Icons[iconName] || Icons["Menu"];
    return <IconComponent />;
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          top: "64px", // offset below Topbar (AppBar default height)
          height: "calc(100vh - 64px)",
          borderRight: "1px solid rgba(0,0,0,0.12)",
        },
      }}
    >
      <List>
        {filteredMenu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={{ textDecoration: "none", color: "inherit" }}
            activeclassname="Mui-selected"
          >
            <ListItemButton>
              <ListItemIcon>{renderIcon(item.icon)}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </NavLink>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
