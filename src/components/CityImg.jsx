import React, { useEffect, useState } from 'react';
import { capitalCities } from '../cities';
import '../css/CityImg.css';
import GuessBoxes from './GuessBoxes';

function CityImg() {
  const [todayCity, setTodayCity] = useState('');

  useEffect(() => {
    const ChosenCity = localStorage.getItem('ChosenCity');
    const lastChosenTime = localStorage.getItem('lastChosenTime');

    if (ChosenCity && lastChosenTime) {
      const elapsedTime = Date.now() - Number(lastChosenTime);
      if (elapsedTime < 24 * 60 * 60 * 20000) {
        setTodayCity(ChosenCity);
        return;
      }
    }

    chooseRandomCity(); // Choose a random city when the component mounts
    const intervalId = setInterval(chooseRandomCity, 24 * 60 * 60 * 20000); // Repeat every 24 hours

    return () => {
      clearInterval(intervalId); // Clean up the interval when the component unmounts
    };
  }, []);

  const chooseRandomCity = () => {
    const randomIndex = Math.floor(Math.random() * capitalCities.length);
    const randomCity = capitalCities[randomIndex].city;
    setTodayCity(randomCity);
    // Reset the guesses array to empty
    localStorage.setItem('guesses', JSON.stringify(Array(6).fill({ name: '', dist: 0, dir: '', code: '' })));
    // Reset the currentRectangleIndex to 0
    localStorage.setItem('currentRectangleIndex', 0);
    localStorage.setItem('ChosenCity', randomCity);
    localStorage.setItem('lastChosenTime', Date.now());
  };

  const getImageFilePath = (city) => {
    let path = require('../assets/default.jpg');
    try {
      path = require(`../assets/${city}.jpg`);
      return path;
    } catch (error) {
      return path;
    }
  };

  return (
    <div className="content-container">
      <img src={getImageFilePath(todayCity)} className="city-image" alt="" />
      <GuessBoxes todayCity={todayCity} />
    </div>
  );
}

export default CityImg;
