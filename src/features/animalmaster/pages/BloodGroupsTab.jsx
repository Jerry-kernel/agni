import React, { useState } from "react";
import {
  Box, Stack, Paper, Chip, alpha,
  Select, MenuItem, FormControl, InputLabel, Typography,
} from "@mui/material";
import { EditableChip, AddInputRow, EmptyMasterState, MasterSearchBar } from "../components/MasterTabPanel";

const COLOR = "#A8505F";
const FONT  = "'Nunito', sans-serif";

const BloodGroupsTab = ({ allSpecies, bloodGroups, onAdd, onDelete }) => {
  const [selectedSpecies, setSelectedSpecies] = useState(allSpecies[0]?.id || "");

  const groups = bloodGroups[selectedSpecies] || [];

  return (
    <Box>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} alignItems={{ sm: "center" }} mb={3}>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel sx={{ fontFamily: FONT, fontSize: "0.875rem", "&.Mui-focused": { color: COLOR } }}>
            Select Species
          </InputLabel>
          <Select
            value={selectedSpecies}
            label="Select Species"
            onChange={(e) => setSelectedSpecies(e.target.value)}
            sx={{
              borderRadius: "12px", fontFamily: FONT, fontSize: "0.875rem",
              bgcolor: alpha(COLOR, 0.025),
              "& .MuiOutlinedInput-notchedOutline": { borderColor: alpha(COLOR, 0.2) },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: COLOR },
            }}
          >
            {allSpecies.filter((s) => s.active).map((s) => (
              <MenuItem key={s.id} value={s.id} sx={{ fontFamily: FONT }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <span>{s.emoji}</span><span>{s.label}</span>
                </Stack>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Chip label={`${groups.length} blood groups`} size="small"
          sx={{ bgcolor: alpha(COLOR, 0.1), color: COLOR, fontWeight: 700, fontFamily: FONT, height: 26 }} />
      </Stack>

      <AddInputRow
        placeholder="Add blood group (e.g. DEA 1.2, Type C)…"
        color={COLOR}
        onAdd={(val) => onAdd(selectedSpecies, val)}
        buttonLabel="Add Group"
      />

      <Box mt={3}>
        {groups.length === 0
          ? <EmptyMasterState message="No blood groups defined for this species." color={COLOR} />
          : (
            <Paper elevation={0} sx={{ p: 2.5, borderRadius: "14px", border: `1.5px solid ${alpha(COLOR, 0.12)}`, bgcolor: alpha(COLOR, 0.02) }}>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {groups.map((g) => (
                  <EditableChip
                    key={g}
                    label={g}
                    color={COLOR}
                    onDelete={() => onDelete(selectedSpecies, g)}
                  />
                ))}
              </Stack>
            </Paper>
          )
        }
      </Box>
    </Box>
  );
};

export default BloodGroupsTab;