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
      if (elapsedTime < 24 * 60 * 60 * 1000) {
        localStorage.removeItem('guesses'); 
        setTodayCity(ChosenCity);
        return;
      }
    }

    const currentDate = new Date();
    const dayOfYear = getDayOfYear(currentDate);
    const randomIndex = dayOfYear % capitalCities.length;
    const randomCity = capitalCities[randomIndex].city;
    setTodayCity(randomCity);
    // Reset the guesses array to empty
    localStorage.setItem('guesses', JSON.stringify(Array(6).fill({ name: '', dist: 0, dir: '', code: '' })));
    // Reset the currentRectangleIndex to 0
    localStorage.setItem('currentRectangleIndex', 0);
    localStorage.setItem('ChosenCity', randomCity);
    localStorage.setItem('lastChosenTime', Date.now());
  }, []);

  const getDayOfYear = (date) => {
    const startOfYear = new Date(date.getFullYear(), 0, 0);
    const diff = date - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
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
