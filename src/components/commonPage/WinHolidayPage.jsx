"use client"

import { apis, BASEURL } from '@component/apiendpoints/api';
import useRequest from '@component/hooks/UseRequest'
import moment from 'moment';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Pagination from './Pagination';


function WinHolidayPage() {
  const router = useRouter();
  // console.log("hit2",);

  const [data, setData] = useState([])

  const { request, response, loading } = useRequest(true);
  useEffect(() => {
    try {
      // request("GET",`${apis?.GETWIN_HOLIDAY_DATA}`)
      request("GET", `${apis?.GET_ALL_WIN_HOLIDAY_DATA}`)

    } catch (error) {
      console.log("error", error);
    }

  }, [])
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  // Calculate total pages dynamically
  const totalPages = data ? Math.ceil(data?.length / perPage) : 1;

  // Extract hotels for the current page
  const paginatedHotels = data?.slice((currentPage - 1) * perPage, currentPage * perPage) || [];

  useEffect(() => {
    if (response) {
      console.log("response", response);
      setData(response?.response)
    }
  }, [response])

  const handleNavigate = (slug) => {
    router.push(`/win-a-holiday/${slug}`);
  };
  const truncateText = (text, wordLimit) => {
    if (!text) return ""; // Handle undefined or empty text
    const words = text.split(" "); // Split into words
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..." // Keep only 4 words, add "..."
      : text; // If text has 4 or fewer words, show as it is
  };
  console.log("paginatedHotels", paginatedHotels);

  return (
    <>
    <div
          style={{
            backgroundImage: 'url("/new/assets/img/transparent-bg.png")',
            backgroundSize: "contain",
            backgroundPosition: "center center",
            padding: "100px 0",
            backgroundRepeat: "no-repeat",
            bottom: "400px",
            left: "50%",
            transform: "translate(-50%)",
          }}
          className="container relative"
        >
          <div
            className="text-center p-6 bg-opacity-50 rounded-lg comman-info"
            style={{ width: "60%", margin: "0 auto", padding: "0 60" }}
          >
            {/* <h2 className="text-2xl font-bold">Overlay Title</h2> */}
            <p className="text-sm text-black text-capitalize">
              Luxury Hotels, a renowned global brand founded in England 17 years
              ago, is currently present in 89 countries. We provide Luxury
              Hotels for affluent travelers through our online platform and in
              print and digital formats. Each edition is accessible for free
              download on 5 different platforms and attracts 4-5 million online
              readers annually.
            </p>
            <p className="text-sm text-black text-capitalize">
              Through our Printed Edition Rotation Program, your hotel will be
              featured as one of the top Luxury Hotels and will ensure a
              continuous influx of bookings and a consistent occupancy rate of
              800,000 to 1 million tourists throughout the year, all without any
              commission fees.
            </p>
          </div>
        </div>
      <div className="container whater-effect section-padding" data-aos="zoom-out-up" style={{marginTop:"100px"}}>
        <div className="row">
          {paginatedHotels?.map((hotel, index) => (
            <div className="col-lg-3 col-md-4 col-sm-6" key={index} style={{marginRight:"-13px"}}>
              <div className="hotel-cards overflow-hidden">
                <div className="hotel-img">
                  {/* Fix template literal syntax */}
                  <img
                    src={`${BASEURL}/${hotel?.hotelId?.hotel_logo}` ?? "./new/assets/img/noImage.png"}
                    alt={hotel?.hotelId?.hotel_name || "Hotel"}
                  />
                </div>
                <div className="hotel-content-win">
                  <button
                    onClick={() => handleNavigate(hotel?.slug)}
                    className=" text-[#e3e1dd] px-3 py-1 blog-bottom-content rounded-md mt-3 uppercase w-full text-center"
                  >
                    
                    {truncateText(hotel?.title, 4)}
                  </button>
                  <button onClick={() => handleNavigate(hotel?.slug)} className="bg-white text-golden px-3 py-2 rounded-md uppercase w-full blog-top-content" fdprocessedid="zpe1l">
                   
                    {truncateText(hotel?.hotelId?.hotel_name, 4)}
                    </button>
                  <p className="text-center bg-white rounded my-1">End Date {moment(hotel?.competitionclosure).format("DD-MM-YY")}</p>
                  <button className="bg-[#846316] text-white px-3 py-1 blog-bottom-content rounded-md mt-3 uppercase w-full">
                    {hotel?.hotelId?.country?.country || "Unknown Country"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-3">
        <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
      </div>
    </>
  )
}

export default WinHolidayPage;