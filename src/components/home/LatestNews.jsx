"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFlip, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useSelector } from "react-redux";
import { BASEURL } from "@component/apiendpoints/api";
import { useRouter } from "next/navigation";
import TravelNews from "./Travel-News";

const LatestNews = () => {

    const [isLatestNewsSelect, setIsLatestNewsSelect] = useState(true);
    const [isTravelNewsSelect, setIsTravelNewsSelect] = useState(false);
    const route = useRouter();

    const { latestNews } = useSelector((state) => state.siteSetting);

    const handleRoute = (item) => {
        route.push(`/news/${item}`);
    };

    return (
        <>
            {isLatestNewsSelect && (
     
                <section className="fourthcoming-section travelmargin0 my-10" style={{  backgroundImage: 'url("/new/assets/img/new1.jpg")',
                    backgroundSize: 'cover'}}>
                    <div className="container" style={{ marginTop: "-20px" }}>
                        <div className="container">
                            <div className="sectionInnerHead section-head">
                                {/* <h1 className="text-sm sm:text-xl md:text-sm lg:text-xl ml-2 md:ml-0 my-5 uppercase border-l-4 pl-3 border-[#846316] text-[#846316]">LATEST News</h1> */}
                                <h1 className="text-sm sm:text-xl md:text-sm lg:text-xl ml-2 md:ml-0  uppercase border-l-4 pl-3 border-[#846316] text-[#846316]">
                                    Latest News
                                </h1>
                                <div className="section-control">
                                    <div className="swiper-button-next text-slate-300"></div>
                                    <div className="swiper-button-prev text-slate-300"></div>
                                </div>
                            </div>
                        </div>
                        <div className="row whater-effect travel-news-sec" style={{marginLeft:"-60px", marginTop:"-20px"}}>
                            <div className="col-md-3" data-aos="fade-left">
                                <div className="same-cards">
                                    <div
                                        style={{
                                            backgroundImage:
                                                'url("/new/assets/img/nominate-hotel-bg.png")',
                                            backgroundSize: "cover",
                                            backgroundPosition: "center center",
                                            border: "2px solid #9e7922",
                                            borderRadius: "12px",
                                            height: "100%",
                                        }}
                                    >
                                        <div className="section-comman-text">
                                            <h3
                                                className="comman-text-heading"
                                                style={{ textAlign: "center" }}
                                            >
                                                LATEST NEWS
                                            </h3>
                                            <p
                                                className="comman-info"
                                                style={{ textAlign: "center" }}
                                            >
                                                Catch up on the most recent updates and breaking stories
                                                from around the world. Stay informed, stay ahead!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-9 relative" data-aos="fade-right" style={{marginLeft:"-10px"}}>
                                <Swiper
                                    className="newly-listedSwiper"
                                    spaceBetween={0}
                                    modules={[Navigation, Pagination, EffectFlip, Autoplay]} // ✅ Added Autoplay module
                                    navigation={{
                                        prevEl: ".swiper-button-prev",
                                        nextEl: ".swiper-button-next",
                                    }}
                                    loop={true} // ✅ Enables infinite looping
                                    autoplay={{
                                        delay: 2000, // ✅ Auto-scroll every 2 seconds
                                        disableOnInteraction: false, // ✅ Keeps autoplay running even after user interaction
                                    }}
                                    slidesPerView={3}
                                >
                                    {latestNews?.content?.map((hotel, index) => (
                                        <SwiperSlide className='' key={index}>
                                            <div className="hotel-cards" style={{width:'16.5rem'}}>
                                                <div className="hotel-img">
                                                    <img src={`${BASEURL}/${hotel?.thumbnail_path}`} alt={hotel.name} />
                                                </div>
                                                <div className="hotel-content">
                                                    <h4 className="hotel-name hotelNames text-center">{hotel?.news_title}</h4>
                                                    <button onClick={() => handleRoute(hotel?.slug)} className="bg-[#ffffff] hotelNames text-[#846316] px-3 py-1 blog-bottom-content rounded-md mt-3 uppercase w-full">{hotel?.news_title}</button>
                                                    <button className="bg-[#846316] text-white px-3 py-1 blog-bottom-content hotelcountry rounded-md mt-3 uppercase w-full">{hotel?.country?.country}</button>
                                                    <p className="mb-2 text-black text-[15px] mt-2">{hotel?.createdAt ?? "15 May 2020 9:00 am"}</p>
                                                    <p className="my-2 text-[14px] flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path></svg>10 min read</p>
                                                    <button className="text-slate-50">READ MORE</button>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <div
                                    className="fixed transform -translate-y-1/2 rotate-90"
                                    style={{ top: "12rem", right: "-10rem" }}
                                >
                                    <button
                                        className={`${isLatestNewsSelect ? "bg-red-600 text-white":"bg-black text-white"} px-4 py-2 border`}
                                        onClick={() => {
                                            setIsLatestNewsSelect(true), setIsTravelNewsSelect(false);
                                        }}
                                    >
                                        Latest News
                                    </button>
                                    <button
                                        className={`${isTravelNewsSelect ? "bg-red-600 text-white":"bg-black text-white"} px-4 py-2 border`}
                                        onClick={() => {
                                            setIsLatestNewsSelect(false), setIsTravelNewsSelect(true);
                                        }}
                                    >
                                        Travel News
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            {isTravelNewsSelect && <TravelNews></TravelNews>}
        </>
    );
};

export default LatestNews;
