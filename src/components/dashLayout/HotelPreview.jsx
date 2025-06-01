"use client"
import { apis, BASEURL } from '@component/apiendpoints/api';
import useRequest from '@component/hooks/UseRequest';
import React, { useEffect, useMemo, useState } from 'react'
import Map from '../Map';
import Link from 'next/link';
import ViewMap from '@component/modals/ViewMap';
import PropertyDescription from '@component/modals/PropertyDescription';
import HotelPreviewModal from './HotelPreviewModal';
import axios from 'axios';
import ImagesModal from "@component/modals/ImagesModal"
import { useSelector } from 'react-redux';




const HotelPreview = () => {
    const { request, response } = useRequest();
    const { request: request_distance, response: response_distance } = useRequest();
    const [offer_details, setOffer_details] = useState(null)
    const { request: requestExclusive_offer, response: responseExclusive_offer, clear: clearOffer } = useRequest(true);
    const [ViewModal, setIViewModal] = useState(false);
    const [ShowMore, SetShowMore] = useState(false);
    const [latLong, setLatLong] = useState(null);
    const [nearbyData, setNearbyData] = useState([]);
    const [nearbyAttraction, setNearbyAttraction] = useState([]);
    const {request:request_atraction,response:response_atraction} = useRequest(true)
    const [isOpen, setIsOpen] = useState(false);

    const { request: requestNearby, response: responseNearby, loading } = useRequest(true)
    const { hotel_highlight, hotel_facility,room_enimities} = useSelector((state) => state.siteSetting)

    console.log(ViewModal, "ViewModal");

    const GOOGLE_API_KEY = `AIzaSyAN-RY595XViAsgKD5nXRkH3zmtc6iqzjE`;


    const hotel_details = JSON.parse(localStorage.getItem("hotel_details") ?? "{}")



    useEffect(() => {
        if (hotel_details?._id) {

            request("GET", `${apis.GETHOTEL_PROFILE}${hotel_details?._id}`)
        }
    }, [])


    const hotel_details_fetch = useMemo(() => {
        if (response) {
            console.log(response, "response")

            if (!offer_details && response?.data?._id) {
                requestExclusive_offer("GET", `${apis.GET_EXCLUSIVEOFFERS_BY_HOTEL_ID}/${response?.data?._id}`)
            }
            return response.data
        }
    }, [response])

    console.log("hotel_details_fetch", hotel_details_fetch)
    console.log("offer_details", offer_details)

    const truncateText = (text, wordLimit) => {
        const words = text?.split(" ");
        if (words?.length > wordLimit) {
            return words?.slice(0, wordLimit).join(" ") + "...";
        }
        return text;
    };

    useMemo(() => {

        if (!offer_details && responseExclusive_offer) {

            setOffer_details(responseExclusive_offer?.hotel_offer)
            clearOffer()
        }
    }, [responseExclusive_offer])



    // const previewImages = hotel_details_fetch?.google_photos?.length > 0 ? hotel_details_fetch?.google_photos.slice(0, 6) : hotel_details_fetch?.images.slice(0, 6);

    

    // // Get remaining images
    // const remainingImages =  hotel_details_fetch?.google_photos?.length > 0 ? hotel_details_fetch?.google_photos.slice(6) : hotel_details_fetch?.images.slice(6);

    const allImages = [
        ...(hotel_details_fetch?.google_photos || []), 
        ...(hotel_details_fetch?.images || [])
      ];
      
      // Get preview images (first 6)
      const previewImages = allImages.slice(0, 6);
      
      // Get remaining images (after the first 6)
      const remainingImages = allImages.slice(6);


    useEffect(() => {
        if (hotel_details_fetch?.location) {
            const getLatLong = async () => {
                try {

                    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${hotel_details_fetch?.location}&key=${GOOGLE_API_KEY}`; 

                    const geocodeResponse = await axios.get(geocodeUrl);

                    console.log(geocodeResponse, 'geocode');
                    const hotelLag = geocodeResponse.data.results[0]?.geometry?.location;
                    // const origin = `${hotelLag?.lat},${hotelLag?.lng}`;
                    setLatLong({
                        lat: hotelLag?.lat,
                        lng: hotelLag?.lng
                    })
                } catch (error) {
                    console.log(error)
                }
            }
            getLatLong()
        }
    }, [hotel_details_fetch?.location])


    const NearByHotels = async () => {
        try {
            // Ensure latLong is defined before making requests
            if (!latLong) {
                console.error("Error: latLong is undefined.");
                return;
            }
    
            // Fetch nearby hotels & transport
            const response = await requestNearby("POST", apis.NEARBY_BY_HOTEL, latLong);
            
            // Fetch nearby attractions
            const attractionResponse = await request_atraction("POST", apis.NEARBY_BY_ATTRACTIONS, latLong);
            
            console.log("Attraction Response:", attractionResponse);
            console.log("Nearby Hotels Response:", response);
    
            // Update state if response contains data
            if (response?.transport || attractionResponse?.attraction) {
                setIViewModal(true);
                setNearbyData(response?.transport);
                setNearbyAttraction(attractionResponse?.attraction)
            }
        } catch (error) {
            console.error("Error fetching nearby places:", error);
        }
    };
    

  

    const getYouTubeEmbedURL = (url) => {
        if (!url) return "";
    
        // Improved regex to match different YouTube URL formats
        const videoIdMatch = url.match(
            /(?:youtube\.com\/(?:.*[?&]v=|embed\/|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/
        );
    
        console.log("url:", url, "videoIdMatch:", videoIdMatch);
    
        return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : "";
    };

    const videoUrl = getYouTubeEmbedURL(hotel_details_fetch?.youtube);

    const selectedFacilities = hotel_facility.filter(facility => 
        hotel_details_fetch?.hotel_facilities.includes(facility._id)
    );
    const selectedAminties = room_enimities.filter(facility => 
        hotel_details_fetch?.room_amenities.includes(facility._id)
    );
    const selectedHighLights = hotel_highlight.filter(facility => 
        hotel_details_fetch?.hotel_highlights.includes(facility._id)
    );
    return (
        <>
            <section className='hotel-listing dashHotel-listing section-padding p-0' style={{
                backgroundImage: 'url("/new/assets/img/nominate-hotel-bg.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center center'
            }}>
                {hotel_details_fetch ? (<>
                    <div className='container'>
                        <div className=''
                        >
                            <div className="row justify-between items-center">
                                <div className="col-md-8">
                                    <div className="star-box">
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth={0}
                                            viewBox="0 0 576 512"
                                            className="text-star"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
                                        </svg>
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth={0}
                                            viewBox="0 0 576 512"
                                            className="text-star"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
                                        </svg>
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth={0}
                                            viewBox="0 0 576 512"
                                            className="text-star"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
                                        </svg>
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth={0}
                                            viewBox="0 0 576 512"
                                            className="text-star"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
                                        </svg>
                                    </div>
                                    <div className="hotel-info">
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth={0}
                                            viewBox="0 0 384 512"
                                            className="text-golden"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" />
                                        </svg>
                                        {hotel_details_fetch?.location}
                                        <button
                                            className="font-semibold text-golden hover:underline"
                                            onClick={NearByHotels}
                                        >
                                            Show on Map
                                        </button>

                                    </div>
                                    <div className="hotel-info">
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth={0}
                                            viewBox="0 0 448 512"
                                            className="text-golden"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M436 480h-20V24c0-13.255-10.745-24-24-24H56C42.745 0 32 10.745 32 24v456H12c-6.627 0-12 5.373-12 12v20h448v-20c0-6.627-5.373-12-12-12zM128 76c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12V76zm0 96c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40zm52 148h-40c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12zm76 160h-64v-84c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v84zm64-172c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40zm0-96c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40zm0-96c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12V76c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40z" />
                                        </svg>
                                        <p style={{ marginTop: "18px" }}>{truncateText(hotel_details_fetch?.about, 5)}</p>

                                        {/* {hotel_details_fetch?.about?.split(" ")?.length > 30 && ( */}
                                            <button
                                                onClick={() => SetShowMore(true)}
                                                className="font-semibold text-golden hover:underline"
                                            >
                                                Show More
                                            </button>
                                        {/* )} */}
                                    </div>
                                    {ShowMore && (
                                        <HotelPreviewModal SetShowMore={SetShowMore} data={hotel_details_fetch} />
                                    )}
                                </div>

                            </div>
                            <div className='gallery-grid'>

                                {previewImages?.length > 0 && previewImages?.map((it) => {
                                    return (
                                        <div key={it} className='gallery-item'>
                                            <a data-fancybox="gallery" href={`${it}`}>

                                                {it.slice(0, 5) == "https" ? <img src={`${it}`} alt="Gallery 1" style={{ width: "100%", borderRadius: "8px" }} /> : <img src={`${BASEURL}/${it}`} alt="Gallery 1" style={{ width: "100%", borderRadius: "8px" }} />

                                                }
                                            </a>
                                        </div>
                                    )
                                })}
                                {remainingImages?.length > 0 && (
                                    <>
                                        <div className='gallery-item last-grid-item relative cursor-pointer'>
                                            <img className="backdrop-blur-md" src={remainingImages?.[0]?.startsWith("https") ? remainingImages?.[0] : `${BASEURL}/${remainingImages?.[0]}`} />
                                            <div className='absolute inset-0 gird-info-number  flex items-center justify-center'>

                                                <span className='text-white text-xl' onClick={() => setIsOpen(true)}>
                                                    See All {remainingImages?.length} Photos
                                                </span>
                                            </div>
                                        </div>
                                    </>
                                    // <button
                                    // fixed inset-0 bg-black/50 backdrop-blur-md
                                    //   onClick={() => setIsOpen(true)}
                                    //   className="mt-4 bg-slate-600 text-white px-4 py-2 rounded"
                                    // >
                                    // </button>
                                )}
                                {isOpen && (
                                    <div>
                                        <ImagesModal previewImages={remainingImages} setIsOpen={setIsOpen} />
                                    </div>
                                )}

                            </div>
                        </div>

                        <div className=' white-bg mt-3'
                        >
                            <div className='row'>
                                <div className='col-md-12'>
                                    <h3 className="comman-heading3">Highlights</h3>
                                    <div className="grid  service-outerBox p-3 bg-gray my-3 rounded-xl shadow-sm">
                                    {selectedHighLights?.map((icon)=>{
                                            return(
                                                <div className="text-center serviceBox">
                                            <img
                                                src={`${BASEURL}/${icon?.Icon}`}
                                                className="mx-auto"
                                                alt="Ideal Location"
                                            />
                                            <h3 className='service-text mb-2'>{icon?.highlight}
                                            </h3>
                                        </div>
                                            )
                                        })}
                                    </div>
                                    <h3 className="comman-heading3">Hotel Facilities</h3>
                                    <div className="grid  service-outerBox p-3 bg-gray my-3 rounded-xl shadow-sm">
                                        {selectedFacilities?.map((icon)=>{
                                            return(
                                                <div className="text-center serviceBox">
                                            <img
                                                src={`${BASEURL}/${icon?.Icon}`}
                                                className="mx-auto"
                                                alt="Ideal Location"
                                            />
                                            <h3 className='service-text mb-2'>{icon?.facility}
                                            </h3>
                                        </div>
                                            )
                                        })}
                                        <div className="text-center serviceBox">
                                            <a href="#" className='theme-btn'>Hotel Facilities</a>
                                        </div>
                                    </div>

                                    <h3 className="comman-heading3">Hotel Aminities</h3>

                                    <div className="grid  service-outerBox p-3 bg-gray my-3 rounded-xl shadow-sm">
                                    {selectedAminties?.map((icon)=>{
                                            return(
                                                <div className="text-center serviceBox">
                                            <img
                                                src={`${BASEURL}/${icon?.amenityIcon}`}
                                                className="mx-auto"
                                                alt="Ideal Location"
                                            />
                                            <h3 className='service-text mb-2'>{icon?.amenity}
                                            </h3>
                                        </div>
                                            )
                                        })}
                                      

                                        <div className="text-center serviceBox">
                                            <a href="#" className='theme-btn'>Hotel Aminities</a>
                                        </div>
                                    </div>
                                
                                </div>

                            </div>
                        </div>
                        <div className='col-md-12' style={{ marginTop: "20px" }}>
                            {hotel_details_fetch && <Map location={{ lat: parseFloat(hotel_details_fetch?.lat), lng: parseFloat(hotel_details_fetch?.long) }}
                                setIViewModal={NearByHotels}

                            />}

                            {/* <iframe title="map" className="w-full h-full mx-auto" id="gmap_canvas" src="https://maps.google.com/maps?q=Rosen Inn Lake Buena Vista&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe> */}
                        </div>
                        {ViewModal && (<ViewMap setIViewModal={setIViewModal} nearbyData={nearbyData} hotel_details_fetch={hotel_details_fetch} nearbyAttraction={nearbyAttraction} />)}
                        <div className='mt-3'
                        >
                            <div className="accordion theme-accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            About Hotel</button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            {hotel_details_fetch?.about}
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            Description
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            {hotel_details_fetch?.description}
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            ROOMS AND SUITS
                                        </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            {hotel_details_fetch?.rooms_suites}
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse5" aria-expanded="false" aria-controls="collapse5">
                                            Spa & wellness
                                        </button>
                                    </h2>
                                    <div id="collapse5" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            {hotel_details_fetch?.spa_wellness}
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse5" aria-expanded="false" aria-controls="collapse5">
                                            Restaurant and bar
                                        </button>
                                    </h2>
                                    <div id="collapse5" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            {hotel_details_fetch?.restaurants_bars}
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse6" aria-expanded="false" aria-controls="collapse6">
                                            Additional information
                                        </button>
                                    </h2>
                                    <div id="collapse6" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            {hotel_details_fetch?.additional_information}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='offerBlock mt-5'
                            style={{
                                backgroundImage: 'url("/new/assets/img/nominate-hotel-bg.png")',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center center'
                            }}
                        >
                            <div className='row'>
                                <div className='col-md-9'>
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        className="rounded-2xl"
                                        src={videoUrl}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                                <div className='col-md-3'>
                                    {offer_details ? (

                                        <div className="text-center offerBlockRight space-y-3 p-3 special-card flex-1 min-h-96" >
                                            <h3 className="text-center text-xl text-golden">EXCLUSIVE OFFER</h3>
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
                                                offer Valid from <span className="text-xl text-golden">{offer_details?.offer_from}</span> to <br />{" "}
                                                <span className="text-xl text-golden">{offer_details?.offer_to}</span>
                                            </p>
                                            {/* <hr className="text-golden" />
                                        <hr className="text-golden" /> */}
                                            <a onClick={() => window.location.href = offer_details?.offer_url} className="theme-btn">
                                                REDEEM
                                            </a>
                                        </div>
                                    ) : (<>
                                        <div className="text-center offerBlockRight space-y-3 p-3 special-card justify-center flex  min-h-96 items-center">

                                            <p className='my-auto text-center'>No exclusive Offer </p>
                                        </div>
                                    </>
                                    )}

                                </div>
                            </div>
                            <div className='footer-btn text-end'>
                                <Link href="/dashboard/contact-info" className='next-btn'>Previous</Link>

                                <Link href="/dashboard/select-package" className='next-btn'>Continue</Link>
                            </div>
                        </div>

                    </div>
                </>) : (
                    <div className='container'>
                        <div className='content-rightBox white-bg'
                            style={{
                                backgroundImage: 'url("/new/assets/img/nominate-hotel-bg.png")',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center center'
                            }}
                        >
                            <div className="row justify-between items-center">
                                No Hotel Listed
                            </div>
                            <div className='footer-btn text-end'>
                                <Link href="/dashboard/contact-info" className='next-btn'>Previous</Link>

                                <Link href="/dashboard/select-package" className='next-btn'>Continue</Link>
                            </div>
                        </div>
                    </div>
                )}

            </section>

        </>
    )
}

export default HotelPreview