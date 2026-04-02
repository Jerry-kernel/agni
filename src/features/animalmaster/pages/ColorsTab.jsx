import React, { useState } from "react";
import { Box, Stack, Paper, Chip, alpha, Typography } from "@mui/material";
import { EditableChip, AddInputRow, EmptyMasterState, MasterSearchBar } from "../components/MasterTabPanel";

const COLOR = "#7B5EA7";
const FONT  = "'Nunito', sans-serif";

const ColorsTab = ({ colors, onAdd, onDelete }) => {
  const [search, setSearch] = useState("");

  const filtered = search
    ? colors.filter((c) => c.toLowerCase().includes(search.toLowerCase()))
    : colors;

  return (
    <Box>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} alignItems={{ sm: "center" }} mb={3}>
        <MasterSearchBar value={search} onChange={setSearch} color={COLOR} placeholder="Search colors…" />
        <Chip label={`${colors.length} colors`} size="small"
          sx={{ bgcolor: alpha(COLOR, 0.1), color: COLOR, fontWeight: 700, fontFamily: FONT, height: 26 }} />
      </Stack>

      <AddInputRow
        placeholder="Add new coat color (e.g. Apricot, Lilac)…"
        color={COLOR}
        onAdd={onAdd}
        buttonLabel="Add Color"
      />

      <Box mt={3}>
        {filtered.length === 0
          ? <EmptyMasterState message="No colors match your search." color={COLOR} />
          : (
            <Paper elevation={0} sx={{ p: 2.5, borderRadius: "14px", border: `1.5px solid ${alpha(COLOR, 0.12)}`, bgcolor: alpha(COLOR, 0.02) }}>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {filtered.map((color) => (
                  <EditableChip
                    key={color}
                    label={color}
                    color={COLOR}
                    onDelete={() => onDelete(color)}
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

export default ColorsTab;