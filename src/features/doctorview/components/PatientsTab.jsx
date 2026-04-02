import React from "react";
import {
  Box, Paper, Stack, Avatar, Typography,
  Chip, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, alpha,
} from "@mui/material";

const COLOR = "#2A7F6F";
const FONT  = "'Nunito', sans-serif";

const PatientsTab = ({ patients }) => (
  <TableContainer component={Paper} elevation={0} sx={{
    borderRadius: "14px",
    border: `1.5px solid ${alpha(COLOR, 0.15)}`,
    overflow: "hidden",
  }}>
    <Table>
      <TableHead sx={{ bgcolor: alpha(COLOR, 0.05) }}>
        <TableRow>
          {["Patient", "Species", "Owner", "Last Visit", "Reason"].map((h) => (
            <TableCell key={h} sx={{
              fontFamily: FONT, fontWeight: 800, fontSize: "0.72rem",
              color: "text.secondary", textTransform: "uppercase",
              letterSpacing: "0.06em",
              borderBottom: `1px solid ${alpha(COLOR, 0.1)}`,
            }}>
              {h}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {patients.map((p, i) => (
          <TableRow key={p.id} sx={{
            "&:hover": { bgcolor: alpha(COLOR, 0.025) },
            "& td": { borderBottom: `1px solid ${alpha(COLOR, 0.06)}` },
          }}>
            <TableCell>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Avatar sx={{ bgcolor: alpha(COLOR, 0.12), width: 32, height: 32, fontSize: "1.1rem" }}>
                  {p.species}
                </Avatar>
                <Box>
                  <Typography sx={{ fontFamily: FONT, fontWeight: 700, fontSize: "0.875rem", color: "#1A2E22" }}>
                    {p.name}
                  </Typography>
                  <Typography variant="caption" color="text.disabled" sx={{ fontFamily: FONT }}>
                    {p.id}
                  </Typography>
                </Box>
              </Stack>
            </TableCell>
            <TableCell>
              <Typography variant="caption" color="text.secondary" sx={{ fontFamily: FONT, fontWeight: 600 }}>
                {p.breed}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography sx={{ fontFamily: FONT, fontSize: "0.83rem", color: "#1A2E22" }}>{p.owner}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="caption" color="text.secondary" sx={{ fontFamily: FONT }}>{p.date}</Typography>
            </TableCell>
            <TableCell>
              <Chip label={p.reason} size="small" sx={{
                bgcolor: alpha(COLOR, 0.08), color: COLOR,
                fontWeight: 700, fontFamily: FONT, fontSize: "0.68rem", height: 22,
              }} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default PatientsTab;