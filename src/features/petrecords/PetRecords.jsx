import React from "react";
import {
  Box, Container, Stack, Avatar, Typography, Button,
  Grid, Pagination, Paper, alpha,
} from "@mui/material";
import { Add, Pets, SearchOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { usePetRecords }  from "./hooks/usePetRecords";
import PatientCard        from "./components/PatientCard";
import PatientDrawer      from "./components/PatientDrawer";
import FiltersBar         from "./components/FiltersBar";
import StatsBar           from "./components/StatsBar";

const PRIMARY = "#2A7F6F";
const FONT    = "'Nunito', sans-serif";

// Google Fonts
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
      No patients match your filters
    </Typography>
    <Typography variant="caption" color="text.disabled" sx={{ fontFamily: FONT, display: "block", mt: 0.5, mb: 2 }}>
      Try adjusting your search or filters
    </Typography>
    <Button onClick={onReset} variant="outlined" size="small"
      sx={{ borderColor: alpha(PRIMARY, 0.3), color: PRIMARY, fontFamily: FONT, fontWeight: 700, borderRadius: "10px", textTransform: "none" }}>
      Clear Filters
    </Button>
  </Paper>
);

const PetRecords = () => {
  const navigate = useNavigate();
  const {
    patients, total, totalPages,
    search, speciesFilter, statusFilter, sortBy, page, selected,
    setSearch, setSpeciesFilter, setStatusFilter, setSortBy, setPage,
    setSelected, resetFilters,
  } = usePetRecords();

  return (
    <>
      <Fonts />
      <Box sx={{
        minHeight: "100vh",
        background: "linear-gradient(150deg, #EAF5F2 0%, #EDF5FB 60%, #F5F0FA 100%)",
        py: 4, px: 2,
      }}>
        <Container maxWidth="lg">

          {/* Page Header */}
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4} flexWrap="wrap" gap={2}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ bgcolor: PRIMARY, width: 52, height: 52, boxShadow: `0 6px 20px ${alpha(PRIMARY, 0.32)}` }}>
                <Pets />
              </Avatar>
              <Box>
                <Typography variant="h5" sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, color: "#1A2E22", lineHeight: 1.2 }}>
                  Patient Records
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontFamily: FONT }}>
                  All registered animal patients
                </Typography>
              </Box>
            </Stack>

            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => navigate("/petrecords/new")}
              sx={{
                bgcolor: PRIMARY, fontFamily: FONT, fontWeight: 700,
                borderRadius: "12px", textTransform: "none", px: 3, py: 1.2,
                boxShadow: `0 4px 14px ${alpha(PRIMARY, 0.35)}`,
                "&:hover": { bgcolor: "#1D6258" },
              }}
            >
              New Patient
            </Button>
          </Stack>

          {/* Stats */}
          <StatsBar />

          {/* Filters */}
          <Box mb={3}>
            <FiltersBar
              search={search}
              speciesFilter={speciesFilter}
              statusFilter={statusFilter}
              sortBy={sortBy}
              total={total}
              onSearch={setSearch}
              onSpecies={setSpeciesFilter}
              onStatus={setStatusFilter}
              onSort={setSortBy}
              onReset={resetFilters}
            />
          </Box>

          {/* Grid */}
          {patients.length === 0 ? (
            <EmptyState onReset={resetFilters} />
          ) : (
            <>
              <Grid container spacing={2.5}>
                {patients.map((patient) => (
                  <Grid size={{xs:12, sm:6}} lg={4} key={patient.id}>
                    <PatientCard
                      patient={patient}
                      onView={(p) => setSelected(p)}
                      onEdit={(p) => navigate(`/petrecords/${p.id}/edit`)}
                    />
                  </Grid>
                ))}
              </Grid>

              {/* Pagination */}
              {totalPages > 1 && (
                <Stack alignItems="center" mt={4}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_, v) => setPage(v)}
                    sx={{
                      "& .MuiPaginationItem-root": {
                        fontFamily: FONT, fontWeight: 600, borderRadius: "10px",
                      },
                      "& .Mui-selected": {
                        bgcolor: `${PRIMARY} !important`, color: "#fff",
                      },
                    }}
                  />
                </Stack>
              )}
            </>
          )}
        </Container>
      </Box>

      {/* Detail Drawer */}
      <PatientDrawer
        patient={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
        onEdit={(p) => { setSelected(null); navigate(`/petrecords/${p.id}/edit`); }}
      />
    </>
  );
};

export default PetRecords;