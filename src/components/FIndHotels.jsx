"use client"
import React, { useEffect, useState } from 'react'
import FilterSection from './home/FilterSection'


import AOS from "aos";
import "aos/dist/aos.css"

import Pagination from './commonPage/Pagination';
import useRequest from '@component/hooks/UseRequest';
import { apis, BASEURL } from '@component/apiendpoints/api';
import HeadingWithoutSwiper from './headingWithoutSwiper';

function FIndHotels() {
    const [data,setData]= useState([])
    const [totalPage,setTotalPage] = useState(0)
    const {request,response,loading} = useRequest(true)

    const [currentPage, setCurrentPage] = useState(1);
          // const perPage = 12;
        console.log("currentPage",currentPage);

    useEffect(() => {
            AOS.init({
              duration: 2000, // Animation duration (in ms)
              easing: "ease-in-out", // Easing for the animation
              once: false,
              offset: 120,  // Whether animation should happen only once
            });
            AOS.refresh();

            request("GET",`${apis.GET_ALL_HOTELS}?page=${currentPage}`);
          },[currentPage]);

          useEffect(()=>{
            if(response){
                console.log(response,"response ===>>>>>");
                setData(response?.hotels)
                setTotalPage(response?.totalPages)
            }
          },[response])

          // Calculate total pages dynamically
         
        
          // Extract hotels for the current page
          // const paginatedHotels =data?.slice((currentPage - 1) * perPage, currentPage * perPage) || [];
          // console.log("paginatedHotels",paginatedHotels,data);

  return (
   <>  
       <div style={{marginTop:"-20px"}}>

<FilterSection/>
 </div>
      
       <div className="section-head">
                    <div className="container">
                        <div className="sectionInnerHead">
                            <h2 className="section-heading">Luxury hotels selection</h2>
                        </div>

                    </div>

                </div>
       <div className='container'>
         <section className="newly-listed">
         <div className="container whater-effect section-padding " data-aos="zoom-out-up">

          <div className="row">
            {data?.map((hotel, index) => (
                <div className="col-lg-3 col-md-4 col-sm-6" key={index} style={{marginRight:"-13px", marginTop:"-30px", marginBottom:"80px"}}>
                    <div className="hotel-cards overflow-hidden">
                        <div className="hotel-img">
                          <img src={hotel?.coverPhoto} alt={hotel.name} />
                        </div>
                        <div className="hotel-content" style={{height:"120px", content:"center"}}>
                        <h4 className="hotel-name text-center" onClick={() => handleRoute(hotel?.slug)}>{hotel?.hotel_name}</h4>
                            {/* <div className="teams-name cursor-pointer" onClick={() => handleRoute(hotel?.slug)}>{hotel?.business_name}</div> */}
                            {/* <p className="mb-2 text-black text-[15px] mt-2">{hotel?.competitionclosure ?? "15 May 2020 9:00 am"}</p> */}

                            <div className="teams-role">{hotel.country?.country}</div>
                            {/* <button className="text-[#846316] cursor-pointer" fdprocessedid="cmxd82" onClick={() => handleRoute(hotel?.slug)}>READ MORE</button> */}
                        </div>
                    </div>
                </div>
            ))}
        </div>
  </div>
        <div style={{marginTop:"-80px"}}>
  <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPage} />
  </div>
      
    </section>
    </div>
   </>
    
  )
}

export default FIndHotels