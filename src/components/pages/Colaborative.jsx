import React from 'react'
import VideoContainer from '../home/VideoContainer'
import HeadingWithoutSwiper from '../headingWithoutSwiper'
import WhatWeDoCommon from '../WhatWeDoCommon'
import AvailableOn from '../availableOn'
import BenefitsSection from './BenefitSection'
import ContantUsSection from '../commonPage/ContantUsSection'

function Colaborative() {
  return (
    <>
    <VideoContainer />
    <HeadingWithoutSwiper name={"Digital Campaign options"} />
    <WhatWeDoCommon />
    {/* <AvailableOn /> */}
    <HeadingWithoutSwiper name ={"Benefits of working with us"} />
    <BenefitsSection />
    <ContantUsSection />
    
    </>
  )
}

export default Colaborative