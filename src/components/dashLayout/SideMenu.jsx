"use client"
import React, { useEffect, useState } from 'react'
import Link from "next/link";
import useRequest from '@component/hooks/UseRequest';
import { apis } from '@component/apiendpoints/api';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import SubscriptionCountdown from '../commonPage/SubsCriptionsCountDown';

const SideMenu = () => {

    const { request, response, loading } = useRequest(true);
    const router = useRouter();
    const [endDate,setEndDate] = useState(null)
    const {request:requestCountDown,response:responseCountDown} = useRequest(true);

    const pathName = usePathname()


    console.log("pathName", pathName);

    const userDetails = JSON.parse(localStorage.getItem("userdetails"));
    const handleLogout = () => {
        // Retrieve the user details from localStorage and parse it as JSON

        if (userDetails && userDetails.authToken) {
            // Send the POST request with the authToken as the payload
            request("POST", apis.LOGOUT_API, { authToken: userDetails.authToken });



        } else {
            console.error("No user details or authToken found in localStorage");
        }
    };

    useEffect(() => {
        if (response) {
            // On successful response, clear user details from localStorage and redirect
            localStorage.removeItem("userdetails");
            toast.success(response?.message);
            router.push("/");
        }
    }, [response])

    const hotel_details = localStorage.getItem("hotel_details")
    ? JSON.parse(localStorage.getItem("hotel_details"))
    : null;
    const getCounDwn =async()=>{
       try{

           const response = await requestCountDown("POST", apis.GET_HOTELS_ADDONS_DATA, {
               userID: userDetails?._id,
               hotelId: hotel_details?._id,
             });
             console.log(response,"===")
             if(response){
               setEndDate(response?.data?.plan?.endDate)
             }
       }catch(error){
        toast.error("Error in counding")
       }
    }

    useEffect(()=>{
        getCounDwn()
    },[])
    const dashboardPaths = [
        "/dashboard",
        "/dashboard/hotel-info",
        "/dashboard/facilities-amenities",
        "/dashboard/contact-info",
      ];

      const isSubmenuActive = [
        "/dashboard/add-ons",
        "/dashboard/add-exclusive-offer",
        "/dashboard/win-a-holiday",
        "/dashboard/nominate-hotel",
        "/dashboard/travel-news",
      ]

    return (
        <div className="side_nav">
            <div className="dashboardSideBar dashboard-nav" id="sideMenu">
                <Link
                    href="javascript:void(0);"
                    className="dashIconFold"
                    id="foldBtn"
                >
                    <div className="folded">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={25}
                            height={20}
                            viewBox="0 0 25 20"
                            fill="none"
                        >
                            <path
                                d="M24.814 10C24.814 10.2806 24.7026 10.5496 24.5042 10.748C24.3058 10.9464 24.0367 11.0578 23.7562 11.0578H1.05784C0.777286 11.0578 0.508218 10.9464 0.309834 10.748C0.11145 10.5496 0 10.2806 0 10C0 9.71944 0.11145 9.45038 0.309834 9.25199C0.508218 9.05361 0.777286 8.94216 1.05784 8.94216H23.7562C24.0367 8.94216 24.3058 9.05361 24.5042 9.25199C24.7026 9.45038 24.814 9.71944 24.814 10ZM1.05784 2.11569H23.7562C24.0367 2.11569 24.3058 2.00424 24.5042 1.80585C24.7026 1.60747 24.814 1.3384 24.814 1.05784C24.814 0.777286 24.7026 0.508219 24.5042 0.309835C24.3058 0.111451 24.0367 0 23.7562 0H1.05784C0.777286 0 0.508218 0.111451 0.309834 0.309835C0.11145 0.508219 0 0.777286 0 1.05784C0 1.3384 0.11145 1.60747 0.309834 1.80585C0.508218 2.00424 0.777286 2.11569 1.05784 2.11569ZM23.7562 17.8843H1.05784C0.777286 17.8843 0.508218 17.9958 0.309834 18.1942C0.11145 18.3925 0 18.6616 0 18.9422C0 19.2227 0.11145 19.4918 0.309834 19.6902C0.508218 19.8886 0.777286 20 1.05784 20H23.7562C24.0367 20 24.3058 19.8886 24.5042 19.6902C24.7026 19.4918 24.814 19.2227 24.814 18.9422C24.814 18.6616 24.7026 18.3925 24.5042 18.1942C24.3058 17.9958 24.0367 17.8843 23.7562 17.8843Z"
                                fill="white"
                            />
                        </svg>
                    </div>
                </Link>
                <nav className="dashboard-nav-list">

                    <div className="dash-nav-li">
                         <p
                           className={`dashboard-nav-item scroll myProfile subMenuLink collapsed ${
                             dashboardPaths.includes(pathName)
                               ? "bg-[#846316] text-white rounded-md"
                               : ""
                           }`}
                           data-bs-toggle="collapse"
                           data-bs-target="#historySUbmenu"
                         >
                           <span className="icon_holder">
                             <svg
                               xmlns="http://www.w3.org/2000/svg"
                               fill="none"
                               viewBox="0 0 24 24"
                               strokeWidth="1.5"
                               stroke="currentColor"
                               aria-hidden="true"
                               data-slot="icon"
                             >
                               <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                               />
                             </svg>
                           </span>
                           <Link
                             href="/dashboard/manage-profile"
                             className={`title_dash_nav ${
                               dashboardPaths.includes(pathName) ? "text-white" : ""
                             }`}
                           >
                             Manage Profile
                           </Link>
                           <span className="arrowIconSubmenu ms-auto">
                             <svg
                               width="14"
                               height="8"
                               viewBox="0 0 14 8"
                               fill="none"
                               xmlns="http://www.w3.org/2000/svg"
                             >
                               <path
                                 fillRule="evenodd"
                                 clipRule="evenodd"
                                 d="M7.70832 7.70734C7.52079 7.89481 7.26648 8.00013 7.00132 8.00013C6.73616 8.00013 6.48185 7.89481 6.29432 7.70734L0.63732 2.05034C0.541809 1.9581 0.465627 1.84775 0.413218 1.72575C0.360809 1.60374 0.333223 1.47252 0.332069 1.33974C0.330915 1.20696 0.356217 1.07529 0.406498 0.952389C0.456779 0.829493 0.531032 0.71784 0.624925 0.623948C0.718817 0.530055 0.830469 0.455802 0.953365 0.405521C1.07626 0.35524 1.20794 0.329939 1.34072 0.331092C1.4735 0.332246 1.60472 0.359833 1.72672 0.412242C1.84873 0.464651 1.95907 0.540832 2.05132 0.636343L7.00132 5.58634L11.9513 0.636343C12.1399 0.454185 12.3925 0.35339 12.6547 0.355669C12.9169 0.357947 13.1677 0.463116 13.3531 0.648524C13.5385 0.833932 13.6437 1.08474 13.646 1.34694C13.6483 1.60914 13.5475 1.86174 13.3653 2.05034L7.70832 7.70734Z"
                                 fill="currentColor"
                               />
                             </svg>
                           </span>
                         </p>
                   
                         {/* Submenu that opens automatically based on pathname */}
                         <ul
                           className={`subMenuSide collapse title_dash_nav ${
                             dashboardPaths.includes(pathName) ? "show" : ""
                           }`}
                           id="historySUbmenu"
                         >
                           <li>
                             <Link
                               href="/dashboard"
                               className={`${pathName === "/dashboard" ? "active" : ""}`}
                             >
                               <svg
                                 width="9"
                                 height="14"
                                 viewBox="0 0 9 14"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg"
                               >
                                 <path
                                   d="M1.5 1L7.5 7L1.5 13"
                                   stroke="currentColor"
                                   strokeWidth="2"
                                   strokeLinecap="round"
                                   strokeLinejoin="round"
                                 />
                               </svg>
                               Search By Google
                             </Link>
                           </li>
                           <li>
                             <Link
                               href="/dashboard/hotel-info"
                               className={`${
                                 pathName === "/dashboard/hotel-info" ? "active" : ""
                               }`}
                             >
                               <svg
                                 width="9"
                                 height="14"
                                 viewBox="0 0 9 14"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg"
                               >
                                 <path
                                   d="M1.5 1L7.5 7L1.5 13"
                                   stroke="currentColor"
                                   strokeWidth="2"
                                   strokeLinecap="round"
                                   strokeLinejoin="round"
                                 />
                               </svg>
                               Hotel Info
                             </Link>
                           </li>
                           <li>
                             <Link
                               href="/dashboard/facilities-amenities"
                               className={`${
                                 pathName === "/dashboard/facilities-amenities" ? "active" : ""
                               }`}
                             >
                               <svg
                                 width="9"
                                 height="14"
                                 viewBox="0 0 9 14"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg"
                               >
                                 <path
                                   d="M1.5 1L7.5 7L1.5 13"
                                   stroke="currentColor"
                                   strokeWidth="2"
                                   strokeLinecap="round"
                                   strokeLinejoin="round"
                                 />
                               </svg>
                               Facilities and Amenities
                             </Link>
                           </li>
                           <li>
                             <Link
                               href="/dashboard/contact-info"
                               className={`${
                                 pathName === "/dashboard/contact-info" ? "active" : ""
                               }`}
                             >
                               <svg
                                 width="9"
                                 height="14"
                                 viewBox="0 0 9 14"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg"
                               >
                                 <path
                                   d="M1.5 1L7.5 7L1.5 13"
                                   stroke="currentColor"
                                   strokeWidth="2"
                                   strokeLinecap="round"
                                   strokeLinejoin="round"
                                 />
                               </svg>
                               Contact Info
                             </Link>
                           </li>
                         </ul>
                       </div>

                    <div className="dash-nav-li">
                        <Link href="/dashboard/preview-hotel"
                            className={`dashboard-nav-item ${pathName === "/dashboard/preview-hotel" ? "active" : ""}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                strokeWidth="1.5" stroke="currentColor" aria-hidden="true"
                                data-slot="icon">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6">
                                </path>
                            </svg>
                            <span className='title_dash_nav'>Preview Hotel profile</span>
                        </Link>
                    </div>

                    <div className="dash-nav-li">
                        <Link
                            className={`dashboard-nav-item scroll updatePassword ${pathName === "/dashboard/select-package" ? "active" : ""}`}
                            href="/dashboard/select-package"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                strokeWidth="1.5" stroke="currentColor" aria-hidden="true"
                                data-slot="icon">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5">
                                </path>
                            </svg>
                            <span className='title_dash_nav'>Select Package</span>
                        </Link>
                    </div>

                      <div className={`dash-nav-li`}>
                        <p className={`dashboard-nav-item scroll  myProfile subMenuLink collapsed ${isSubmenuActive.includes(pathName) ? "bg-[#846316] text-white rounded-md" : ""}`} data-bs-toggle="collapse"
                            data-bs-target="#filterData">
                            <span className="icon_holder">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    strokeWidth="1.5" stroke="currentColor" aria-hidden="true"
                                    data-slot="icon">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z">
                                    </path>
                                </svg>
                            </span>
                            <Link href="/dashboard/manage-profile" className={`title_dash_nav ${pathName === "/dashboard/add-ons" || pathName === "/dashboard/add-exclusive-offer" || pathName === "/dashboard/win-a-holiday" || pathName === "/dashboard/nominate-hotel" || pathName === "/dashboard/travel-news" ? " text-white" : ""}`}>
                              Extra  Features
                            </Link >
                            <span className="arrowIconSubmenu ms-auto">
                                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.70832 7.70734C7.52079 7.89481 7.26648 8.00013 7.00132 8.00013C6.73616 8.00013 6.48185 7.89481 6.29432 7.70734L0.63732 2.05034C0.541809 1.9581 0.465627 1.84775 0.413218 1.72575C0.360809 1.60374 0.333223 1.47252 0.332069 1.33974C0.330915 1.20696 0.356217 1.07529 0.406498 0.952389C0.456779 0.829493 0.531032 0.71784 0.624925 0.623948C0.718817 0.530055 0.830469 0.455802 0.953365 0.405521C1.07626 0.35524 1.20794 0.329939 1.34072 0.331092C1.4735 0.332246 1.60472 0.359833 1.72672 0.412242C1.84873 0.464651 1.95907 0.540832 2.05132 0.636343L7.00132 5.58634L11.9513 0.636343C12.1399 0.454185 12.3925 0.35339 12.6547 0.355669C12.9169 0.357947 13.1677 0.463116 13.3531 0.648524C13.5385 0.833932 13.6437 1.08474 13.646 1.34694C13.6483 1.60914 13.5475 1.86174 13.3653 2.05034L7.70832 7.70734Z" fill="currentColor" />
                                </svg>
                            </span>
                        </p>
                        <ul className={`subMenuSide collapse title_dash_nav ${
          isSubmenuActive.includes(pathName) ? "show" : ""
        }`} id="filterData">
                            <li>
                                <Link
                                    className={`dashboard-nav-item scroll updatePassword ${pathName === "/dashboard/add-ons" ? "active" : ""}`}
                                    href="/dashboard/add-ons"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        strokeWidth="1.5" stroke="currentColor" aria-hidden="true"
                                        data-slot="icon">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z">
                                        </path>
                                    </svg>
                                    <span className='title_dash_nav'>Addons</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className={`dashboard-nav-item scroll updatePassword ${pathName === "/dashboard/add-exclusive-offer" ? "active" : ""}`}
                                    href="/dashboard/add-exclusive-offer"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        strokeWidth="1.5" stroke="currentColor" aria-hidden="true"
                                        data-slot="icon">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z">
                                        </path>
                                    </svg>
                                    <span className='title_dash_nav'>Add Exclusive Offer</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className={`dashboard-nav-item scroll ${pathName == "/dashboard/win-a-holiday" ? "active" : ""}`}
                                    href="/dashboard/win-a-holiday">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        strokeWidth="1.5" stroke="currentColor" aria-hidden="true"
                                        data-slot="icon">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z">
                                        </path>
                                    </svg>
                                    <span className='title_dash_nav'>Win A Holiday</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className={`dashboard-nav-item scroll managePayments ${pathName === "/dashboard/nominate-hotel" ? "active" : ""}`}
                                    href="/dashboard/nominate-hotel"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        strokeWidth="1.5" stroke="currentColor" aria-hidden="true"
                                        data-slot="icon">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z">
                                        </path>
                                    </svg>
                                    <span className='title_dash_nav'>Nominate Hotel</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className={`dashboard-nav-item scroll managePayments ${pathName === "/dashboard/travel-news" ? "active" : ""}`}
                                    href="/dashboard/travel-news"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        strokeWidth="1.5" stroke="currentColor" aria-hidden="true"
                                        data-slot="icon">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z">
                                        </path>
                                    </svg>
                                    <span className='title_dash_nav'> Post TRAVEL NEWS</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    
                  
                    <div className="dash-nav-li">
                        <Link
                            className={`dashboard-nav-item scroll updatePassword ${pathName === "/dashboard/payment" ? "active" : ""}`}
                            href="/dashboard/payment"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                strokeWidth="1.5" stroke="currentColor" aria-hidden="true"
                                data-slot="icon">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5">
                                </path>
                            </svg>
                            <span className='title_dash_nav'>Payment Description</span>
                        </Link>
                    </div>
                    <div className="dash-nav-li">
                        <Link href="/dashboard/voter-information"
                            className={`dashboard-nav-item ${pathName === "/dashboard/voter-information" ? "active" : ""} `}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                strokeWidth="1.5" stroke="currentColor" aria-hidden="true"
                                data-slot="icon">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6">
                                </path>
                            </svg>
                            <span className='title_dash_nav'>Voter Data</span>
                        </Link>
                    </div>
                    <div className="dash-nav-li">
                        <Link href="/dashboard/win-holiday-data"
                            className={`dashboard-nav-item ${pathName === "/dashboard/win-holiday-data" ? "active" : ""} `}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                strokeWidth="1.5" stroke="currentColor" aria-hidden="true"
                                data-slot="icon">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6">
                                </path>
                            </svg>
                            <span className='title_dash_nav'>Win Holiday Data</span>
                        </Link>
                    </div>

                    <div className="dash-nav-li">
                        <Link href="/dashboard/reviews"
                            className={`dashboard-nav-item  ${pathName === "/dashboard/reviews" ? "active" : ""}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                strokeWidth="1.5" stroke="currentColor" aria-hidden="true"
                                data-slot="icon">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25">
                                </path>
                            </svg>
                            <span className='title_dash_nav'>Reviews/ Reply to reviews</span>
                        </Link>
                    </div>
                    <div className="dash-nav-li">
                        <Link
                            className={`dashboard-nav-item scroll updatePassword ${pathName === "/dashboard/edit-hotel" ? "active" : ""} `}
                            href="/dashboard/edit-hotel"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                strokeWidth="1.5" stroke="currentColor" aria-hidden="true"
                                data-slot="icon">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z">
                                </path>
                            </svg>
                            <span className='title_dash_nav'>Edit Hotels Profile</span>
                        </Link>
                    </div>


                    <div className="dash-nav-li">
                        <Link
                            className={`dashboard-nav-item scroll updatePassword ${pathName === "/dashboard/hotel-analytics" ? "active" : ""}`}
                            href="/dashboard/hotel-analytics"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                strokeWidth="1.5" stroke="currentColor" aria-hidden="true"
                                data-slot="icon">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5">
                                </path>
                            </svg>
                            <span className='title_dash_nav'>Hotel Analytics</span>
                        </Link>
                    </div>
                    <div className="dash-nav-li">
                        <p className="dashboard-nav-item ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                strokeWidth="1.5" stroke="currentColor" aria-hidden="true"
                                data-slot="icon"
                                className="text-md  group-hover:text-white w-6 h-6 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75">
                                </path>
                            </svg>
                            <span className='title_dash_nav cursor-pointer' onClick={handleLogout}>Logout</span></p>
                    </div>
                    {endDate && (

                    <div className="dash-nav-li">
                        <p className="dashboard-nav-item ">
                           
                            <span className='title_dash_nav cursor-pointer'>
                                <SubscriptionCountdown endDate={endDate} />
                                </span></p>
                    </div>
                    )}
                </nav>
            </div>
        </div>
    )
}

export default SideMenu