import React from "react";
import {
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Avatar, Stack, Box, Typography, Chip,
  IconButton, Tooltip, alpha,
} from "@mui/material";
import { Star, Visibility, Edit, Circle } from "@mui/icons-material";

const PRIMARY = "#1B5E8C";
const FONT    = "'Nunito', sans-serif";

const AVATAR_COLORS = [
  "#1B5E8C","#2A7F6F","#7B5EA7","#A8505F",
  "#3A6186","#8B6914","#1A6E6E","#4A5568",
];

const EMP_COLORS = {
  "Full-time":             { bg: alpha("#2A7F6F",0.1), color:"#2A7F6F" },
  "Part-time":             { bg: alpha("#3A6186",0.1), color:"#3A6186" },
  "Visiting / Consultant": { bg: alpha("#8B6914",0.1), color:"#8B6914" },
  "Contract":              { bg: alpha("#7B5EA7",0.1), color:"#7B5EA7" },
};

const DoctorTable = ({ doctors, onView, onEdit }) => (
  <TableContainer component={Paper} elevation={0} sx={{
    borderRadius: "14px",
    border: `1.5px solid ${alpha(PRIMARY, 0.15)}`,
    overflow: "hidden",
  }}>
    <Table>
      <TableHead sx={{ bgcolor: alpha(PRIMARY, 0.05) }}>
        <TableRow>
          {["Doctor","Specialization","Department","Employment","Experience","Rating","Patients","Status","Actions"].map((h) => (
            <TableCell key={h} sx={{
              fontFamily: FONT, fontWeight: 800, fontSize: "0.72rem",
              color: "text.secondary", textTransform: "uppercase",
              letterSpacing: "0.05em",
              borderBottom: `1px solid ${alpha(PRIMARY, 0.1)}`,
              whiteSpace: "nowrap",
            }}>
              {h}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {doctors.map((doc, idx) => {
          const avatarBg = AVATAR_COLORS[idx % AVATAR_COLORS.length];
          const empStyle = EMP_COLORS[doc.employmentType] || { bg: alpha("#000",0.05), color:"text.secondary" };
          const isActive = doc.status === "Active";

          return (
            <TableRow key={doc.id}
              onClick={() => onView(doc)}
              sx={{
                cursor: "pointer",
                "&:hover": { bgcolor: alpha(PRIMARY, 0.025) },
                "& td": { borderBottom: `1px solid ${alpha(PRIMARY, 0.06)}` },
              }}
            >
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Avatar sx={{ bgcolor: avatarBg, width: 36, height: 36, fontSize: "0.85rem", fontWeight: 800, fontFamily: FONT }}>
                    {doc.avatar}
                  </Avatar>
                  <Box>
                    <Typography sx={{ fontFamily: FONT, fontWeight: 700, fontSize: "0.875rem", color: "#1A2E22", whiteSpace: "nowrap" }}>
                      Dr. {doc.firstName} {doc.lastName}
                    </Typography>
                    <Typography variant="caption" color="text.disabled" sx={{ fontFamily: FONT }}>
                      {doc.id}
                    </Typography>
                  </Box>
                </Stack>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontFamily: FONT, fontSize: "0.8rem", color: "text.secondary", maxWidth: 160, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {doc.specialization}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontFamily: FONT, fontSize: "0.8rem", color: "text.secondary", whiteSpace: "nowrap" }}>
                  {doc.department}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip label={doc.employmentType} size="small"
                  sx={{ bgcolor: empStyle.bg, color: empStyle.color, fontWeight: 700, fontFamily: FONT, fontSize: "0.68rem", height: 22 }} />
              </TableCell>
              <TableCell>
                <Typography sx={{ fontFamily: FONT, fontWeight: 700, fontSize: "0.83rem", color: "#1A2E22" }}>
                  {doc.experience}y
                </Typography>
              </TableCell>
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={0.4}>
                  <Star sx={{ fontSize: 13, color: "#F59E0B" }} />
                  <Typography fontWeight={800} sx={{ fontFamily: FONT, fontSize: "0.83rem", color: "#1A2E22" }}>
                    {doc.rating}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell>
                <Typography fontWeight={700} sx={{ fontFamily: FONT, fontSize: "0.83rem", color: "#1A2E22" }}>
                  {doc.totalPatients}
                </Typography>
              </TableCell>
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={0.6}>
                  <Circle sx={{ fontSize: 8, color: isActive ? "#2E7D32" : "#9E9E9E" }} />
                  <Typography variant="caption" fontWeight={700}
                    sx={{ fontFamily: FONT, color: isActive ? "#2E7D32" : "#9E9E9E" }}>
                    {doc.status}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Stack direction="row" spacing={0.3}>
                  <Tooltip title="View" arrow>
                    <IconButton size="small" onClick={() => onView(doc)}
                      sx={{ color: PRIMARY, "&:hover": { bgcolor: alpha(PRIMARY, 0.1) } }}>
                      <Visibility sx={{ fontSize: 17 }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit" arrow>
                    <IconButton size="small" onClick={() => onEdit(doc)}
                      sx={{ color: "text.secondary", "&:hover": { bgcolor: alpha("#000", 0.05) } }}>
                      <Edit sx={{ fontSize: 17 }} />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </TableContainer>
);

export default DoctorTable;