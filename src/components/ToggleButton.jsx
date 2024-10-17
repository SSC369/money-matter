import React, { useContext } from "react";
import { MdSunny } from "react-icons/md";
import { RiMoonFill } from "react-icons/ri";
import { ThemeContext } from "../context/themeContext";
import { DARK_MODE_KEY, LIGHT_MODE_KEY, THEME_KEY } from "../constants";

const ToggleButton = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleDarkMode = () => {
    setTheme(DARK_MODE_KEY);
    localStorage.setItem(THEME_KEY, DARK_MODE_KEY);
  };

  const handleLightMode = () => {
    setTheme(LIGHT_MODE_KEY);
    localStorage.setItem(THEME_KEY, LIGHT_MODE_KEY);
  };

  const renderThemeButton = () => {
    switch (theme) {
      case DARK_MODE_KEY:
        return (
          <button onClick={handleLightMode}>
            <MdSunny color="orange" />
          </button>
        );
      case LIGHT_MODE_KEY:
        return (
          <button onClick={handleDarkMode}>
            <RiMoonFill className="text-slate-400" />
          </button>
        );
      default:
        break;
    }
  };

  return (
    <div className="p-2 rounded-xl cursor-pointer text-2xl">
      {renderThemeButton()}
    </div>
  );
};

export default ToggleButton;
