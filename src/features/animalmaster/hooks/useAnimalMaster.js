import { useState, useMemo, useCallback } from "react";
import {
  SPECIES_MASTER,
  BREEDS_MASTER,
  COAT_COLORS_MASTER,
  BLOOD_GROUPS_MASTER,
} from "../constants/masterData";

/**
 * Central hook for all animal master data management.
 * Replace the initial state with API calls when backend is ready.
 *
 * Usage:
 *   const master = useAnimalMaster();
 *   master.getBreeds("dog")           → string[]
 *   master.addBreed("dog", "NewBreed")
 *   master.deleteBreed("dog", "Beagle")
 */
export const useAnimalMaster = () => {
  const [species,    setSpecies]    = useState(SPECIES_MASTER);
  const [breeds,     setBreeds]     = useState(BREEDS_MASTER);
  const [colors,     setColors]     = useState(COAT_COLORS_MASTER);
  const [bloodGroups,setBloodGroups]= useState(BLOOD_GROUPS_MASTER);

  const [activeTab,  setActiveTab]  = useState("species");
  const [search,     setSearch]     = useState("");

  // ── Species ─────────────────────────────────────────────────────────────────
  const addSpecies = useCallback((item) => {
    setSpecies((prev) => [...prev, { ...item, id: item.label.toLowerCase().replace(/\s/g, "_"), active: true }]);
    setBreeds((prev) => ({ ...prev, [item.id]: [] }));
    setBloodGroups((prev) => ({ ...prev, [item.id]: ["Unknown"] }));
  }, []);

  const toggleSpecies = useCallback((id) => {
    setSpecies((prev) => prev.map((s) => s.id === id ? { ...s, active: !s.active } : s));
  }, []);

  const deleteSpecies = useCallback((id) => {
    setSpecies((prev) => prev.filter((s) => s.id !== id));
  }, []);

  // ── Breeds ──────────────────────────────────────────────────────────────────
  const getBreeds = useCallback((speciesId) => breeds[speciesId] || [], [breeds]);

  const addBreed = useCallback((speciesId, breedName) => {
    const name = breedName.trim();
    if (!name) return;
    setBreeds((prev) => ({
      ...prev,
      [speciesId]: prev[speciesId]
        ? [...prev[speciesId].filter((b) => b !== name), name].sort()
        : [name],
    }));
  }, []);

  const deleteBreed = useCallback((speciesId, breedName) => {
    setBreeds((prev) => ({
      ...prev,
      [speciesId]: (prev[speciesId] || []).filter((b) => b !== breedName),
    }));
  }, []);

  const editBreed = useCallback((speciesId, oldName, newName) => {
    const trimmed = newName.trim();
    if (!trimmed) return;
    setBreeds((prev) => ({
      ...prev,
      [speciesId]: (prev[speciesId] || []).map((b) => b === oldName ? trimmed : b),
    }));
  }, []);

  // ── Colors ──────────────────────────────────────────────────────────────────
  const addColor = useCallback((colorName) => {
    const name = colorName.trim();
    if (!name || colors.includes(name)) return;
    setColors((prev) => [...prev, name].sort());
  }, [colors]);

  const deleteColor = useCallback((colorName) => {
    setColors((prev) => prev.filter((c) => c !== colorName));
  }, []);

  // ── Blood Groups ─────────────────────────────────────────────────────────────
  const addBloodGroup = useCallback((speciesId, group) => {
    const name = group.trim();
    if (!name) return;
    setBloodGroups((prev) => ({
      ...prev,
      [speciesId]: prev[speciesId]
        ? [...new Set([...prev[speciesId], name])]
        : [name],
    }));
  }, []);

  const deleteBloodGroup = useCallback((speciesId, group) => {
    setBloodGroups((prev) => ({
      ...prev,
      [speciesId]: (prev[speciesId] || []).filter((g) => g !== group),
    }));
  }, []);

  // ── Filtered data for display ────────────────────────────────────────────────
  const filteredSpecies = useMemo(() => {
    const q = search.toLowerCase();
    return species.filter((s) => !q || s.label.toLowerCase().includes(q));
  }, [species, search]);

  return {
    // state
    species: filteredSpecies, allSpecies: species,
    breeds, colors, bloodGroups,
    activeTab, search,
    // setters
    setActiveTab, setSearch,
    // species actions
    addSpecies, toggleSpecies, deleteSpecies,
    // breed actions
    getBreeds, addBreed, deleteBreed, editBreed,
    // color actions
    addColor, deleteColor,
    // blood group actions
    addBloodGroup, deleteBloodGroup,
  };
};