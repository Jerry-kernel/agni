// App.jsx
import React, { useState } from "react";
import AppDrawer from "./components/AppDrawer";
import SettingsPage from "./components/Settings";

export default function App() {
  // You can load this from API instead
  const [modules, setModules] = useState({
    dashboard: { label: "Dashboard", enabled: true },
    users: { label: "Users", enabled: true },
    reports: { label: "Reports", enabled: false },
    settings: { label: "Settings", enabled: true },
  });

  return (
    <div style={{ display: "flex" }}>
      <AppDrawer open={true} modules={modules} />

      <div style={{ marginLeft: 260, padding: 20 }}>
        <SettingsPage modules={modules} setModules={setModules} />
      </div>
    </div>
  );
}
