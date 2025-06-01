"use client";
import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFlip } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";


const SwiperComponent = () => {
 
  return (
    <Swiper className='newly-listedSwiper'
      spaceBetween={24}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
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
      modules={[Navigation, Pagination, EffectFlip]}
    >
      {[ 
        {
          img: '/new/assets/img/img1.jpg',
          name: 'MAYA UBUD SPA AND RESTAURANT',
          location: 'INDONESIA',
        },
        {
          img: '/new/assets/img/imgr2.jpg',
          name: 'KOZEY, PFANNERSTILL AND WEST',
          location: 'INDONESIA',
        },
        {
          img: '/new/assets/img/img3.jpg',
          name: 'UPTON, BOGAN AND WILLIAMSON',
          location: 'INDONESIA',
        },
        {
          img: '/new/assets/img/img4.jpg',
          name: 'UPTON, BOGAN AND WILLIAMSON',
          location: 'INDONESIA',
        },
        {
          img: '/new/assets/img/img1.jpg',
          name: 'ROOB AND SONS',
          location: 'INDONESIA',
        },
      ].map((hotel, index) => (
        <SwiperSlide key={index}>
          <div className="hotel-cards">
            <div className="hotel-img">
              <img src={hotel.img} alt={hotel.name} />
            </div>
            <div className="hotel-content">
              <h4 className="hotel-name">{hotel.name}</h4>
              <div className="hotel-location">{hotel.location}</div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperComponent;
