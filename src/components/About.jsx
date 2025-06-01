"use client"

import React, { useEffect } from 'react'
import HeroBanner from './home/HeroSection'
import TravelNews from './home/Travel-News'
import NominateForm from './nominateForm'
import LuxuryAward from './home/LuxuryAward'
import LuxGateWeek from './home/LuxGateWeek'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFlip, Autoplay } from "swiper/modules";

// import StoreInfo from '@component/components/ourStory/storeInfo'
// import StoreInfo2 from '@component/components/ourStory/storeInfo2'



import HearderNameIcon from './hearderNameIcon'
import StoreInfo from './ourStory/storeInfo'
import StoreInfo2 from './ourStory/storeInfo2'
import AvailableOn from './availableOn'


import { useDispatch, useSelector } from 'react-redux'
import { BASEURL } from '@component/apiendpoints/api'
import LatestNews from './home/LatestNews'
import Link from 'next/link'
import ContantUsSection from './commonPage/ContantUsSection'
import { getBestLuxuryHotelOfYear, getExclusiveOffers, getLatestNews, getTravelNews } from '@component/lib/slice/sitesSetting'
import VideoContainer from './home/VideoContainer'
import ExclusiveDeal from './home/ExclusiveDeal'



function About() {
   const dispatch = useDispatch()

   useEffect(()=>{
    dispatch(getLatestNews())
    dispatch(getBestLuxuryHotelOfYear())
    dispatch(getExclusiveOffers())
    dispatch(getTravelNews())
   },[])
    const { exclusiveOffers } = useSelector((state) => state.siteSetting);

    const filterExlusiveOffers = exclusiveOffers?.hotel_offer?.filter((item) => item.show_on_home === true)
  return (
    <>
     <VideoContainer />
          <StoreInfo />
          <AvailableOn />
          <StoreInfo2 />
          {/* <div className='container'>
            <h1 className="text-sm sm:text-xl md:text-sm lg:text-xl ml-2 md:ml-0 my-5 uppercase border-l-4 pl-3 border-[#846316] text-[#846316]">Travel News</h1> */}
            <TravelNews />
          {/* </div> */}
         
            <LuxGateWeek />
            <div style={{  backgroundImage: 'url("/new/assets/img/new1.jpg")',
            backgroundSize: 'cover'}}>
          <LuxuryAward />
          </div>
          <HearderNameIcon name={"Nominate Hotel"} />
          <NominateForm />

          <section className="ExclusiveDeal ExclusiveDealSec" style={{marginTop:"40px",marginBottom:"40px"}}>
          <div  style={{backgroundImage:`url("/new/assets/img/2.png")`,backgroundSize: 'cover'}}>
             
                    <HearderNameIcon name={"what we can do for you"} />
                
                {/* <div data-aos="zoom-in" className="container">
                    <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-4 gap-4 " style={{marginTop:"40px",marginBottom:"40px"}}>

                        {filterExlusiveOffers?.map((hotel) => {
                            return (
                                <div className="card w-40">
                                    <div className="card__content  relative  transition-transform duration-1000  font-bold">
                                        <div className="card__front absolute top-0 bottom-0 right-0 left-0 bg-[#C1121F]">
                                            <img style={{ maxHeight: "350px", height: "350px" }} src={`${BASEURL}/${hotel?.offer_image}`} />
                                            <span className="exclu_deal_name">The ux</span>
                                        </div>
                                        <div className="card__back absolute top-0 bottom-0 right-0 left-0 p-8 bg-[#9e7922]">
                                            <span className='offer-time'>
                                                Valid From: {hotel?.offer_from} </span>
                                            <span className='offer-time'>    Valid TO: {hotel?.offer_to} </span>
                                            <span className='offer-heading'>  {hotel?.offer_name} </span>

                                            <div className='text-center mt-4'>
                                                <Link href={`/hotels/${hotel?.hotel?.slug}`} className='theme-btn'> CLAIM  </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                       

                        <div className="card w-40 " data-aos="fade-right" >
                            <div className='' style={{
                            backgroundImage: 'url("/new/assets/img/nominate-hotel-bg.png")',
                            backgroundSize: "cover",
                            backgroundPosition: "center center",
                            border: "2px solid #b79d13",
                            borderRadius: "6px",
                          
                            height: "100%"
                        }}>
                                <div className="section-comman-text">
                                    <h3 className="text-xl" style={{ textAlign: "center" }}>
                                        Exclusive Deals
                                    </h3>
                                    <p className="comman-info" style={{ textAlign: "center" }}>
                                        Catch up on the most recent updates and breaking stories from around the world. Stay informed, stay ahead!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="container">
                    <div className="row">
                        <div className="col-md-9" style={{ paddingTop: '42px', paddingBottom: "42px" }} data-aos="fade-left">

                            <Swiper className='newly-listedSwiper'
                                spaceBetween={-2}
                                autoplay={{
                                  delay: 2000, // ✅ Auto-scroll every 2 seconds
                                  disableOnInteraction: false, // ✅ Keeps autoplay running even after user interaction
                                }}
                                loop={true} 
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
                                modules={[Navigation, Pagination, EffectFlip, Autoplay]}
                            >
                                {
                                    filterExlusiveOffers?.length > 0 ?
                                        filterExlusiveOffers?.map((hotel, index) => (
                                            <SwiperSlide key={index}>
                                                <div className="card" style={{ borderRadius: "20px",width:"19rem"}}>
                                                    <div className="card__content  relative  transition-transform duration-1000  font-bold">
                                                        <div className="card__front absolute top-0 bottom-0 right-0 left-0 bg-[#C1121F]">
                                                            <img style={{ maxHeight: "350px", height: "350px" }} src={`${BASEURL}/${hotel?.offer_image}`} />
                                                            <span className="exclu_deal_name">{hotel?.hotel?.hotel_name ? hotel?.hotel?.hotel_name : hotel?.offer_name}</span>
                                                        </div>
                                                        <div className="card__back absolute top-0 bottom-0 right-0 left-0 p-8 bg-[#9e7922]">
                                                            <span className='offer-time'>
                                                                Valid From: {hotel?.offer_from} </span>
                                                            <span className='offer-time'>    Valid TO: {hotel?.offer_to} </span>
                                                            <span className='offer-heading'>  {hotel?.offer_name} </span>

                                                            <div className='text-center mt-4'>
                                                                <button onClick={() => window.location.href = hotel?.offer_url} className="theme-btn">
                                                                    CLAIM
                                                                </button>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </SwiperSlide>

                                        )) : (
                                            <>
                                                <p>No Awarded Hotel</p>
                                            </>
                                        )}

                            </Swiper>

                        </div>

                        <div className="col-md-3" data-aos="fade-right" style={{ marginLeft: "-29px" }}>
                            <div className="same-cards-best-luxury" style={{width: "19rem"}}>
                                <div
                                    className=""
                                    style={{
                                        backgroundImage:
                                            'url("/new/assets/img/nominate-hotel-bg.png")',
                                        backgroundSize: "cover",
                                        backgroundPosition: "center center",
                                        border: "2px solid #b79d13",
                                        borderRadius: "12px",
                                        height: "131%",
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
                                            award-winning hotel, celebrated for its unmatched luxury
                                            and world-class amenities. Indulge in the best!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
          </div>
            </section>
           
           

            <ContantUsSection />
            
 



    </>
  )
}

export default About