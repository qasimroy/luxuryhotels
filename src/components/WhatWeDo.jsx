"use client"
import React, { useState } from 'react'
import HeadingWithoutSwiper from './headingWithoutSwiper'
import AvailableOn from './availableOn'
import WhatWeDoCommon from './WhatWeDoCommon'
import LuxGateWeek from './home/LuxGateWeek'
import { useForm } from 'react-hook-form'
import BrandSection from './home/BrandSection'
import AdvertiseTestonimail from './commonPage/AdvertiseTestonimail'
import ContantUsSection from './commonPage/ContantUsSection'
import LuxuryAward from './home/LuxuryAward'
import VideoContainer from './home/VideoContainer'

function WhatWeDo() {
     const [isVisitHotel, setIsVisitHotel] = useState(false);
    const {
       register,
       handleSubmit,
       formState: { errors },
       reset,
     } = useForm();
    const onSubmitHotel=(data)=>{
        console.log(data)
    }
  return (
    <>
    <VideoContainer />
    <HeadingWithoutSwiper name={"Digital Campaign options"} />
    <WhatWeDoCommon />
    <AvailableOn />
    <HeadingWithoutSwiper name={"Print campaign options"} />
    <WhatWeDoCommon />
    
     
        <LuxGateWeek />
      
      <HeadingWithoutSwiper name={"Tailor-Made Campaign"} />
      <WhatWeDoCommon />
      <HeadingWithoutSwiper name={"Request a team visit"} />
      
      <div 
      className='dashboard-section section_wrap'
      style={{
                backgroundImage: `url('/new/assets/img/nominate-hotel-bg.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: "14px 63px"
            }}>
      <form onSubmit={handleSubmit(onSubmitHotel)} style={{paddingLeft:"54px",paddingRight:"54px"}}>
              <div className="row">
            <div className="col-md-12">
                <div className="form-group">
            
              <div>
                <label
                  htmlFor="name"
                  className="form-label pt-3"
                >
                  Your NAME
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  id="name"
                  className="form-control"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="form-label"
                >
                  EMAIL 
                </label>
                <input
                  {...register("email", { required: "Email is required" })}
                  type="email"
                  id="email"
                  className="form-control"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="hotelYouRepresent"
                  className="form-label"
                >
                  HOTEL YOU Are REPRESENTING
                </label>
                <input
                  {...register("hotelYouRepresent", {
                    required: "This field is required",
                  })}
                  type="text"
                  id="hotelYouRepresent"
                  className="form-control"
                />
                {errors.hotelYouRepresent && (
                  <span className="text-red-500 text-sm">
                    {errors.hotelYouRepresent.message}
                  </span>
                )}
              </div>

              

              <div>
                <p className="text-sm font-medium text-gray-700 mt-2">
                  WOULD YOU LIKE TO REQUEST A HOTEL VISIT?
                </p>
                <div className="flex items-center space-x-4 mt-1">
                  <label className="flex items-center space-x-1">
                    <input
                      {...register("reqVisit")}
                      type="radio"
                      value="true"
                      className="h-4 w-4"
                      onChange={() => setIsVisitHotel(true)}
                    />
                    <span>YES</span>
                  </label>
                  <label className="flex items-center space-x-1">
                    <input
                      {...register("reqVisit")}
                      type="radio"
                      value="false"
                      className="h-4 w-4"
                      onChange={() => setIsVisitHotel(false)}
                    />
                    <span>NO</span>
                  </label>
                  {isVisitHotel && (
                    <div className="row mt-3">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="validFrom" className="form-label">
                                    Valid From
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    {...register("validFrom", { required: "Valid From is required" })}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="validTo" className="form-label">
                                    Valid To
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    {...register("validTo", { required: "Valid To is required" })}
                                />
                            </div>
                        </div>
                    </div>
                )}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700">
                would you like to request a sample of our last magazine issue?
                </p>
                <div className="flex items-center space-x-4 mt-1">
                  <label className="flex items-center space-x-1">
                    <input
                      {...register("sampleMagazine")}
                      type="radio"
                      value="true"
                      className="h-4 w-4"
                    />
                    <span>YES</span>
                  </label>
                  <label className="flex items-center space-x-1">
                    <input
                      {...register("sampleMagazine")}
                      type="radio"
                      value="false"
                      className="h-4 w-4"
                    />
                    <span>NO</span>
                  </label>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">
                Select a campaign_option option you would like more information on
                </p>
                <div className="flex items-center space-x-4 mt-1">
                  <label className="flex items-center space-x-1">
                    <input
                      {...register("sampleMagazine")}
                      type="radio"
                      value="true"
                      className="h-4 w-4"
                    />
                    <span>Print</span>
                  </label>
                  <label className="flex items-center space-x-1">
                    <input
                      {...register("sampleMagazine")}
                      type="radio"
                      value="false"
                      className="h-4 w-4"
                    />
                    <span>Digital</span>
                  </label>
                  <label className="flex items-center space-x-1">
                    <input
                      {...register("sampleMagazine")}
                      type="radio"
                      value="false"
                      className="h-4 w-4"
                    />
                    <span>Socail Network</span>
                  </label>
                  <label className="flex items-center space-x-1">
                    <input
                      {...register("sampleMagazine")}
                      type="radio"
                      value="false"
                      className="h-4 w-4"
                    />
                    <span>Tailor- made</span>
                  </label>
                </div>
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Leave Message"
                  rows="4"
                  {...register("message")}
                  className="form-control mt-3"
                ></textarea>
             
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 my-3 rounded-md"
                >
                  SUBMIT
                </button>
             
              </div>

              </div>
              </div>
              </div>
            </form>
            </div>
            <BrandSection />
            <HeadingWithoutSwiper name={"Advertising testimonials"} />
            <AdvertiseTestonimail />
            <div style={{  backgroundImage: 'url("/new/assets/img/new1.jpg")',
            backgroundSize: 'cover'}}>
            <LuxuryAward />
            </div>
            <ContantUsSection />

    </>
  )
}

export default WhatWeDo