"use client";
import { BASEURL } from "@component/apiendpoints/api";
import moment from "moment";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import HearderNameSection from "../hearderNameSection";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFlip, Autoplay } from "swiper/modules";

const ExclusiveDeal = () => {
  const { exclusiveOffers } = useSelector((state) => state.siteSetting);

  const filterExlusiveOffers = exclusiveOffers?.hotel_offer?.filter(
    (item) => item.show_on_home === true
  );
  console.log("getExclusiveOffers", filterExlusiveOffers);
  return (
    <>
      <section
        className="ExclusiveDeal ExclusiveDealSec"
        style={{
          backgroundImage: 'url("/new/assets/img/new1.jpg")',
          backgroundSize: "cover",
        }}
      >
        <HearderNameSection name={"Exclusive Deal"} />
        <div className="container">
          <div className="row">
            <div
              className="col-md-9"
              style={{ paddingTop: "42px", paddingBottom: "42px" }}
              data-aos="fade-left"
            >
              <Swiper
                className="newly-listedSwiper"
                spaceBetween={0}
                autoplay={{
                  delay: 2000, // ✅ Auto-scroll every 2 seconds
                  disableOnInteraction: false, // ✅ Keeps autoplay running even after user interaction
                }}
                loop={true}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                // loop={true}
                slidesPerView={3} // Adjust the number of slides visible at once
                // breakpoints={{
                //   768: {
                //     slidesPerView: 2, // 2 slides on medium screens
                //   },
                //   480: {
                //     slidesPerView: 1, // 1 slide on small screens
                //   },
                // }}
                modules={[Navigation, Pagination, EffectFlip, Autoplay]}
              >
                {filterExlusiveOffers?.length > 0 ? (
                  filterExlusiveOffers?.map((hotel, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className="card"
                        style={{
                          borderRadius: "20px",
                          width: "16rem",
                          height: "26rem",
                        }}
                      >
                        <div className="card__content  relative  transition-transform duration-1000  font-bold">
                          <div className="card__front absolute top-0 bottom-0 right-0 left-0 bg-[#C1121F]">
                            <img
                              style={{ maxHeight: "350px", height: "350px" }}
                              src={`${BASEURL}/${hotel?.offer_image}`}
                            />
                            <span className="exclu_deal_name">
                              {hotel?.hotel?.hotel_name
                                ? hotel?.hotel?.hotel_name
                                : hotel?.offer_name}
                            </span>
                          </div>
                          <div className="card__back absolute top-0 bottom-0 right-0 left-0 p-8 bg-[#9e7922]">
                            <span className="offer-time">
                              Valid From: {hotel?.offer_from}{" "}
                            </span>
                            <span className="offer-time">
                              {" "}
                              Valid TO: {hotel?.offer_to}{" "}
                            </span>
                            <span className="offer-heading">
                              {" "}
                              {hotel?.offer_name}{" "}
                            </span>

                            <div className="text-center mt-4">
                              <button
                                onClick={() =>
                                  (window.location.href = hotel?.offer_url)
                                }
                                className="theme-btn"
                              >
                                CLAIM
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))
                ) : (
                  <>
                    <p>No Awarded Hotel</p>
                  </>
                )}
              </Swiper>
            </div>

            <div
              className="col-md-3"
              data-aos="fade-right"
              style={{ marginLeft: "-29px" }}
            >
              <div
                className="same-cards-best-luxury"
                style={{ width: "17rem", marginLeft: "8px" }}
              >
                <div
                  className=""
                  style={{
                    backgroundImage:
                      'url("/new/assets/img/nominate-hotel-bg.png")',
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    border: "2px solid #b79d13",
                    borderRadius: "12px",
                    height: "26rem",
                  }}
                >
                  <div className="section-comman-text">
                    <h3
                      className="comman-text-heading"
                      style={{ textAlign: "center" }}
                    >
                      TOP LUXURY HOTEL OF THE YEAR
                    </h3>
                    <p className="comman-info" style={{ textAlign: "center" }}>
                      Experience the pinnacle of elegance and comfort at this
                      award-winning hotel, celebrated for its unmatched luxury
                      and world-class amenities. Indulge in the best!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ExclusiveDeal;
