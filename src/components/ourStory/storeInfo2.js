import React from 'react'
import HeadingWithoutSwiper from '../headingWithoutSwiper'

const StoreInfo2 = () => {
    return (
        <>
            <HeadingWithoutSwiper name={"Our story"} />
            <section className="our-story our-story2  py-14 " style={{ backgroundImage: `url("/new/assets/img/2.png")`,backgroundSize: 'cover' }}>
                <div className=" text-white flex justify-center mx-auto max-w-7xl">
                    <div className="col-md-12">
                        <div className='store-left-content'>
                            <img src="/new/assets/img/logo.svg" className="mb-6" alt="" />
                            <p className="store-text">
                                Take our audience of super-travellers on a journey that is fully iromersiveland can capture their imagination like never before...
                            </p>
                            <p className="store-text">
                                Wanderlust is the first travel media brand globally to offer the epitome of the digital travel experience
                                - Wanderlust MetaTravel Experiences.
                            </p>
                            <p className="store-text">
                                Transport our highly engaged audience of curious travellers to multiple destinations - a local coffee shop, a fascinating museum, a glorious park, a curious wildlife encounter, or a bustling town square
                                - whatever your brief, Wanderlust will deliver an enthralling experience to the user.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default StoreInfo2