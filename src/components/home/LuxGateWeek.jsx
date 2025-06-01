"use client";
import React, { useState } from "react";
import HearderNameIcon from "../hearderNameIcon";

function LuxGateWeek() {
  // Hotel data
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
      <HearderNameIcon name={"NEW LUXE GETAWAYS EVERY WEEK"} />
      <div
        style={{
          backgroundImage: "url('/new/assets/img/splash.png')",
        }}
        className="bg-[auto_100%] bg-center bg-no-repeat "
      >
        <div className="flex justify-center items-center">
          {/* Container */}
          <div className="flex gap-8 rounded-lg mt-10">
            {/* Sidebar Buttons */}
            <div className="flex flex-col space-y-4">
              {hotelData.map((hotel) => (
                <button
                  key={hotel.country}
                  className={`px-3 py-2 
               bg-white border border-gray-300 text-[#9e7922] rounded-md hover:bg-gray-100`}
                  style={
                    hotel.country === selectedCountry
                      ? {
                          background:
                            "linear-gradient(to right, rgb(204, 164, 89), rgb(230, 205, 113), rgb(204, 163, 86))",
                          color: "white",
                          borderRadius: "10px",
                        }
                      : {}
                  }
                  onClick={() => setSelectedCountry(hotel.country)}
                >
                  {hotel.country}
                </button>
              ))}
            </div>

            {/* Main Content */}
            <div
              className="flex flex-col pl-4 pt-4 pb-4 pr-4 ml-20 rounded-md shadow-lg"
              style={{ width: "820px", border: "2px solid #e2ac2e" }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  justifyContent: "space-between",
                }}
                className="mt-4"
              >
                <h1 style={{ color: "#C1121F", fontSize: "1.25rem" }}>
                  LUXURY HOTELS
                </h1>

                <span
                  style={{
                    color: "#a17800",
                    fontSize: "1.25rem",
                    marginLeft: "auto",
                  }}
                >
                  {selectedHotel.name}
                </span>
              </div>

              {/* YouTube Video */}
              <div className="w-[790px] h-[400px] border-luxe mt-3">
                <iframe
                  width="100%"
                  height="385"
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
    </>
  );
}

export default LuxGateWeek;
