import React from 'react'
import HeadingWithoutSwiper from './headingWithoutSwiper'

const AvailableOn = () => {
    return (
        <>
            <HeadingWithoutSwiper name={"available On"} />
            <div className="available-on" style={{ backgroundImage: `url("/new/assets/img/2.png")`,backgroundSize: 'cover'}}>
                <div className='container'>
                    <div className="available-info">
                        <div className="available-in grayBox">
                            <h3 className="text-white uppercase text-xl text-center mb-4">
                                AVAILABLE ON
                            </h3>
                            <div className="grid grid-cols-5 py-5 available-names">
                                <div className="text-white mx-auto">
                                    <h1 className="text-xl uppercase text-white">Name</h1>
                                </div>
                                <div className="text-white mx-auto">
                                    <h1 className="text-xl uppercase text-white">Name</h1>
                                </div>
                                <div className="text-white mx-auto">
                                    <h1 className="text-xl uppercase text-white">Name</h1>
                                </div>
                                <div className="text-white mx-auto">
                                    <h1 className="text-xl uppercase text-white">Name</h1>
                                </div>
                                <div className="text-white mx-auto">
                                    <h1 className="text-xl uppercase text-white">Name &amp; Name</h1>
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-14">
                            <button className="theme-btn">
                                Request a digital sample
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AvailableOn