"use client"

import WinHolidayPage from '@component/components/commonPage/WinHolidayPage';
import HeadingWithoutSwiper from '@component/components/headingWithoutSwiper'
import VideoContainer from '@component/components/home/VideoContainer';
// import SwiperComponent from '@component/components/SwiperComponent'
import React from 'react'

function page() {
  console.log("hit");
  return (
    <>
     <section data-aos="zoom-in" className="hero-banner">
        <VideoContainer />
    </section>
    <div style={{marginTop:"250px"}}>
    <HeadingWithoutSwiper name={"Win a Holiday"}/>
    </div>
    <div className='container'>
    <WinHolidayPage />
    </div>
    </>
  )
}

export default page;