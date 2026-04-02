// Page export
export { default } from "./AnimalMasterPage";
 
// Hook export — import this anywhere in the app to get master data for dropdowns
// e.g. in PetInfoStep:
//   import { useMasterDropdowns } from "../../animalMaster";
//   const { speciesOptions, getBreedsFor } = useMasterDropdowns();
export { useAnimalMaster } from "./hooks/useAnimalMaster";
 
// Static data export — use when you don't need reactivity
export {
  SPECIES_MASTER,
  BREEDS_MASTER,
  COAT_COLORS_MASTER,
  BLOOD_GROUPS_MASTER,
} from "./constants/masterData";