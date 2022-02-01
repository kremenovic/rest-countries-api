import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { FaSun } from "react-icons/fa";
import { IoMoonOutline } from "react-icons/io5";

const Header = () => {
  const [themeState, setThemeState] = useState(false);

  useEffect(() => {
    const getTheme = localStorage.getItem("Theme");
    if (getTheme === "dark") {
      setThemeState(true);
    }
  }, []);

  useEffect(() => {
    if (themeState) {
      localStorage.setItem("Theme", "dark");
      document.body.classList.add("dark-mode");
    } else {
      localStorage.setItem("Theme", "light");
      document.body.classList.remove("dark-mode");
    }
  }, [themeState]);

  return (
    <header>
      <div className="section">
        <h2>
          <Link to="/">Where in the world?</Link>
        </h2>
        <h4 onClick={() => setThemeState(!themeState)}>
          {themeState ? (
            <>
              <FaSun /> Light Mode
            </>
          ) : (
            <>
              <IoMoonOutline /> Dark Mode
            </>
          )}
        </h4>
      </div>
    </header>
  );
};

export default Header;
