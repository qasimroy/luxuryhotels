import React from 'react'
import HeadingWithoutSwiper from './headingWithoutSwiper'
import VideoContainer from './home/VideoContainer'

function FrenchiseResalse() {
    return (
        <>
            <VideoContainer />
            <HeadingWithoutSwiper name={"Franchise areas available"} />
            <section className=" ExclusiveDeal ExclusiveDealSec">
                <div data-aos="zoom-in" className="container">
                    <div className="grid my-[40px] grid-cols-2 md:grid-cols-6 lg:grid-cols-4 gap-4 py-4">
                        <div className="card w-40">
                            <div className="card__content  relative  transition-transform duration-1000  font-bold">
                                <div className="card__front absolute top-0 bottom-0 right-0 left-0 bg-[#C1121F]">

                                    <img src="./assets/img/raffles-udaipur.png" class="img-fluid" alt="Luxury Hotel" />
                                    <span className="exclu_deal_name">Havvels</span>

                                    <div className="card__back absolute top-0 bottom-0 right-0 left-0 p-8 bg-[#9e7922]">
                                        <h5 class="text-center fw-bold text-uppercase">Luxury Hotels Dubai & Abu Dhabi</h5>
                                        <ul class="list-unstyled small px-3">
                                            <li>Luxury Hotels Logo Rights.</li>
                                            <li>Luxury Hotel Social Networks related to your area.</li>
                                            <li>Luxury Hotel Support from Main Office.</li>
                                            <li>Cliché Copies of Previous Editions.</li>
                                            <li>Optimized Luxury Hotels Website to cover your area.</li>
                                            <li>500 Extensive Hotel Database to collaborate with.</li>
                                        </ul>
                                        <h5 class="text-center fw-bold text-uppercase">
                                            Price: $99.00 <span class="text-decoration-line-through text-muted">$23.00</span>
                                        </h5>
                                        <a href="/assets/Luxury_Hotel-DviCn9rd.pdf" class="btn btn-outline-warning btn-sm text-uppercase">Download Franchise Media Kit</a>
                                        <button class="btn btn-danger btn-sm text-uppercase mt-2">Register Your Interest</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="card w-40">
                            <div className="card__content  relative  transition-transform duration-1000  font-bold">
                                <div className="card__front absolute top-0 bottom-0 right-0 left-0 bg-[#C1121F]">

                                    <img src="./assets/img/raffles-udaipur.png" class="img-fluid" alt="Luxury Hotel" />
                                    <span className="exclu_deal_name">Havvels</span>

                                    <div className="card__back absolute top-0 bottom-0 right-0 left-0 p-8 bg-[#9e7922]">
                                        <h5 class="text-center fw-bold text-uppercase offer-time">Luxury Hotels Dubai & Abu Dhabi</h5>
                                        <ul class="list-unstyled small px-3">
                                            <li>Luxury Hotels Logo Rights.</li>
                                            <li>Luxury Hotel Social Networks related to your area.</li>
                                            <li>Luxury Hotel Support from Main Office.</li>
                                            <li>Cliché Copies of Previous Editions.</li>
                                            <li>Optimized Luxury Hotels Website to cover your area.</li>
                                            <li>500 Extensive Hotel Database to collaborate with.</li>
                                        </ul>
                                        <h5 class="text-center fw-bold text-uppercase">
                                            Price: $99.00 <span class="text-decoration-line-through text-muted">$23.00</span>
                                        </h5>
                                        <a class="btn btn-outline-warning btn-sm text-uppercase">Download Franchise Media Kit</a>
                                        <button class="btn btn-danger btn-sm text-uppercase mt-2">Register Your Interest</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default FrenchiseResalse