"use client"
import { apis, BASEURL } from '@component/apiendpoints/api'
import useRequest from '@component/hooks/UseRequest'
import { siteContentActions } from '@component/lib/slice/sitesSetting'
import axios from 'axios'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
// import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import Map from '../Map'
import toast from 'react-hot-toast'



function AddHotelSeacrh() {
  const [googleData, setGoogleData] = useState([]);
  const [seacrh, setSeacrh] = useState("");
  const [selectedHotel, setSelectedHotel] = useState(null); // Track selected hotel
  const [hoteslDetail, setHotelDetail] = useState(null); // Track hotel details
  const router = useRouter();
  const { request, response, loading } = useRequest(true);
  const { request: requestget_details, response: responseget_details, loading: get_detailsloading } = useRequest(true);
  const dispatch = useDispatch();

  const hoteslList = useMemo(() => {
    if (response?.response) {
      return response?.response?.predictions;
    }
    return [];
  }, [response]);

  useEffect(() => {
    if (responseget_details?.response) {
      setHotelDetail(responseget_details?.response?.result); // Update the hotel details when response changes
    }
  }, [responseget_details]);

  const fetch_hotel_details = (placeId) => {
    requestget_details("POST", apis.GET_HOTEL_DETAILS, { placeId });
  };

  const fetchHotelDetailsAndCloseList = (placeId) => {
    fetch_hotel_details(placeId);
    setSelectedHotel(placeId); // Mark hotel as selected and hide list
  };

  const nextClick = () => {
    let payload = {
      hotel_name: hoteslDetail?.name,
      website: hoteslDetail?.website,
      location: hoteslDetail?.formatted_address,
      map_url: hoteslDetail.url,
      lat: hoteslDetail?.geometry?.location?.lat,
      long: hoteslDetail?.geometry?.location?.lng,
      google_photos: hoteslDetail?.photos?.map((photo) => (`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=AIzaSyAN-RY595XViAsgKD5nXRkH3zmtc6iqzjE`)).join(','),
      country: hoteslDetail?.address_components?.find(component =>
        component.types.includes("country")
      )?.long_name,
    };
    dispatch(siteContentActions.setPassInformation(payload));
    router.push("/dashboard/hotel-info");
  };

  const refreshData = () => {
    setHotelDetail(null); 
    setSelectedHotel(null); 
  };

  
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const userDetailsFromUrl = searchParams.get("userDetails");
    

   if (userDetailsFromUrl) {
     try {
       const userDetails = JSON.parse(decodeURIComponent(userDetailsFromUrl));
       localStorage.setItem("userdetails", JSON.stringify(userDetails));
     } catch (error) {
       console.error("Error parsing user details from URL:", error);
       toast.error("Invalid user details.");
     }
   }
 }, [searchParams]);

  return (
    <>
      <h3 className="comman-heading3">
        Please complete all sections with*. The rest of the sections are optional
      </h3>
      <form>
        <div className="desh-borderBox">
          <div className='row'>
            <div className='col-lg-6'>
              <div className="form-group py-[10px]">
                <label htmlFor="name" className="form-label black-color h-[58px] ">
                  Search your Hotel on Google
                </label>
                <div className="with-input-btn">
                  <input
                    type="text"
                    placeholder="Hotel name"
                    name="name"
                    className="form-control with-border"
                    onChange={(e) => {
                      e.target.value && request("POST", apis.FETCH_HOTEL, { hotel: e.target.value });
                      setSeacrh(e.target.value);
                    }}
                  />
                </div>
                <button type="button" className="theme-btn hotel-btn mt-3" onClick={() => {
                    request("POST", apis.FETCH_HOTEL, { hotel: seacrh });
                  }}>
                    Fetch Hotel
                  </button>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className="with-input-btn hotel-infoClick rightHotelBlock">
                <div>
                  <p className="text- font-sans  h-[58px] mb-0 w-100">If your Hotel profile is not found on Google, please fill in manually</p>
                  <button type="button" className="theme-btn hotel-btn" onClick={() => {
                    router.push("/dashboard/hotel-info");
                  }}>
                    Click Here
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
     

      {/* Render list only if no hotel is selected */}
      {!selectedHotel && hoteslList && hoteslList.map((it, i) => (
        <div
          key={i}
          onClick={() => fetchHotelDetailsAndCloseList(it.place_id)}
          className="mb-0 bg-gray hover:bg-red-600 hover:text-#000 py-2 text-start px-2  flex cursor-pointer"
        >
          <svg className='mt-1' stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 384 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"></path>
          </svg>&nbsp;<p className='mb-1'>{it?.description}</p>
        </div>
      ))}

      {/* Render hotel details if a hotel is selected */}
      {selectedHotel && hoteslDetail && (
        <HotelDetails
          hotelName={hoteslDetail?.name}
          contactNo={hoteslDetail?.international_phone_number}
          location={hoteslDetail?.formatted_address}
          photos={hoteslDetail?.photos}
          nextClick={nextClick}
          map_url={hoteslDetail?.url}
          map_location={hoteslDetail?.geometry?.location}
          refreshData={refreshData}
        />
      )}


    </>
  );
}



export default AddHotelSeacrh


const HotelDetails = ({ hotelName, contactNo, location, photos, nextClick, map_url, map_location, refreshData }) => {
  return (
    <div className='desh-borderBox'>
      <div className='row'>
        <div className='col-md-6'>
          <ul className='hotel-img-list'>
            {photos?.map((photo, index) => (
              <li className='hotel-img-item' key={index}>
                <img
                  src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=AIzaSyAN-RY595XViAsgKD5nXRkH3zmtc6iqzjE`}
                  alt={`Photo ${index + 1}`}
                  className=''
                />
              </li>
            ))}
          </ul>
          <p className="hotelName">{hotelName}</p>
          <p className='contectNo'><b>Contact :</b><span> {contactNo}</span></p>
          {/* <p className='Location'><b>Location :</b><span><span className="locality">{location?.locality}</span>, <span className="region">{location?.region}</span>, <span className="country-name">{location?.country}</span></span></p> */}
          <p className='Location'><b>Location :{location}</b></p>
        </div>
        <div className='col-md-6'>
          {/* <iframe height="400" width="100%" src={map_url}></iframe> */}
          <Map location={map_location} />
        </div>
      </div>
      <div className='footer-btn flex justify-between'>

        <div className='text-start'>
          <p>If its not your hotel then </p>
          {/* <Link href="/dashboard/hotel-info" className='next-btn'>Previous </Link> */}
          <button onClick={refreshData} className='save-btn'>Find Another Hotel </button>

          {/* <Link href="/dashboard/hotel-info" className='next-btn'>Next </Link> */}
        </div>
        <div className=' text-end'>
          <p>Are you okay with with this hotel then </p>
          {/* <Link href="/dashboard/hotel-info" className='next-btn'>Previous </Link> */}
          <button onClick={nextClick} className='save-btn'>continue </button>

          {/* <Link href="/dashboard/hotel-info" className='next-btn'>Next </Link> */}
        </div>
      </div>
    </div>
  );
};