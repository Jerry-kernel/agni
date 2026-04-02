import React from "react";
import {
  Stack, TextField, Select, MenuItem, FormControl,
  InputLabel, Button, Chip, alpha, InputAdornment,
  ToggleButton, ToggleButtonGroup, Box,
} from "@mui/material";
import { Search, Refresh, GridView, TableRows, FilterList } from "@mui/icons-material";
import {
  SPECIALIZATION_FILTER, DEPARTMENT_FILTER,
  STATUS_FILTER, EMPLOYMENT_FILTER, SORT_OPTIONS,
} from "../constants/mockDoctors";

const PRIMARY = "#1B5E8C";
const FONT    = "'Nunito', sans-serif";

const selSx = {
  borderRadius: "12px", fontFamily: FONT, fontSize: "0.875rem", bgcolor: "white",
  "& .MuiOutlinedInput-notchedOutline": { borderColor: alpha(PRIMARY, 0.2) },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: alpha(PRIMARY, 0.4) },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: PRIMARY },
};

const Sel = ({ label, value, onChange, options }) => (
  <FormControl size="small" sx={{ minWidth: 150 }}>
    <InputLabel sx={{ fontFamily: FONT, fontSize: "0.85rem", "&.Mui-focused": { color: PRIMARY } }}>{label}</InputLabel>
    <Select value={value} label={label} onChange={(e) => onChange(e.target.value)} sx={selSx}>
      {options.map((o) => (
        <MenuItem key={typeof o === "string" ? o : o.value} value={typeof o === "string" ? o : o.value} sx={{ fontFamily: FONT, fontSize: "0.875rem" }}>
          {typeof o === "string" ? o : o.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

const FiltersBar = ({
  search, specFilter, deptFilter, statusFilter, empFilter, sortBy, viewMode, total,
  onSearch, onSpec, onDept, onStatus, onEmp, onSort, onView, onReset,
}) => (
  <Stack spacing={2}>
    <Stack direction={{ xs: "column", md: "row" }} spacing={1.5} alignItems={{ md: "center" }} flexWrap="wrap">
      {/* Search */}
      <TextField
        placeholder="Search by name, specialization, dept, ID…"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        size="small"
        sx={{
          flex: 1, minWidth: 220,
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px", fontFamily: FONT, fontSize: "0.875rem", bgcolor: "white",
            "& fieldset": { borderColor: alpha(PRIMARY, 0.2) },
            "&:hover fieldset": { borderColor: alpha(PRIMARY, 0.4) },
            "&.Mui-focused fieldset": { borderColor: PRIMARY, borderWidth: "1.5px" },
          },
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start"><Search sx={{ fontSize: 18, color: alpha(PRIMARY, 0.5) }} /></InputAdornment>,
        }}
      />

      <Sel label="Specialization" value={specFilter}   onChange={onSpec}   options={SPECIALIZATION_FILTER} />
      <Sel label="Department"     value={deptFilter}   onChange={onDept}   options={DEPARTMENT_FILTER}     />
      <Sel label="Status"         value={statusFilter} onChange={onStatus} options={STATUS_FILTER}          />
      <Sel label="Employment"     value={empFilter}    onChange={onEmp}    options={EMPLOYMENT_FILTER}      />
      <Sel label="Sort By"        value={sortBy}       onChange={onSort}   options={SORT_OPTIONS}           />

      {/* View toggle */}
      <ToggleButtonGroup value={viewMode} exclusive onChange={(_, v) => v && onView(v)} size="small"
        sx={{ bgcolor: "white", border: `1px solid ${alpha(PRIMARY, 0.2)}`, borderRadius: "12px", "& .MuiToggleButton-root": { border: "none", borderRadius: "10px", px: 1.5, "&.Mui-selected": { bgcolor: alpha(PRIMARY, 0.1), color: PRIMARY } } }}>
        <ToggleButton value="grid"><GridView fontSize="small" /></ToggleButton>
        <ToggleButton value="table"><TableRows fontSize="small" /></ToggleButton>
      </ToggleButtonGroup>

      <Button onClick={onReset} startIcon={<Refresh />} size="small"
        sx={{ color: PRIMARY, fontFamily: FONT, fontWeight: 700, borderRadius: "12px", textTransform: "none", whiteSpace: "nowrap", "&:hover": { bgcolor: alpha(PRIMARY, 0.07) } }}>
        Reset
      </Button>
    </Stack>

    {/* Result count */}
    <Stack direction="row" alignItems="center" spacing={1}>
      <FilterList sx={{ fontSize: 15, color: "text.disabled" }} />
      <Chip label={`${total} doctor${total !== 1 ? "s" : ""} found`} size="small"
        sx={{ height: 22, fontSize: "0.7rem", fontWeight: 700, fontFamily: FONT, bgcolor: alpha(PRIMARY, 0.08), color: PRIMARY }} />
    </Stack>
  </Stack>
);

export default FiltersBar;