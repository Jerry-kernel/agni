import React, { useState } from "react";
import {
  Box, Stack, Typography, Button, Paper, IconButton,
  TextField, Chip, alpha, Tooltip, Avatar,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, InputAdornment, Select,
  MenuItem, FormControl, InputLabel,
} from "@mui/material";
import { Add, Edit, Delete, LocalOffer, CurrencyRupee, Search, Save } from "@mui/icons-material";

const COLOR = "#8B6914";
const FONT  = "'Nunito', sans-serif";

const MOCK_SERVICES = [
  { id: 1, name: "General Consultation",     category: "Consultation",  price: 500,  duration: "20 min", status: "Active"   },
  { id: 2, name: "Emergency Consultation",   category: "Consultation",  price: 1200, duration: "30 min", status: "Active"   },
  { id: 3, name: "Vaccination (Single)",     category: "Vaccination",   price: 350,  duration: "15 min", status: "Active"   },
  { id: 4, name: "Full Vaccination Package", category: "Vaccination",   price: 1800, duration: "30 min", status: "Active"   },
  { id: 5, name: "Deworming",                category: "Preventive",    price: 200,  duration: "10 min", status: "Active"   },
  { id: 6, name: "Blood Test Panel",         category: "Diagnostics",   price: 900,  duration: "—",      status: "Active"   },
  { id: 7, name: "X-Ray (Single View)",      category: "Diagnostics",   price: 700,  duration: "—",      status: "Active"   },
  { id: 8, name: "Spay Surgery",             category: "Surgery",       price: 4500, duration: "2 hrs",  status: "Active"   },
  { id: 9, name: "Neuter Surgery",           category: "Surgery",       price: 3500, duration: "1.5 hrs",status: "Active"   },
  { id: 10, name: "Grooming – Basic",        category: "Grooming",      price: 600,  duration: "45 min", status: "Active"   },
  { id: 11, name: "Grooming – Full Package", category: "Grooming",      price: 1200, duration: "90 min", status: "Inactive" },
  { id: 12, name: "Dental Cleaning",         category: "Dental",        price: 2500, duration: "1 hr",   status: "Active"   },
];

const CATEGORY_COLORS = {
  Consultation: "#2A7F6F",
  Vaccination:  "#1A6E6E",
  Preventive:   "#3A6186",
  Diagnostics:  "#7B5EA7",
  Surgery:      "#A8505F",
  Grooming:     "#8B6914",
  Dental:       "#4A5568",
};

const CATEGORIES = ["All", ...Object.keys(CATEGORY_COLORS)];

const ServicesPricing = () => {
  const [search,   setSearch]   = useState("");
  const [catFilter,setCatFilter]= useState("All");
  const [editing,  setEditing]  = useState(null);

  const filtered = MOCK_SERVICES.filter((s) => {
    const q = search.toLowerCase();
    return (!q || s.name.toLowerCase().includes(q)) &&
           (catFilter === "All" || s.category === catFilter);
  });

  const totalActive   = MOCK_SERVICES.filter((s) => s.status === "Active").length;
  const avgPrice      = Math.round(MOCK_SERVICES.reduce((a, s) => a + s.price, 0) / MOCK_SERVICES.length);

  const selectSx = {
    borderRadius: "12px", fontFamily: FONT, fontSize: "0.875rem",
    bgcolor: alpha(COLOR, 0.025),
    "& .MuiOutlinedInput-notchedOutline": { borderColor: alpha(COLOR, 0.2) },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: COLOR },
  };

  return (
    <Box>
      {/* Summary chips */}
      <Stack direction="row" spacing={1.5} flexWrap="wrap" gap={1} mb={3}>
        {[
          { label: `${MOCK_SERVICES.length} Services`,      color: COLOR },
          { label: `${totalActive} Active`,                 color: "#2A7F6F" },
          { label: `Avg ₹${avgPrice}`,                      color: "#3A6186" },
        ].map((c) => (
          <Chip key={c.label} label={c.label} size="small"
            sx={{ bgcolor: alpha(c.color, 0.1), color: c.color, fontWeight: 700, fontFamily: FONT }} />
        ))}
      </Stack>

      {/* Toolbar */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} alignItems={{ sm: "center" }} justifyContent="space-between" mb={2.5}>
        <Stack direction="row" spacing={1.5} flex={1}>
          <TextField
            placeholder="Search services…" size="small" value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              flex: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px", fontFamily: FONT, fontSize: "0.875rem",
                bgcolor: alpha(COLOR, 0.025),
                "& fieldset": { borderColor: alpha(COLOR, 0.2) },
                "&.Mui-focused fieldset": { borderColor: COLOR, borderWidth: "1.5px" },
              },
            }}
            InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ fontSize: 17, color: alpha(COLOR, 0.5) }} /></InputAdornment> }}
          />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel sx={{ fontFamily: FONT, fontSize: "0.875rem", "&.Mui-focused": { color: COLOR } }}>Category</InputLabel>
            <Select value={catFilter} label="Category" onChange={(e) => setCatFilter(e.target.value)} sx={selectSx}>
              {CATEGORIES.map((c) => <MenuItem key={c} value={c} sx={{ fontFamily: FONT }}>{c}</MenuItem>)}
            </Select>
          </FormControl>
        </Stack>
        <Button variant="contained" startIcon={<Add />}
          sx={{ bgcolor: COLOR, fontFamily: FONT, fontWeight: 700, borderRadius: "12px", textTransform: "none", whiteSpace: "nowrap", boxShadow: `0 4px 14px ${alpha(COLOR, 0.35)}`, "&:hover": { filter: "brightness(0.9)" } }}>
          Add Service
        </Button>
      </Stack>

      {/* Table */}
      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: "14px", border: `1.5px solid ${alpha(COLOR, 0.12)}`, overflow: "hidden" }}>
        <Table>
          <TableHead sx={{ bgcolor: alpha(COLOR, 0.05) }}>
            <TableRow>
              {["Service Name", "Category", "Price", "Duration", "Status", "Actions"].map((h) => (
                <TableCell key={h} sx={{ fontFamily: FONT, fontWeight: 800, fontSize: "0.75rem", color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: `1px solid ${alpha(COLOR, 0.1)}` }}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((svc) => {
              const catColor = CATEGORY_COLORS[svc.category] || COLOR;
              return (
                <TableRow key={svc.id} sx={{ "&:hover": { bgcolor: alpha(COLOR, 0.025) }, "& td": { borderBottom: `1px solid ${alpha(COLOR, 0.06)}` } }}>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <Avatar sx={{ bgcolor: alpha(catColor, 0.12), color: catColor, width: 32, height: 32 }}>
                        <LocalOffer sx={{ fontSize: 15 }} />
                      </Avatar>
                      <Typography sx={{ fontFamily: FONT, fontSize: "0.875rem", fontWeight: 600, color: "#1A2E22" }}>
                        {svc.name}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip label={svc.category} size="small"
                      sx={{ bgcolor: alpha(catColor, 0.1), color: catColor, fontWeight: 700, fontFamily: FONT, fontSize: "0.7rem", height: 22 }} />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={0.3}>
                      <CurrencyRupee sx={{ fontSize: 14, color: COLOR }} />
                      <Typography sx={{ fontFamily: FONT, fontWeight: 700, color: COLOR }}>{svc.price.toLocaleString()}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" color="text.secondary" sx={{ fontFamily: FONT }}>{svc.duration}</Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={svc.status} size="small"
                      sx={{ bgcolor: svc.status === "Active" ? "#E8F5E9" : "#F3F4F6", color: svc.status === "Active" ? "#2E7D32" : "#6B7280", fontWeight: 700, fontFamily: FONT, fontSize: "0.7rem", height: 22 }} />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={0.5}>
                      <Tooltip title="Edit" arrow>
                        <IconButton size="small" sx={{ color: COLOR, "&:hover": { bgcolor: alpha(COLOR, 0.1) } }}><Edit fontSize="small" /></IconButton>
                      </Tooltip>
                      <Tooltip title="Delete" arrow>
                        <IconButton size="small" sx={{ color: "#C62828", "&:hover": { bgcolor: alpha("#C62828", 0.08) } }}><Delete fontSize="small" /></IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ServicesPricing;