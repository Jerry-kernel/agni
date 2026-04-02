import React from "react";
import {
  Box, Stack, Avatar, Typography, alpha,
} from "@mui/material";
import { Settings } from "@mui/icons-material";
import { SETTINGS_NAV } from "../constants/settingsConfig";

const FONT = "'Nunito', sans-serif";

const SettingsSidebar = ({ activeKey, onSelect }) => (
  <Box sx={{
    width: { xs: "100%", md: 260 },
    flexShrink: 0,
    bgcolor: "white",
    borderRadius: "18px",
    border: "1.5px solid rgba(42,127,111,0.12)",
    boxShadow: "0 4px 24px rgba(42,127,111,0.07)",
    overflow: "hidden",
  }}>
    {/* Sidebar header */}
    <Box sx={{ px: 2.5, py: 2.5, borderBottom: "1px solid rgba(0,0,0,0.06)", bgcolor: "rgba(42,127,111,0.03)" }}>
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Avatar sx={{ bgcolor: "rgba(42,127,111,0.12)", color: "#2A7F6F", width: 34, height: 34 }}>
          <Settings sx={{ fontSize: 18 }} />
        </Avatar>
        <Typography fontWeight={800} sx={{ fontFamily: FONT, fontSize: "0.95rem", color: "#1A2E22" }}>
          Settings
        </Typography>
      </Stack>
    </Box>

    {/* Nav items */}
    <Stack spacing={0.5} p={1.5}>
      {SETTINGS_NAV.map((item) => {
        const active = activeKey === item.key;
        return (
          <Box
            key={item.key}
            onClick={() => onSelect(item.key)}
            sx={{
              display: "flex", alignItems: "center", gap: 1.5,
              px: 2, py: 1.5, borderRadius: "12px", cursor: "pointer",
              transition: "all 0.18s ease",
              bgcolor: active ? alpha(item.color, 0.1) : "transparent",
              border: "1.5px solid",
              borderColor: active ? alpha(item.color, 0.25) : "transparent",
              "&:hover": {
                bgcolor: active ? alpha(item.color, 0.1) : "rgba(0,0,0,0.03)",
                borderColor: active ? alpha(item.color, 0.25) : "rgba(0,0,0,0.06)",
              },
            }}
          >
            <Avatar sx={{
              bgcolor: active ? alpha(item.color, 0.14) : "rgba(0,0,0,0.05)",
              color: active ? item.color : "text.secondary",
              width: 34, height: 34,
              transition: "all 0.18s ease",
            }}>
              {React.cloneElement(item.icon, { sx: { fontSize: 17 } })}
            </Avatar>
            <Box flex={1} minWidth={0}>
              <Typography sx={{
                fontFamily: FONT, fontSize: "0.85rem",
                fontWeight: active ? 800 : 600,
                color: active ? item.color : "#374151",
                transition: "color 0.18s",
              }}>
                {item.label}
              </Typography>
              <Typography variant="caption" sx={{
                fontFamily: FONT, color: "text.disabled", fontSize: "0.7rem",
                display: "block", lineHeight: 1.3,
              }}>
                {item.subtitle}
              </Typography>
            </Box>
            {active && (
              <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: item.color, flexShrink: 0 }} />
            )}
          </Box>
        );
      })}
    </Stack>
  </Box>
);

export default SettingsSidebar;