import {
  Business, AutoAwesome, ToggleOn,
  People, LocalOffer,
} from "@mui/icons-material";
import React from "react";

export const SETTINGS_NAV = [
  {
    key:      "org-profile",
    label:    "Organisation Profile",
    icon:     <Business />,
    color:    "#2A7F6F",
    subtitle: "Clinic details, branding & contact info",
  },
  {
    key:      "animal",
    label:    "Animal Master Data",
    icon:     <AutoAwesome />,
    color:    "#7B5EA7",
    subtitle: "Animals Master Data & Breed types",
  },
  {
    key:      "features",
    label:    "Feature Settings",
    icon:     <ToggleOn />,
    color:    "#3A6186",
    subtitle: "Enable or disable product modules",
  },
  {
    key:      "users-roles",
    label:    "Users & Roles",
    icon:     <People />,
    color:    "#A8505F",
    subtitle: "Staff accounts, permissions & access control",
  },
  {
    key:      "services-pricing",
    label:    "Services & Pricing",
    icon:     <LocalOffer />,
    color:    "#8B6914",
    subtitle: "Consultation types, services and fee structure",
  },
];