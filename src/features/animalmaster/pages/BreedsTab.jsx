import React, { useState } from "react";
import {
  Box, Stack, Typography, Avatar, Paper,
  Select, MenuItem, FormControl, InputLabel,
  alpha, Chip,
} from "@mui/material";
import { Pets } from "@mui/icons-material";
import { EditableChip, AddInputRow, EmptyMasterState, MasterSearchBar } from "../components/MasterTabPanel";

const COLOR = "#3A6186";
const FONT  = "'Nunito', sans-serif";

const BreedsTab = ({ allSpecies, getBreeds, onAdd, onDelete, onEdit }) => {
  const [selectedSpecies, setSelectedSpecies] = useState(allSpecies[0]?.id || "");
  const [search, setSearch] = useState("");

  const breeds = getBreeds(selectedSpecies);
  const filtered = search
    ? breeds.filter((b) => b.toLowerCase().includes(search.toLowerCase()))
    : breeds;

  return (
    <Box>
      {/* Species selector */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} alignItems={{ sm: "center" }} mb={3}>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel sx={{ fontFamily: FONT, fontSize: "0.875rem", "&.Mui-focused": { color: COLOR } }}>
            Select Species
          </InputLabel>
          <Select
            value={selectedSpecies}
            label="Select Species"
            onChange={(e) => { setSelectedSpecies(e.target.value); setSearch(""); }}
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
                  <span>{s.emoji}</span>
                  <span>{s.label}</span>
                </Stack>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <MasterSearchBar
          value={search}
          onChange={setSearch}
          color={COLOR}
          placeholder="Search breeds…"
        />

        <Chip
          label={`${breeds.length} breeds`}
          size="small"
          sx={{ bgcolor: alpha(COLOR, 0.1), color: COLOR, fontWeight: 700, fontFamily: FONT, height: 26 }}
        />
      </Stack>

      {/* Add new breed */}
      <AddInputRow
        placeholder={`Add new breed for ${allSpecies.find((s) => s.id === selectedSpecies)?.label || "selected species"}…`}
        color={COLOR}
        onAdd={(val) => onAdd(selectedSpecies, val)}
        buttonLabel="Add Breed"
      />

      {/* Breeds list */}
      <Box mt={3}>
        {filtered.length === 0
          ? <EmptyMasterState message={search ? "No breeds match your search." : "No breeds yet. Add one above."} color={COLOR} />
          : (
            <Paper elevation={0} sx={{ p: 2.5, borderRadius: "14px", border: `1.5px solid ${alpha(COLOR, 0.12)}`, bgcolor: alpha(COLOR, 0.02) }}>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {filtered.map((breed) => (
                  <EditableChip
                    key={breed}
                    label={breed}
                    color={COLOR}
                    onDelete={() => onDelete(selectedSpecies, breed)}
                    onEdit={(old, newVal) => onEdit(selectedSpecies, old, newVal)}
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

export default BreedsTab;