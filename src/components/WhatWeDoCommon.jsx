"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Controller } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function WhatWeDoCommon() {
  const [controlledSwiper, setControlledSwiper] = useState(null);
  const imageSwiperRef = useRef(null);
  const textSwiperRef = useRef(null);

  return (
    <> 
      <section className="flex flex-col items-center campaign-section" style={{ backgroundImage: 'url(./assets/img/1.png)',backgroundSize: 'cover' }}>
        <div className="flex flex-col lg:flex-row gap-16 items-center justify-center w-full">
          
          {/* Image Swiper */}
          <div className="relative flex items-center w-[350px]">
            <button className="absolute left-0 btn btn-circle bg-white shadow-lg z-10 swiper-button-prev">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>
              </svg>
            </button>

            <Swiper
              ref={imageSwiperRef}
              modules={[Navigation, Pagination, Controller]}
              spaceBetween={20}
              slidesPerView={1}
              navigation={{
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
              }}
              pagination={{ clickable: true }}
              loop={true}
              onSwiper={setControlledSwiper}
              className="w-full"
            >
              <SwiperSlide><img src="./assets/img/hotel2.jpg" alt="Slide 1" className="w-full" /></SwiperSlide>
              <SwiperSlide><img src="./assets/img/hotel3.jpg" alt="Slide 2" className="w-full" /></SwiperSlide>
              <SwiperSlide><img src="./assets/img/hotel3.jpg" alt="Slide 3" className="w-full" /></SwiperSlide>
            </Swiper>

            <button className="absolute right-0 btn btn-circle bg-white shadow-lg z-10 swiper-button-next">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
              </svg>
            </button>
          </div>

          {/* Text Swiper */}
          <div className="box text-box w-[350px]">
            <Swiper
              ref={textSwiperRef}
              modules={[Pagination, Controller]}
              spaceBetween={20}
              slidesPerView={1}
              pagination={{ clickable: true }}
              loop={true}
              controller={{ control: controlledSwiper }}
            >
              <SwiperSlide>
                <div className="p-5 text-justify ">
                  <img src="./assets/img/logo.svg" className="w-56 mb-6 mx-auto" alt="logo" />
                  <p className="text-black"> Lorem ipsum dolor sit amet consectetur. Pharetra viverra
                        vitae leo et. Sed eget a nisl est tellus neque. Platea mi
                        mattis quis varius vel proin. Consectetur pretium quis nunc
                        volutpat. Feugiat cursus pellentesque in mauris id euismod
                        ligula adipiscing nisi. Porttitor nisl cursus amet
                        consectetur ullamcorper sapien. Rhoncus in risus fames
                        sagittis. Ultricies enim aliquet blandit et imperdiet ut.
                        Ultricies enim aliquet blandit et imperdiet ut. Ultricies
                        enim aliquet blandit et imperdiet ut. Ultricies enim aliquet
                        blandit et.</p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="p-5 text-justify">
                  <img src="./assets/img/logo.svg" className="w-56 mb-6 mx-auto" alt="logo" />
                  <p className="text-black"> Lorem ipsum dolor sit amet consectetur. Pharetra viverra
                        vitae leo et. Sed eget a nisl est tellus neque. Platea mi
                        mattis quis varius vel proin. Consectetur pretium quis nunc
                        volutpat. Feugiat cursus pellentesque in mauris id euismod
                        ligula adipiscing nisi. Porttitor nisl cursus amet
                        consectetur ullamcorper sapien. Rhoncus in risus fames
                        sagittis. Ultricies enim aliquet blandit et imperdiet ut.
                        Ultricies enim aliquet blandit et imperdiet ut. Ultricies
                        enim aliquet blandit et imperdiet ut. Ultricies enim aliquet
                        blandit et.</p>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          
        </div>
      </section>
    </>
  );
}

export default WhatWeDoCommon;
