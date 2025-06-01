"use client"
import HeadingWithoutSwiper from '@component/components/headingWithoutSwiper'
import React from 'react'

import TravelNewsPage from '@component/components/TravelNewsPage';
import VideoContainer from '@component/components/home/VideoContainer';

function page() {
    
  return (
    <>
    <section data-aos="zoom-in" className='Magazines-section '>
    <VideoContainer />
                    <div
                              style={{
                                backgroundImage: 'url("/new/assets/img/transparent-bg.png")',
                                backgroundSize: "contain",
                                backgroundPosition: "center center",
                                // backgroundColor: "#000000",
                                paddingTop: "50px",
                                paddingBottom: "100px",
                                backgroundRepeat: "no-repeat",
                                top: "450px",
                                left: "90px",
                              }}
                              className="container absolute"
                              ><div
                              className="text-center p-6 bg-opacity-50 rounded-lg comman-info"
                              style={{ width: "50%", margin: "0 auto", padding: "0 60" }}
                            >
                              {/* <h2 className="text-2xl font-bold">Overlay Title</h2> */}
                              <p className="text-sm text-black text-capitalize">
                                Luxury Hotels, a renowned global brand founded in England 17 years
                                ago, is currently present in 89 countries. We provide Luxury
                                Hotels for affluent travelers through our online platform and in
                                print and digital formats. Each edition is accessible for free
                                download on 5 different platforms and attracts 4-5 million online
                                readers annually.
                              </p>
                              <p className="text-sm text-black text-capitalize">
                                Through our Printed Edition Rotation Program, your hotel will be
                                featured as one of the top Luxury Hotels and will ensure a
                                continuous influx of bookings and a consistent occupancy rate of
                                800,000 to 1 million tourists throughout the year, all without any
                                commission fees.
                              </p>
                            </div></div>
                    <div style={{ top: "800px", paddingTop: "20px", marginTop: "20px" }}>
                    <HeadingWithoutSwiper name={"TRAVEL NEWS"} />
                    </div>
                    <div className='container whater-effect'>
                  <TravelNewsPage />
                  </div>
                </section>
    </>
  )
}

export default page