import React from "react";
import {
  Box, Container, Stack, Avatar, Typography,
  Button, Grid, Pagination, Paper, alpha,
} from "@mui/material";
import { Add, MedicalServices, SearchOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { useDoctorsList }  from "./hooks/useDoctorsList";
import StatsBar            from "./components/StatsBar";
import FiltersBar          from "./components/FiltersBar";
import DoctorCard          from "./components/DoctorCard";
import DoctorTable         from "./components/DoctorTable";

const PRIMARY = "#1B5E8C";
const FONT    = "'Nunito', sans-serif";

const Fonts = () => (
  <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Nunito:wght@400;500;600;700;800&display=swap');`}</style>
);

const EmptyState = ({ onReset }) => (
  <Paper elevation={0} sx={{
    textAlign: "center", py: 8, px: 3,
    border: `1.5px dashed ${alpha(PRIMARY, 0.2)}`,
    borderRadius: "16px", bgcolor: alpha(PRIMARY, 0.02),
  }}>
    <SearchOff sx={{ fontSize: 48, color: alpha(PRIMARY, 0.3), mb: 1.5 }} />
    <Typography fontWeight={700} sx={{ fontFamily: FONT, color: "text.secondary" }}>
      No doctors match your filters
    </Typography>
    <Typography variant="caption" color="text.disabled" sx={{ fontFamily: FONT, display: "block", mb: 2, mt: 0.5 }}>
      Try adjusting your search or filter criteria
    </Typography>
    <Button onClick={onReset} variant="outlined" size="small"
      sx={{ borderColor: alpha(PRIMARY, 0.3), color: PRIMARY, fontFamily: FONT, fontWeight: 700, borderRadius: "10px", textTransform: "none" }}>
      Clear All Filters
    </Button>
  </Paper>
);

const DoctorsPage = () => {
  const navigate = useNavigate();
  const {
    doctors, total, totalPages, page, stats, viewMode,
    search, specFilter, deptFilter, statusFilter, empFilter, sortBy,
    setSearch, setSpecFilter, setDeptFilter, setStatusFilter, setEmpFilter,
    setSortBy, setPage, setViewMode, reset,
  } = useDoctorsList();

  const handleView = (doc) => navigate(`/doctors/${doc.id}`);
  const handleEdit = (doc) => navigate(`/doctors/${doc.id}/edit`);

  return (
    <>
      <Fonts />
      <Box sx={{
        minHeight: "100vh",
        background: "linear-gradient(150deg, #E3F2FD 0%, #EDE7F6 55%, #E8F5E9 100%)",
        py: 4, px: 2,
      }}>
        <Container maxWidth="lg">

          {/* Page header */}
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4} flexWrap="wrap" gap={2}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{
                bgcolor: PRIMARY, width: 52, height: 52,
                boxShadow: `0 6px 20px ${alpha(PRIMARY, 0.32)}`,
              }}>
                <MedicalServices />
              </Avatar>
              <Box>
                <Typography variant="h5" sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 800, color: "#1A2E22", lineHeight: 1.2,
                }}>
                  Doctors
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontFamily: FONT }}>
                  All registered veterinary staff
                </Typography>
              </Box>
            </Stack>

            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate("/doctors/new")}
              sx={{
                bgcolor: PRIMARY, fontFamily: FONT, fontWeight: 700,
                borderRadius: "12px", textTransform: "none", px: 3, py: 1.2,
                boxShadow: `0 4px 14px ${alpha(PRIMARY, 0.35)}`,
                "&:hover": { bgcolor: "#0D3D5F" },
              }}
            >
              Add Doctor
            </Button>
          </Stack>

          {/* Stats */}
          <StatsBar stats={stats} />

          {/* Filters */}
          <Box mb={3}>
            <FiltersBar
              search={search}       specFilter={specFilter}
              deptFilter={deptFilter} statusFilter={statusFilter}
              empFilter={empFilter}   sortBy={sortBy}
              viewMode={viewMode}     total={total}
              onSearch={setSearch}    onSpec={setSpecFilter}
              onDept={setDeptFilter}  onStatus={setStatusFilter}
              onEmp={setEmpFilter}    onSort={setSortBy}
              onView={setViewMode}    onReset={reset}
            />
          </Box>

          {/* Content */}
          {doctors.length === 0 ? (
            <EmptyState onReset={reset} />
          ) : viewMode === "grid" ? (
            <>
              <Grid container spacing={2.5}>
                {doctors.map((doc, i) => (
                  <Grid size={{xs:12, sm:6, lg:4}} key={doc.id}>
                    <DoctorCard doctor={doc} index={i} onView={handleView} onEdit={handleEdit} />
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <DoctorTable doctors={doctors} onView={handleView} onEdit={handleEdit} />
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Stack alignItems="center" mt={4}>
              <Pagination
                count={totalPages} page={page}
                onChange={(_, v) => setPage(v)}
                sx={{
                  "& .MuiPaginationItem-root": { fontFamily: FONT, fontWeight: 600, borderRadius: "10px" },
                  "& .Mui-selected": { bgcolor: `${PRIMARY} !important`, color: "#fff" },
                }}
              />
            </Stack>
          )}

        </Container>
      </Box>
    </>
  );
};

export default DoctorsPage;