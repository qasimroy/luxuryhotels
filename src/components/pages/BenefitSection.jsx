"use client"
import React, { useCallback } from 'react';
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";


const AnimatedNumber = React.memo(({ endValue }) => {
    const { ref, inView } = useInView({
        triggerOnce: false, // Run animation every time it enters view
        threshold: 0.5, // Animation starts when 50% of the element is visible
    });

    const renderCountUp = useCallback(() => {
        return <CountUp start={0} end={endValue} duration={3} separator="," />;
    }, [endValue]);

    return (
        <div ref={ref} className="text-4xl font-bold">
            {inView ? renderCountUp() : "0"}+
        </div>
    );
});

const BenefitsSection = () => {
    const { ref, inView } = useInView({
        triggerOnce: false, // Animation happens every time it comes into view
        threshold: 0.5, // Trigger animation when 50% of the element is visible
    });
    return (
        <section className="py-5">
           
            <h1 className="text-xl text-center uppercase my-2">
                Discover Unrivaled Advantage: Transform Your Experience by Partnering with Us
            </h1>
            <div id="winter-wrap">
                <img src="/new/assets/img/img1.jpg" alt="collaborative advantages" className="w-full h-[440px]" />
                <div className="bg-[#C1121F] text-white px-4" ref={ref}>
                    <div className="grid gird-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 max-w-7xl mx-auto py-8 gap-3">
                        <div>
                            <div className="text-4xl font-bold"></div>
                            <h5 className="text-4xl uppercase font-bold mb-3 counter display-4" id="count1">
                            {/* <AnimatedNumber endValue={570000} /> */}
                            </h5>
                            <p className='text-white text-capitalize'>Explore over 570,000 luxury hotel listings worldwide, with 50 new additions everyday</p>
                        </div>
                        <div>
                            <div className="flex items-center">
                            {/* <AnimatedNumber endValue={89} /> */}
                            </div>
                            <p className='text-white'>Return on investment We’ve helped build over 400 projects and have worked with some amazing companies.</p>
                        </div>
                        <div>
                        {/* <AnimatedNumber endValue={13000000} /> */}
                            <p className='text-white text-capitalize'>Return on investment We’ve helped build over 400 projects and have worked with some amazing companies.</p>
                        </div>
                        <div>
                        {/* <AnimatedNumber endValue={1000000} /> */}
                            <p className='text-white text-capitalize'>We’ve helped build over 400 projects and have worked with some amazing companies.</p>
                        </div>
                    </div>
                </div>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mx-auto max-w-7xl">
                    {[
    "Each edition rotation program",
    "Zero Commission Charges",
    "Effortless Booking",
    "Global Reach",
    "Extensive Digital Presence",
    "Social Media Engagement"
].map((title, index) => (
                        <div key={index} className="text-center mx-auto p-3 collaborativeService-card">
                            {/* <img src="https://backend.luxuryhotelsplatform.com/undefined" className="mx-auto" alt="" /> */}
                            <h1 className="text-xl uppercase my-4 text-golden">{title}</h1>
                            <p className='text-capitalize'>We’ve helped build over 400 projects and have worked with some amazing companies.</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BenefitsSection;
