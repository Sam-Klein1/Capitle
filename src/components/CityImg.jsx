import React, { useEffect, useState } from 'react';
import { capitalCities } from '../cities';
import '../css/CityImg.css';
import GuessBoxes from './GuessBoxes';

const getRandomCity = () => {
  const currentDate = new Date();
  const dayOfYear = getDayOfYear(currentDate);
  const randomIndex = dayOfYear % capitalCities.length;
  const randomCity = capitalCities[randomIndex].city;
  return randomCity;
}

const getDayOfYear = (date) => {
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff = date - startOfYear;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

function CityImg() {
  
  
  const [todayCity, setTodayCity] = useState(() => {
    const storedCity = localStorage.getItem('todayCity');
    return storedCity ? storedCity : getRandomCity();
  });

  //runs on mount
  useEffect(() => {
    setTodayCity(getRandomCity());
  }, []);

  //runs whenever todayCity changes
  useEffect(() => {

    setTodayCity(getRandomCity());
    localStorage.setItem('todayCity', todayCity);

  }, [todayCity])

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
