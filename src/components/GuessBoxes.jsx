import React, { useState, useEffect, useRef } from 'react';
import { capitalCities } from '../cities.js';
import '../css/GuessBoxes.css';
import '../css/suggestions.css';

function GuessBoxes({ todayCity }) {
    const [showCityList, setShowCityList] = useState(false);
    const [guesses, setGuesses] = useState(Array(6).fill('')); // Initialize with an array of 6 empty strings
    const [currentRectangleIndex, setCurrentRectangleIndex] = useState(0); // Initialize with index 0 for the first empty rectangle
    const [isGuessingDisabled, setIsGuessingDisabled] = useState(false);
    const [suggestionList, setSuggestionList] = useState(capitalCities);
    const inputRef = useRef(null);
    const suggestionRef = useRef(null);

    const handleInputFocus = () => {
        setShowCityList(true);
    };

    const handleInputChange = (event) => {
        const searchQuery = event.target.value.toLowerCase();
        const filteredCities = capitalCities.filter(
          (city) =>
            city.city.toLowerCase().includes(searchQuery) ||
            city.country.toLowerCase().includes(searchQuery)
        );
        setSuggestionList(filteredCities);
      };

    const handleCitySelection = (city) => {
        document.getElementById("text-field").value = city;
        setShowCityList(false);
        console.log(todayCity)
    };

    const handleGuess = () => {
        const guess = document.getElementById("text-field").value;
        const isCityExists = capitalCities.some((city) =>
            city.city.toLowerCase() === guess.toLowerCase()
        );

        if (!isCityExists) {
            alert('The entered city does not exist.');
            return;
        }

        const updatedGuesses = [...guesses];
        updatedGuesses[currentRectangleIndex] = guess;
        setGuesses(updatedGuesses);
        const nextRectangleIndex = currentRectangleIndex + 1;
        setCurrentRectangleIndex(nextRectangleIndex);
        document.getElementById("text-field").value = '';

        if (guess.toLowerCase() === todayCity.toLowerCase()) {
            setTimeout(() => {
                alert('You guessed right!');
            }, 0);
            setIsGuessingDisabled(true);
        }
        else if (nextRectangleIndex === guesses.length) {
            setTimeout(() => {
                alert('You are out of guesses!');
            }, 0);
            setIsGuessingDisabled(true);
        }

    };

    const handleClickOutside = (event) => {
        if (
            inputRef.current &&
            !inputRef.current.contains(event.target) &&
            suggestionRef.current &&
            !suggestionRef.current.contains(event.target)
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
                    {suggestionList.map((city, index) => (
                        <button
                            key={index}
                            className="suggestion-button"
                            onClick={() => handleCitySelection(city.city)}
                        >
                            <span className="city">{city.city}</span>, {city.country}
                        </button>
                    ))}
                </div>
            )}
            {guesses.map((guess, index) => (
                <div
                    key={index}
                    className={`rectangle ${guess ? (guess.toLowerCase() === todayCity.toLowerCase() ? 'correct' : 'incorrect') : ''}`}
                >
                    {guess}
                </div>
            ))}
                <>
                    <input
                        id="text-field"
                        className="text-field"
                        type="text"
                        placeholder="Enter or choose any capital city"
                        onFocus={handleInputFocus}
                        onChange={handleInputChange}
                        ref={inputRef}
                        disabled={isGuessingDisabled}
                    />
                    <button 
                        className={`guess-button ${isGuessingDisabled ? 'disabled' : ''}`} 
                        onClick={handleGuess}
                        disabled={isGuessingDisabled}
                    >
                            Guess!
                    </button>
                </>
        </div>
    );
}

export default GuessBoxes;
