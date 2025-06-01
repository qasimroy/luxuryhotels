"use client";
import { apis } from '@component/apiendpoints/api';
import useRequest from '@component/hooks/UseRequest';
import React, { useEffect, useState } from 'react'
import Table from './Table';
import Link from 'next/link';
import toast from 'react-hot-toast';

function WinHolidayData() {

  const [winHolidayData, setWinHolidayData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isTrue, setIsTrue] = useState(false)

  const { request: requestData, response: responseData, loading: loadingData } = useRequest(true);
  const userdetails = localStorage.getItem("userdetails");
  const hotel_deatails = localStorage.getItem("hotel_details");
  const userdetailsJsonString = JSON.parse(userdetails);
  const hotelDetailsJsonString = JSON.parse(hotel_deatails);

  useEffect(() => {
    // if (!showModal) {
    if (hotelDetailsJsonString?._id) {

      requestData("GET", `${apis.GET_ALL_WIN_HOLIDAY__DATA_DASHBOARD}/${hotelDetailsJsonString?._id}`);
    }
    // }
  }, []);

  useEffect(() => {
    if (isTrue) {
      requestData("GET", `${apis.GET_ALL_WIN_HOLIDAY__DATA_DASHBOARD}/${hotelDetailsJsonString?._id}`);
    }

  }, [isTrue])

  useEffect(() => {
    if (responseData) {
      setWinHolidayData(responseData?.response);
    }
  }, [responseData]);
  const filteredData = winHolidayData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())

  );
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
    <div className="dashboard-section p-0">

      <div className="text-end">


      </div>
      <div className="white-box">
        {isChecking ? (
          <>
            <div className="with-input-btn ">
              <div className="form-group w-100">
                <label className="comman-heading3 mb-2">Search by Holiday Title</label>
                <input
                  type="text"
                  placeholder="Search by title"
                  className="form-control with-border"
                  value={searchTerm} // Bind the value to the state
                  onChange={(e) => setSearchTerm(e.target.value)} // Update the search term state
                />
              </div>
            </div>
            <Table winHolidayData={filteredData} setIsTrue={setIsTrue} isTrue={isTrue} />


          </>
        ) : (
          <>
            <h3 className="comman-heading3">
              if you want to see the data of this page then You need to purchase a package first!
            </h3>
          </>
        )}

        <div className='footer-btn text-end'>
          <Link href="/dashboard/voter-information" className='next-btn'>Previous</Link>

          <Link href="/dashboard/reviews" className='next-btn'>Continue</Link>
        </div>

      </div>
    </div>
  )
}

export default WinHolidayData