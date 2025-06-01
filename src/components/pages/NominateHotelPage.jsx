"use client"
import React, { useState } from 'react'
import HeadingWithoutSwiper from '../headingWithoutSwiper';
import NominateForm from '../nominateForm';

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
        <div style={{ backgroundImage: "url('/new/assets/img/hotel-inside.png')" }}>
       
      <div
        className="flex justify-center items-center py-[30px] bg-cover bg-center"
      >
        {/* Container */}
        <div className="flex gap-8 p-4 rounded-lg shadow-lg">
          {/* Sidebar Buttons */}
          <div className="flex flex-col space-y-4">
            {hotelData.map((hotel) => (
              <button
                key={hotel.country}
                className={`px-4 py-2 ${
                  hotel.country === selectedCountry
                    ? "bg-red-600 text-white"
                    : "bg-white border border-gray-300 text-[#9e7922]"
                } rounded-md hover:bg-gray-100`}
                onClick={() => setSelectedCountry(hotel.country)}
              >
                {hotel.country}
              </button>
            ))}
          </div>
  
          {/* Main Content */}
          <div
            className="flex flex-col bg-white p-4 rounded-md"
            style={{ width: "820px" }}
          >
           <div style={{display:"flex",
            justifyContent:"space-between"}}>
           
  
            <h1 style={{color:"red",fontSize:"1.25rem"}}>LUXURY HOTELS</h1>
  
            <span style={{color:"#a17800",fontSize:"1.25rem"}}>
              {selectedHotel.name}
            </span>
           </div>
  
            {/* YouTube Video */}
            <div className="w-[775px] h-[315px]">
              <iframe
                width="100%"
                height="315"
                src={selectedHotel?.youtubeLink}
                title={selectedHotel?.name}
                className="rounded-lg border"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      </div>
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