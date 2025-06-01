"use client";
import { BASEURL } from '@component/apiendpoints/api';
import { getTravelNews } from '@component/lib/slice/sitesSetting';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'; // Import useEffect
import { useDispatch, useSelector } from 'react-redux';

function TravelNewsPage() {
     const route = useRouter();
    const dispatch = useDispatch();
    const { travelNews } = useSelector((state) => state.siteSetting);

    useEffect(() => {
        dispatch(getTravelNews());
    }, [dispatch]); // Include dispatch in dependency array


    const handleRoute = (item) => {
        route.push(`/news/${item}`)
    }
    console.log("latestNews", travelNews);

    return (
        <>  
        <div className="container whater-effect section-padding" data-aos="zoom-out-up">
            <div className="row">
                {travelNews?.content?.map((hotel, index) => (
                    <div className="col-lg-3 col-md-4 col-sm-6" key={index} style={{marginRight:"-13px"}}>
                        <div className="hotel-cards overflow-hidden">
                            <div className="hotel-img">
                                {/* Fix template literal syntax */}
                                <img src={`${BASEURL}/${hotel?.thumbnail_path}`} alt={hotel.name} />
                            </div>
                            <div className="hotel-content">
                            <h4 className="hotel-name text-center">{hotel?.news_title}</h4>
                                <div className="teams-name" onClick={()=>handleRoute(hotel?.slug)}>{hotel?.business_name}</div>
                                <div className="teams-role">{hotel?.country?.country}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            </div>
           
        </>
    );
}

export default TravelNewsPage;
