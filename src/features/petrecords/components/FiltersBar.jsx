import React from "react";
import {
  Stack, TextField, Select, MenuItem, FormControl,
  InputLabel, InputAdornment, Button, Chip, alpha, Box,
} from "@mui/material";
import { Search, FilterList, Refresh } from "@mui/icons-material";
import { SPECIES_FILTER, STATUS_FILTER, SORT_OPTIONS } from "../constants/mockData";

const PRIMARY = "#2A7F6F";
const FONT    = "'Nunito', sans-serif";

const selectSx = {
  borderRadius: "12px",
  fontFamily: FONT,
  fontSize: "0.875rem",
  bgcolor: "white",
  "& .MuiOutlinedInput-notchedOutline": { borderColor: alpha(PRIMARY, 0.2) },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: alpha(PRIMARY, 0.4) },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY },
};

const FiltersBar = ({
  search, speciesFilter, statusFilter, sortBy, total,
  onSearch, onSpecies, onStatus, onSort, onReset,
}) => (
  <Stack spacing={2}>
    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} alignItems={{ sm: "center" }}>
      {/* Search */}
      <TextField
        placeholder="Search by name, owner, breed, ID…"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        size="small"
        sx={{
          flex: 1,
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px", fontFamily: FONT, fontSize: "0.875rem",
            bgcolor: "white",
            "& fieldset": { borderColor: alpha(PRIMARY, 0.2) },
            "&:hover fieldset": { borderColor: alpha(PRIMARY, 0.4) },
            "&.Mui-focused fieldset": { borderColor: PRIMARY, borderWidth: "1.5px" },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ fontSize: 18, color: alpha(PRIMARY, 0.5) }} />
            </InputAdornment>
          ),
        }}
      />

      {/* Species */}
      <FormControl size="small" sx={{ minWidth: 130 }}>
        <InputLabel sx={{ fontFamily: FONT, fontSize: "0.875rem" }}>Species</InputLabel>
        <Select value={speciesFilter} label="Species" onChange={(e) => onSpecies(e.target.value)} sx={selectSx}>
          {SPECIES_FILTER.map((s) => <MenuItem key={s} value={s} sx={{ fontFamily: FONT }}>{s}</MenuItem>)}
        </Select>
      </FormControl>

      {/* Status */}
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel sx={{ fontFamily: FONT, fontSize: "0.875rem" }}>Status</InputLabel>
        <Select value={statusFilter} label="Status" onChange={(e) => onStatus(e.target.value)} sx={selectSx}>
          {STATUS_FILTER.map((s) => <MenuItem key={s} value={s} sx={{ fontFamily: FONT }}>{s}</MenuItem>)}
        </Select>
      </FormControl>

      {/* Sort */}
      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel sx={{ fontFamily: FONT, fontSize: "0.875rem" }}>Sort By</InputLabel>
        <Select value={sortBy} label="Sort By" onChange={(e) => onSort(e.target.value)} sx={selectSx}>
          {SORT_OPTIONS.map((o) => <MenuItem key={o.value} value={o.value} sx={{ fontFamily: FONT }}>{o.label}</MenuItem>)}
        </Select>
      </FormControl>

      {/* Reset */}
      <Button onClick={onReset} startIcon={<Refresh />} size="small"
        sx={{ color: PRIMARY, fontFamily: FONT, fontWeight: 700, borderRadius: "12px", textTransform: "none", whiteSpace: "nowrap", "&:hover": { bgcolor: alpha(PRIMARY, 0.06) } }}>
        Reset
      </Button>
    </Stack>

    {/* Results count */}
    <Stack direction="row" alignItems="center" spacing={1}>
      <FilterList sx={{ fontSize: 15, color: "text.disabled" }} />
      <Chip
        label={`${total} patient${total !== 1 ? "s" : ""} found`}
        size="small"
        sx={{ height: 22, fontSize: "0.7rem", fontWeight: 700, fontFamily: FONT, bgcolor: alpha(PRIMARY, 0.08), color: PRIMARY }}
      />
    </Stack>
  </Stack>
);

export default FiltersBar;