"use client"
import React, { useEffect, useState } from 'react';
import HeadingWithoutSwiper from '../headingWithoutSwiper';
import useRequest from '@component/hooks/UseRequest';
import { apis, BASEURL } from '@component/apiendpoints/api';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFlip, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';


function WinHolidayDescriptionPage({ params }) {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm()
    const { countryData } = useSelector((state) => state.siteSetting)
    const [countrySearch, setCountrySearch] = useState("")
    const [selectedCountry, setSelectedCountry] = useState("");
    const { request, response, loading } = useRequest(true)
    const { request: requestHoliday, response: responseHoliday, loading: loadingHoliday } = useRequest(true)
    const [activeTab, setActiveTab] = useState("dataholiday");
    const route = useRouter();

    const slug = JSON.parse(params.value)?.slug;

    useEffect(() => {
        try {
            request('GET', `${apis.GET_HOLIDAY_DETAILS}/${slug}`)

        } catch (error) {
            console.log("error", error)
        }
    }, [])

    useEffect(()=>{
        if(responseHoliday){
            reset()
        }
    },[responseHoliday])
    const handleRoute = (item) => {
        route.push(`/win-a-holiday/${item}`)
    }

    const filteredCountryData = countryData?.filter((country) =>
        countrySearch
            ? country?.country.toLowerCase().includes(countrySearch.toLowerCase())
            : ""
    );

    const onSubmit = (data) => {
        try {
            requestHoliday("PUT", `${apis.APPLY_WIN_HOLIDAY}/${response?.response?._id}`,data)
        } catch (error) {
            console.log("error", error)
        }
    }
    
  const handleSelectCountry = (country) => {
    console.log("country", country)
    setValue("user_country", country?._id);
    setSelectedCountry(country?.country);
    setCountrySearch("");
  };

    return (
        <>

            <section className='VideoContainer-sec'>
                <div >
                    <img src="/new/assets/img/winaholydaysingle.png" style={{
                        width: "100%",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain"
                    }} />
                </div>
                <div className='VideoContainerText'>
                    <figure className="banner-logo">
                        <img src="/new/assets/img/logo.svg" alt="Luxury Hotels Logo" />

                        <span
                            style={{ fontSize: "25px", fontFamily: "Georgia", color: "#7B6929" }}
                        >
                            PRESENTS
                        </span>
                    </figure>
                </div>
            </section>
            {response?.response && (
                <>
                    <div className="text-center text-warning my-4 text-uppercase">
                        <h4 style={{ fontSize: "1.5rem" }}>{response?.response?.hotelId?.hotel_name}</h4>
                        <h5 className="h5 my-3">Holiday Dates: {moment(response?.response?.dateFrom).format("MMMM D, YYYY")} - {moment(response?.response?.dateTo).format("MMMM D, YYYY")}</h5>
                        <p className="small">Competition ends on {moment(response?.response?.competitionclosure).format("MMMM D, YYYY")} </p>
                    </div>
                    <div className="nominate-hotel-section">
                        <section className="win-a-holiday">
                            <HeadingWithoutSwiper name={response?.response?.title} />
                            <div className="container py-4">
                                {/* <div className="nav nav-tabs" id="myTabs" role="tablist">
                                    <button className="nav-link active text-black" id="holiday-tab" data-bs-toggle="tab" data-bs-target="#holiday" type="button" role="tab" aria-controls="holiday" aria-selected="true">Holiday Description</button>
                                    <button className="nav-link  text-black" id="conditions-tab" data-bs-toggle="tab" data-bs-target="#conditions" type="button" role="tab" aria-controls="conditions" aria-selected="false">Conditions</button>
                                </div> */}
                                <div
                                    style={{
                                        display: "flex",
                                        cursor: "pointer",
                                        borderBottom: "2px solid #ccc",
                                    }}
                                >
                                    <div
                                        onClick={() => setActiveTab("dataholiday")}
                                        style={{
                                            padding: "10px 20px",
                                            borderBottom: activeTab === "dataholiday" ? "3px solid #C1121F" : "none",
                                        }}
                                    >
                                        Holiday Description
                                    </div>
                                    <div
                                        onClick={() => setActiveTab("condition")}
                                        style={{
                                            padding: "10px 20px",
                                            borderBottom: activeTab === "condition" ? "3px solid #C1121F" : "none",
                                        }}
                                    >
                                        Conditions
                                    </div>
                                </div>
                                <div className="tab-content py-3">
                                    {activeTab === "dataholiday" && (
                                        <>
                                            <div className="tab-pane fade show active">
                                                <div className="bg-white p-4 rounded shadow">
                                                    <h5 className="text-uppercase text-[#846316]">Holiday Title</h5>
                                                    <p className='py-2'>{response?.response?.title}</p>

                                                    <h5 className="text-uppercase text-[#846316]">Dates Holiday Valid For</h5>
                                                    <p className='py-2'>
                                                        <strong>Valid From:</strong>
                                                        {moment(response?.response?.dateFrom, moment.ISO_8601, true).isValid()
                                                            ? moment(response.response.dateFrom).format("MMMM D, YYYY")
                                                            : "Invalid Date"}
                                                    </p>
                                                    <p className='pt-2'>
                                                        <strong>Valid To:</strong>
                                                        {moment(response?.response?.dateTo, moment.ISO_8601, true).isValid()
                                                            ? moment(response.response.dateTo).format("MMMM D, YYYY")
                                                            : "Invalid Date"}
                                                    </p>

                                                    <h5 className="text-uppercase text-[#846316]">Entries must be submitted by</h5>
                                                    <p className='pb-2'>
                                                        {moment(response?.response?.competitionclosure, moment.ISO_8601, true).isValid()
                                                            ? moment(response.response.competitionclosure).format("MMMM D, YYYY")
                                                            : "Invalid Date"}
                                                    </p>

                                                    <h5 className="text-uppercase text-[#846316]">Number of Clients:</h5>
                                                    <p className='py-2'>
                                                        {response?.response?.adult_attendees} Adult and {response?.response?.children_attendees} Children
                                                    </p >

                                                    <h5 className="text-uppercase text-[#846316]">Room Type:</h5>
                                                    <p className='py-2'>2 Deluxe Rooms</p>

                                                    <h5 className="text-uppercase text-[#846316] text-capitalize">Package Highlights</h5>
                                                    <p className='text-capitalize py-2'>{response?.response?.holidaydescription}</p>
                                                </div>

                                            </div>
                                            <h3 className="uppercase font-semibold text-xl mt-10 mb-3 text-golden">
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
                                                    <span className="st-label" onClick={() => window.location.href = `https://www.facebook.com/sharer.php?text=${encodeURIComponent(response?.response?.title)}&url=${encodeURIComponent(route.asPath)}`}>facebook</span>
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
                                                    <span className="st-label" onClick={() => window.location.href = `https://twitter.com/intent/tweet?text==${encodeURIComponent(response?.response?.title)}&url=${encodeURIComponent(route.asPath)}`}>Tweet</span>
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
                                                    <span onClick={() => window.location.href = `https://api.whatsapp.com/send/?text=${encodeURIComponent(response?.response?.title)}type=custom_url&app_absent=0`} className="st-label">whatsapp</span>
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
                                                    <span className="st-label" onClick={() => window.open(`https://t.me/share/url?url=${encodeURIComponent(response?.response?.title)}&text=${encodeURIComponent(response?.response?.title)}`, '_blank')} >Telegram</span>
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

                                                    <span className="st-label" onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(response?.response?.title)}`, '_blank')} >LinkedIn</span>

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

                                                    <span onClick={() => window.open(`https://www.facebook.com/dialog/send?link=${encodeURIComponent(response?.response?.title)}&app_id=YOUR_APP_ID&redirect_uri=${encodeURIComponent(response?.response?.title)}`, '_blank')} className="st-label">Messenger</span>
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
                                                    <span onClick={() => window.open(`https://www.snapchat.com/share?url=${encodeURIComponent(response?.response?.title)}`, '_blank')} className="st-label">Snapchat</span>

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
                                                    <span onClick={() => window.location.href = `mailto:?subject=${encodeURIComponent(newsData?.news_title)}&body=${encodeURIComponent(newsData?.news_title + "\n" + response?.response?.title)}`} className="st-label">Email</span>
                                                </div>

                                            </div>
                                        </>
                                    )}
                                    {activeTab === "condition" && (

                                        <div className="tab-pane fade show active">
                                            <div className="bg-white p-4 rounded shadow">
                                                <h1 className="text-xl text-golden uppercase mb-3">
                                                    Conditions for Entry in the "Win a Holiday" Competition
                                                </h1>
                                                <h5 className="text-[#846316]">Winner Selection and Notification:</h5>
                                                <ul className="list-disc pl-10  text-black text-capitalize">
                                                    <li>The winner will be chosen by the hotel from all entries received.</li>
                                                    <li>Within 7 days after the competition closing date, the hotel will select the winner.</li>
                                                    <li>The winner will be notified directly by email from the hotel and will receive a holiday voucher.</li>
                                                </ul>
                                                <h5 className="text-[#846316]">Social Media Obligation:</h5>
                                                <ul className="list-disc pl-10 text-black text-capitalize">
                                                    <li>The winner is required to post about winning the prize and share their holiday experience on their personal social media accounts.</li>
                                                    <li>The winner must send a copy of their social media posts, including pictures and videos, to Luxury Hotels at winner@LuxuryHotelsMagazines.com.</li>
                                                    <li>The winner is also required to share their experience on Instagram by tagging @LuxuryHotels_original.</li>
                                                    <li>The winner must provide a copy of their social media post to Luxury Hotels for further promotion of the hotel.</li>
                                                </ul>
                                                <h5 className="text-[#846316]">Client Data Protection:</h5>
                                                <ul className="list-disc pl-10 text-black text-capitalize">
                                                    <li>By entering the competition, the winner confirms that their data may be used by Luxury Hotels and the hotel to send future offers and promotions.</li>
                                                    <li>Luxury Hotels and the hotel will not sell your data to third parties.</li>
                                                </ul>

                                                <div className="mt-8">
                                                    <form onSubmit={handleSubmit(onSubmit)} className="w-full text-sm">
                                                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                            <div className="col-span-3">
                                                                <div className="mt-2">
                                                                    <input {...register("first_name", { required: "First Name is required" })} type="text" placeholder="First Name" className="block w-full border-b border-primary uppercase p-1.5 shadow-sm focus:border-primaryDark placeholder-black text-sm text-black" />
                                                                    {errors.first_name && <p className="text-red-500 text-xs">{errors.first_name.message}</p>}
                                                                </div>
                                                            </div>
                                                            <div className="col-span-3">
                                                                <div className="mt-2">
                                                                    <input {...register("last_name", { required: "Last Name is required" })} type="text" placeholder="Last Name" className="block w-full border-b border-primary uppercase p-1.5 shadow-sm focus:border-primaryDark placeholder-black text-sm text-black" />
                                                                    {errors.last_name && <p className="text-red-500 text-xs">{errors.last_name.message}</p>}
                                                                </div>
                                                            </div>
                                                            <div className="col-span-3">
                                                                <div className="mt-2">
                                                                    <input {...register("user_email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" } })} type="text" placeholder="Email" className="block w-full border-b border-primary uppercase p-1.5 shadow-sm text-black focus:border-primaryDark placeholder-black text-sm" />
                                                                    {errors.user_email && <p className="text-red-500 text-xs">{errors.user_email.message}</p>}
                                                                </div>
                                                            </div>
                                                            <div className="col-span-3">
                                                                <div className="mt-2 w-full relative">
                                                                    <input
                                                                        className="block w-full border-b border-primary uppercase p-1.5 shadow-sm focus:border-primaryDark placeholder-black text-sm text-black"
                                                                        placeholder='Country'
                                                                        value={selectedCountry || countrySearch}
                                                                        onChange={(e) => {
                                                                            setCountrySearch(e.target.value);
                                                                            setSelectedCountry(""); // Clear selected country when typing
                                                                        }}
                                                                    />
                                                                    <input type="hidden" {...register("user_country", { required: "Country is required" })} />
                                                                    {filteredCountryData && (
                                                                        <ul className="country-list text-black">
                                                                            {filteredCountryData?.map((country) => (
                                                                                <li className="country-item" onClick={() => handleSelectCountry(country)}>{country?.country}</li>
                                                                            ))}
                                                                        </ul>
                                                                    )}
                                                                    {errors.user_country && <p className="text-red-500 text-xs">{errors.user_country.message}</p>}
                                                                </div>

                                                            </div>
                                                            <div className="col-span-full">
                                                                <div className="mt-1 flex items-center gap-3">
                                                                    <input id="condition" {...register("conditions", { required: "You must agree to the conditions" })} type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 mt-1" />
                                                                    <label htmlFor="condition" className="text-sm text-black mt-2 uppercase">I agree with the Conditions.</label>
                                                                </div>
                                                                {errors.conditions && <p className="text-red-500 text-xs">{errors.conditions.message}</p>}
                                                            </div>
                                                            <div className="col-span-full">
                                                                <button className="py-3 px-5 mt-3 save-btn text-white font-semibold shadow-md focus:outline-none uppercase rounded-xl w-full" type="submit">
                                                                    Submit
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    </div>
                    {response?.alsoLike?.length > 0 && (
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
                                        {response?.alsoLike?.map((hotel, index) => (
                                            <SwiperSlide key={index}>
                                                <div className="hotel-cards  min-h-96 overflow-hidden">
                                                    <div className="hotel-img">
                                                        <img src={`${BASEURL}/${hotel?.thumbnail_path}`} alt={hotel?.name} />
                                                    </div>
                                                    <div className="hotel-content whater-effect -mt-28">
                                                        <h4 className="hotel-name text-center cursor-pointer" onClick={() => handleRoute(hotel?.slug)}>{hotel?.hotelId?.hotel_name}</h4>
                                                        <div className="teams-name cursor-pointer " onClick={() => handleRoute(hotel?.slug)}>{hotel?.hotelId?.country?.country}</div>

                                                    </div>

                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default WinHolidayDescriptionPage;
