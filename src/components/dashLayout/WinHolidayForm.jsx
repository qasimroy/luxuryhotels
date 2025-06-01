"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useRequest from "@component/hooks/UseRequest";
import WinHolidayConditions from "@component/modals/WinHolidayCondition";
import { apis } from "@component/apiendpoints/api";
import Link from "next/link";
import Table from "./Table";
import toast from "react-hot-toast";
import WinHolidayNewsModal from "@component/modals/WinHolidayNewsModal";
import { useRouter } from "next/navigation";

function WinHolidayForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [winHolidayData, setWinHolidayData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [winHolidayNewsModal, setWinHolidayNewsModal] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { request, response, loading } = useRequest(true);
  const { request: requestData, response: responseData, loading: loadingData } = useRequest(true);
  const userdetails = localStorage.getItem("userdetails");
  const hotel_deatails = localStorage.getItem("hotel_details");
  const userdetailsJsonString = JSON.parse(userdetails);
  const hotelDetailsJsonString = JSON.parse(hotel_deatails);
  const router = useRouter();

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const showModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const onSubmit = (data) => {

    if (!hotelDetailsJsonString?._id) {
      return toast.error("Add hotel details first then add win holiday")
    }
    const payload = {
      hotelId: hotelDetailsJsonString?._id,
      title: data.title,
      room_type: data.room_type,
      adult_attendees: data.adult_attendees,
      children_attendees: data.children_attendees,
      dateFrom: data.dateFrom,
      dateTo: data.dateTo,
      hotelRepId: userdetailsJsonString?._id,
      competitionclosure: data.competitionclosure,
      holidaydescription: data.holidaydescription,
      agree_conditions: true,
    };

    request("POST", apis.WIN_A_HOLIDAY_API, payload);
  };

  useEffect(() => {
    if (response) {
      reset();
      router.push("/dashboard/nominate-hotel")
      setShowModal(!showModal);
    }
  }, [response]);

  // useEffect(() => {
  //   // if (!showModal) {
  //   if (hotelDetailsJsonString?._id) {

  //     requestData("GET", `${apis.GET_ALL_WIN_HOLIDAY_DATA}/${hotelDetailsJsonString?._id}`);
  //   }
  //   // }
  // }, []);

  // useEffect(() => {
  //   if (responseData) {
  //     setWinHolidayData(responseData?.response);
  //   }
  // }, [responseData]);

  // Filtered data based on the search term
  // const filteredData = winHolidayData.filter((item) =>
  //   item.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );


  const [showModal2, setShowModal2] = useState(false);

  const toggleModal = () => {
    setShowModal2(!showModal2);
  };

  useEffect(() => {
    const modalCount = sessionStorage.getItem("modalWinHolidayCount") || 0;

    if (modalCount < 5) {
        setWinHolidayNewsModal(true);
        sessionStorage.setItem("modalWinHolidayCount", Number(modalCount) + 1);
    }
}, []);

    const closeNewsLetter =()=>{
      setWinHolidayNewsModal(false);
    }

  return (
    <>
      <div className="dashboard-section p-0">
        {/* <div className="text-end">
          {!isOpen ? (
            <button className="theme-btn mb-3 ms-auto" onClick={toggleCollapse}>
              Create Holiday
            </button>
          ) : (
            <button className="theme-btn mb-3 ms-auto" onClick={toggleCollapse}>
              Close
            </button>
          )}
        </div> */}

       
          <>
            <h3 className="comman-heading3">Win a holiday (*Optional)</h3>

            <div className="desh-borderBox light-border">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      {/* <label htmlFor="title" className="form-label">
                        Title<span>*</span>
                      </label> */}
                      <input
                        type="text"
                        placeholder="Title *"
                        className="form-control"
                        {...register("title", { required: true })}
                      />
                      {errors.title && <span className="text-danger">This field is required</span>}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      {/* <label htmlFor="room_type" className="form-label">
                        Room type<span>*</span>
                      </label> */}
                      <input
                        type="text"
                        placeholder="Room type *"
                        className="form-control"
                        {...register("room_type", { required: true })}
                      />
                      {errors.room_type && <span className="text-danger">This field is required</span>}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      {/* <label htmlFor="adult_attendees" className="form-label">
                        Number of Adults
                      </label> */}
                      <input
                        type="number"
                        placeholder="Number of Adults"
                        className="form-control"
                        {...register("adult_attendees")}
                      />
                      {/* {errors.adult_attendees && <span className="text-danger">This field is required</span>} */}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      {/* <label htmlFor="children_attendees" className="form-label">
                        Number of Children
                      </label> */}
                      <input
                        type="number"
                        placeholder="Number of Children"
                        className="form-control"
                        {...register("children_attendees")}
                      />
                      {/* {errors.children_attendees && <span className="text-danger">This field is required</span>} */}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="dateFrom" className="form-label">
                        Valid From
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        {...register("dateFrom", { required: true })}
                      />
                      {errors.dateFrom && <span className="text-danger">This field is required</span>}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="dateTo" className="form-label">
                        Valid To
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        {...register("dateTo", { required: true })}
                      />
                      {errors.dateTo && <span className="text-danger">This field is required</span>}
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="competitionclosure" className="form-label">
                        Close in Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        {...register("competitionclosure", { required: true })}
                      />
                      {errors.competitionclosure && <span className="text-danger">This field is required</span>}
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      {/* <label htmlFor="holidaydescription" className="form-label">
                        Description<span>*</span>
                      </label> */}
                      <textarea
                        placeholder="Description"
                        className="form-control"
                        {...register("holidaydescription", { required: true })}
                      ></textarea>
                      {errors.holidaydescription && <span className="text-danger">This field is required</span>}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                        <label htmlFor="youtubeLink" className="form-label">
                           InstaGram Link
                        </label>
                        <input
                            type="url"
                            placeholder="Enter hotel Instagram link"
                            className="form-control"
                            {...register("InstagramLink")}
                        />
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="form-group">
                        <label htmlFor="facebook" className="form-label">
                            facebook Link
                        </label>
                        <textarea
                            placeholder="Enter hotel facebook link"
                            className="form-control"
                            {...register("facebookLink")}
                        />
                    </div>
                </div>

                  <div className="col-md-12 mt-4">
                    <div className="form-group">
                      <input
                        className="checkbox"
                        type="checkbox"
                        id="conditions-check"
                        {...register("agree_conditions", { required: true })}
                      />
                      {errors.agree_conditions && <div className="text-danger">please accept policy</div>}
                      <label htmlFor="conditions-check" className="form-label"></label>
                      <span className="text-xs uppercase leading-5 text-grayDark mt-1">
                        I agree with this
                        <span
                          className="text-red-700 cursor-pointer"
                          onClick={showModalHandler}
                        >
                          condition
                        </span>
                      </span>
                      
                    </div>
                  </div>

                  <div className="footer-btn d-flex justify-content-end align-items-center gap-3">
                    <Link href="/dashboard/add-exclusive-offer" className="next-btn">Previous</Link>
                    <button type="submit" className="save-btn" disabled={loading}>
                      {loading ? "Submitting..." : "Submit"}
                    </button>
                    <div className="text-center mb-5">
                    <p className="mb-4">(If not Add Holiday then Press)</p>
                    <Link href="/dashboard/nominate-hotel" className="next-btn">Continue</Link>
                  </div>
                  </div>
                </div>
              </form>
            </div>
          </>
       
        {winHolidayNewsModal && (<WinHolidayNewsModal closeNewsLetter ={closeNewsLetter} />)}
        {showModal && <WinHolidayConditions closeModal={closeModalHandler} />}

        {/* {!isOpen && (
          <>
            <div className="white-box">
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
              <Table winHolidayData={filteredData} />
            </div>
          </>
        )} */}





      </div>
    </>
  );
}

export default WinHolidayForm;
