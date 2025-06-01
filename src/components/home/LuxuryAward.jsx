"use client";
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFlip, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";

import HearderNameIcon from "../hearderNameIcon";

import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import HearderNameSection from "../hearderNameSection";
import { BASEURL } from "@component/apiendpoints/api";

const LuxuryAward = () => {
  const route = useRouter();

  const { bestLuxuryHotelOfYear } = useSelector((state) => state.siteSetting);

  const handleRoute = (item) => {
    route.push(`/hotels/${item}`);
  };

  console.log("bestLuxuryHotelOfYear", bestLuxuryHotelOfYear);

  useEffect(() => {
    AOS.init({
      duration: 2000, // Animation duration (in ms)
      easing: "ease-in-out", // Easing for the animation
      once: false,
      offset: 120, // Whether animation should happen only once
    });
    AOS.refresh();
  });

  return (
    <section
      className="newly-listed-award luxuryHotelSec"
      // style={{ paddingBottom: "50px" }}
    >
      {/* <HearderNameSection name={"Best luxury hotel of the year"} /> */}
      {/* <h2 className="text-center pt-3">Best luxury hotel of the year</h2> */}
      <div className="container">
        <div className="sectionInnerHead-new section-head-new">
          {/* <h1 className="text-sm sm:text-xl md:text-sm lg:text-xl ml-2 md:ml-0 my-5 uppercase border-l-4 pl-3 border-[#846316] text-[#846316]">LATEST News</h1> */}

          <h1 className="text-sm sm:text-xl md:text-sm lg:text-xl ml-2 md:ml-0 mt-6 uppercase border-l-4 pl-5 border-[#846316] text-[#846316]">
            BEST LUXURY HOTELS OF THE YEAR
          </h1>
          <div className="section-control">
            <div className="swiper-button-next text-slate-300"></div>
            <div className="swiper-button-prev text-slate-300"></div>
          </div>
        </div>
      </div>
      <div className="container" style={{marginLeft:"60px", marginRight:"-100px"}}>
        <div className="row whater-effect" style={{ marginTop: "-15px" }}>
          <div
            className="col-md-9"
            style={{ paddingTop: "42px"}}
            data-aos="fade-left"
          >
            <Swiper
              className="newly-listedSwiper"
              spaceBetween={10}
              autoplay={{
                delay: 2000, // ✅ Auto-scroll every 2 seconds
                disableOnInteraction: false, // ✅ Keeps autoplay running even after user interaction
                reverseDirection: true,
              }}
              loop={true}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              // loop={true}
              slidesPerView={3} // Adjust the number of slides visible at once
              // breakpoints={{
              //   768: {
              //     slidesPerView: 2, // 2 slides on medium screens
              //   },
              //   480: {
              //     slidesPerView: 1, // 1 slide on small screens
              //   },
              // }}
              modules={[Navigation, Pagination, EffectFlip, Autoplay]}
            >
              {bestLuxuryHotelOfYear?.data?.length > 0 ? (
                bestLuxuryHotelOfYear?.data?.map((hotel, index) => (
                  <SwiperSlide key={index}>
                    <div className="hotelCard" style={{width:"100%"}}>
                      <div
                        className="hotel-img hotel-img-effect"
                        style={{ height: "26rem", }}
                      >
                        {hotel?.hotelId?.images?.[0]?.slice(0, 5) == "https" ? (
                          <img
                            src={`${hotel?.hotelId?.images?.[0]}`}
                            alt="Gallery 1"
                            style={{ width: "100%", borderRadius: "8px" }}
                            className="hotelImage"
                          />
                        ) : (
                          <img
                            src={`${BASEURL}/${hotel?.hotelId?.images?.[0]}`}
                            alt="Gallery 1"
                            style={{ borderRadius: "8px" }}
                          />
                        )}

                        <img
                          src="./new/assets/img/runnerUp.png"
                          className="hotel-of-yr-award"
                        />
                      </div>
                      <div className="hotel-content z-10 relative">
                        <h2 className="text-center text-white">
                          {hotel?.year}
                        </h2>
                        <button
                          className="bg-[#ffffff] text-[#846316] px-3 py-1 blog-bottom-content rounded-md mt-3 uppercase w-full hotelNames cursor-pointer"
                          onClick={() => handleRoute(hotel?.hotelId?.slug)}
                        >
                          {hotel.hotelName}
                        </button>
                        <button
                          className="bg-[#846316] text-white px-3 py-1 blog-bottom-content rounded-md mt-3 uppercase w-full hotelcountry cursor-pointer"
                          onClick={() => handleRoute(hotel?.hotelId?.slug)}
                        >
                          {hotel.hotelId?.country?.country ?? "America"}
                        </button>
                      </div>
                      <div className="hotel-img-reflect">
                        {hotel?.hotelId?.images?.[0]?.slice(0, 5) == "https" ? (
                          <img
                            src={`${hotel?.hotelId?.images?.[0]}`}
                            alt="Gallery 1"
                            style={{
                              width: "100%",
                              borderRadius: "8px",
                            }}
                          />
                        ) : (
                          <img
                            src={`${BASEURL}/${hotel?.hotelId?.images?.[0]}`}
                            alt="Gallery 1"
                            style={{
                              width: "100%",
                              borderRadius: "8px",
                            }}
                          />
                        )}
                        <div className="hotel-reflection"></div>
                      </div>
                      {/* <div style={{
        position: 'absolute',
        bottom: '-170px',
        left: 0,
        right: 0,
        height: '60px',
        background: `linear-gradient(to bottom, 
          rgba(255, 255, 255, 0.3) 0%,
          rgba(255, 255, 255, 0.15) 30%,
          rgba(255, 255, 255, 0.05) 60%,
          rgba(255, 255, 255, 0) 100%)`,
        borderRadius: '0 0 1rem 1rem',
        transform: 'scaleY(-1)',
        opacity: 0.8,
        zIndex: 1
      }}>

{hotel?.hotelId?.images?.[0]?.slice(0, 5) == "https" ? <img src={`${hotel?.hotelId?.images?.[0]}`} alt="Gallery 1" style={{ width: "92%", borderRadius: "8px" }} /> : <img src={`${BASEURL}/${hotel?.hotelId?.images?.[0]}`} alt="Gallery 1" style={{  width: "92%", borderRadius: "8px" }} />}
      </div> */}
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                <>
                  <p>No Awarded Hotel</p>
                </>
              )}
            </Swiper>
          </div>

          <div
            className="col-md-3"
            data-aos="fade-right"
            style={{ marginRight: "-30px" }}
          >
            <div className="same-cards-best-luxury ml-3">
              <div
                className=""
                style={{
                  backgroundImage:
                    'url("/new/assets/img/nominate-hotel-bg.png")',
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  border: "2px solid #b79d13",
                  borderRadius: "12px",
                  height: "100%",
                  width: "18rem",
                  marginLeft: "10px",
                }}
              >
                <div className="section-comman-text">
                  <h3
                    className="comman-text-heading"
                    style={{ textAlign: "center" }}
                  >
                    TOP LUXURY HOTEL OF THE YEAR
                  </h3>
                  <p className="comman-info" style={{ textAlign: "center" }}>
                    Experience the pinnacle of elegance and comfort at this
                    award-winning hotel, celebrated for its unmatched luxury and
                    world-class amenities. Indulge in the best!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LuxuryAward;
