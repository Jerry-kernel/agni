import { useState } from "react";
import { MOCK_DOCTOR, MOCK_RECENT_PATIENTS, MOCK_UPCOMING } from "../constants/mockDoctor";

export const TABS = [
  { key: "overview",      label: "Overview"           },
  { key: "professional",  label: "Professional"       },
  { key: "schedule",      label: "Schedule"           },
  { key: "patients",      label: "Recent Patients"    },
  { key: "appointments",  label: "Today's Appointments"},
];

export const useDoctorView = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [status,    setStatus]    = useState(MOCK_DOCTOR.status);

  const toggleStatus = () => setStatus((s) => s === "Active" ? "Inactive" : "Active");

  return {
    doctor:   { ...MOCK_DOCTOR, status },
    patients: MOCK_RECENT_PATIENTS,
    upcoming: MOCK_UPCOMING,
    activeTab, setActiveTab,
    toggleStatus,
  };
};