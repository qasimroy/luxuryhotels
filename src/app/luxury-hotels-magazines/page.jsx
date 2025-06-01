import Magazines from '@component/components/cards/Magazines'
import HeadingWithoutSwiper from '@component/components/headingWithoutSwiper'
import VideoContainer from '@component/components/home/VideoContainer'
import React from 'react'

const page = () => {
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
                            paddingTop: "100px",
                            paddingBottom: "180px",
                            backgroundRepeat: "no-repeat",
                            top: "520px",
                            left: "90px",
                          }}
                          className="container absolute"
                          ><div
                          className="text-center p-6 bg-opacity-50 rounded-lg comman-info"
                          style={{ width: "60%", margin: "0 auto", padding: "0 60" }}
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
                <div style={{ top: "700px", paddingTop: "20px", marginTop: "20px" }}>
                <HeadingWithoutSwiper name={"Luxury hotels Magazines"} />
                </div>
                <div className='container whater-effect'
                    style={{
                        // top: "700px",
                        paddingTop: "20px",
                    }}
                >
                    <Magazines />
                </div>
            </section>
        </>
    )
}

export default page