'use client'
import React, { useEffect, useMemo, useState } from 'react'
import Icon from '../icon'
import ViewMap from '@component/modals/ViewMap'
import PropertyDescription from '@component/modals/PropertyDescription'
import Map from '../Map';
import useRequest from '@component/hooks/UseRequest'
import { Fancybox } from "@fancyapps/ui";
import { apis, BASEURL } from '@component/apiendpoints/api';
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import moment from 'moment'
import ReviewForm from './ReviewForm'
import VoteForm from './VoteForm'
import axios from 'axios'
import ImagesModal from '@component/modals/ImagesModal'
import SocialShareIcon from '../commonPage/SocialShareIcon'
import toast from 'react-hot-toast'

const Hotel_visit = ({ params }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [ViewModal, setIViewModal] = useState(false);
  const [ShowMore, SetShowMore] = useState(false);
  const [showVoteForm, setShowVoteForm] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isTrue, setIsTrue] = useState(false);
  // console.log("params", params)
  const GOOGLE_API_KEY = `AIzaSyAN-RY595XViAsgKD5nXRkH3zmtc6iqzjE`;
  const { request: requestNearby, response: responseNearby, loading } = useRequest(true)

  const { request: requestfetch, response: responsefetch, clear } = useRequest();
  const { request: requestExclusive_offer, response: responseExclusive_offer, clear: clearOffer } = useRequest(true);
  const { request: requestReiview, response: responseReiview, clear: clearReiview } = useRequest(true);
  const { request: requestupdaet_visit } = useRequest(true);

  const { request: requestLikes, response: responseLikes } = useRequest(true);

  const { request: requestVote } = useRequest(true);
  const { request: requestGuestReview, responseGuestReview } = useRequest(true);
  const { hotel_highlight, hotel_facility, room_enimities } = useSelector((state) => state.siteSetting)

  // UPDATE_VISIT
  const [offer_details, setOffer_details] = useState(null)
  const [review_details, setreview_details] = useState(null)
  const [new_fetch_hotel_info, setnew_fetch_hotel_info] = useState(null)
  const [nearbyData, setNearbyData] = useState([]);
  const [latLong, setLatLong] = useState(null);
  const [isLiked, setLiked] = useState(false)


  const hotel_details = localStorage.getItem("hotel_details") ? JSON.parse(localStorage.getItem("hotel_details")) : null

  useEffect(() => {
    // Initialize Fancybox when the component is mounted
    Fancybox.bind("[data-fancybox]", {});
    if (params) {

      requestfetch("GET", `${apis.GET_HOTEL_DETAILS_BY_SLUG}/${params?.slug}`)
    }
    // Clean up Fancybox when the component is unmounted
    return () => {
      Fancybox.destroy();
    };
  }, []);

  const udpateLike = async () => {
    try {
      const response = await requestLikes("PUT", `${apis.LIKE_HOTELS}/${new_fetch_hotel_info?.hotel?._id}`);
      if (response) {
        toast.success(response?.message)
        setLiked(true)
      }
      console.log("Like response:", response);
    } catch (error) {
      console.error("Error liking hotel:", error);
    }
  }

  const UpdateHotelVisit = async () => {
    try {
      const response = await requestupdaet_visit("PUT", `${apis.UPDATE_VISIT}/${new_fetch_hotel_info?.hotel?._id}`)
      if (response) {
        toast.success(response.message)
        window.location.href = new_fetch_hotel_info?.hotel?.website
      }
    } catch (error) {
      console.log("ERROR", error)
    }
  }

  const truncateText = (text, wordLimit) => {
    if (!text) return ""; // Handle undefined or empty text
    const words = text.split(" "); // Split into words
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..." // Keep only 4 words, add "..."
      : text; // If text has 4 or fewer words, show as it is
  };


  useMemo(() => {

    if (!new_fetch_hotel_info && responsefetch) {

      if (!offer_details) {

        requestExclusive_offer("GET", `${apis.GET_EXCLUSIVEOFFERS_BY_HOTEL_ID}/${responsefetch?.hotel._id}`)

      }
      if (!review_details) {
        requestReiview("GET", `${apis.GET_HOTEL_REVIEWS}/${responsefetch.hotel._id}`)
      }
      clear()
      setnew_fetch_hotel_info(responsefetch)
    }

  }, [responsefetch])

  useEffect(()=>{
    if(isTrue){
      requestReiview("GET", `${apis.GET_HOTEL_REVIEWS}/${responsefetch.hotel._id}`)
    }
  },[isTrue])
  
  useMemo(() => {
    if (!offer_details && responseExclusive_offer) {

      setOffer_details(responseExclusive_offer?.hotel_offer)
      clearOffer()
    }
  }, [responseExclusive_offer])


  useMemo(() => {

    if (!review_details && responseReiview) {

      setreview_details(responseReiview?.reviews)
      console.log(responseReiview, "review_details")
      clearReiview()
    }
  }, [responseReiview])



  console.log(new_fetch_hotel_info, "new_fetch_hotel_info")

  useEffect(() => {
    if (new_fetch_hotel_info?.hotel?.location) {
      const getLatLong = async () => {
        try {

          const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${new_fetch_hotel_info?.hotel?.location}&key=${GOOGLE_API_KEY}`;
          const geocodeResponse = await axios.get(geocodeUrl);

          console.log(geocodeResponse, 'geocode');
          const hotelLag = geocodeResponse?.data?.results[0]?.geometry?.location;
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
  }, [new_fetch_hotel_info?.hotel?.location])


  const NearByHotels = async () => {
    try {
      const response = await requestNearby("POST", apis.NEARBY_BY_HOTEL, latLong);

      console.log("response", response)
      if (response) {
        setIViewModal(true)
        setNearbyData(response?.transport)
      }
    } catch (erorr) {
      console.log("error", erorr)
    }
  }

  const previewImages = new_fetch_hotel_info?.hotel?.images?.slice(0, 6);

  // Get remaining images (excluding the first 6)
  const remainingImages = new_fetch_hotel_info?.hotel?.images?.slice(6);


  const getYouTubeEmbedURL = (url) => {
    if (!url) return "";

    // If the URL already contains "/embed/", return it as is
    if (url.includes("/embed/")) return url;

    // Extract the video ID from different YouTube URL formats
    const videoIdMatch = url?.match(
      /(?:youtube\.com\/(?:shorts\/|watch\?v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );

    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : "";
  };

  const videoUrl = getYouTubeEmbedURL(new_fetch_hotel_info?.hotel?.youtube);
  console.log("videoUrl", videoUrl, new_fetch_hotel_info)





  return (
    <>
      <section className='hotel-listing dashboard-section section-padding' style={{
        backgroundImage: 'url("/new/assets/img/nominate-hotel-bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center center'
      }}>
        <div className='container'>
          <div className='content-rightBox white-bg'
            style={{
              backgroundImage: 'url("/new/assets/img/nominate-hotel-bg.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center center'
            }}
          >
            <div className="row justify-between items-center">
              <div className="col-md-8">
                <h3 className='flex items-center'> <span> {new_fetch_hotel_info?.hotel?.hotel_name}</span>
                  <StarRating rating={new_fetch_hotel_info?.rating?.overall_rating} />

                </h3>

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
                    style={{
                      flexShrink
                        : "0"
                    }}
                  >
                    <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" />
                  </svg>
                  <span>{new_fetch_hotel_info?.hotel?.location}
                    <button onClick={NearByHotels} className="font-semibold ps-2 text-golden hover:underline">
                      Show on Map
                    </button>
                  </span>
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
                  <span>{truncateText(new_fetch_hotel_info?.hotel?.description, 5)}
                    <button onClick={() => SetShowMore(true)} className="font-semibold text-golden ps-2 hover:underline">
                      Show More
                    </button>
                  </span>

                </div>
              </div>
              {ShowMore && (
                <PropertyDescription about={new_fetch_hotel_info?.hotel.about} spa_Wellnes={new_fetch_hotel_info?.hotel?.spa_wellness} restuarent_bar={new_fetch_hotel_info?.hotel.restaurants_bars} location={new_fetch_hotel_info?.hotel.location} other_facility={new_fetch_hotel_info?.hotel.other_facility} room_suite={new_fetch_hotel_info?.hotel.rooms_suites} SetShowMore={SetShowMore} />
              )}


              <div className="col-md-4 flex justify-end">


                <div className=" flex justify-between  theme-btn g-btn me-3 " onClick={udpateLike}>
                  <span>
                    {!isLiked ? (
                      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" className=" text-[25px] mr-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 0 0-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 0 0 471 99.9c-52 0-98 35-111.8 85.1l-85.9 311H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h601.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM184 852V568h81v284h-81zm636.4-353l-21.9 19 13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 16.5-7.2 32.2-19.6 43l-21.9 19 13.9 25.4a56.2 56.2 0 0 1 6.9 27.3c0 22.4-13.2 42.6-33.6 51.8H329V564.8l99.5-360.5a44.1 44.1 0 0 1 42.2-32.3c7.6 0 15.1 2.2 21.1 6.7 9.9 7.4 15.2 18.6 14.6 30.5l-9.6 198.4h314.4C829 418.5 840 436.9 840 456c0 16.5-7.2 32.1-19.6 43z"></path></svg>
                    ) : (
                      <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" className=" text-[25px] mr-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 0 0-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 0 0 471 99.9c-52 0-98 35-111.8 85.1l-85.9 311h-.3v428h472.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM112 528v364c0 17.7 14.3 32 32 32h65V496h-65c-17.7 0-32 14.3-32 32z"></path></svg>
                    )}

                  </span>

                  <span>LIKE</span>


                </div>
                <a onClick={UpdateHotelVisit} className="theme-btn cursor-pointer">
                  Book Now
                </a>
              </div>
            </div>
            {previewImages?.length ? (
              <>
                <div className='gallery-grid'>
                  {previewImages?.map((it, i) => {
                    return (
                      <div className='gallery-item' key={i}>
                        <a data-fancybox="gallery" href={`${it}`}>
                          {/* <img src={`${BASEURL}/${it}`} alt="Gallery 1" style={{ width: "100%", borderRadius: "8px" }} /> */}
                          {it.slice(0, 5) == "https" ? <img src={`${it}`} alt="Gallery 1" style={{ width: "100%", borderRadius: "8px" }} /> : <img src={`${BASEURL}/${it}`} alt="Gallery 1" style={{ borderRadius: "8px" }} />
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
                            See All {new_fetch_hotel_info?.hotel?.images?.length} Photos
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
              </>
            ) : (
              <>
                <p className='p-2'>
                  No Hotel Photos
                </p>
              </>
            )}


          </div>
          <div className='content-rightBox white-bg mt-5'
            style={{
              backgroundImage: 'url("/new/assets/img/nominate-hotel-bg.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center center'
            }}
          >
            <div className="row">
              <div className="col-md-8 dashHotel-listing">
                <h3 className="comman-heading3">Highlights</h3>
                <div className="grid  service-outerBox p-3 bg-gray my-3 rounded-xl shadow-sm">
                  {hotel_highlight?.map((it) =>
                    new_fetch_hotel_info?.hotel?.hotel_highlights.includes(it._id) && (
                      <div className="text-center serviceBox" key={it._id}>
                        <img src={`${BASEURL}/${it.Icon}`} className="mx-auto" alt={it.highlight} />
                        <h3 className="service-text mb-2">{it.highlight}</h3>
                      </div>
                    )
                  )}
                </div>

                <h3 className="comman-heading3">Hotel Facilities</h3>
                <div className="grid  service-outerBox p-3 bg-gray my-3 rounded-xl shadow-sm">
                  {hotel_facility?.map((it) =>
                    new_fetch_hotel_info?.hotel?.hotel_facilities.includes(it._id) && (
                      <div className="text-center serviceBox" key={it._id}>
                        <img src={`${BASEURL}/${it.Icon}`} className="mx-auto" alt={it.facility} />
                        <h3 className="service-text mb-2">{it.facility}</h3>
                      </div>
                    )
                  )}

                </div>



                <h3 className="comman-heading3">Hotel Aminities</h3>
                <div className="grid  service-outerBox p-3 bg-gray my-3 rounded-xl shadow-sm">
                  {room_enimities?.map((it) =>
                    new_fetch_hotel_info?.hotel?.room_amenities.includes(it._id) && (
                      <div className="text-center serviceBox" key={it._id}>
                        <img src={`${BASEURL}/${it.amenityIcon}`} className="mx-auto" alt={it.amenity} />
                        <h3 className="service-text mb-2">{it.amenity}</h3>
                      </div>
                    )
                  )}

                </div>
              </div>

              <div className="col-md-4">
                <div className="viewMapBox relative h-full" style={{ marginTop: '30px' }}>
                  {/* <a
                    href="#"
                    onClick={() => setIViewModal(true)}
                    className="theme-btn absolute white-hover left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  >
                    View Map
                  </a> */}
                  {new_fetch_hotel_info?.hotel && (
                    <Map
                      className="w-full h-full mx-auto"
                      id="gmap_canvas"
                      location={{
                        lat: parseFloat(new_fetch_hotel_info?.hotel?.lat),
                        lng: parseFloat(new_fetch_hotel_info?.hotel?.long),
                      }}
                      setIViewModal={NearByHotels}
                    />
                  )}
                  {ViewModal && <ViewMap setIViewModal={setIViewModal} hotel_details_fetch={new_fetch_hotel_info?.hotel} nearbyData={nearbyData} />}
                </div>
              </div>
            </div>

          </div>
          <div className='content-rightBox white-bg mt-5'
            style={{
              backgroundImage: 'url("/new/assets/img/nominate-hotel-bg.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center center'
            }}
          >
            <div className="accordion theme-accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Spa & wellness</button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    {new_fetch_hotel_info?.hotel?.spa_wellness}
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    About Hotel
                  </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    {new_fetch_hotel_info?.hotel?.about}
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Restaurant and bar
                  </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    {new_fetch_hotel_info?.hotel?.restaurants_bars}
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse5" aria-expanded="false" aria-controls="collapse5">
                    ROOMS AND SUITS
                  </button>
                </h2>
                <div id="collapse5" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    {new_fetch_hotel_info?.hotel?.rooms_suites}
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
                    {new_fetch_hotel_info?.hotel?.additional_information}
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
                {/* <iframe width="100%" height="100%" className="rounded-2xl" src={new_fetch_hotel_info?.hotel?.youtube} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen=""></iframe> */}
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
                  <div className="text-center offerBlockRight space-y-3 p-3 min-h-[450px] special-card flex-1">
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
                      Valid from <span className="text-xl text-golden">{offer_details?.offer_from}</span> to <br />{" "}
                      <span className="text-xl text-golden">{offer_details?.offer_to}</span>
                    </p>
                    <hr className="text-golden" />
                    {/* <p className="md:text-md p-1">
                    When you stay in one of our exquisite suites or villas, you will receive a
                    free breakfast for two to start your day beautifully.
                  </p> */}
                    <hr className="text-golden" />
                    <button className="theme-btn" onClick={() => {
                      window.location.href = offer_details?.offer_url
                    }}>
                      REDEEM
                    </button>
                  </div>
                ) : (<>
                  {/* <div className="text-center offerBlockRight space-y-3 p-3 min-h-[450px] special-card flex-1">
                <div className="flex justify-center items-center m-auto">
  <h3 className="text-xl text-golden">
    No Exclusive Offer
  </h3>
</div>

                </div> */}
                  <div className="text-center offerBlockRight space-y-3 p-3 special-card flex-1 flex  min-h-96 items-center">

                    <h3 className="text-xl text-golden text-center p-4">
                      No Exclusive Offer
                    </h3>
                  </div>
                </>)}

              </div>
            </div>
          </div>
          <div className='review-section mt-5 content-rightBox white-bg'
            style={{
              backgroundImage: 'url("/new/assets/img/nominate-hotel-bg.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center center'
            }}
          >
            <div className='review-btns'>
              <a
                href='#'
                className=" review-btn drawer-button tab font-bold btn uppercase text-golden hover:bg-transparent border-0 rounded-none hover:border-b-2 hover:border-golden bg-white -z-0 mr-4"
                data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"
              >
                Guest Reviews
              </a>

              <div className="offcanvas offcanvas-end custom-offcanvas" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                  <h5 id="offcanvasRightLabel">Guest Reviews</h5>
                  <button type="button" className="btn-close theme-btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 30L30 10M10 10L30 30" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                <div className="offcanvas-body">

                  <div className="reviewSideBox">
                    <div className='totle-reating'>
                      <div className='leftSide-reviews px-4 '>
                        <div className='flex items-center gap-3'>
                          {(() => {
                            // Calculate overall rating using reduce
                            const overall_rating = review_details?.reviews?.reduce(
                              (acc, data) => acc + data?.overall_rating,
                              0
                            ) || 0;

                            // Calculate average rating
                            const average_rating = review_details && review_details.reviews?.length > 0
                              ? (overall_rating / review_details?.review.length) * 5
                              : 0;

                            // Determine rating label
                            const rating_label =
                              average_rating >= 4.5 ? "Brilliant" :
                                average_rating >= 3.5 ? "Good" :
                                  average_rating >= 2.5 ? "Average" :
                                    average_rating >= 1.5 ? "Below Average" :
                                      "Poor";

                            return (
                              <>
                                {average_rating.toFixed(1)}/5
                                <h3 className="text-xl text-golden">{rating_label}</h3>
                              </>
                            );
                          })()}




                        </div>
                      </div>
                      <div className='rightSide-reviews'>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-6">
                          <div>
                            <div className='d-flex justify-between'>
                              <p className='mb-2'>Comfort</p>
                              <p className='mb-2'>5.8</p>
                            </div>
                            <div className="relative w-full h-2 bg-gray-200 rounded-full">
                              <div
                                className="absolute top-0 left-0 h-full bg-[#9e7922] rounded-full"
                                style={{ width: "58%" }}
                              />
                            </div>
                          </div>
                          <div>
                            <div className='d-flex justify-between'>
                              <p className='mb-2'>Facilities</p>
                              <p className='mb-2'>5.8</p>
                            </div>
                            <div className="relative w-full h-2 bg-gray-200 rounded-full">
                              <div
                                className="absolute top-0 left-0 h-full bg-[#9e7922] rounded-full"
                                style={{ width: "58%" }}
                              />
                            </div>
                          </div>
                          <div>
                            <div className='d-flex justify-between'>
                              <p className='mb-2'>Cleanliness</p>
                              <p className='mb-2'>5.8</p>
                            </div>
                            <div className="relative w-full h-2 bg-gray-200 rounded-full">
                              <div
                                className="absolute top-0 left-0 h-full bg-[#9e7922] rounded-full"
                                style={{ width: "58%" }}
                              />
                            </div>
                          </div>
                          <div>
                            <div className='d-flex justify-between'>
                              <p className='mb-2'>Free WiFi</p>
                              <p className='mb-2'>5.8</p>
                            </div>
                            <div className="relative w-full h-2 bg-gray-200 rounded-full">
                              <div
                                className="absolute top-0 left-0 h-full bg-[#9e7922] rounded-full"
                                style={{ width: "58%" }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {review_details?.map(((item) => {
                      return (
                        <div className='user-reviews bg-gray-100 p-4 rounded-lg mb-2'>
                          <div className='leftSide-reviews'>
                            <p className="flex items-center gap-2">
                              <span className="user-img">
                                <img src="https://i.ibb.co/5K4Gxwy/Ellipse-3.png" alt="" className='review-user-img' />
                              </span>{item?.reviewer_name}</p>
                            <p className="hotel-i">
                              <Icon className="hotel-i-svg" icon="Room" />
                              <span>Two Double Room</span></p>
                            <p className="hotel-i"> <Icon className="hotel-i-svg" icon="calendar" /><span>Stayed in {moment(item?.formDate).format("MMMM DD, YYYY")}</span></p>
                            <p className="hotel-i"> <Icon className="hotel-i-svg" icon="family" /><span>Family</span></p>
                            {/* <p className="hotel-i">
                              <Icon className="hotel-i-svg" icon="reviews" />
                              <span>19 Reviews</span></p> */}
                          </div>
                          <div className='rightSide-reviews'>
                            <div className="">
                              <div className="flex items-center mb-2">
                                <div>
                                  <span className="text-[#9e7922] font-bold text-xl">{item?.overall_rating}/5</span>
                                  <span className="ml-2 text-[#9e7922] text-sm font-semibold">
                                    Very Good
                                  </span>
                                </div>
                                <div className="ml-auto text-gray-400 text-xs">
                                  <p className='mb-0'>{moment(item?.toDate).format("MMMM DD, YYYY")}</p>
                                </div>
                              </div>
                              <p className="text-gray-600 text-sm">
                                {item?.review}
                              </p>
                              {/* <div className="mt-4 flex items-center justify-end text-xs text-gray-500">
                                <span className="mr-2 cursor-pointer">👍 Helpful</span>
                              </div> */}
                            </div>
                          </div>
                        </div>
                      )
                    }))}
                  </div>
                </div>
              </div>



              <a
                onClick={() => setShowReviewForm(true)}
                className="review-btn drawer-button tab font-bold btn uppercase text-golden hover:bg-transparent border-0 rounded-none hover:border-b-2 hover:border-golden bg-white -z-0 mr-4"
              >
                Write Review
              </a>

              {showReviewForm && (
                <div className="offcanvas offcanvas-end custom-offcanvas show" tabIndex="-1">
                  <div className="offcanvas-header">
                    <h5 id="WriteReviewLabel">Write Review</h5>
                    <button
                      type="button"
                      className="btn-close theme-btn-close text-reset"
                      onClick={() => setShowReviewForm(false)}
                      aria-label="Close"
                    >
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 30L30 10M10 10L30 30" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                  <div className="offcanvas-body">
                    <ReviewForm new_fetch_hotel_info={new_fetch_hotel_info} setShowReviewForm={setShowReviewForm} setIsTrue={setIsTrue} />
                  </div>
                </div>
              )}
              <a
                onClick={() => setShowVoteForm(true)}
                className="review-btn drawer-button tab font-bold btn uppercase text-golden hover:bg-transparent border-0 rounded-none hover:border-b-2 hover:border-golden bg-white -z-0 mr-4"
              >
                VOTE FOR THE BEST LUXURY HOTELS OF THE YEAR
              </a>


              {showVoteForm && (
                <div className="offcanvas offcanvas-end custom-offcanvas show">
                  <div className="offcanvas-header">
                    <h5 id="WriteReviewLabel">
                      VOTE FOR THE BEST LUXURY HOTELS OF THE YEAR
                    </h5>
                    <button
                      type="button"
                      className="btn-close theme-btn-close text-reset"
                      onClick={() => setShowVoteForm(false)}
                    >
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 30L30 10M10 10L30 30"
                          stroke="#FAFAFA"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="offcanvas-body">
                    <VoteForm
                      new_fetch_hotel_info={new_fetch_hotel_info}
                      setShowVoteForm={setShowVoteForm}
                    />
                  </div>
                </div>
              )}
            </div>
            <h1 className="text-xl my-8 uppercase text-golden">Guest Reviews ({review_details?.length})</h1>
            <div className='row'>
              <div className='col-md-4 mt-3'>
                <div className='d-flex align-items-center gap-3'>
                  <p className='rateBoxNumber mb-0'>
                    7.9/5
                  </p>
                  <span>Good</span>
                </div>
              </div>
              <div className='col-md-8 mt-3'>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-6">
                  <div>
                    <div className='d-flex justify-between'>
                      <p className='mb-2'>Comfort</p>
                      <p className='mb-2'>5.8</p>
                    </div>
                    <div className="relative w-full h-2 bg-gray-200 rounded-full">
                      <div
                        className="absolute top-0 left-0 h-full bg-[#9e7922] rounded-full"
                        style={{ width: "58%" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className='d-flex justify-between'>
                      <p className='mb-2'>Facilities</p>
                      <p className='mb-2'>5.8</p>
                    </div>
                    <div className="relative w-full h-2 bg-gray-200 rounded-full">
                      <div
                        className="absolute top-0 left-0 h-full bg-[#9e7922] rounded-full"
                        style={{ width: "58%" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className='d-flex justify-between'>
                      <p className='mb-2'>Cleanliness</p>
                      <p className='mb-2'>5.8</p>
                    </div>
                    <div className="relative w-full h-2 bg-gray-200 rounded-full">
                      <div
                        className="absolute top-0 left-0 h-full bg-[#9e7922] rounded-full"
                        style={{ width: "58%" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className='d-flex justify-between'>
                      <p className='mb-2'>Free WiFi</p>
                      <p className='mb-2'>5.8</p>
                    </div>
                    <div className="relative w-full h-2 bg-gray-200 rounded-full">
                      <div
                        className="absolute top-0 left-0 h-full bg-[#9e7922] rounded-full"
                        style={{ width: "58%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='row'>
              {review_details
                ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by newest first
                .slice(0, 3) // Get only the latest 3 reviews
                .map((it) => {
                  return (
                    <div key={it._id} className='col-md-4'>
                      <div
                        className="px-4 py-3 guest-review-box"
                        tabIndex={-1}
                        style={{ width: "100%", display: "inline-block" }}
                      >
                        <div className="box-guset">
                          <div className="w-1/5">
                            <img
                              src={`https://i.ibb.co/5K4Gxwy/Ellipse-3.png`}
                              className="w-16 h-16 rounded-full"
                            />
                          </div>
                          <div className="w-4/5">
                            <h3 className="text-xl mb-0">{it.reviewer_name}</h3>
                            <p className="flex gap-2 mb-0 text-lg items-center">
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth={0}
                                viewBox="0 0 512 512"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M349.565 98.783C295.978 98.783 251.721 64 184.348 64c-24.955 0-47.309 4.384-68.045 12.013a55.947 55.947 0 0 0 3.586-23.562C118.117 24.015 94.806 1.206 66.338.048 34.345-1.254 8 24.296 8 56c0 19.026 9.497 35.825 24 45.945V488c0 13.255 10.745 24 24 24h16c13.255 0 24-10.745 24-24v-94.4c28.311-12.064 63.582-22.122 114.435-22.122 53.588 0 97.844 34.783 165.217 34.783 48.169 0 86.667-16.294 122.505-40.858C506.84 359.452 512 349.571 512 339.045v-243.1c0-23.393-24.269-38.87-45.485-29.016-34.338 15.948-76.454 31.854-116.95 31.854z" />
                              </svg>
                              {it.country}
                            </p>
                            <div className="flex gap-2">
                              <StarRating rating={it?.overall_rating} />
                            </div>
                          </div>
                        </div>
                        <p className="mb-0 mt-2">
                          {truncateText(it?.review, 5)}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>

          </div>
          <div className='content-rightBox white-bg mt-5'
            style={{
              backgroundImage: 'url("/new/assets/img/nominate-hotel-bg.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center center'
            }}
          >
            <h1 className=" mb-3 text-golden uppercase" style={{ fontWeight: '500', fontSize: '17px' }}>
              Our Contact Details
            </h1>

            <div className="contect-info flex items-center gap-4">
              <p className="text-md flex info-p">
                <span className="text-golden" />{" "}
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 24 24"
                  className=" w-6 h-6 mr-2 text-golden"
                  height="1em"
                  width="1em"

                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                {new_fetch_hotel_info?.hotel?.hotel_manager_email}{" "}
              </p>

              <p className="text-md flex info-p">
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
                    <path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h352a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48zm-16.39 307.37l-15 65A15 15 0 0 1 354 416C194 416 64 286.29 64 126a15.7 15.7 0 0 1 11.63-14.61l65-15A18.23 18.23 0 0 1 144 96a16.27 16.27 0 0 1 13.79 9.09l30 70A17.9 17.9 0 0 1 189 181a17 17 0 0 1-5.5 11.61l-37.89 31a231.91 231.91 0 0 0 110.78 110.78l31-37.89A17 17 0 0 1 299 291a17.85 17.85 0 0 1 5.91 1.21l70 30A16.25 16.25 0 0 1 384 336a17.41 17.41 0 0 1-.39 3.37z" />
                  </svg>{" "}
                </span>{" "}
                {new_fetch_hotel_info?.hotel?.hotel_manager_telephone}</p>
              <p className="text-md flex info-p">
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
                <a className="cursor-pointer" onClick={() => window.location.href = new_fetch_hotel_info?.hotel?.website}>
                  {new_fetch_hotel_info?.hotel?.website}
                </a>
              </p>
            </div>
            <div className="w-full my-3 flex flex-col md:flex-row justify-between items-center gap-5">
              <div className="flex gap-3">
                <button className=" px-7 py-2 rounded border border-golden text-golden">
                  {new_fetch_hotel_info?.hotel?.hotel_views} Profile Views
                </button>
                <button className=" px-7 py-2 rounded border border-golden text-golden">
                  {/* 404 Likes */}
                  {new_fetch_hotel_info?.hotel?.hotel_likes} Likes
                </button>
                <button className=" px-7 py-2 rounded border border-golden text-golden">
                  {new_fetch_hotel_info?.hotel?.hotel_visit} Websites Visit
                </button>
                <button className="px-7 py-2 rounded border border-golden text-golden " onClick={() => window.href.location = hotel?.website}>
                  Visit Our Website
                </button>
              </div>


            </div>

            <h3 className="uppercase  my-3 text-golden" style={{ fontWeight: '500', fontSize: '17px' }}>
              Share This
            </h3>
            <div>
              <SocialShareIcon />
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default Hotel_visit





const StarRating = ({ rating }) => {
  const maxStars = 5; // Total number of stars
  const fullStars = Math.floor(rating); // Number of fully filled stars
  const halfStar = rating % 1 !== 0; // Check if there's a half star
  const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0); // Remaining empty stars

  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {/* Render full stars */}
      {Array.from({ length: fullStars }).map((_, index) => (
        <Star key={`full-${index}`} filled={true} />
      ))}

      {/* Render half star if applicable */}
      {halfStar && (
        <Star
          key="half-star"
          filled={false}
          style={{
            clipPath: "polygon(0 0, 50% 0, 50% 100%, 0% 100%)",
            backgroundColor: "currentColor",
          }}
        />
      )}

      {/* Render empty stars */}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <Star key={`empty-${index}`} filled={false} />
      ))}
    </div>
  );
};


const Star = ({ filled }) => (
  <svg
    stroke="currentColor"
    fill={filled ? "currentColor" : "none"}
    strokeWidth={0}
    viewBox="0 0 576 512"
    className="text-md text-golden"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
  </svg>
);


