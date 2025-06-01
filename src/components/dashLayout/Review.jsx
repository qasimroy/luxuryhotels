"use client";

import React, { useEffect, useMemo, useState } from "react";

import useRequest from "@component/hooks/UseRequest";
import { apis, BASEURL } from "@component/apiendpoints/api";
import moment from "moment";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Review() {
  const [activeReplyId, setActiveReplyId] = useState(null); // Track the ID of the review being replied to
  const [reply, setReply] = useState("");
  const [payload, setPayload] = useState(null);

  const toggleReply = (idReviewData) => {
    if (activeReplyId === idReviewData?._id) {
      // Close the reply if it's already open
      setActiveReplyId(null);
    } else {
      // Open reply for the selected review
      setPayload(idReviewData);
      setActiveReplyId(idReviewData?._id);
    }
  };

  const [reviews, setReviews] = useState([]);

  const { request, response, loading } = useRequest(true);
  const { request: requestReviewReply, response: responseReviewReply, loading: loadingReviewReply } = useRequest(true);

  const hotel_deatails = localStorage.getItem("hotel_details");
  const Hotel_Info = JSON.parse(hotel_deatails);

  useEffect(() => {
    request("GET", `${apis.GET_ALL_REVIEWS}/${Hotel_Info?._id}`);
  }, []);

  useEffect(() => {
    if (response) {
      console.log("response", response);
      setReviews(response?.reviews);
    }
  }, [response]);

  const handleReplyReview = () => {
    requestReviewReply("POST", apis.REPLY_HOTEL_REVIEW, {
      message: reply,
      replier_email: payload?.reviewer_email,
      replier_name: payload?.reviewer_name,
      reviewId: payload?._id,
    });
    setReply(""); // Clear the reply after posting
    setActiveReplyId(null); // Close the reply form
  };

  useMemo(() => {
    if (responseReviewReply) {
      if(Hotel_Info?._id){

        request("GET", `${apis.GET_ALL_REVIEWS}/${Hotel_Info?._id}`);
      }
    }
  }, [responseReviewReply])

  const [isChecking, setIsChecking] = useState(false);
  const { request: requestCheckPackage, response: reponseCheckPage, loading: loadingCheckPage } = useRequest(true);

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
        }
      } catch (error) {
        console.error("Subscription check failed:", error);
        toast.error("Error checking subscription!");

      }
    };

    checkSubscription();
  }, []);


  return (
    <>
      {isChecking ? (<>
        {reviews?.length > 0 ? (
          <>
            <h3 className="comman-heading3">Read All Review From Getting User</h3>

            <div className="container mt-5">
              <div className="review-card border-bottom pb-3 mb-4">
                {reviews?.map((reviewData, key) => {
                  return (
                    <div key={reviewData?._id}>
                      <div className="d-flex align-items-start mt-1 p-2 border-bottom border-gray-300">
                        <img
                          style={{ width: "40px", height: "40px" }}
                          src={`${BASEURL}/${reviewData?.reviewer_image}`}
                          alt="User Avatar"
                          className="rounded-circle me-3"
                        />

                        <div>
                          <h5>{reviewData?.reviewer_name}</h5>
                          <span className="rating badge bg-danger text-white">
                            {reviewData?.overall_rating}/5
                          </span>
                          <span className="ms-2 fw-bold text-danger">
                            {reviewData?.overall_rating >= 4
                              ? "Excellent"
                              : reviewData?.overall_rating > 2 && reviewData?.overall_rating < 4
                                ? "Average"
                                : "POOR"}
                          </span>
                          <p className="mb-2 mt-1">{reviewData?.review}</p>

                          {reviewData?.replies?.length > 0 ? null : (
                            <span
                              className="reply-btn text-danger"
                              onClick={() => toggleReply(reviewData)}
                              style={{ cursor: "pointer", textDecoration: "underline" }}
                            >
                              Reply
                            </span>
                          )}
                          {reviewData?.replies?.length > 0 && (
                            reviewData?.replies?.map((item) => {
                              return (
                                <>

                                  <div className="d-flex align-items-center">
                                    {/* Circle with Letter */}
                                    <div
                                      className="rounded-circle d-flex justify-content-center align-items-center"
                                      style={{
                                        width: "40px",
                                        height: "40px",
                                        backgroundColor: "#f8f9fa",
                                        border: "1px solid #ccc",
                                        fontWeight: "bold",
                                        color: "#8B6914",
                                      }}
                                    >
                                      {item?.replier_name?.charAt(0)}
                                    </div>
                                    {/* Text */}
                                    <span className="ms-2" style={{ color: "#8B6914", fontSize: "16px" }}>
                                      {item?.message}
                                    </span>
                                  </div>
                                </>
                              )
                            })
                          )}
                        </div>
                        <div className="ms-auto text-muted">
                          {moment(reviewData?.createdAt).format("MMMM Do YYYY")}
                        </div>
                      </div>


                      {/* Show reply form for the specific review */}
                      {activeReplyId === reviewData?._id && (
                        <div className="mt-3 mb-3 p-1">
                          <textarea
                            className="form-control border-danger"
                            placeholder="COMMENT"
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                          ></textarea>
                          <button
                            className="btn btn-danger mt-2"
                            onClick={handleReplyReview}
                          >
                            Post
                          </button>
                          <button
                            className="btn btn-danger mt-2"
                            onClick={() => setActiveReplyId(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (<h3 className="comman-heading3">No Reviews</h3>)}
      </>) : (<>
        <h3 className="comman-heading3">
          if you want to see the data of this page then You need to purchase a package first!
        </h3>
      </>)}


      <div className='footer-btn text-end'>
        <Link href="/dashboard/win-holiday-data" className='next-btn'>Previous</Link>

        <Link href="/dashboard/edit-hotel" className='next-btn'>Continue</Link>
      </div>

    </>
  );
}
