import React, { useEffect, useState } from 'react'

export default function SplashScreen() {
    const [hideName, setHideName] = useState(false);
    const [hideHome, setHideHome] = useState(false);
  
    useEffect(() => {
      const timer1 = setTimeout(() => {
        setHideName(true);
      }, 750);
  
      const timer2 = setTimeout(() => {
        setHideHome(true);
      }, 1100);
  
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }, []);
  
    return (
      <div className="absolute inset-0 flex justify-center items-center bg-[#0D0D0D] z-50">
        <span
          className={`
            text-[1.8rem] font-normal font-raleway text-white
            md:text-[1.8rem] 
            ${hideName ? "opacity-0 transition-opacity duration-1000" : "opacity-100"}
          `}
        >
          Kareem Saygbe
        </span>
        <span
          className={`
            text-[1.8rem] ml-[15px] font-thin font-raleway text-[#D5661C]
            md:text-[1.8rem]
            ${hideHome ? "opacity-0 transition-opacity duration-1000" : "opacity-100"}
          `}
        >
          Home
        </span>
      </div>
    );
  };
