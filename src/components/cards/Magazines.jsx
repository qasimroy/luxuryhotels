"use client"
import React, { useState } from 'react'
import Pagination from '../commonPage/Pagination';


const Magazines = () => {
    const commonSocialLinks = [
        { href: 'https://api.whatsapp.com/send/?text=Tech+Trends+2025+https%3A%2F%2Fluxuryhotelsplatform.com%2Fluxury-hotels-magazines+https%3A%2F%2Fbackend.luxuryhotelsplatform.com%2Fhttps%3A%2F%2Fexample.com%2Fimages%2Fcover.jpg&type=custom_url&app_absent=0', img: '/new/assets/img/whatsaap.png', alt: 'Facebook' },
        { href: 'https://www.facebook.com/share_channel/?type=empty&source_surface=external_share', img: '/new/assets/img/facebook.png', alt: 'Facebook' },
        { href: 'https://www.youtube.com', img: '/new/assets/img/youtube.png', alt: 'Youtube' },
        { href: 'https://x.com/intent/tweet?text=Tech%20Trends%202025%20url=https%3A%2F%2Fluxuryhotelsplatform.com%2Fluxury-hotels-magazines', img: '/new/assets/img/twitter.png', alt: 'Twitter' },
        { href: 'https://t.me/share/url?url=https%3A%2F%2Fluxuryhotelsplatform.com%2Fluxury-hotels-magazines&text=Tech%20Trends%202025', img: '/new/assets/img/telegram.png', alt: 'Telegram' },
        { href: 'https://www.linkedin.com/feed/?linkOrigin=LI_BADGE&shareActive=true&shareUrl=https%3A%2F%2Fluxuryhotelsplatform.com%2Fluxury-hotels-magazines', img: '/new/assets/img/linkedin.png', alt: 'Instagram' },
    ];
    const hotels = [
        {
            img: '/new/assets/img/Magazine1.jpg',
            magazinesName: 'MAYA UBUD SPA AND RESTAURANT',
        },
        {
            img: '/new/assets/img/Magazine2.jpg',
            magazinesName: 'BALINESE OASIS HOTEL',
        },
        {
            img: '/new/assets/img/Magazine3.jpg',
            magazinesName: 'LUXURY BEACH RESORT',
        },
        {
            img: '/new/assets/img/Magazine4.jpg',
            magazinesName: 'SERENE HILLTOP VILLA',
        },
        {
            img: '/new/assets/img/Magazine1.jpg',
            magazinesName: 'TRANQUIL RIVERSIDE RETREAT',
        },
    ];
      const [currentPage, setCurrentPage] = useState(1);
            const perPage = 8;
            const totalPages = hotels ? Math.ceil(hotels?.length / perPage) : 1;
          
            const paginatedHotels =hotels?.slice((currentPage - 1) * perPage, currentPage * perPage) || [];
    return (
        <>
            
            <div className="row">
                {paginatedHotels.map((hotel, index) => (
                    <div className="col-lg-3 col-md-4 col-sm-6" key={index} style={{marginTop:"20px"}}>
                        <div className="hotel-cards"
                            style={{width: "100%"}}
                        >
                            <div className="hotel-img">
                                <img src={hotel.img} alt={hotel.magazinesName} />
                            </div>
                            <div className="hotel-content"
                                style={{width: "100%", marginLeft: "0px"}}
                            >
                            <button className="bg-golden text-white px-3 py-1  rounded-md my-3 uppercase w-full" fdprocessedid="dxd8ai"
                                style={{height: "60px"}}
                            >{hotel.magazinesName}</button>
                                <ul className="social-link">
                                    {commonSocialLinks.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <a href={link.href} target="_blank" rel="noopener noreferrer">
                                                <img src={link.img} alt={link.alt} />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-3" >
      <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
      </div>
        </>
    )
}

export default Magazines