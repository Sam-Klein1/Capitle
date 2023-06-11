import React, { useEffect, useState } from 'react';
import '../css/Timer.css'

function Timer() {
    const [timeLeft, setTimeLeft] = useState('');
  
    useEffect(() => {
      const interval = setInterval(() => {
        const now = new Date();
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
        const timeRemaining = endOfDay - now /*- 40000000 - 8000000*/;

        if (timeRemaining <= 0) {
            localStorage.removeItem('todayCity');
            localStorage.removeItem('guesses');
            localStorage.removeItem('currentRectangleIndex');
            window.location.reload();
        }
  
        // Calculate hours, minutes, and seconds
        const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
        const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60).toString().padStart(2, '0');
        const seconds = Math.floor((timeRemaining / 1000) % 60).toString().padStart(2, '0');
  
        setTimeLeft(`${hours}:${minutes}:${seconds}`);
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    return <div className="timer"> 
                <span style={{marginRight: 10, fontSize: 15, fontWeight: 'bolder'}}>{'\u21BB'}</span>
                game in:
                <span style={{marginLeft: 5, fontStyle: 'italic', fontSize: 13}}> {timeLeft}</span>
            </div>;
  }

  export default Timer;
  