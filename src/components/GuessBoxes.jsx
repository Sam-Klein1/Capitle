import React, { useState, useEffect, useRef } from 'react';
import { capitalCities } from '../cities.js';
import '../css/GuessBoxes.css';
import '../css/suggestions.css';

function GuessBoxes() {
  const [showCityList, setShowCityList] = useState(false);
  const inputRef = useRef(null);
  const suggestionRef = useRef(null);

  const handleInputFocus = () => {
    
    setShowCityList(true);
  };

  const handleCitySelection = (city) => {
    
    document.getElementById("text-field").value = city;
    setShowCityList(false)
    // console.log(`Selected city: ${city}`);
  };

  const handleClickOutside = (event) => {
    if (
      inputRef.current && !inputRef.current.contains(event.target) &&
      suggestionRef.current && !suggestionRef.current.contains(event.target)
    ) {
      setShowCityList(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="guess-boxes">
      {showCityList && (
        <div className="suggestion-buttons" ref={suggestionRef}>
          {capitalCities.map((city, index) => (
            <button
              key={index}
              className="suggestion-button"
              onClick={() => handleCitySelection(city.city)}
            >
              {city.city}
            </button>
          ))}
        </div>
      )}
      {[...Array(6)].map((_, index) => (
        <div key={index} className="rectangle"></div>
      ))}
      <input
        id='text-field'
        className="text-field"
        type="text"
        placeholder="City, Country, territory..."
        onFocus={handleInputFocus}
        ref={inputRef}
      />
      <button className="guess-button">
        Guess! 🌇
      </button>
    </div>
  );
}

export default GuessBoxes;
