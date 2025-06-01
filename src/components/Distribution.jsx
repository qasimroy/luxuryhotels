"use client";
import React from 'react'
import HeadingWithoutSwiper from './headingWithoutSwiper'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules'; // Import modules directly
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



function Distribution() {
    return (

        <section>


            <HeadingWithoutSwiper name={"Distribution"} />

            <section style={{
                backgroundImage: 'url("/new/assets/img/nominate-hotel-bg.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                borderRadius: '12px',
                marginBottom: '50px'
            }}>
                <div className="divider divider-secondary w-1/4 mx-auto text-xl text-golden uppercase text-center pt-5  mb-5 "> <span className='mx-4'> Luxury hotel europe</span></div>
                <div className="distribution-mainBox">
                    <div className="distribution-box"><img src="./assets/img/hotel2.jpg" className="w-full" alt="alt" style={{ height: "39rem" }} /></div>
                    <div className="distribution-box p-4">
                        <div className="flex">
                            <div className="w-1/2 mx-2">
                                <button className="px-3 py-1 rounded-md mt-3 uppercase" style={{ backgroundColor: "#9e7922", color: "#fff" }} >Hard copies</button>
                                <h3 className="text-xl text-golden mt-2">120,000</h3>
                            </div>
                            <div className="w-1/2 mx-2">
                                <button className="px-3 py-1 rounded-md mt-3 uppercase" style={{ backgroundColor: "#9e7922", color: "#fff" }}>Digital copies</button>
                                <h3 className="text-xl text-golden mt-2">120,000</h3>
                            </div>
                        </div>
                        <ul className="list-disc pl-7">
                            <li>Lorem ipsum dolor sit amet consectetur.</li>
                            <li>Pharetra viverra vitae leo et.</li>
                            <li>Sed eget a nisl est tellus neque.</li>
                            <li>Platea mi mattis quis varius vel proin.</li>
                            <li>Consectetur pretium quis nunc volutpat.</li>
                            <li>Feugiat cursus pellentesque in mauris id euismod ligula adipiscing nisi.</li>
                            <li>Porttitor nisl cursus amet consectetur ullamcorper sapien.</li>
                            <li>Rhoncus in risus fames sagittis.</li>
                            <li>Ultricies enim aliquet blandit et imperdiet ut.</li>
                        </ul>
                        <div className="text-red-600 uppercase ml-3 mt-3">Geographic spread</div>
                        <span className="p-1  ml-3" style={{ backgroundColor: "#9e7922", color: "#fff" }}>100% Dubai &amp; Abu Dhabi</span>
                        <button className="bg-red-600 text-white px-3 py-1 rounded-md mt-3 uppercase block ml-3">Click Here</button>
                    </div>
                </div>
            </section>


            <HeadingWithoutSwiper name={"Recent magazines"} />
            <section className="tailor-made-campaign">
                <div className='container'>
                    <Swiper
                        modules={[Navigation, Pagination]} // Pass modules here
                        spaceBetween={24}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        breakpoints={{
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            992: {
                                slidesPerView: 4,
                                spaceBetween: 30,
                            },
                        }}
                    >
                        <SwiperSlide><img src="./assets/img/hotel3.jpg" alt="Slide 2" className="w-full" /></SwiperSlide>
                        <SwiperSlide><img src="./assets/img/hotel3.jpg" alt="Slide 2" className="w-full" /></SwiperSlide>
                        <SwiperSlide><img src="./assets/img/hotel2.jpg" alt="Slide 2" className="w-full" /></SwiperSlide>
                        <SwiperSlide><img src="./assets/img/hotel3.jpg" alt="Slide 2" className="w-full" /></SwiperSlide>
                    </Swiper>
                </div>
            </section>
        </section>

    )
}

export default Distribution