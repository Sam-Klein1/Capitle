import React, { useEffect, useRef } from 'react';

function CountUp({ finalNumber }) {
  const countRef = useRef(null);

  useEffect(() => {
    const startCount = 0;
    const duration = 1000; // Animation duration in milliseconds
    const increment = finalNumber / (duration / 10); // Increment value per 10 milliseconds

    let currentCount = startCount;
    const interval = setInterval(() => {
      currentCount += increment;
      if (currentCount >= finalNumber) {
        currentCount = finalNumber;
        clearInterval(interval);
      }
      countRef.current.textContent = Math.floor(currentCount) + '%';
    }, 11);

    return () => clearInterval(interval);
  }, [finalNumber]);

  return <div className="count-up" ref={countRef}></div>;
}

export default CountUp;
