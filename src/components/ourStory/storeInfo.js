import React from 'react'
import HeadingWithoutSwiper from '../headingWithoutSwiper'

const StoreInfo = () => {
    return (
        <>
            <HeadingWithoutSwiper name={"Our story"} />
            <section className="our-story py-14 " style={{ backgroundImage: `url("/new/assets/img/2.png")`,backgroundSize: 'cover' }}>
                <div className="px-5 text-white flex justify-center mx-auto max-w-7xl">
                    <div className="col-md-7">
                        <div className='store-left-content'>
                            <img src="/new/assets/img/logo.svg" className="w-1/2 mb-6" alt="" />
                            <p className="store-text ">
                                Unlock global exposure for your luxury hotel on our online platform.
                                Targeted marketing, stunning visuals, and seamless booking ensure your
                                property stands out.
                                Elevate brand prestige, offer personalized service, and access valuable
                                analytics for strategic decisions. Reach discerning travelers worldwide
                                and maximize bookings&nbsp;effortlessly.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-5">
                    <div className='store-right-content'>
                        <div className="mb-3">
                            <h1 className="text-[28px] text-white mb-1">259</h1>
                            <p className="text-[20px] text-white mb-1">ISSUE</p>
                        </div>
                        <div className="mb-3">
                            <h1 className="text-[28px] text-white mb-1">100,000</h1>
                            <p className="text-[20px] text-white mb-1">Readers Per Issue</p>
                        </div>
                        <div className="mb-3">
                            <h1 className="text-[28px] text-white mb-1">163,000</h1>
                            <p className="text-[20px] text-white mb-1">Social followers</p>
                        </div>
                        <div>
                            <h1 className="text-[28px] text-white mb-1">1500,000</h1>
                            <p className="text-[20px] text-white mb-1">Page views per month</p>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default StoreInfo