import React from "react";
import {
  Drawer, List, Toolbar, Box, Typography,
  Avatar, Tooltip, Divider, Stack, alpha,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import * as Icons from "@mui/icons-material";
import { menuConfig, ALWAYS_ON_MODULES } from "./menuConfig";

const PRIMARY = "#2A7F6F";
const PRIM_DK = "#1D6258";
const FONT    = "'Nunito', sans-serif";

// ── Icon resolver ─────────────────────────────────────────────────────────────
const ResolvedIcon = ({ name, active }) => {
  const Icon = Icons[name] || Icons.Menu;
  return (
    <Icon sx={{
      fontSize: 20,
      color: active ? PRIMARY : alpha("#1A2E22", 0.45),
      transition: "color 0.2s",
    }} />
  );
};

// ── Single nav item ───────────────────────────────────────────────────────────
const NavItem = ({ item, collapsed }) => (
  <NavLink
    to={item.path}
    style={{ textDecoration: "none", color: "inherit", display: "block" }}
  >
    {({ isActive }) => (
      <Tooltip
        title={collapsed ? item.label : ""}
        placement="right"
        arrow
        disableHoverListener={!collapsed}
      >
        <Box sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          mx: 1.5,
          mb: 0.5,
          px: collapsed ? 0 : 1.5,
          py: 1.1,
          borderRadius: "12px",
          cursor: "pointer",
          justifyContent: collapsed ? "center" : "flex-start",
          position: "relative",
          transition: "all 0.18s ease",
          bgcolor: isActive ? alpha(PRIMARY, 0.1) : "transparent",
          border: "1px solid",
          borderColor: isActive ? alpha(PRIMARY, 0.22) : "transparent",
          "&:hover": {
            bgcolor: isActive ? alpha(PRIMARY, 0.12) : alpha("#000", 0.04),
            borderColor: isActive ? alpha(PRIMARY, 0.22) : alpha("#000", 0.06),
          },
          "&::before": isActive ? {
            content: '""',
            position: "absolute",
            left: -12,
            top: "50%",
            transform: "translateY(-50%)",
            width: 3,
            height: "60%",
            borderRadius: "0 3px 3px 0",
            bgcolor: PRIMARY,
          } : {},
        }}>
          <Box sx={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 32, height: 32, borderRadius: "8px", flexShrink: 0,
            bgcolor: isActive ? alpha(PRIMARY, 0.12) : "transparent",
            transition: "background-color 0.18s",
          }}>
            <ResolvedIcon name={item.icon} active={isActive} />
          </Box>

          {!collapsed && (
            <Typography sx={{
              fontFamily: FONT,
              fontSize: "0.85rem",
              fontWeight: isActive ? 800 : 600,
              color: isActive ? PRIMARY : alpha("#1A2E22", 0.65),
              transition: "all 0.18s",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}>
              {item.label}
            </Typography>
          )}
        </Box>
      </Tooltip>
    )}
  </NavLink>
);

// ── Main Sidebar ──────────────────────────────────────────────────────────────
const Sidebar = ({ open, drawerWidth, onClose, collapsed = false }) => {
  const user    = useSelector((state) => state.auth?.user);
  const modules = useSelector((state) => state.settings?.modules ?? {});
  const userRole = user?.role || "doctor";

  const visibleItems = menuConfig.filter((item) => {
    const roleAllowed   = item.roles.includes(userRole);
    const moduleEnabled = ALWAYS_ON_MODULES.includes(item.module) || modules[item.module] !== false;
    return roleAllowed && moduleEnabled;
  });

  const effectiveWidth = collapsed ? 72 : drawerWidth;

  return (
    <Drawer
      variant="persistent"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        width: effectiveWidth,
        flexShrink: 0,
        transition: "width 0.25s ease",
        "& .MuiDrawer-paper": {
          width: effectiveWidth,
          boxSizing: "border-box",
          border: "none",
          borderRight: `1px solid ${alpha(PRIMARY, 0.1)}`,
          bgcolor: "#FAFCFB",
          transition: "width 0.25s ease",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Toolbar />

      {/* Clinic branding */}
      {!collapsed ? (
        <Box sx={{
          mx: 1.5, mb: 1, mt: 0.5, px: 2, py: 1.5,
          borderRadius: "12px",
          bgcolor: alpha(PRIMARY, 0.06),
          border: `1px solid ${alpha(PRIMARY, 0.12)}`,
        }}>
          <Stack direction="row" alignItems="center" spacing={1.2}>
            <Avatar sx={{ bgcolor: PRIMARY, width: 30, height: 30, fontSize: "0.9rem" }}>🐾</Avatar>
            <Box minWidth={0}>
              <Typography sx={{ fontFamily: FONT, fontSize: "0.78rem", fontWeight: 800, color: PRIM_DK, lineHeight: 1.1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                VetCare Hospital
              </Typography>
              <Typography sx={{ fontFamily: FONT, fontSize: "0.65rem", color: alpha(PRIM_DK, 0.6), textTransform: "capitalize" }}>
                {userRole}
              </Typography>
            </Box>
          </Stack>
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 1, mt: 0.5 }}>
          <Avatar sx={{ bgcolor: PRIMARY, width: 36, height: 36, fontSize: "1rem" }}>🐾</Avatar>
        </Box>
      )}

      <Divider sx={{ borderColor: alpha(PRIMARY, 0.08), mx: 1.5, mb: 1 }} />

      {/* Nav list */}
      <Box sx={{
        flex: 1, overflowY: "auto", overflowX: "hidden", pb: 2,
        "&::-webkit-scrollbar": { width: 4 },
        "&::-webkit-scrollbar-thumb": { bgcolor: alpha(PRIMARY, 0.15), borderRadius: 2 },
      }}>
        <List disablePadding>
          {visibleItems.map((item) => (
            <NavItem key={item.path} item={item} collapsed={collapsed} />
          ))}
        </List>
      </Box>

      {/* Bottom user strip */}
      {!collapsed && user && (
        <>
          <Divider sx={{ borderColor: alpha(PRIMARY, 0.08), mx: 1.5 }} />
          <Box sx={{ px: 2.5, py: 2 }}>
            <Stack direction="row" alignItems="center" spacing={1.2}>
              <Avatar sx={{
                bgcolor: alpha(PRIMARY, 0.14), color: PRIMARY,
                width: 32, height: 32, fontSize: "0.8rem", fontWeight: 800, fontFamily: FONT,
              }}>
                {user?.name?.[0]?.toUpperCase() || "U"}
              </Avatar>
              <Box minWidth={0}>
                <Typography sx={{ fontFamily: FONT, fontSize: "0.78rem", fontWeight: 700, color: "#1A2E22", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {user?.name || "User"}
                </Typography>
                <Typography sx={{ fontFamily: FONT, fontSize: "0.65rem", color: "text.secondary", textTransform: "capitalize" }}>
                  {userRole}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </>
      )}
    </Drawer>
  );
};

export default Sidebar;