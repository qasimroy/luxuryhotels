'use client'
import React, { useEffect } from 'react'
import HeroBanner from './home/HeroSection'
import BrandSection from './home/BrandSection'
import StoreInfo2 from './ourStory/storeInfo2'
import TravelNews from './home/Travel-News'
import LuxGateWeek from './home/LuxGateWeek'
import HearderNameIcon from './hearderNameIcon';
import LuxuryAward from './home/LuxuryAward'
import NominateForm from './nominateForm'
import LatestNews from './home/LatestNews'
import { useDispatch, useSelector } from 'react-redux'
import { BASEURL } from '@component/apiendpoints/api'
import ContantUsSection from './commonPage/ContantUsSection'
import Link from 'next/link'
import { getBestLuxuryHotelOfYear, getExclusiveOffers, getLatestNews, getTravelNews } from '@component/lib/slice/sitesSetting'
import VideoContainer from './home/VideoContainer'

const advertiseUs = () => {
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
            <BrandSection />
            <StoreInfo2 />
            {/* <HeadingWithoutSwiper name={"TRAVEL NEWS"} /> */}
            <TravelNews />
            <HearderNameIcon name={"NEW LUXE GETAWAYS EVERY WEEK"} />
          
                <LuxGateWeek />
            
            <div style={{  backgroundImage: 'url("/new/assets/img/new1.jpg")',
            backgroundSize: 'cover'}}>
            <LuxuryAward />
            </div>
            <HearderNameIcon name={"Nominate Hotel"} />
            <NominateForm />
            <LatestNews />
            <section className="ExclusiveDeal ExclusiveDealSec" style={{  backgroundImage: 'url("/new/assets/img/new1.jpg")',
                backgroundSize: 'cover'}}>

                <HearderNameIcon name={"what we can do for you"} />

                <div data-aos="zoom-in" className="container">
                    <div className="grid my-[40px] grid-cols-2 md:grid-cols-6 lg:grid-cols-4 gap-4 ">

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
                                borderRadius: "31px",
                                marginTop: "2px",
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
                </div>
            </section>

            <ContantUsSection />

        </>
    )
}

export default advertiseUs