import React, { useState } from "react";
import {
  Box, Stack, TextField, Button, Chip, IconButton,
  Typography, alpha, InputAdornment, Tooltip, Paper,
} from "@mui/material";
import { Add, Delete, Edit, Check, Close, Search } from "@mui/icons-material";

const FONT = "'Nunito', sans-serif";

// ── Editable chip ─────────────────────────────────────────────────────────────
export const EditableChip = ({ label, color, onDelete, onEdit }) => {
  const [editing,  setEditing]  = useState(false);
  const [val,      setVal]      = useState(label);

  const commit = () => { if (val.trim() && val !== label) onEdit?.(label, val.trim()); setEditing(false); };
  const cancel = () => { setVal(label); setEditing(false); };

  if (editing) {
    return (
      <Stack direction="row" alignItems="center" spacing={0.5}
        sx={{ border: `1.5px solid ${alpha(color, 0.4)}`, borderRadius: "20px", pl: 1.5, pr: 0.5, py: 0.3, bgcolor: alpha(color, 0.05) }}>
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") commit(); if (e.key === "Escape") cancel(); }}
          autoFocus
          style={{ border: "none", outline: "none", fontFamily: FONT, fontSize: "0.78rem", fontWeight: 600, background: "transparent", color: color, width: Math.max(60, val.length * 8) }}
        />
        <IconButton size="small" onClick={commit}  sx={{ color: "#2E7D32", p: 0.3 }}><Check   sx={{ fontSize: 14 }} /></IconButton>
        <IconButton size="small" onClick={cancel}  sx={{ color: "#C62828", p: 0.3 }}><Close   sx={{ fontSize: 14 }} /></IconButton>
      </Stack>
    );
  }

  return (
    <Chip
      label={label}
      size="small"
      onDelete={onDelete}
      deleteIcon={<Delete sx={{ fontSize: "13px !important" }} />}
      onClick={onEdit ? () => setEditing(true) : undefined}
      sx={{
        bgcolor: alpha(color, 0.09), color,
        fontWeight: 700, fontFamily: FONT, fontSize: "0.78rem",
        height: 28, cursor: onEdit ? "pointer" : "default",
        "& .MuiChip-deleteIcon": { color: alpha(color, 0.5), "&:hover": { color } },
        "&:hover": onEdit ? { bgcolor: alpha(color, 0.15) } : {},
      }}
    />
  );
};

// ── Add input row ─────────────────────────────────────────────────────────────
export const AddInputRow = ({ placeholder, color, onAdd, buttonLabel = "Add" }) => {
  const [val, setVal] = useState("");

  const submit = () => {
    if (!val.trim()) return;
    onAdd(val.trim());
    setVal("");
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <TextField
        placeholder={placeholder}
        value={val}
        size="small"
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        sx={{
          flex: 1,
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px", fontFamily: FONT, fontSize: "0.875rem",
            bgcolor: alpha(color, 0.025),
            "& fieldset": { borderColor: alpha(color, 0.2) },
            "&:hover fieldset": { borderColor: alpha(color, 0.4) },
            "&.Mui-focused fieldset": { borderColor: color, borderWidth: "1.5px" },
          },
          "& .MuiInputLabel-root.Mui-focused": { color },
        }}
      />
      <Button
        variant="contained"
        onClick={submit}
        startIcon={<Add />}
        disabled={!val.trim()}
        sx={{
          bgcolor: color, fontFamily: FONT, fontWeight: 700,
          borderRadius: "12px", textTransform: "none", px: 2.5,
          boxShadow: `0 3px 10px ${alpha(color, 0.3)}`,
          "&:hover": { filter: "brightness(0.9)" },
          "&.Mui-disabled": { bgcolor: alpha(color, 0.3), color: "#fff" },
        }}
      >
        {buttonLabel}
      </Button>
    </Stack>
  );
};

// ── Search bar ────────────────────────────────────────────────────────────────
export const MasterSearchBar = ({ value, onChange, color, placeholder }) => (
  <TextField
    placeholder={placeholder || "Search…"}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    size="small"
    sx={{
      "& .MuiOutlinedInput-root": {
        borderRadius: "12px", fontFamily: FONT, fontSize: "0.875rem",
        bgcolor: alpha(color, 0.025),
        "& fieldset": { borderColor: alpha(color, 0.2) },
        "&.Mui-focused fieldset": { borderColor: color, borderWidth: "1.5px" },
      },
    }}
    InputProps={{
      startAdornment: <InputAdornment position="start"><Search sx={{ fontSize: 17, color: alpha(color, 0.5) }} /></InputAdornment>,
    }}
  />
);

// ── Empty state ───────────────────────────────────────────────────────────────
export const EmptyMasterState = ({ message, color }) => (
  <Paper elevation={0} sx={{
    textAlign: "center", py: 5, borderRadius: "12px",
    border: `1.5px dashed ${alpha(color, 0.2)}`,
    bgcolor: alpha(color, 0.02),
  }}>
    <Typography sx={{ fontFamily: FONT, color: "text.disabled", fontSize: "0.875rem" }}>
      {message || "No items yet. Add one above."}
    </Typography>
  </Paper>
);