"use client"
import { useEffect, useState } from "react";

const SubscriptionCountdown = ({endDate}) => {
   
    const calculateTimeLeft = () => {
      const difference = new Date(endDate) - new Date();
      if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };
  
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
  
      return () => clearInterval(timer); // Cleanup interval on unmount
    }, [endDate]);
  
    return (
      <>
        <p style={{fontSize:"1.25rem"}}>Subscription Plan Ends In:</p>
        <p className="text-red-800">
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </p>
      </>
    );
  };

  export default SubscriptionCountdown