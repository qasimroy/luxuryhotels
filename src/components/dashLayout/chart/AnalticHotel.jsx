"use client"
import React, { useEffect, useMemo, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip,
} from 'chart.js';
import Barchart from './Barchart';
import LineChart from './Linchart';
import CountryAnalytics from './CountryAnalytics'
import Link from 'next/link';
import useRequest from '@component/hooks/UseRequest';
import { apis } from '@component/apiendpoints/api';
import CounrtyAnaltics from './CounrtyAnaltics';
import GooGleAnalyticsNews from '@component/modals/GooGleAnalyticsNews';
import toast from 'react-hot-toast';

// Register required Chart.js components
ChartJS.register(LineElement, BarElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip);

const  LineAndBarChart = () => {

  const {request,response,loading} = useRequest(true);
  const [barChartData,setBarChartData] = useState([]);
  const [lineChartData,setLineChartData] = useState([])
  const [showGoogleAnalyticsNews,setShowGoogleAnalyticsNews] = useState(false)
  const {request:requestReview,response:responseReview,loading:loadingReview} = useRequest(true);

  useEffect(()=>{
    request("POST",`${apis.GET_ALL_DATA_FROM_GRAPH}/visit`);
    requestReview("POST",`${apis.GET_ALL_DATA_FROM_GRAPH}/view`)
  },[])

  useMemo(()=>{
    if(response){
      setLineChartData(response?.data)
    }
    if(responseReview){
      setBarChartData(responseReview?.data)
    }
  },[response,responseReview])

  useEffect(() => {
    const modalCount = sessionStorage.getItem("modalAnalyticsCount") || 0;

    if (modalCount < 5) {
        setShowGoogleAnalyticsNews(true);
        sessionStorage.setItem("modalAnalyticsCount", Number(modalCount) + 1);
    }
}, []);
    function closeNewsLetter(){
      setShowGoogleAnalyticsNews(false); //
    }

     const { request: requestCheckPackage, response: reponseCheckPage, loading: loadingCheckPage } = useRequest(true);
    
    
      const [isChecking, setIsChecking] = useState(false);
    
      useEffect(() => {
        const checkSubscription = async () => {
          try {
            const hotel_details = localStorage.getItem("hotel_details")
              ? JSON.parse(localStorage.getItem("hotel_details"))
              : null;
            const user_details = localStorage.getItem("userdetails")
              ? JSON.parse(localStorage.getItem("userdetails"))
              : null;
    
            // if (!user_details?._id ) {
            //   router.push("/dashboard/select-package");
            //   return;
            // }
    
            const response = await requestCheckPackage("POST", apis.GET_HOTELS_ADDONS_DATA, {
              userID: user_details?._id,
              hotelId: hotel_details?._id,
            });
    
            console.log("reponse", response)
    
            if (response?.data?.plan?.endDate) {
              setIsChecking(true);
            } else {
              toast.error("if you want to see the data of this page then You need to purchase a package first!");
    
            }
          } catch (error) {
            console.error("Subscription check failed:", error);
            toast.error("Error checking subscription!");
    
          }
        };
    
        checkSubscription();
      }, []);
  
  
  return (
    <div>
      {isChecking ? (<>
      <h4>Analtics For Website Visits</h4>
      <LineChart lineChartData={lineChartData} />
      <h4>Analtics For Review</h4>
      <Barchart barChartData={barChartData} />
      <h4>Analytics for Countries Guest Coming From</h4>
      <CounrtyAnaltics barChartData={barChartData}/>

   

      </>) : (<>
        <h3 className="comman-heading3">
              if you want to see the data of this page then You need to purchase a package first!
            </h3>
      </>)}
      <div className='footer-btn text-end'>
            <Link href="/dashboard/edit-hotel" className='next-btn me-auto'>  Previous </Link>
                {/* <a href='' className='save-btn'>  Proceed to payment </a>
            <Link href="/dashboard/hotel-analytics" className='next-btn me-auto'>  Next </Link> */}
            </div>
            {showGoogleAnalyticsNews && (<GooGleAnalyticsNews closeNewsLetter={closeNewsLetter} />)}
    </div>
  );
};

export default LineAndBarChart;

