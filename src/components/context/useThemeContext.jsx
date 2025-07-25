import { createContext, useCallback, useContext, useState } from "react";
const ThemeContext = createContext(undefined);
export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useThemeContext must be used within an ThemeProvider");
  }
  return context;
}
export function ThemeProvider({ children }) {
  const INIT_STATE = {
    sideNavMode: "default",
    showRightSideBar: false,
  };
  const [settings, setSettings] = useState(INIT_STATE);
  const updateSettings = (_newSettings) => {
    setSettings({
      ...settings,
      ..._newSettings,
    });
  };
  const updateSideNavMode = useCallback((newSideNavMode) => {
    const isMenuEnlarged = document.body.classList.contains("enlarge-menu");

    if (newSideNavMode === "default" && isMenuEnlarged) {
      document.body.classList.remove("enlarge-menu");
    } else if (newSideNavMode === "sm" && !isMenuEnlarged) {
      document.body.classList.add("enlarge-menu");
    }

    updateSettings((prevSettings) => ({
      ...prevSettings,
      sideNavMode: newSideNavMode,
    }));
  }, []);

  const updateShowRightSideBar = (show) =>
    setSettings({
      ...settings,
      showRightSideBar: show,
    });
  const resetSettings = () => {
    setSettings(INIT_STATE);
  };
  return (
    <ThemeContext.Provider
      value={{
        updateSideNavMode,
        settings,
        updateShowRightSideBar,
        resetSettings,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
