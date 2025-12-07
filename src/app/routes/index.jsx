import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

// Pages
import DashboardPage from "../../features/dashboard/DashboardPage";
import PatientsPage from "../../features/patients/PatientsPage";
import DoctorsPage from "../../features/doctors/DoctorsPage";
import BillingPage from "../../features/billing/BillingPage";
import SettingsPage from "../../features/settings/pages/ModuleSettings";
import LoginPage from "../../features/auth/LoginPage";
import NotFoundPage from "../../components/common/NotFoundPage";
import CalendarPage from "../../features/calendar/CalendarPage";
import AppointmentsPage from "../../features/appointments/AppointmentsPage";

// Redux hooks
import { useSelector } from "react-redux";


// Protected route
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Role guard
const RoleGuard = ({ allowedRoles, children }) => {
  const user = useSelector((state) => state.auth.user);
  if (!user) return <Navigate to="/login" replace />;
  return allowedRoles.includes(user.role) ? children : <Navigate to="/dashboard" replace />;
};

// Module guard
const ModuleGuard = ({ module, children }) => {
  const modules = useSelector((state) => state.settings.modules);
  return modules[module] !== false ? children : <Navigate to="/dashboard" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected routes */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />

        <Route
          path="/patients"
          element={
            <ModuleGuard module="patients">
              <PatientsPage />
            </ModuleGuard>
          }
        />
          <Route
            path="/calendar"
            element={
              <ModuleGuard module="calendar">
                <CalendarPage />
              </ModuleGuard>
        }
      />

        <Route
            path="/appointments"
            element={
              <ModuleGuard module="appointment">
                <AppointmentsPage />
              </ModuleGuard>
        }
       />


        <Route
          path="/doctors"
          element={
            <ModuleGuard module="doctors">
              <RoleGuard allowedRoles={["super-admin", "admin"]}>
                <DoctorsPage />
              </RoleGuard>
            </ModuleGuard>
          }
        />

        <Route
          path="/billing"
          element={
            <ModuleGuard module="billing">
              <RoleGuard allowedRoles={["super-admin", "admin"]}>
                <BillingPage />
              </RoleGuard>
            </ModuleGuard>
          }
        />

        <Route
          path="/settings"
          element={
            <ModuleGuard module="settings">
              <RoleGuard allowedRoles={["super-admin", "admin"]}>
                <SettingsPage />
              </RoleGuard>
            </ModuleGuard>
          }
        />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
