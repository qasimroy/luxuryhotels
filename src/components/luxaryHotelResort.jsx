"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getAllHotels } from "@component/lib/slice/sitesSetting";
import FilterSection from "./home/FilterSection";
import Pagination from "./commonPage/Pagination";

const LuxuryHotelResort = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getAllHotels({ currentPage }));
  }, [currentPage]);
  const { allHotels } = useSelector((state) => state.siteSetting);

  let totalPages = allHotels?.totalPages;


  // State for pagination

  // const perPage = 8;

  // Calculate total pages dynamically
  // const totalPages = allHotels?.hotels ? Math.ceil(allHotels.hotels.length / perPage) : 1;

  // // Extract hotels for the current page
  // const paginatedHotels = allHotels?.hotels?.slice((currentPage - 1) * perPage, currentPage * perPage) || [];

  useEffect(() => {
    AOS.init({
      duration: 2000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const handleNavigate = (slug) => {
    router.push(`/hotels/${slug}`);
  };

  return (
    <>
      <div
          style={{
            backgroundImage: 'url("/new/assets/img/transparent-bg.png")',
            backgroundSize: "contain",
            backgroundPosition: "center center",
            // backgroundColor: "#000000",
            paddingTop: "180px",
            paddingBottom: "200px",
            backgroundRepeat: "no-repeat",
            top: "580px",
            left: "90px",
            marginBottom: "100px",
          }}
          className="container absolute"
          ><div
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
        </div></div>
          <div
            className="text-center bg-opacity-1 rounded-lg comman-info"
            style={{ width: "70%", margin: "0 auto", paddingTop: "160px", textAlign: "center" }}
          >
          <FilterSection />
          </div>
      <div className="section-head"
        style={{marginTop:"30px"}}
      >
        <div className="container">
          <div className="sectionInnerHead">
            <h2 className="section-heading">Luxury hotels selection</h2>
          </div>

        </div>

      </div>

      <div className="container">
        <div className="container whater-effect section-padding" data-aos="zoom-out-up">
          <div className="row">
            {allHotels?.hotels?.map((hotel, index) => (
              <div className="col-lg-3 col-md-4 col-sm-6 p-1 mb-3" key={index}>
                <div className="hotel-cards overflow-hidden">
                  <div className="hotel-img">
                    <img
                      src={hotel?.coverPhoto ?? "./assets/img/noImage.png"}
                      alt={hotel?.hotel_name || "Hotel"}
                    />
                  </div>
                  <div className="hotel-content pt-0 pb-3 h-full">
                    <button
                      onClick={() => handleNavigate(hotel?.slug)}
                      className="bg-[#ffffff] text-[#846316] px-3 py-1 blog-bottom-content rounded-md mt-3 uppercase w-full text-center"
                      style={{height:"80px"}}

                    >
                      {hotel?.hotel_name}
                    </button>
                    <button className="bg-[#846316] text-white px-3 py-1 blog-bottom-content rounded-md mt-3 uppercase w-full">
                      {hotel?.country?.country || "Unknown Country"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-3" >
          <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>
    </>
  );
};

export default LuxuryHotelResort;
