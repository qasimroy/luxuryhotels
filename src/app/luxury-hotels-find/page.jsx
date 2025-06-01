import FIndHotels from '@component/components/FIndHotels'
import VideoContainer from '@component/components/home/VideoContainer'
import React from 'react'

function page() {
  return (
    <>
      <section data-aos="zoom-in" className="hero-banner">
        <VideoContainer />
    </section>

        <FIndHotels />
    
    </>
  )
}

export default page