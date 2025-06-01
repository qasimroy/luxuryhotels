"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import HeadingWithoutSwiper from "./headingWithoutSwiper";
import useRequest from "@component/hooks/UseRequest";
import { apis } from "@component/apiendpoints/api";
import toast from "react-hot-toast";

function ContactUs() {
  const [switchTab, setSwitchTab] = useState(1);
  const [showMaginePrint, setShowMagzinePrint] = useState(false);
  const [showMaginePrintTravler, setShowMagzinePrintTravler] = useState(false);
  const { request, response, loading } = useRequest(true);
  const [visitHotel, setIsVisitHotel] = useState(false)



  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const handleSetSwitchHotel = () => {
    setSwitchTab(1);
  };

  const handleSetSwitchTravel = () => {
    setSwitchTab(2);
  };

  const onSubmitHotel = (data) => {
    request("POST", apis.CONTACT_US_FORM, data)
    reset(); // Reset form fields after successful submission
  };

  const onSubmitTravler = (data) => {
    request("POST", apis.CONTACT_US_FORM, data)
  }

  useEffect(() => {
    if (response) {
      toast.success(response?.message)
    }
  }, [response])



  return (
    <div>
      <HeadingWithoutSwiper name={"CONTACT US"} />
      <section className="dashboard-section section_wrap" style={{
        backgroundImage: `url('/new/assets/img/nominate-hotel-bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: "40px 118px",
      }}>

        <div style={{
          backgroundImage: `url('/new/assets/img/nominate-hotel-bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: "14px 0px"
        }}>
          {/* Tabs */}
          <div className="flex justify-start space-x-8 mb-6 border-b">
            <button
              className={`pb-2 ${switchTab === 1 ? "border-b-2 border-black" : ""
                } text-gray-500`}
              onClick={handleSetSwitchHotel}
            >
              HOTEL
            </button>
            <button
              className={`pb-2 ${switchTab === 2 ? "border-b-2 border-black" : ""
                } text-gray-500`}
              onClick={handleSetSwitchTravel}
            >
              TRAVELER
            </button>
          </div>
          {/* Form */}
          {switchTab === 1 && (
            <form onSubmit={handleSubmit(onSubmitHotel)}>
              <div className="form-group">
                {/* Name */}
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  placeholder="Name"
                  className="form-control mt-3"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}

                {/* Email */}
                <input
                  {...register("email", { required: "Email is required" })}
                  type="email"
                  placeholder="Email Address"
                  className="form-control mt-3"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}

                {/* Hotel You Represent */}
                <input
                  {...register("hotelYouRepresent", {
                    required: "Hotel name is required",
                  })}
                  type="text"
                  placeholder="Hotel You Represent"
                  className="form-control mt-3"
                />
                {errors.hotelYouRepresent && (
                  <span className="text-red-500 text-sm">
                    {errors.hotelYouRepresent.message}
                  </span>
                )}

                {/* Message */}
                <textarea
                  {...register("message", { required: "Message is required" })}
                  placeholder="Inquiry / Message"
                  rows="4"
                  className="form-control mt-3"
                ></textarea>
                {errors.message && (
                  <span className="text-red-500 text-sm">
                    {errors.message.message}
                  </span>
                )}

                {/* Request Visit */}
                <p className="text-sm font-medium text-gray-700 mt-3">
                  Would you like to request a hotel visit?
                </p>
                <div className="flex items-center space-x-4">
                  <label>
                    <input
                      {...register("reqVisit")}
                      type="radio"
                      value="true"
                      onChange={() => setIsVisitHotel(true)}
                      className="h-4 w-4"
                    // onChange={()=>setIsVisitHotel(true)}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      {...register("reqVisit")}
                      type="radio"
                      value="false"
                      onChange={() => setIsVisitHotel(false)}
                      className="h-4 w-4"
                    // onChange={()=>setIsVisitHotel(false)}
                    />
                    No
                  </label>

                </div>
                {visitHotel && (
                  <div className="flex space-x-4 mt-3">
                    <div>
                      <label className="block text-sm">From</label>
                      <input
                        {...register("from_date", {
                          required: "Start date is required",
                        })}
                        type="date"
                        className="form-control"
                      />
                      {errors.from_date && (
                        <span className="text-red-500 text-sm">
                          {errors.from_date.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm">To</label>
                      <input
                        {...register("to_date", {
                          required: "End date is required",
                        })}
                        type="date"
                        className="form-control"
                      />
                      {errors.to_date && (
                        <span className="text-red-500 text-sm">
                          {errors.to_date.message}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Sample Magazine */}
                <p className="text-sm font-medium text-gray-700 mt-3">
                  Would you like to receive a sample magazine?
                </p>
                <div className="flex items-center space-x-4">
                  <label>
                    <input
                      {...register("sampleMagazine")}
                      type="radio"
                      value="true"
                      onChange={() => setShowMagzinePrint(true)}
                      className="h-4 w-4"
                    // onChange={()=>setSampleMagzine(true)}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      {...register("sampleMagazine")}
                      type="radio"
                      value="false"
                      onChange={() => setShowMagzinePrint(false)}
                      className="h-4 w-4"
                    // onChange={()=>setSampleMagzine(false)}
                    />
                    No
                  </label>

                </div>
                {showMaginePrint && (
                  <div className="flex space-x-4 mt-3">
                    <label>
                      <input
                        {...register("magazineType")}
                        type="radio"
                        value="Digital"
                        checked={watch("magazineType") === "Digital"}
                        className="h-4 w-4"
                      />
                      Digital
                    </label>
                    <label>
                      <input
                        {...register("magazineType")}
                        type="radio"
                        value="Print"
                        checked={watch("magazineType") === "Print"}
                        className="h-4 w-4"
                      />
                      Print
                    </label>
                  </div>
                )}


                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-md mt-6"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
          {switchTab == 2 && (
            <form className="space-y-6" onSubmit={handleSubmit(onSubmitTravler)}>
              <div>
                <input
                  type="text"
                  id="name"
                  placeholder="FULL NAME"
                  {...register("name", { required: true })}
                  className="form-control mt-3"
                />
              </div>

              <div>

                <input
                  type="email"
                  id="email"
                  placeholder="EMAIL ADDRESS"
                  {...register("email", { required: true })}
                  className="form-control mt-3"
                />
              </div>

              <div>

                <textarea
                  id="message"
                  rows="4"
                  {...register("message")}
                  placeholder="INQUIRY / MESSAGE"
                  className="form-control mt-3"
                ></textarea>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mt-3">
                  Would you like to request a sample of our latest Magazine issue?
                </p>
                <div className="flex items-center space-x-4 mt-1">
                  <label className="flex items-center space-x-1">
                    <input
                      type="radio"
                      value="true"
                      {...register("sampleMagazine")}
                      className="h-4 w-4"
                      onChange={(e) => setShowMagzinePrintTravler(true)}
                    />
                    <span>YES</span>
                  </label>
                  <label className="flex items-center space-x-1">
                    <input
                      type="radio"
                      value="false"
                      {...register("sampleMagazine")}
                      className="h-4 w-4"
                      onChange={(e) => setShowMagzinePrintTravler(false)}
                    />
                    <span>NO</span>
                  </label>
                </div>
                {showMaginePrintTravler && (
                  <div className="flex items-center space-x-4 mt-1">
                    <label className="flex items-center space-x-1 mt-3">
                      <input
                        {...register("magazineType")}
                        type="radio"
                        value="Digital"
                        checked={watch("magazineType") === "Digital"}
                        className="h-4 w-4"
                      />
                      <span>Digital</span>
                    </label>
                    <label className="flex items-center space-x-1 mt-3">
                      <input
                        {...register("magazineType")}
                        type="radio"
                        value="Print"
                        checked={watch("magazineType") === "Print"}
                        className="h-4 w-4"
                      />
                      <span>Print</span>
                    </label>
                  </div>
                )}

              </div>

              <div className="text-start mt-3">
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-md"
                >
                  SUBMIT
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

export default ContactUs;
