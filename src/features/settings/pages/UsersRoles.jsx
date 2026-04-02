import React, { useState } from "react";
import {
  Box, Stack, Typography, Avatar, Chip, Button, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, IconButton, Tooltip, alpha, TextField,
  InputAdornment, Select, MenuItem, FormControl, InputLabel,
} from "@mui/material";
import { People, Add, Edit, Delete, Search, Shield, Person } from "@mui/icons-material";

const COLOR = "#A8505F";
const FONT  = "'Nunito', sans-serif";

const MOCK_USERS = [
  { id: 1, name: "Dr. Ramesh Kumar",  email: "ramesh@vetcare.in",  role: "admin",    status: "Active",   avatar: "R", joined: "Jan 2024" },
  { id: 2, name: "Dr. Priya Nair",    email: "priya@vetcare.in",   role: "doctor",   status: "Active",   avatar: "P", joined: "Mar 2024" },
  { id: 3, name: "Sunitha Devi",      email: "sunitha@vetcare.in", role: "receptionist", status: "Active", avatar: "S", joined: "Feb 2024" },
  { id: 4, name: "Arjun Patel",       email: "arjun@vetcare.in",   role: "pharmacist",  status: "Inactive", avatar: "A", joined: "Jun 2024" },
  { id: 5, name: "Dr. Meena Pillai",  email: "meena@vetcare.in",   role: "doctor",   status: "Active",   avatar: "M", joined: "Apr 2024" },
];

const ROLE_STYLES = {
  admin:        { bg: "#E8F5E9", color: "#2E7D32" },
  doctor:       { bg: "#EDE7F6", color: "#6A1B9A" },
  receptionist: { bg: "#E3F2FD", color: "#1565C0" },
  pharmacist:   { bg: "#FFF8E1", color: "#F57F17" },
};

const ROLES = ["admin", "doctor", "receptionist", "pharmacist", "lab-technician"];

const UsersRoles = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const filtered = MOCK_USERS.filter((u) => {
    const q = search.toLowerCase();
    const matchSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    const matchRole   = roleFilter === "All" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const selectSx = {
    borderRadius: "12px", fontFamily: FONT, fontSize: "0.875rem",
    bgcolor: alpha(COLOR, 0.025),
    "& .MuiOutlinedInput-notchedOutline": { borderColor: alpha(COLOR, 0.2) },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: COLOR },
  };

  return (
    <Box>
      {/* Toolbar */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} alignItems={{ sm: "center" }} justifyContent="space-between" mb={3}>
        <Stack direction="row" spacing={1.5} flex={1}>
          <TextField
            placeholder="Search users…" size="small" value={search}
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
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel sx={{ fontFamily: FONT, fontSize: "0.875rem", "&.Mui-focused": { color: COLOR } }}>Role</InputLabel>
            <Select value={roleFilter} label="Role" onChange={(e) => setRoleFilter(e.target.value)} sx={selectSx}>
              <MenuItem value="All" sx={{ fontFamily: FONT }}>All Roles</MenuItem>
              {ROLES.map((r) => <MenuItem key={r} value={r} sx={{ fontFamily: FONT, textTransform: "capitalize" }}>{r}</MenuItem>)}
            </Select>
          </FormControl>
        </Stack>
        <Button variant="contained" startIcon={<Add />}
          sx={{ bgcolor: COLOR, fontFamily: FONT, fontWeight: 700, borderRadius: "12px", textTransform: "none", whiteSpace: "nowrap", boxShadow: `0 4px 14px ${alpha(COLOR, 0.35)}`, "&:hover": { filter: "brightness(0.9)" } }}>
          Invite User
        </Button>
      </Stack>

      {/* Table */}
      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: "14px", border: `1.5px solid ${alpha(COLOR, 0.12)}`, overflow: "hidden" }}>
        <Table>
          <TableHead sx={{ bgcolor: alpha(COLOR, 0.05) }}>
            <TableRow>
              {["User", "Role", "Status", "Joined", "Actions"].map((h) => (
                <TableCell key={h} sx={{ fontFamily: FONT, fontWeight: 800, fontSize: "0.75rem", color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: `1px solid ${alpha(COLOR, 0.1)}` }}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((user, idx) => {
              const rs = ROLE_STYLES[user.role] || { bg: "#F3F4F6", color: "#6B7280" };
              return (
                <TableRow key={user.id} sx={{ "&:hover": { bgcolor: alpha(COLOR, 0.025) }, "& td": { borderBottom: `1px solid ${alpha(COLOR, 0.06)}` } }}>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <Avatar sx={{ bgcolor: alpha(COLOR, 0.14), color: COLOR, width: 36, height: 36, fontSize: "0.875rem", fontWeight: 800, fontFamily: FONT }}>
                        {user.avatar}
                      </Avatar>
                      <Box>
                        <Typography sx={{ fontFamily: FONT, fontSize: "0.875rem", fontWeight: 700, color: "#1A2E22" }}>{user.name}</Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontFamily: FONT }}>{user.email}</Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip label={user.role} size="small"
                      sx={{ bgcolor: rs.bg, color: rs.color, fontWeight: 700, fontFamily: FONT, fontSize: "0.7rem", textTransform: "capitalize", height: 22 }} />
                  </TableCell>
                  <TableCell>
                    <Chip label={user.status} size="small"
                      sx={{ bgcolor: user.status === "Active" ? "#E8F5E9" : "#F3F4F6", color: user.status === "Active" ? "#2E7D32" : "#6B7280", fontWeight: 700, fontFamily: FONT, fontSize: "0.7rem", height: 22 }} />
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" color="text.secondary" sx={{ fontFamily: FONT }}>{user.joined}</Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={0.5}>
                      <Tooltip title="Edit" arrow>
                        <IconButton size="small" sx={{ color: COLOR, "&:hover": { bgcolor: alpha(COLOR, 0.1) } }}><Edit fontSize="small" /></IconButton>
                      </Tooltip>
                      <Tooltip title="Remove" arrow>
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

      {/* Role legend */}
      <Box mt={3}>
        <Typography sx={{ fontFamily: FONT, fontSize: "0.72rem", fontWeight: 800, color: "text.disabled", textTransform: "uppercase", letterSpacing: "0.08em", mb: 1.5 }}>
          Role Permissions Overview
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {Object.entries(ROLE_STYLES).map(([role, style]) => (
            <Chip key={role} icon={<Shield sx={{ fontSize: "13px !important" }} />} label={role}
              sx={{ bgcolor: style.bg, color: style.color, fontWeight: 700, fontFamily: FONT, fontSize: "0.72rem", height: 26, textTransform: "capitalize", "& .MuiChip-icon": { color: style.color } }} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default UsersRoles;