"use client";
import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFlip, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SwiperComponent = ({newlyListedHotel}) => {

  const route = useRouter()
    useEffect(() => {
                AOS.init({
                  duration: 2000, // Animation duration (in ms)
                  easing: "ease-in-out", // Easing for the animation
                  once: true, // Whether animation should happen only once
                });
              });
   
      const handleNavigate=(slug)=>{
        
        route.push(`/hotels/${slug}`)
      }


  return (
    <Swiper
    className="newly-listedSwiper"
    spaceBetween={5}
    slidesPerView={3}
    loop={true} // ✅ Enables infinite looping
    autoplay={{
      delay: 2000, // ✅ Auto-scroll every 2 seconds
      disableOnInteraction: false, // ✅ Keeps autoplay running even after user interaction
    }}
    modules={[Navigation, Pagination, EffectFlip, Autoplay]} // ✅ Added Autoplay module
    navigation={{
      prevEl: ".swiper-button-prev",
      nextEl: ".swiper-button-next",
    }}
  >
     
      {newlyListedHotel?.hotels?.map((hotel, index) => (
        <SwiperSlide key={index}>
          <div className="hotel-cards" data-aos="zoom-out-up" style={{width:"19rem"}} >
            <div className="hotel-img">
              <img src={hotel?.coverPhoto ?? "/new/assets/img/noImage.png"} alt={hotel.name} />
            </div>
            <div className="hotel-content">
            {/* <button className="bg-[#ffffff] text-[#846316] px-3 py-1 blog-bottom-content rounded-md mt-3 uppercase w-full">{hotel.name}</button> */}
            {/* <button className="bg-[#846316] text-white px-3 py-1 blog-bottom-content rounded-md mt-3 uppercase w-full">{hotel.location}</button> */}
            <button onClick={()=>handleNavigate(hotel?.slug)} className="bg-[#ffffff] hotelNames text-[#846316] px-3 py-1 blog-bottom-content rounded-md mt-3 uppercase w-full text-center">
  {hotel?.hotel_name} 
</button>

              <button className="bg-[#846316] text-white px-3 py-1 blog-bottom-content rounded-md mt-3 uppercase w-full hotelcountry">{hotel?.country?.country}</button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperComponent;
