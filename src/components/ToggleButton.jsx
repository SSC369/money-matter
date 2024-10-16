import React, { useContext } from "react";
import { MdSunny } from "react-icons/md";
import { RiMoonFill } from "react-icons/ri";
import { ThemeContext } from "../context/themeContext";

const ToggleButton = () => {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      onClick={handleToggle}
      className="p-2 rounded-xl cursor-pointer text-2xl"
    >
      {isDarkMode ? (
        <MdSunny color="orange" />
      ) : (
        <RiMoonFill className="text-slate-400" />
      )}
    </div>
  );
};

export default ToggleButton;
