import React, { useState, useEffect } from "react";
import '../css/header.css';

function Title() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [infoOpen, setinfoOpen] = useState(false);
  const toggleMenu = () => {
    if (infoOpen) {
      toggleInfo();
    }
    setMenuOpen(!menuOpen);
  };
  const toggleInfo = () => {
    if (menuOpen) {
      toggleMenu();
    }
    setinfoOpen(!infoOpen);
  };

  const [unitToggle, setUnitToggle] = useState(false);
  const [themeToggle, setThemeToggle] = useState(false);

  useEffect(() => {
    const storedDistanceUnit = localStorage.getItem('distanceUnit');
    if (storedDistanceUnit) {
      setUnitToggle(storedDistanceUnit === 'mi');
    } else {
      localStorage.setItem('distanceUnit', 'km');
    }

    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setThemeToggle(storedTheme === 'Light');
    } else {
      localStorage.setItem('theme', 'Dark');
    }

  }, []);

  const handleUnitToggle = () => {
    setUnitToggle(!unitToggle);
    const newDistanceUnit = unitToggle ? 'km' : 'mi';
    localStorage.setItem('distanceUnit', newDistanceUnit);
  };

  const handleThemeToggle = () => {
    setThemeToggle(!themeToggle);
    const newTheme = themeToggle ? 'Dark' : 'Light';
    localStorage.setItem('theme', newTheme);
    document.documentElement.className = newTheme;
  };

  return (
    <div className="header">
      <header className="header-content">
        <button
          className="about"
          onClick={toggleInfo}>
          ❓
        </button>
        {infoOpen && (
          <div className="popup-menu">
            <button className="exit-popup" onClick={toggleInfo}>
              {"\u2573"}
            </button>
            {/* add how to play */}
          </div>
        )}
        <h1>
          🏙CAPIT<span className="green">LE</span>!
        </h1>
        <button
          className="settings"
          onClick={toggleMenu}>
          ⚙️
        </button>
        {menuOpen && (
          <div className="popup-menu">
            <button className="exit-popup" onClick={toggleMenu}>
              {"\u2573"}
            </button>
            <div className="toggle-switch">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={unitToggle}
                  onChange={handleUnitToggle}
                />
                <span className="slider round"></span>
              </label>
              <span className="toggle-label"> Units
                -- {localStorage.getItem('distanceUnit') === 'km' ? "Kilometers" : "Miles"}</span>
            </div>
            <div className="toggle-switch">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={themeToggle}
                  onChange={handleThemeToggle}
                />
                <span className="slider round"></span>
              </label>
              <span className="toggle-label">Theme
                -- {localStorage.getItem('theme')}</span>
            </div>
          </div>
        )}
      </header>
      <hr className="header-line" />
    </div>
  );
}

export default Title;
