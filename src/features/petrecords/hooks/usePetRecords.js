import { useState, useMemo } from "react";
import { MOCK_PATIENTS } from "../constants/mockData";

export const usePetRecords = () => {
  const [search,       setSearch]       = useState("");
  const [speciesFilter,setSpeciesFilter]= useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy,       setSortBy]       = useState("recent");
  const [page,         setPage]         = useState(1);
  const [selected,     setSelected]     = useState(null); // patient for detail drawer
  const ROWS_PER_PAGE = 6;

  const filtered = useMemo(() => {
    let list = [...MOCK_PATIENTS];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) =>
        p.name.toLowerCase().includes(q)       ||
        p.ownerName.toLowerCase().includes(q)  ||
        p.breed.toLowerCase().includes(q)      ||
        p.id.toLowerCase().includes(q)         ||
        p.ownerContact.includes(q)
      );
    }

    // Species filter
    if (speciesFilter !== "All") list = list.filter((p) => p.species === speciesFilter);

    // Status filter
    if (statusFilter !== "All") list = list.filter((p) => p.status === statusFilter);

    // Sort
    list.sort((a, b) => {
      if (sortBy === "name_asc")  return a.name.localeCompare(b.name);
      if (sortBy === "name_desc") return b.name.localeCompare(a.name);
      if (sortBy === "recent")    return new Date(b.registeredOn) - new Date(a.registeredOn);
      if (sortBy === "visit")     return new Date(b.lastVisit) - new Date(a.lastVisit);
      return 0;
    });

    return list;
  }, [search, speciesFilter, statusFilter, sortBy]);

  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const paginated  = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  const resetFilters = () => {
    setSearch(""); setSpeciesFilter("All"); setStatusFilter("All"); setSortBy("recent"); setPage(1);
  };

  return {
    // state
    search, speciesFilter, statusFilter, sortBy, page, selected,
    // derived
    patients: paginated, total: filtered.length, totalPages,
    // setters
    setSearch:        (v) => { setSearch(v);        setPage(1); },
    setSpeciesFilter: (v) => { setSpeciesFilter(v); setPage(1); },
    setStatusFilter:  (v) => { setStatusFilter(v);  setPage(1); },
    setSortBy,
    setPage,
    setSelected,
    resetFilters,
  };
};