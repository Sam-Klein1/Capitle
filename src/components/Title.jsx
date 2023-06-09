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
    const defaultDistanceUnit = 'km';
  
    useEffect(() => {
      const storedDistanceUnit = localStorage.getItem('distanceUnit');
      if (storedDistanceUnit) {
        setUnitToggle(storedDistanceUnit === 'mi');
      } else {
        localStorage.setItem('distanceUnit', defaultDistanceUnit);
      }
    }, []);
  
    const handleUnitToggle = () => {
      setUnitToggle(!unitToggle);
      const newDistanceUnit = unitToggle ? 'km' : 'mi';
      localStorage.setItem('distanceUnit', newDistanceUnit);
    };
  
    const handleThemeToggle = () => {
      setThemeToggle(!themeToggle);
    };

  return (
    <div className="header">
      <header className="header-content">
        <button
          className="about"
          onClick={toggleInfo}>
          <img
            src={require("../assets/about.png")}
            alt=""
            className="about-pic"
          />
        </button>
        {infoOpen && (
            <div className="popup-menu">
                <button className="exit-popup" onClick={toggleInfo}>
                  {"\u2573"}
                </button>
            <div className="info-title">HOW TO PLAY?</div>
            <div className="desc">Step 1: Make a guess</div>

            </div>
        )}
        <h1>
          🏙 CAPIT<span className="green">LE</span>!{" "}
        </h1>
        <button 
            className="settings" 
            onClick={toggleMenu}>
          <img
            src={require("../assets/settings.png")}
            alt=""
            className="settings-pic"
          />
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
              <span className="toggle-label">
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
              <span className="toggle-label">Theme</span>
            </div>
          </div>
        )}
      </header>
      <hr className="header-line" />
    </div>
  );
}

export default Title;
