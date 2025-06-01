
"use client";

import React, { useEffect, useState } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  //   MDBTablePagination, 
  MDBBadge,
  MDBBtn
} from "mdb-react-ui-kit"; // Correct imports
import useRequest from "@component/hooks/UseRequest";
import { apis } from "@component/apiendpoints/api";
import moment from "moment";
import VoteinfoModal from "@component/modals/VoteinfoModal";
import Link from "next/link";
import toast from "react-hot-toast";

export default function VoterInformation() {
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [reviewsPerPage, setReviewsPerPage] = useState(2); // Number of reviews per page
  const [voterInfo, setVoterInfo] = useState([]);
  const { request, response, loading } = useRequest(true);
  const { request:requestCheckPackage, response:reponseCheckPage, loading:loadingCheckPage } = useRequest(true);
  const [voteInfoModal, setVoteInfoModal] = useState(false);
  const [singleVoterInfoData, setSingleVoterInfoData] = useState(null);
  const { request: singleVoteInfoRequest, response: singleVoteResponse, loading: singleLoading } = useRequest(true);

  const hotel_deatails = localStorage.getItem("hotel_details");
  const Hotel_Info = JSON.parse(hotel_deatails)

  useEffect(() => {

    if (Hotel_Info?._id) {

      request("GET", `${apis.GET_ALL_VOTER_INFORMATION}/${Hotel_Info?._id}`)
    }
  }, [])

  const showSingleVoteInfo = (voteId) => {
    singleVoteInfoRequest("GET", `${apis.GET_SINGLE_VOTE_INFO}/${voteId}`)
  }

  useEffect(() => {
    console.log("singleVoteResponse", singleVoteResponse)
    if (singleVoteResponse) {
      setVoteInfoModal(true)
      setSingleVoterInfoData(singleVoteResponse?.data)
    }
  }, [singleVoteResponse])



  useEffect(() => {
    if (response) {
      console.log("GET_ALL_VOTER_INFORMATION", response)
      setVoterInfo(response?.data)
    }

  }, [response])

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

        console.log("reponse",response)
        
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

  // Filter reviews based on the search term
  const filteredReviews = voterInfo.filter(
    (review) =>
      review?.nominatorName?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      review?.nomination_type?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  // Calculate the current reviews to display based on pagination
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);

  // Handle page change
  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  return (
    <>
      <h3 className="comman-heading3">Read All Voter InFormation</h3>
      <div className="white-box">
        {isChecking ? (
          <>
        {voterInfo?.length > 0 ? (<>
          <div className="with-input-btn">
            <div className="form-group  w-100">
              <label className="comman-heading3 mb-2">Search by Voter Name</label>
              <input
                type="text"
                placeholder="Search by title"
                className="form-control with-border"
                value={searchTerm} // Bind the value to the state
                onChange={(e) => setSearchTerm(e.target.value)} // Update the search term state
              />
            </div>
          </div>
          <div className="table-responsive">
            <MDBTable className="table align-middle theme-table mb-0 bg-white" align="middle">
              <MDBTableHead className="table-dark">
                <tr>
                  <th scope="col">Nominator Type</th>
                  <th scope="col"> Voter Name</th>
                  {/* <th scope="col">Country</th> */}
                  <th scope="col">Created</th>
                  <th scope="col" className="text-center">Actions</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {voterInfo.length > 0 ? (
                  voterInfo.map((review, index) => (
                    <tr key={index}>
                      <td>
                        <div className="d-flex align-items-center">
                          {/* <img
               src="https://mdbootstrap.com/img/new/avatars/8.jpg"
               alt=""
               style={{ width: "45px", height: "45px" }}
               className="rounded-circle"
             /> */}

                          {review.nomination_type}


                        </div>
                      </td>
                      <td>
                        {review.nominatorName}
                        {/* <p className="text-muted mb-0">{review.department}</p> */}
                      </td>
                      {/* <td>
           <MDBBadge color={review.status === "Active" ? "success" : "warning"} pill>
             {review.status}
           </MDBBadge>
         </td> */}
                      <td>{moment(review?.createdAt).format("DD-MM-YYYY")}</td>
                      {/* <td>{review.country}</td> */}
                      <td className="text-center">
                        <MDBBtn color="link" rounded size="sm">
                          <div className="flex gap-[5px] text-[#000] text-xs items-center" onClick={() => showSingleVoteInfo(review?._id)}><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" className="cursor-pointer h-5 w-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path></svg></div>
                        </MDBBtn>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No Vote found
                    </td>
                  </tr>
                )}
              </MDBTableBody>
              {/* <MDBTablePagination
 className="d-flex justify-content-center"
 totalItems={filteredReviews?.length}
 itemsPerPage={reviewsPerPage}
 activePage={currentPage}
 onPageChange={handlePageChange}
/> */}
            </MDBTable>
          </div>

        </>) : (<h3 className="comman-heading3">No Voter InFormation</h3>
        )}
          </>
        ) : (<>
        <h3 className="comman-heading3">
           if you want to see the data of this page then You need to purchase a package first!
        </h3>
        </>)}

<div className='footer-btn text-end'>
                                <Link href="/dashboard/payment" className='next-btn'>Previous</Link>

                                <Link href="/dashboard/win-holiday-data" className='next-btn'>Continue</Link>
                            </div>
        {voteInfoModal && (<VoteinfoModal singleVoterInfoData={singleVoterInfoData} setVoteInfoModal={setVoteInfoModal} />)}
    
      </div> 
      
      </>
  );
}
