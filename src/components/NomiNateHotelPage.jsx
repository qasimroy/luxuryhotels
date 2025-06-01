"use client"
import React, { useState } from 'react'


import HeadingWithoutSwiper from './headingWithoutSwiper';
import NominateForm from './nominateForm';
import LuxGateWeek from './home/LuxGateWeek';
import VideoContainer from './home/VideoContainer';

function NominateHotelPage() {
   const hotelData = [
      {
        name: "Hotel de Crillon",
        country: "FRANCE",
        youtubeLink: "https://www.youtube.com/embed/3ce9Ge9GnnY",
      },
      {
        name: "The Ritz London",
        country: "UNITED KINGDOM",
        youtubeLink: "https://www.youtube.com/embed/1ei5dX7iHI4",
      },
      {
        name: "Burj Al Arab",
        country: "DUBAI",
        youtubeLink: "https://www.youtube.com/embed/tlDO-8E9sX8",
      },
      {
        name: "Four Seasons Resort",
        country: "MALDIVES",
        youtubeLink: "https://www.youtube.com/embed/dBWKIzE02lY",
      },
      {
        name: "The Plaza",
        country: "UNITED STATES",
        youtubeLink: "https://www.youtube.com/embed/uMtO93GECGU",
      },
    ];
  
    // State to store the selected country
    const [selectedCountry, setSelectedCountry] = useState("FRANCE");
  
    // Find the video for the selected country
    const selectedHotel = hotelData.find(
      (hotel) => hotel?.country === selectedCountry
    );
  
    return (
        <>
        <VideoContainer />
        <LuxGateWeek />
       <HeadingWithoutSwiper name={"Nominate Hotel"}/>
       <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
   
  }}
>
  <p style={{ margin: "18px", textAlign: "center",color:"#846316",fontSize:"1.25rem" }}>
    Submit Your Hotel as a "Luxury Hotel of the Year"
  </p>
</div>
<div>
    <NominateForm />
</div>

        </>
    );
  
}

export default NominateHotelPage