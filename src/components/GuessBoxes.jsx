import React, { useState, useEffect, useRef} from 'react';
import { toast } from 'react-toastify';
import * as geolib from 'geolib';
import { capitalCities } from '../cities.js';
import '../css/GuessBoxes.css';
import '../css/suggestions.css';
import 'react-toastify/dist/ReactToastify.css';
import CountUp from './CountUp.jsx';

function GuessBoxes({ todayCity }) {
    const distanceUnit = localStorage.getItem('distanceUnit');
    const [showCityList, setShowCityList] = useState(false);
    const [guesses, setGuesses] = useState(() => {
        const storedGuesses = localStorage.getItem('guesses');
        return storedGuesses ? JSON.parse(storedGuesses) : Array(6).fill({ name: '', cc: '', progress: 0, dist: 0, unit: '', dir: ''});
    });
    const [currentRectangleIndex, setCurrentRectangleIndex] = useState(() => {
        const storedIndex = localStorage.getItem('currentRectangleIndex');
        return storedIndex ? parseInt(storedIndex) : 0;
    });
    const [isGuessingDisabled, setIsGuessingDisabled] = useState(false);
    const [suggestionList, setSuggestionList] = useState(capitalCities);
    const [cityData, setCityData] = useState([]);
    const inputRef = useRef(null);
    const suggestionRef = useRef(null);
    const [code, setCode] = useState("");

    // Restoring previous guesses from local storage
    useEffect(() => {
        setIsGuessingDisabled(localStorage.getItem("isGuessingDisabled"));
        const storedGuesses = localStorage.getItem('guesses');
        if (storedGuesses) {
            setGuesses(JSON.parse(storedGuesses));
        }

        const storedIndex = localStorage.getItem('currentRectangleIndex');
        if (storedIndex) {
            setCurrentRectangleIndex(parseInt(storedIndex));
        }
    }, []);

    // Saving guesses to local storage whenever they change
    useEffect(() => {
        localStorage.setItem('guesses', JSON.stringify(guesses));
    }, [guesses]);

    useEffect(() => {
        localStorage.setItem('currentRectangleIndex', currentRectangleIndex.toString());
    }, [currentRectangleIndex]);

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

    const handleCitySelection = (city, cc) => {
        document.getElementById("text-field").value = city;
        setCode(cc);
        setShowCityList(false);
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
    
    const getLatitude = (city) => {
        const foundCity = cityData.find((item) => item.CapitalName === city);
        return foundCity ? foundCity.CapitalLatitude : 0.0;
    };
    
    const getLongitude = (city) => {
        const foundCity = cityData.find((item) => item.CapitalName === city);
        return foundCity ? foundCity.CapitalLongitude : 0.0;
    };
    
    useEffect(() => {
        // Fetch city data from JSON file
        fetch(process.env.PUBLIC_URL + '/cityData.json')
          .then((response) => response.json())
          .then((data) => setCityData(data))
          .catch((error) => console.error('Error fetching city data:', error));
    }, []);

    const calculateDist = (src, actual) => {
        
        const src_cords = { latitude: getLatitude(src), longitude: getLongitude(src) };
        const actual_cords = { latitude: getLatitude(actual), longitude: getLongitude(actual) };
        const dist = geolib.getDistance(src_cords, actual_cords);

        return dist/1000; //gives distance between src and actual in KM
    };

    const getDir = (src, actual) => {
        
        if (src === actual) {
            return '✅'
        }
        const src_cords = { latitude: getLatitude(src), longitude: getLongitude(src) };
        const actual_cords = { latitude: getLatitude(actual), longitude: getLongitude(actual) };
        const direction = geolib.getCompassDirection(src_cords, actual_cords);

        switch (direction) {
            case 'N':
              return '\u2191'; // Upwards arrow
            case 'NNW':
            case 'NW':
            case 'WNW':
              return '\u2196'; // Northwest arrow
            case 'NNE':
            case 'NE':
            case 'ENE':
              return '\u2197'; // Northeast arrow
            case 'E':
              return '\u2192'; // Rightwards arrow
            case 'ESE':
            case 'SE':
            case 'SSE':
              return '\u2198'; // Southeast arrow
            case 'W':
              return '\u2190'; // Leftwards arrow
            case 'WSW':
            case 'SW':
            case 'SSW':
              return '\u2199'; // Southwest arrow
            case 'S':
              return '\u2193'; // Downwards arrow
            default:
              return 'error';
          }          
    }

    const calculatePercent = (distance) => {

        let MAX_DISTANCE = 20000; //in km
        return Math.floor(((MAX_DISTANCE - distance)/MAX_DISTANCE) * 100);
    }

    //main game logic happens here
    const handleGuess = () => {
        
        //build our "guess"
        const guess = document.getElementById("text-field").value;
        let distance = Math.floor(calculateDist(guess, todayCity));
        if(distanceUnit === 'mi'){
            distance = Math.floor(distance * 0.621371);
        }
        const direction = getDir(guess, todayCity);
        const prog = calculatePercent(distance);
        //
        
        const isCityExists = capitalCities.some((city) =>
            city.city.toLowerCase() === guess.toLowerCase()
        );

        const isCityGuessed = guesses.some((city) => 
            city.name.toLowerCase() === guess.toLowerCase()
        );

        if (!isCityExists) {
            toast.error('Cannot find city.', {
                autoClose: 1300,
                closeButton: false,
                hideProgressBar: true,
                position: toast.POSITION.TOP_CENTER,
            })
            return;
        }

        if(isCityGuessed) {
            toast.error('City has already been guessed. Try again.', {
                autoClose: 2500,
                closeButton: false,
                hideProgressBar: true,
                position: toast.POSITION.TOP_CENTER,
            })
            return;
        }

        const updatedGuesses = [...guesses];
        updatedGuesses[currentRectangleIndex] = {
            name: guess,
            code: code,
            dist: distance,
            dir: direction,
            unit: distanceUnit,
            progress: prog,
        };
        setGuesses(updatedGuesses);
        const nextRectangleIndex = currentRectangleIndex + 1;
        setCurrentRectangleIndex(nextRectangleIndex);
        
        document.getElementById("text-field").value = '';

        if (guess.toLowerCase() === todayCity.toLowerCase()) {
            setTimeout(() => {
                alert('You guessed right!');
            }, 1200);
            localStorage.setItem("isGuessingDisabled", true);
            setIsGuessingDisabled(localStorage.getItem("isGuessingDisabled"));
        }
        else if (nextRectangleIndex === guesses.length) {
            setTimeout(() => {
                alert("You are out of guesses!\n\nToday's city: " + todayCity);
            }, 1200);
            localStorage.setItem("isGuessingDisabled", true);
            setIsGuessingDisabled(localStorage.getItem("isGuessingDisabled"));
        }
    };

    
    return (
        <div className="guess-boxes">
            {showCityList && (
                <div className="suggestion-buttons" ref={suggestionRef}>
                    {suggestionList.map((city, index) => (
                        <button
                            key={index}
                            className="suggestion-button"
                            onClick={() => handleCitySelection(city.city, city.code)}
                        >
                            <span className="city">{city.city}</span>, {city.country}
                        </button>
                    ))}
                </div>
            )}
            {guesses.map((guess, index) => (
                <div
                    key={index}
                    className={`rectangle ${
                        guess.name ? (guess.name.toLowerCase() === todayCity.toLowerCase() ? 'correct' : 'incorrect') : ''}`}
                >
                {guess.name && (
                    <div className='guess'>
                        <div className="guess-name animate">{guess.name}</div>
                        <div className="guess-code animate">{guess.code}</div>
                        <div className="guess-progress animate">
                            <div className ="fill" style={{ "--progress-width": `${guess.progress}%` }}></div>
                            <div className="count-up-overlay">
                                <CountUp finalNumber={guess.progress} />
                            </div>
                        </div>
                        <div className="guess-distance animate">{guess.dist}{guess.unit}</div>
                        <div className="guess-direction animate">{guess.dir}</div>
                    </div>
                )}
                </div>
            ))}
                <>
                    <input
                        id="text-field"
                        className="rectangle text-field"
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
                            Guess!🌆
                    </button>
                </>
        </div>
    );
}
export default GuessBoxes;
