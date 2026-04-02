import { useState } from "react";
import { SETTINGS_NAV } from "../constants/settingsConfig";

export const useSettings = () => {
  const [activeKey, setActiveKey] = useState(SETTINGS_NAV[0].key);
  const activeTab = SETTINGS_NAV.find((n) => n.key === activeKey);
  return { activeKey, setActiveKey, activeTab };
};
