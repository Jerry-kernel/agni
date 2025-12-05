import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./app/routes";
import { useDispatch, useSelector } from "react-redux";
import { setModules } from "./features/settings/settingsSlice";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./config/theme";
import api from "./services/http"; // axios wrapper

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  // Load module settings after user logs in
  useEffect(() => {
    const loadSettings = async () => {
      if (!isAuthenticated) return;

      try {
        // const res = await api.get(`/settings/modules?role=${user.role}`);
         const res = await api.get(`/settings/modules?role=super-admin`);
        dispatch(setModules(res.data.modules));
      } catch (error) {
        console.error("Settings loading failed", error);
      }
    };

    loadSettings();
  }, [isAuthenticated]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>

    </ThemeProvider>
  );
};

export default App;
