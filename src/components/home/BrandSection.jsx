import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-flip";

import dynamic from "next/dynamic";

// const Swiper = dynamic(() => import('swiper/react').then(mod => mod.Swiper), { ssr: false });
// const SwiperSlide = dynamic(() => import('swiper/react').then(mod => mod.SwiperSlide), { ssr: false });

const BrandSection = () => {
  const brandImg = [
    { img: "/new/assets/img/vir.png", name: "Hotel Vir" },
    { img: "/new/assets/img/vom.png", name: "Hotel Vom" },
    { img: "/new/assets/img/w-ho.png", name: "Hotel W-Ho" },
    { img: "/new/assets/img/w.png", name: "Hotel W" },
    { img: "/new/assets/img/wst.png", name: "Hotel WST" },
    { img: "/new/assets/img/sofi.png", name: "Hotel Sofi" },
    { img: "/new/assets/img/sonn.png", name: "Hotel Sonn" },
    {
      img: "/new/assets/img/the-luxury-collection.png",
      name: "The Luxury Collection",
    },
    { img: "/new/assets/img/the-ritz--car.png", name: "The Ritz-Carlton" },
  ];

  return (
    <section className="newly-listed">
      {/* <div className="section-head">
                <div className="container">
                    <div className="sectionInnerHead">
                        <h2 className="section-heading">NEWLY LISTED HOTELS</h2>
                        <div className="section-control">
                            <div className="swiper-button-next"></div>
                            <div className="swiper-button-prev"></div>
                        </div>
                    </div>
                </div>
            </div> */}

      <div data-aos="fade-left" className="container">
        <h1 className="text-sm sm:text-xl md:text-sm lg:text-xl ml-2 md:ml-0 my-5 uppercase border-l-4 pl-5 border-[#846316] text-[#846316]">
          WHO WE ARE WORKING WITH
        </h1>

        {/* <div className="pl-44">

                <h1 className="text-sm sm:text-xl md:text-sm lg:text-xl ml-2 md:ml-0 my-5 uppercase border-l-4 pl-5 border-[#846316] text-[#846316]">WHO WE ARE WORKING WITH</h1>
            </div> */}

        <div data-aos="fade-left" className="container">
          <Swiper
            className="newly-listedSwiper p-0"
            spaceBetween={24}
            loop={true}
            slidesPerView={5}
            modules={[EffectFade, Autoplay]}
            autoplay={{
              delay: 3000, // Time in milliseconds between automatic swipes
              disableOnInteraction: false, // Continue autoplay after user interaction
            }}
          >
            {brandImg.map((hotel, index) => (
              <SwiperSlide className="p-0" key={index}>
                {/* <div className="brand-cards">
                                <div className="brand-img"> */}
                <div
                  className="mx-auto brand-logos"
                  tabIndex="-1"
                  style={{ width: " 100%", display: "inline-block" }}
                >
                  <img
                    className="partners-logo p-3 "
                    src={hotel.img}
                    alt={hotel.name}
                  />
                </div>
                {/* </div>
                            </div> */}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default BrandSection;
