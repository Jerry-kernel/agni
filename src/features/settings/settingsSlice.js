import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    modules: {
      dashboard: true,
      patients: true,
      doctors: true,
      nurses: true,
      appointments: true,
      billing: true,
      pharmacy: true,
      labs: true,
      settings: true
    }
  },
  reducers: {
    setModules(state, action) {
      state.modules = action.payload;
    }
  }
});

export const { setModules } = settingsSlice.actions;
export default settingsSlice.reducer;
