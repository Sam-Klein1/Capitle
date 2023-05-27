import React from 'react';
import '../css/GuessBoxes.css'

function GuessBoxes() {
  return (
    <div className="guess-boxes">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="rectangle"></div>
      ))}
      <input className="text-field" type="text" placeholder='City, Country, territory... '/>
      <button className="guess-button"> 
        Guess! 🌇
      </button>
    </div>
  );
}

export default GuessBoxes;
