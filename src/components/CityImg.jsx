import React, { useEffect, useState } from 'react';
import { capitalCities } from '../cities';
import '../css/CityImg.css'
import GuessBoxes from './GuessBoxes';

function CityImg() {
    const [todayCity, setTodayCity] = useState('');
  
    useEffect(() => {
      chooseRandomCity(); // Choose a random city when the component mounts
      const intervalId = setInterval(chooseRandomCity, 24 * 60 * 60 * 1000); // Repeat every 24 hours
  
      return () => {
        clearInterval(intervalId); // Clean up the interval when the component unmounts
      };
    }, []);
  
    const chooseRandomCity = () => {
      const randomIndex = Math.floor(Math.random() * capitalCities.length);
      const randomCity = capitalCities[randomIndex].city;
      setTodayCity(randomCity);
    };

    const getImageFilePath = (city) => {
        let path = require('../assets/default.jpg');
        try {
            path = require(`../assets/${city}.jpg`)
            return path;
        } catch (error) {
            return path;
        }
    };
  
      return (
        <div className='content-container'>
          <img 
            src={getImageFilePath(todayCity)} 
            className='city-image' 
            alt = ""
          />
          {/* {todayCity} */}
          <GuessBoxes todayCity={todayCity}/>
        </div>
      );
  }

export default CityImg;
