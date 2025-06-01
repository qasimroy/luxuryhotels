"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import HeadingWithoutSwiper from "../headingWithoutSwiper";
import { useSelector } from "react-redux";
import { BASEURL } from "@component/apiendpoints/api";

const Fourthcoming = () => {
  const { upcomingMagazine } = useSelector((state) => state?.siteSetting);

  // Always use the first magazine for the right-side display
  const initialMagazine = upcomingMagazine?.data?.[0] || null;
  console.log(upcomingMagazine, "`initia`l");

  return (
    <section
      className="fourthcoming-section coming-sectionEdition"
      style={{
        backgroundImage: 'url("/new/assets/img/1.png")',
        backgroundSize: "cover",
      }}
    >
      <HeadingWithoutSwiper name={"FOURTHCOMING LUXURY HOTEL EDITIONS"} />
      {/* <h2 className="text-center pt-6 mt-0 text-white">FOURTHCOMING LUXURY HOTEL EDITIONS</h2> */}
      <div className="container relative">
        <div className="grid mt-[2.362rem] grid-cols-12 gap-4">
          {/* Left Side - Magazine Covers */}
          <div className="col-span-full md:col-span-4">
            <div className="relativeBox">
              {/* Navigation buttons must be inside the Swiper container */}
              <button
                className="absolute transform -translate-y-[calc(50%-2.5rem)] -rotate-90 h-10 w-20 text-white bg-red-600 top-1/2 -left-14 border"
                id="custom-prev"
              >
                Previous
              </button>
              <hr className="absolute transform -translate-y-1/2 -rotate-90 text-white h-10 w-[2px] bg-white m-0 top-1/2" />
              <button
                className="absolute transform -translate-y-[calc(50%+2.5rem)] -rotate-90 h-10 w-20 text-white bg-black top-1/2 -left-14 border"
                id="custom-next"
              >
                Next
              </button>
              <Swiper
                modules={[Autoplay, Navigation]}
                navigation={{
                  prevEl: "#custom-prev",
                  nextEl: "#custom-next",
                }}
                spaceBetween={10}
                slidesPerView={1}
                className="p-0"
              >
                {upcomingMagazine?.data?.map((data, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={`${BASEURL}/${data?.magazine_cover_img}`}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-auto rounded-md cursor-pointer"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* Right Side - Always displays the first magazine */}
          <div className="col-span-full md:col-span-8">
            <div className="relativeBox">
              <Swiper
                modules={[Autoplay, Navigation]}
                navigation={{
                  prevEl: "#custom-prev",
                  nextEl: "#custom-next",
                }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                loop={true}
                spaceBetween={10}
                slidesPerView={1}
                className="p-0"
              >
                {initialMagazine?.magazine_display_img?.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={`${BASEURL}/${image}`}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-auto rounded-md"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fourthcoming;
