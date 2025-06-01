"use client";
import { apis, BASEURL } from '@component/apiendpoints/api';
import useRequest from '@component/hooks/UseRequest';
import React, { useEffect, useState } from 'react'
import Pagination from './Pagination';
import HeadingWithoutSwiper from '../headingWithoutSwiper';
import VideoContainer from '../home/VideoContainer';
import FilterSection from '../home/FilterSection';
import { useRouter } from 'next/navigation';

function HotelWithCountry({params}) {
    const [hotelData,setHotelData] = useState([]);
    const route= useRouter();
    const {request,response,loading}= useRequest();
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage,setPerpage] = useState(0)

    useEffect(()=>{
         if (params) {
              request("GET", `${apis.HOTEL_BY_COUNTRY}/${params?.slug}?page=${currentPage}`)
            }
    },[currentPage]);

    useEffect(()=>{
        if(response){
            setHotelData(response.hotels)
            setPerpage(response?.totalPages)
        }
    },[response])

    const handleRoute =(slug)=>{
        route.push(`/hotels/${slug}`)
    }
 
   

     // Calculate total pages dynamically
    //  const totalPages = hotelData ? Math.ceil(hotelData.length / perPage) : 1;
        
    //  // Extract hotels for the current page
    //  const paginatedHotels =hotelData?.slice((currentPage - 1) * perPage, currentPage * perPage) || [];
    // //  console.log("paginatedHotels",paginatedHotels,hotelData);

  return (
    <>
    <section data-aos="zoom-in" className="hero-banner">
        <VideoContainer />
    </section>
     <HeadingWithoutSwiper name={`Hotels In ${decodeURIComponent(params?.slug)}`}/>
     <div style={{marginTop:"-98px"}}>
        <FilterSection />
     </div>
     <div className="container whater-effect section-padding" data-aos="zoom-out-up">
                <div className="row">
                    {hotelData.map((hotel, index) => (
                        <div className="col-lg-3 col-md-4 col-sm-6" key={index} style={{marginRight:"-13px"}}>
                            <div className="hotel-cards overflow-hidden">
                                <div className="hotel-img">
                                    {hotel?.coverPhoto?.slice(0, 5) == "https" ? <img src={`${hotel?.coverPhoto}`} alt="Gallery 1" style={{ width: "100%", borderRadius: "8px" }} /> : <img src={`${BASEURL}/${hotel?.thumbnail_path}`} alt="Gallery 1" style={{ borderRadius: "8px" }} />
                                                          }
                                    {/* <img src={`${BASEURL}/${hotel?.thumbnail_path}`} alt={hotel.name} /> */}
                                </div>
                                <div className="hotel-content">
                                {/* <h4 className="hotel-name text-center">{hotel?.news_title}</h4> */}
                                    <div className="teams-name cursor-pointer" onClick={()=>handleRoute(hotel?.slug)}>{hotel?.hotel_name}</div>
                                    <div className="teams-role">{hotel?.country?.country}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={perPage} />
                </div>
    </>
  )
}

export default HotelWithCountry