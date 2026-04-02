import React, { useState } from "react";
import {
  Box, Stack, Typography, Avatar, Chip, Paper,
  Switch, IconButton, Tooltip, alpha, Grid,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { AddInputRow, EmptyMasterState } from "../components/MasterTabPanel";

const COLOR = "#2A7F6F";
const FONT  = "'Nunito', sans-serif";

const EMOJI_OPTIONS = ["🐕","🐈","🦜","🐇","🐹","🦎","🐟","🐾","🦔","🐢","🐠","🦦"];

const SpeciesTab = ({ species, onAdd, onToggle, onDelete }) => {
  const [emoji, setEmoji] = useState("🐾");

  const handleAdd = (label) => {
    onAdd({ label, emoji, id: label.toLowerCase().replace(/\s+/g, "_") });
  };

  return (
    <Box>
      {/* Emoji picker */}
      <Box mb={2}>
        <Typography sx={{ fontFamily: FONT, fontSize: "0.75rem", fontWeight: 700, color: "text.secondary", mb: 1 }}>
          Pick emoji for new species
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={0.8}>
          {EMOJI_OPTIONS.map((e) => (
            <Box key={e} onClick={() => setEmoji(e)}
              sx={{
                width: 36, height: 36, display: "flex", alignItems: "center",
                justifyContent: "center", borderRadius: "8px", cursor: "pointer",
                fontSize: "1.3rem",
                border: "2px solid",
                borderColor: emoji === e ? COLOR : alpha("#000", 0.1),
                bgcolor: emoji === e ? alpha(COLOR, 0.08) : "transparent",
                transition: "all 0.15s",
                "&:hover": { borderColor: COLOR },
              }}>
              {e}
            </Box>
          ))}
        </Stack>
      </Box>

      <AddInputRow
        placeholder="New species name (e.g. Guinea Pig)"
        color={COLOR}
        onAdd={handleAdd}
        buttonLabel="Add Species"
      />

      <Box mt={3}>
        {species.length === 0
          ? <EmptyMasterState message="No species yet. Add one above." color={COLOR} />
          : (
            <Grid container spacing={1.5}>
              {species.map((s) => (
                <Grid item xs={12} sm={6} md={4} key={s.id}>
                  <Paper elevation={0} sx={{
                    display: "flex", alignItems: "center", gap: 1.5,
                    px: 2, py: 1.5, borderRadius: "12px",
                    border: "1.5px solid",
                    borderColor: s.active ? alpha(COLOR, 0.2) : alpha("#000", 0.07),
                    bgcolor: s.active ? alpha(COLOR, 0.03) : "transparent",
                    transition: "all 0.18s",
                  }}>
                    <Typography fontSize="1.4rem">{s.emoji}</Typography>
                    <Typography sx={{ fontFamily: FONT, fontWeight: 700, color: s.active ? "#1A2E22" : "text.disabled", flex: 1, fontSize: "0.875rem" }}>
                      {s.label}
                    </Typography>
                    <Tooltip title={s.active ? "Disable" : "Enable"} arrow>
                      <Switch
                        size="small"
                        checked={s.active}
                        onChange={() => onToggle(s.id)}
                        sx={{
                          "& .MuiSwitch-switchBase.Mui-checked": { color: COLOR },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: COLOR },
                        }}
                      />
                    </Tooltip>
                    <Tooltip title="Delete" arrow>
                      <IconButton size="small" onClick={() => onDelete(s.id)}
                        sx={{ color: alpha("#C62828", 0.5), "&:hover": { color: "#C62828", bgcolor: alpha("#C62828", 0.08) } }}>
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )
        }
      </Box>
    </Box>
  );
};

export default SpeciesTab;