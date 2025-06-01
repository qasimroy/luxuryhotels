import { BASEURL } from '@component/apiendpoints/api';
import { getTravelNews } from '@component/lib/slice/sitesSetting';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Pagination from './commonPage/Pagination';

function TravelNewsPage() {
    const route = useRouter();
  
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getTravelNews())
    },[])
    const { travelNews } = useSelector((state) => state.siteSetting);

    const handleRoute = (item) => {
      route.push(`/news/${item}`);
    };
     const [currentPage, setCurrentPage] = useState(1);
      const perPage = 12;
    
      // Calculate total pages dynamically
      const totalPages = travelNews?.content ? Math.ceil(travelNews.content.length / perPage) : 1;
    
      // Extract hotels for the current page
      const paginatedHotels =travelNews?.content?.slice((currentPage - 1) * perPage, currentPage * perPage) || [];

    console.log("latestNews",paginatedHotels)
    const truncateText = (text, wordLimit) => {
      if (!text) return ""; // Handle undefined or empty text
      const words = text.split(" "); // Split into words
      return words.length > wordLimit
        ? words.slice(0, wordLimit).join(" ") + "..." // Keep only 4 words, add "..."
        : text; // If text has 4 or fewer words, show as it is
    };
  return (
    <>
      <div className="container whater-effect section-padding " data-aos="zoom-out-up"
        style={{marginTop:"5px",
        }}
      >
    <div className="row">
                {paginatedHotels?.map((hotel, index) => (
                    <div className="col-lg-3 col-md-4 col-sm-6" key={index} style={{marginRight:"-13px"}}>
                        <div className="hotel-cards overflow-hidden">
                            <div className="hotel-img"
                              style={{padding:"5px",
                                      // backgroundColor:"#D3D3D3",
                              }}
                            >
                              <img src={`${BASEURL}/${hotel?.thumbnail_path}`} alt={hotel.name} style={{ borderRadius: "10px" }} />
                            </div>
                            <div className="hotel-content"
                            >
                            <h4 className="hotel-name text-center">  {truncateText(hotel?.news_title, 4)}</h4>
                                <div className="teams-name cursor-pointer" onClick={() => handleRoute(hotel?.slug)}>
                                {truncateText(hotel?.business_name, 4)}
                                </div>
                                <p className="mb-2 text-black text-[15px] mt-2">{hotel?.createdAt ?? "15 May 2020 9:00 am"}</p>

                                <div className="teams-role">{hotel.country?.country}</div>
                                <button className="text-[#846316] cursor-pointer" fdprocessedid="cmxd82" onClick={() => handleRoute(hotel?.slug)}>READ MORE</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
      </div>
            <div className="p-3" >
      <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
      </div>
    </>
  )
}

export default TravelNewsPage