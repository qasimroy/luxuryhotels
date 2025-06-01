import React from 'react'

function HearderNameSection({name}) {
  return (
    <div className="section-head">
    <div className="container">
      <div className="sectionInnerHead">
        <h2 className="section-heading">{name}</h2>
        <div className="section-control">
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default HearderNameSection;