import React, { useEffect } from 'react'
import HeroBanner from './HeroSection'
import FilterSection from './FilterSection'
import NewlyListedHotels from '../NewHotelList'
// import BrandSection from './brandSection'
import NewsletterSection from './NewsletterSection'
import ExclusiveDeal from './ExclusiveDeal'

import BrandSection from './BrandSection'

import VideoContainer from './VideoContainer'
import Fourthcoming from './Fourthcoming'
// import TravelNews from './Travel-News'
import LatestNews from './LatestNews'
import LuxuryAward from './LuxuryAward'
import { useDispatch, useSelector } from 'react-redux'
import { get_addons_home_Data, getAllHotels, getBestLuxuryHotelOfYear, getCountryVideos, getExclusiveOffers, getHomeData, getLatestNews, getNewlyListedHotel, getPartners, getTravelNews, getUpcomingMagazine, search_hotel, siteContentActions } from '@component/lib/slice/sitesSetting'
import TravelNews from './Travel-News'
import LuxGateWeek from './LuxGateWeek'
import Footer from '../footer'



const HomeRender = () => {
  const dispatch=useDispatch()

useEffect(()=>{
dispatch(get_addons_home_Data())
dispatch(search_hotel())
dispatch(getNewlyListedHotel())
dispatch(getCountryVideos())
dispatch(getPartners())
dispatch(getAllHotels())
dispatch(getBestLuxuryHotelOfYear())
dispatch(getUpcomingMagazine())
dispatch(getLatestNews())
dispatch(getExclusiveOffers())
dispatch(getTravelNews())
dispatch(getHomeData())
},[])
  return (
    <>
    <div className='mt-3' style={{
      backgroundImage: 'url("/new/assets/img/nominate-hotel-bg.png")',
      backgroundSize: 'cover',
      // backgroundPosition: 'center center'
    }}>
    <HeroBanner/>
    <div style={{paddingTop:"75px", width :"70%", textAlign:"center", margin:"0 auto"}}>
    <FilterSection/>
    </div>
    <div style={{
      backgroundImage: 'url("/new/assets/img/2.png")',
      backgroundSize: 'cover',
      // backgroundPosition: 'center center'
    }}>
    <NewlyListedHotels/>
    </div>
    <LuxGateWeek />
    <BrandSection/>  
    <div style={{  backgroundImage: 'url("/new/assets/img/new1.jpg")',
            backgroundSize: 'cover'}}>
    <LuxuryAward />
      </div>   
    <Fourthcoming />
    
    <TravelNews />
   <div className="container my-[2.362rem]">
          <h1 className="text-sm sm:text-xl md:text-sm lg:text-xl md:ml-0 ml-10 uppercase border-l-4 pl-3 border-[#846316] text-[#846316]" style={{marginTop:"20px"}}>
            Explore Luxury Destinations
          </h1>
        </div>
    <VideoContainer/>  
     {/* <LatestNews /> */}
    <ExclusiveDeal/>
    <NewsletterSection/>
    </div>
    </>
  )
}

export default HomeRender