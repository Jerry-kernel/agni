import { useState, useMemo } from "react";
import { MOCK_DOCTORS } from "../constants/mockDoctors";

const PER_PAGE = 6;

export const useDoctorsList = () => {
  const [search,      setSearch]      = useState("");
  const [specFilter,  setSpecFilter]  = useState("All");
  const [deptFilter,  setDeptFilter]  = useState("All");
  const [statusFilter,setStatusFilter]= useState("All");
  const [empFilter,   setEmpFilter]   = useState("All");
  const [sortBy,      setSortBy]      = useState("name_asc");
  const [page,        setPage]        = useState(1);
  const [viewMode,    setViewMode]    = useState("grid"); // "grid" | "table"

  const filtered = useMemo(() => {
    let list = [...MOCK_DOCTORS];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((d) =>
        `${d.firstName} ${d.lastName}`.toLowerCase().includes(q) ||
        d.specialization.toLowerCase().includes(q)               ||
        d.department.toLowerCase().includes(q)                   ||
        d.id.toLowerCase().includes(q)                           ||
        d.email.toLowerCase().includes(q)
      );
    }

    if (specFilter   !== "All") list = list.filter((d) => d.specialization  === specFilter);
    if (deptFilter   !== "All") list = list.filter((d) => d.department      === deptFilter);
    if (statusFilter !== "All") list = list.filter((d) => d.status          === statusFilter);
    if (empFilter    !== "All") list = list.filter((d) => d.employmentType  === empFilter);

    list.sort((a, b) => {
      switch (sortBy) {
        case "name_asc":   return `${a.firstName}${a.lastName}`.localeCompare(`${b.firstName}${b.lastName}`);
        case "name_desc":  return `${b.firstName}${b.lastName}`.localeCompare(`${a.firstName}${a.lastName}`);
        case "experience": return Number(b.experience) - Number(a.experience);
        case "rating":     return b.rating - a.rating;
        case "patients":   return b.totalPatients - a.totalPatients;
        case "recent":     return new Date(b.joiningDate) - new Date(a.joiningDate);
        default:           return 0;
      }
    });

    return list;
  }, [search, specFilter, deptFilter, statusFilter, empFilter, sortBy]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const reset = () => {
    setSearch(""); setSpecFilter("All"); setDeptFilter("All");
    setStatusFilter("All"); setEmpFilter("All"); setSortBy("name_asc"); setPage(1);
  };

  const wrap = (setter) => (v) => { setter(v); setPage(1); };

  return {
    doctors: paginated, total: filtered.length, totalPages, page,
    search, specFilter, deptFilter, statusFilter, empFilter, sortBy, viewMode,
    setSearch:       wrap(setSearch),
    setSpecFilter:   wrap(setSpecFilter),
    setDeptFilter:   wrap(setDeptFilter),
    setStatusFilter: wrap(setStatusFilter),
    setEmpFilter:    wrap(setEmpFilter),
    setSortBy, setPage, setViewMode, reset,
    // stats
    stats: {
      total:    MOCK_DOCTORS.length,
      active:   MOCK_DOCTORS.filter((d) => d.status === "Active").length,
      fullTime: MOCK_DOCTORS.filter((d) => d.employmentType === "Full-time").length,
      avgRating:(MOCK_DOCTORS.reduce((s, d) => s + d.rating, 0) / MOCK_DOCTORS.length).toFixed(1),
    },
  };
};