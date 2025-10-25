import React, { useEffect, useState } from "react";
import "./setting.css";
import { Brightness4, Brightness7 } from "@mui/icons-material";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <div className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? (
          <>
            <Brightness7 className="theme-icon" /> Light Mode
          </>
        ) : (
          <>
            <Brightness4 className="theme-icon" /> Dark Mode
          </>
        )}
      </div>
    </div>
  );
};

export default Settings;
