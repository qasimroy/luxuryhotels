
'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { apis, BASEURL } from '@component/apiendpoints/api';
import HearderNameIcon from '@component/components/hearderNameIcon'
import useRequest from '@component/hooks/UseRequest';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFlip, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";


function NewsPageSection({ news_id }) {
    const { request, response } = useRequest();
    const route = useRouter();
    const { request: requestNews, response: responseNews } = useRequest();
    const [offer_details, setOffer_details] = useState(null)
    const [newsData, setNewsData] = useState([])
    const [newsDataSimilar, setNewsDataSimilar] = useState([])
    const { request: requestExclusive_offer, response: responseExclusive_offer, clear: clearOffer } = useRequest(true);


    // const hotel_details = JSON.parse(localStorage.getItem("hotel_details") ?? "{}")

    const GetNews = async () => {
        await requestNews("POST", `${apis.GET_NEWS_PAGE_DEATILS}`, { news_id });
    }

    useEffect(() => {
        GetNews()
    }, [])

    useEffect(() => {
        if (responseNews) {
            setNewsData(responseNews?.content)
            setNewsDataSimilar(responseNews?.similarNews)
            if (!offer_details) {

                requestExclusive_offer("GET", `${apis.GET_EXCLUSIVEOFFERS_BY_HOTEL_ID}/${responseNews?.content?._id}`)

            }
        }

    }, [responseNews])



    useMemo(() => {

        if (responseExclusive_offer) {

            setOffer_details(responseExclusive_offer?.hotel_offer)
            clearOffer()
        }
    }, [responseExclusive_offer])

    console.log("offer_details", newsData);

    const handleRoute = (item) => {
        route.push(`/news/${item}`)
    }

    const getYouTubeEmbedURL = (url) => {
        if (!url) return "";

        // Improved regex to match different YouTube URL formats
        const videoIdMatch = url.match(
            /(?:youtube\.com\/(?:.*[?&]v=|embed\/|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/
        );

        console.log("url:", url, "videoIdMatch:", videoIdMatch);

        return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : "";
    };

    const videoUrl = getYouTubeEmbedURL(newsData?.youtube_video_url);

    return (
        <>
            <div style={{
                backgroundImage: 'url("/new/assets/img/nominate-hotel-bg.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center center'
            }} >
                <section className="singleNewsSection pb-8" >
                    {/* <div className="container"> */}
                        <div className="single-news overflow-hidden relative">
                            <img src={`${BASEURL}/${newsData?.thumbnail_path}`} alt="" className='img-fluid full-image' />
                            <div className="news-info p-4  absolute bottom-0 w-full text-white" style={{
                                backdropFilter: "blur(15px)",
                                backgroundColor: "rgba(255, 255, 255, 0.1)"
                            }}>
                                <h3 className="uppercase text-white text-lg font-bold">
                                    {newsData?.news_title}
                                </h3>
                            </div>
                        </div>
                    {/* </div> */}
                </section>
                <section className='nominate-hotel-section'>
                    <HearderNameIcon name={newsData?.business_name} />
                    <div className='py-12'>
                        <div className='container'>
                            {/* <div className='p-5 bg-white rounded-2xl lowercase' style={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}>
                                <p className="">
                                    {newsData?.news_description}
                                </p>
                            </div> */}
                            <div className='p-5 bg-white rounded-2xl lowercase' style={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}>
                                <p className="">
                                    {newsData?.news_description}
                                </p>
                            </div>
                            <div className='my-10'>
                                <div className='row'>
                                    <div className='col-md-9'>
                                        <iframe width="100%" height="100%" className="rounded-2xl" src={videoUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen=""></iframe>
                                        {/* <vedio src={newsData?.youtube_video_url}></vedio> */}
                                    </div>
                                    <div className='col-md-3'>
                                        <div className="text-center offerBlockRight min-h-[450px] space-y-3 p-3 special-card flex-1">
                                            {offer_details ? (
                                                <>
                                                    <h3 className="text-center text-xl text-golden mt-5">EXCLUSIVE OFFER</h3>
                                                    <svg
                                                        stroke="currentColor"
                                                        fill="currentColor"
                                                        strokeWidth={0}
                                                        viewBox="0 0 448 512"
                                                        className="rotate-90 text-xl text-center w-full"
                                                        height="1em"
                                                        width="1em"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM94 416c-7.033 0-13.057-4.873-14.616-11.627l-14.998-65a15 15 0 0 1 8.707-17.16l69.998-29.999a15 15 0 0 1 17.518 4.289l30.997 37.885c48.944-22.963 88.297-62.858 110.781-110.78l-37.886-30.997a15.001 15.001 0 0 1-4.289-17.518l30-69.998a15 15 0 0 1 17.16-8.707l65 14.998A14.997 14.997 0 0 1 384 126c0 160.292-129.945 290-290 290z" />
                                                    </svg>
                                                    {/* <p className="text-xl text-golden">+9180017233537</p> */}
                                                    <h4 className="uppercase md:text-xl">{offer_details?.offer_name}</h4>
                                                    <p className="uppercase py-3">
                                                        Valid from <span className="text-xl text-golden">{offer_details?.offer_from}</span> to <br />{" "}
                                                        <span className="text-xl text-golden">{offer_details?.offer_to}</span>
                                                    </p>
                                                    <button onClick={() => window.location.href = offer_details?.offer_url} className="theme-btn">
                                                        REDEEM
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <div className=" flex  min-h-96 justify-center">

                                                        <p className='my-auto'>No exclusive Offer </p>
                                                    </div>
                                                </>
                                            )}

                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className='p-5 bg-white rounded-2xl lowercase' style={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}>
                                <p className="">
                                    {newsData?.news_content}
                                </p>
                            </div> */}
                            <div className='content-rightBox white-bg mt-5'
                                style={{
                                    backgroundImage: 'url("/new/assets/img/nominate-hotel-bg.png")',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center center'
                                }}
                            >
                                <h1 className="text-xl font-bold mb-3 text-golden uppercase">
                                    Our Contact Details
                                </h1>
                                <div className="row">
                                    <div className='col-md-12'>
                                     <div className='col-md-3'>

                                    <p className="text-md flex">
                                        <span className="text-golden" />{" "}
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth={0}
                                            viewBox="0 0 24 24"
                                            className="w-6 h-6 mr-2 text-golden"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path fill="none" d="M0 0h24v24H0z" />
                                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                                        </svg>
                                        {newsData?.email}{" "}
                                    </p>
                                     </div>
                                    {newsData?.facebook_page && (
                                     <div className='col-md-3'>
                                    <p className="text-md flex">
                                        <span className="text-golden">
                                            <svg
                                                stroke="currentColor"
                                                fill="currentColor"
                                                strokeWidth={0}
                                                viewBox="0 0 448 512"
                                                className="w-6 h-6 mr-2 text-golden"
                                                height="1em"
                                                width="1em"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z" />
                                            </svg>{" "}
                                        </span>{" "}
                                        <a onClick={() => window.location.href = newsData?.facebook_page}>{newsData?.facebook_page}</a>{" "}
                                    </p>
                                    </div>
                                    )}
                                    {newsData?.instagram_link && (
                                        <div className='col-md-3'>
                                    <p className="text-md flex">
                                        <span className="text-golden">
                                            <svg
                                                stroke="currentColor"
                                                fill="currentColor"
                                                strokeWidth={0}
                                                viewBox="0 0 448 512"
                                                className="w-6 h-6 mr-2 text-golden"
                                                height="1em"
                                                width="1em"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9S160.5 370.9 224.1 370.9 339 319.6 339 256 287.7 141 224.1 141zm0 189.6c-41.2 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.5 74.7-74.7 74.7zm146.4-194.3c0 14.9-12.1 27-27 27s-27-12.1-27-27 12.1-27 27-27 27 12.1 27 27zM448 128v256c0 70.7-57.3 128-128 128H128C57.3 512 0 454.7 0 384V128C0 57.3 57.3 0 128 0h192c70.7 0 128 57.3 128 128zM398.4 128c0-35.3-28.7-64-64-64H113.6c-35.3 0-64 28.7-64 64v256c0 35.3 28.7 64 64 64h220.8c35.3 0 64-28.7 64-64V128z" />
                                            </svg>
                                        </span>

                                        <a onClick={() => window.location.href = newsData?.instagram_link}>{newsData?.instagram_link}</a>{" "}
                                    </p>
                                    </div>
                                    )}

                                    <div className='col-md-3'>

                                    <p className="text-md flex">
                                        <span className="text-golden">
                                            <svg
                                                stroke="currentColor"
                                                fill="currentColor"
                                                strokeWidth={0}
                                                viewBox="0 0 512 512"
                                                className="w-6 h-6 mr-2 text-golden"
                                                height="1em"
                                                width="1em"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fill="none"
                                                    strokeMiterlimit={10}
                                                    strokeWidth={32}
                                                    d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208 208-93.13 208-208S370.87 48 256 48z"
                                                />
                                                <path
                                                    fill="none"
                                                    strokeMiterlimit={10}
                                                    strokeWidth={32}
                                                    d="M256 48c-58.07 0-112.67 93.13-112.67 208S197.93 464 256 464s112.67-93.13 112.67-208S314.07 48 256 48z"
                                                />
                                                <path
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={32}
                                                    d="M117.33 117.33c38.24 27.15 86.38 43.34 138.67 43.34s100.43-16.19 138.67-43.34m0 277.34c-38.24-27.15-86.38-43.34-138.67-43.34s-100.43 16.19-138.67 43.34"
                                                />
                                                <path
                                                    fill="none"
                                                    strokeMiterlimit={10}
                                                    strokeWidth={32}
                                                    d="M256 48v416m208-208H48"
                                                />
                                            </svg>{" "}
                                        </span>
                                        <a onClick={() => window.location.href = newsData?.website_url}>{newsData?.website_url}</a>
                                    </p>
                                    </div>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col md:flex-row justify-between items-center gap-5">
                                    <div className="flex gap-3">
                                        <button className="uppercase px-7 py-2 rounded border border-golden text-golden">
                                            {newsData?.views} Profile Views
                                        </button>
                                        <button className="uppercase px-7 py-2 rounded border border-golden text-golden">
                                            {newsData?.likes} Likes
                                        </button>
                                        <button className="uppercase px-7 py-2 rounded border border-golden text-golden">
                                            {newsData?.visit} Websites Visit
                                        </button>
                                    </div>
                                    <div className="">
                                        <button
                                            // className="px-7 py-2 rounded bg-golden text-white uppercase"
                                            className="px-7 py-2 rounded bg-golden text-white uppercase"
                                            onClick={() => window.location.href = newsData?.website_url}
                                        >
                                            Visit Our Website
                                        </button>
                                    </div>
                                </div>

                                <h3 className="uppercase font-semibold text-xl my-3 text-golden">
                                    Share This
                                </h3>
                                <div
                                    className="sharethis-inline-share-buttons st-center st-has-labels  st-inline-share-buttons st-animated"
                                    id="st-1"
                                >
                                    <div
                                        className="st-btn st-first"
                                        data-network="facebook"
                                        style={{ display: "inline-block", backgroundColor: '#4267B2' }}
                                    >
                                        <img
                                            alt="facebook sharing button"
                                            src="https://platform-cdn.sharethis.com/img/facebook.svg"
                                        />
                                        <span className="st-label" onClick={()=>window.location.href=`https://www.facebook.com/sharer.php?text=${encodeURIComponent(newsData?.news_description)}&url=${encodeURIComponent(route.asPath)}`}>facebook</span>
                                    </div>
                                    <div
                                        className="st-btn"
                                        data-network="twitter"
                                        style={{ display: "inline-block", backgroundColor: '#000000' }}
                                    >
                                        <img
                                            alt="twitter sharing button"
                                            src="https://platform-cdn.sharethis.com/img/twitter.svg"
                                        />
                                        <span className="st-label" onClick={()=>window.location.href=`https://twitter.com/intent/tweet?text==${encodeURIComponent(newsData?.news_description)}&url=${encodeURIComponent(route.asPath)}`}>Tweet</span>
                                    </div>
                                    <div
                                        className="st-btn"
                                        data-network="whatsapp"
                                        style={{ display: "inline-block", backgroundColor: '#25d366' }}
                                    >
                                        <img
                                            alt="whatsapp sharing button"
                                            src="https://platform-cdn.sharethis.com/img/whatsapp.svg"
                                        />
                                        <span onClick={()=>window.location.href=`https://api.whatsapp.com/send/?text=${encodeURIComponent(newsData?.news_description)}type=custom_url&app_absent=0`} className="st-label">whatsapp</span>
                                    </div>
                                    <div
                                        className="st-btn"
                                        data-network="telegram"
                                        style={{ display: "inline-block", backgroundColor: '#0088cc' }}
                                    >
                                        <img
                                            alt="telegram sharing button"
                                            src="https://platform-cdn.sharethis.com/img/telegram.svg"
                                        />
                                        <span className="st-label" onClick={() => window.open(`https://t.me/share/url?url=${encodeURIComponent(newsData?.news_description)}&text=${encodeURIComponent(newsData?.news_description)}`, '_blank')} >Telegram</span>
                                    </div>
                                    <div
                                        className="st-btn"
                                        data-network="linkedin"
                                        style={{ display: "inline-block", backgroundColor: '#0077b5' }}
                                    >
                                        <img
                                            alt="linkedin sharing button"
                                            src="https://platform-cdn.sharethis.com/img/linkedin.svg"
                                        />
                                        
                                        <span className="st-label" onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(newsData?.news_description)}`, '_blank')} >LinkedIn</span>

                                    </div>
                                    <div
                                        className="st-btn"
                                        data-network="messenger"
                                        style={{ display: "inline-block", backgroundColor: '#0077b5' }}
                                    >
                                        <img
                                            alt="messenger sharing button"
                                            src="https://platform-cdn.sharethis.com/img/messenger.svg"
                                        />
                                        
                                        <span onClick={() => window.open(`https://www.facebook.com/dialog/send?link=${encodeURIComponent(newsData?.news_description)}&app_id=YOUR_APP_ID&redirect_uri=${encodeURIComponent(newsData?.news_description)}`, '_blank')} className="st-label">Messenger</span>
                                    </div>
                                    <div
                                        className="st-btn"
                                        data-network="snapchat"
                                        style={{ display: "inline-block", backgroundColor: '#fffc00' }}
                                    >
                                        <img
                                            alt="snapchat sharing button"
                                            src="https://platform-cdn.sharethis.com/img/snapchat.svg"
                                        />
                                              <span onClick={() => window.open(`https://www.snapchat.com/share?url=${encodeURIComponent(newsData?.news_description)}`, '_blank')} className="st-label">Snapchat</span>

                                    </div>
                                    <div
                                        className="st-btn"
                                        data-network="email"
                                        style={{ display: "inline-block", backgroundColor: '#7d7d7d' }}
                                    >
                                        <img
                                            alt="email sharing button"
                                            src="https://platform-cdn.sharethis.com/img/email.svg"
                                        />
                               <span onClick={() => window.location.href = `mailto:?subject=${encodeURIComponent(newsData?.news_title)}&body=${encodeURIComponent(newsData?.news_title + "\n" + newsData?.news_description)}`} className="st-label">Email</span>
      </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <HearderNameIcon name={"You may also like"} /> */}
                {newsDataSimilar?.length > 0 && (
                <div className="container whater-effect section-padding-news" data-aos="zoom-out-up">
                    <div className="container">
                        <div className="sectionInnerHead section-head" style={{ paddingTop: "0px", marginTop: "0px" }}>
                            {/* <h1 className="text-sm sm:text-xl md:text-sm lg:text-xl ml-2 md:ml-0 my-5 uppercase border-l-4 pl-3 border-[#846316] text-[#846316]">LATEST News</h1> */}
                            <h1 className="text-sm sm:text-xl md:text-sm lg:text-xl ml-2 md:ml-0  uppercase border-l-4 pl-3 border-[#846316] text-[#846316]">You may also like</h1>
                            <div className="section-control">
                                <div className="swiper-button-next text-slate-300"></div>
                                <div className="swiper-button-prev text-slate-300"></div>
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12" data-aos="fade-right">
                            <Swiper className='newly-listedSwiper'
                                spaceBetween={24}
                                modules={[Navigation, Pagination, EffectFlip, Autoplay]} // ✅ Added Autoplay module
                                navigation={{
                                    prevEl: '.swiper-button-prev',
                                    nextEl: '.swiper-button-next',
                                }}
                                // loop={true} // ✅ Enables infinite looping
                                // autoplay={{
                                //     delay: 2000, // ✅ Auto-scroll every 2 seconds
                                //     disableOnInteraction: false, // ✅ Keeps autoplay running even after user interaction
                                // }}
                                slidesPerView={4}
                            >
                                {newsDataSimilar?.map((hotel, index) => (
                                    <SwiperSlide key={index}>

                                        <div className="hotel-cards  min-h-96 overflow-hidden">
                                            <div className="hotel-img">
                                                <img src={`${BASEURL}/${hotel?.thumbnail_path}`} alt={hotel.name} />
                                            </div>
                                            <div className="hotel-content whater-effect -mt-28">
                                                <h4 className="hotel-name text-center">{hotel?.news_title}</h4>
                                                <div className="teams-name cursor-pointer" onClick={() => handleRoute(hotel?.slug)}>{hotel?.hotel}</div>
                                                <div className="teams-role">{hotel?.country?.country}</div>
                                            </div>

                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
                )}

            </div>
        </>
    )
}

export default NewsPageSection