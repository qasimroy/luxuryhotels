"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import NominateHotel from "./dashLayout/NominateHotel";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import useRequest from "@component/hooks/UseRequest";
import toast from "react-hot-toast";
const paymentMethods = [
  {
      id: "credit",
      value: "stripe",
      label: "Debit/Credit Card",
      imgSrc: "/new/assets/img/card.png",
  },
  {
      id: "Paypal",
      value: "paypal",
      label: "Pay with Paypal",
      imgSrc: "/new/assets/img/paypay.png",
  },
  {
      id: "Square",
      value: "square",
      label: "Pay with Square",
      imgSrc: "/new/assets/img/square_logo.png",
  },
  {
      id: "Tipalti",
      value: "tipalti",
      label: "Pay with Tipalti",
      imgSrc: "/new/assets/img/tipalti.png",
  },
];

const NominateForm = () => {
  const [activeTab, setActiveTab] = useState("hotel");
  

 
  const stripePromise = loadStripe('pk_live_51IhBByD3gzWFhFEcvzKD2S1fOTTiF2CjXgikLRqGH0yQvHR5QFQthkT5zoUe069NFb881KGo1Oj0C0G4xhdPf7dO00ilSXPHBD');

  const { request:request_create } = useRequest(true);

    const { pass_information, countryData } = useSelector((state) => state.siteSetting)

    const [isVisitHotel, setIsVisitHotel] = useState(false);
    const { request: requestfetch, response: responsefetch } = useRequest();
    const { register, handleSubmit, formState: { errors }, watch, getValues, reset,setValue } = useForm();
    const [res_data, steRes_data] = useState(null)
    const { request, response, loading } = useRequest(true);
    let amount = 0.6;
    const hotel_details = localStorage.getItem("hotel_details") ? JSON.parse(localStorage.getItem("hotel_details")) : null
    const user_details = localStorage.getItem('userdetails') ? JSON.parse(localStorage.getItem('userdetails')) : null

    const [privewImage,setPreViewImage] = useState(null)


    const [showModal, setShowModal] = useState(true);

    const onSubmit = (data) => {
        const payload = {
            amount: amount,          // Keep the static amount or make it dynamic
            months: 6,               // If months is static (like 6 months), set it here
            hotel: data.hotelName,   // Use the hotel name from the form input
        };
        request("POST", apis.ADD_NOMINEE_CHECKOUT_HOTEL, payload)
    }
   
    const handleImageChange = (event) => {
      
      const file = event.target.files[0];
  
      if (file) {
        const validTypes = ["image/jpeg", "image/jpg", "image/png"];
        console.log("validTypes", validTypes)
        if (!validTypes.includes(file.type)) {
          toast.error("Only JPG, JPEG, and PNG files are allowed.");
          setPreViewImage(null);
          setValue("file", null); // Reset input
          return;
        }
  
  
        setPreViewImage(URL.createObjectURL(file));
      }
    };

  const onSubmitTraveler = (data) => {
    console.log("Traveler Form Submitted", data);
    reset(); // Reset form after submission
  };

   const create_nomainate=(paymaent_status)=>{
            const {businessType,hotelName,country,name,websiteLink,facebook,instagrameLink,youtubeLink,newsDescription,email,newsTitle,file,validTo,validFrom,description,hotelVisit,}=getValues()
      
            const formdata=new FormData
            // Append fields to FormData
          formdata.append('nomination_type', "hotel" || '');
          formdata.append('hotelName', hotelName || '');
          formdata.append('country', JSON.parse(country)?.country || '');
          formdata.append('nominatorName', name || '');
          formdata.append('hotelWebsite', websiteLink || '');
          
  
          
          
          formdata.append('nominatorEmail', email);
          
          formdata.append('paymaent_status', paymaent_status);
          
          formdata.append('desc', description);
          formdata.append('nominationStartDate', validFrom);
          formdata.append('nominationEndDate', validTo);
          formdata.append('youtube_video_url', youtubeLink);
          formdata.append('leave_message', youtubeLink);
          formdata.append('request_to_visit', hotelVisit=="true"?"yes":"no");
          formdata.append('hotel', hotel_details?._id);
          // formdata.append('Subscription', "");
          // paymaent_status,contactNo,active 
      
          // Append file if it exists
          if (file) {
              formdata.append('images', file[0]);
          }
      
          request_create("POST",apis.CREATE_NOMAINATE,formdata)
          }
          const handleRemoveImage = () => {
            setPreViewImage(null);
            setValue("file", null); // Reset form field
          };


  return (
    <section
      className="section-padding"
      style={{
        backgroundImage: 'url("/new/assets/img/nominate-hotel-bg.png")',
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="container">
        {/* Tabs */}
        <div
          style={{
            display: "flex",
            cursor: "pointer",
            borderBottom: "2px solid #ccc",
          }}
        >
          <div
            onClick={() => setActiveTab("hotel")}
            style={{
              padding: "10px 20px",
              borderBottom: activeTab === "hotel" ? "3px solid #C1121F" : "none",
            }}
          >
            HOTEL
          </div>
          <div
            onClick={() => setActiveTab("traveller")}
            style={{
              padding: "10px 20px",
              borderBottom: activeTab === "traveller" ? "3px solid #C1121F" : "none",
            }}
          >
            TRAVELLER
          </div>
        </div>

        {/* Tab Content */}
        <div className="dashboard-section" style={{ marginTop: "20px", padding: "10px" }}>
          {activeTab === "hotel" && (
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="HOTEL NAME"
                            className="form-control"
                            {...register("hotelName", { required: "Hotel name is required" })}
                        />
                        {errors.hotelName && <span className="text-danger">{errors.hotelName.message}</span>}
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="YOUR name"
                            className="form-control"
                            {...register("name", { required: "Your name is required" })}
                        />
                        {errors.name && <span className="text-danger">{errors.name.message}</span>}
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            className="form-control"
                            {...register("email", { required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email format" } })}
                        />
                        {errors.email && <span className="text-danger">{errors.email.message}</span>}
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="form-group">
                        {/* <input
                            type="text"
                            placeholder="COUNTRY"
                            className="form-control"
                            {...register("country", { required: "Country is required" })}
                        /> */}
                        <select
                            id="countrySelect"
                            {...register("country", {
                                required: "Please select a country", onChange: (e) => {
                                    const val = JSON.parse(e.target.value);
                                    
                                }

                            })}
                            className={
                                errors.countrySelect ? "form-control is-invalid" : "form-control"
                            }
                        >
                            <option value="">-- Select a country --</option>
                            {countryData && countryData.map((it) => {
                                return (
                                    <option key={it._id} value={JSON.stringify(it)}>{it.country}</option>
                                )
                            })}
                            {/* <option value="Canada">Canada</option>
        <option value="UK">UK</option>
        <option value="India">India</option> */}
                        </select>
                        {errors.country && <span className="text-danger">{errors.country.message}</span>}
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="form-group">
                        <label htmlFor="hotelVisit" className="form-label">
                            Would you like to request a hotel visit?
                        </label>
                        <div className="flex items-center space-x-4 mt-1">
                            <label className="flex items-center space-x-1">
                                <input
                                    type="radio"
                                    value="true"
                                    {...register("hotelVisit", { required: "Please select an option" })}
                                    onChange={() => setIsVisitHotel(true)}
                                    className="h-4 w-4"
                                />
                                <span>YES</span>
                            </label>
                            <label className="flex items-center space-x-1">
                                <input
                                    type="radio"
                                    value="false"
                                    {...register("hotelVisit", { required: "Please select an option" })}
                                    onChange={() => setIsVisitHotel(false)}
                                    className="h-4 w-4"
                                />
                                <span>NO</span>
                            </label>
                        </div>
                    </div>
                </div>

                {isVisitHotel && (
                    <div className="row mt-3">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="validFrom" className="form-label">
                                    Valid From
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    {...register("validFrom", { required: "Valid From is required" })}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="validTo" className="form-label">
                                    Valid To
                                </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    {...register("validTo", { required: "Valid To is required" })}
                                />
                            </div>
                        </div>
                    </div>
                )}

                <div className="col-md-12">
                    <div className="form-group">
                        {/* <label htmlFor="description" className="form-label">
                            Description
                        </label> */}
                        <textarea
                            placeholder="Description"
                            className="form-control"
                            {...register("description")}
                        />
                    </div>
                </div>

                <div className="col-md-12 mt-4">
                    <div className="form-group">
                        <input {...register("file", { required: "file is required",onChange: (e) => handleImageChange(e) })} className="d-none" type="file" id="upload-img-2" />
                      
                            
                        <label htmlFor="upload-img-2" className="form-label uploadBox">
                            <div className="flex items-center gap-3">
                                <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth={0}
                                    viewBox="0 0 256 256"
                                    className="text-xl"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M228,144v64a12,12,0,0,1-12,12H40a12,12,0,0,1-12-12V144a12,12,0,0,1,24,0v52H204V144a12,12,0,0,1,24,0ZM96.49,80.49,116,61v83a12,12,0,0,0,24,0V61l19.51,19.52a12,12,0,1,0,17-17l-40-40a12,12,0,0,0-17,0l-40,40a12,12,0,1,0,17,17Z"></path>
                                </svg>
                                <p className="uppercase text-grayDark mb-0">Upload a file</p>
                            </div>
                        </label>
                        <p className="text-xs uppercase leading-5 text-grayDark mt-1">
                            Only one photo allowed
                        </p>
                        {privewImage && (
                              <div className="relative mt-2">
                                <img src={privewImage} alt="Selected" className="w-32 h-32 object-cover rounded-md shadow-md" />
                                <button
                                  type="button"
                                  onClick={handleRemoveImage}
                                  className="absolute -top-2 -right-3 bg-red-500 text-white p-1 rounded-2xl shadow-md"
                                >
                                  ✕
                                </button>
                              </div>
                            )}

                            {errors?.file && <p className="text-red-500 text-xs mt-1">{errors?.file?.message}</p>}
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="form-group">
                        <label htmlFor="youtubeLink" className="form-label">
                            YouTube Link
                        </label>
                        <input
                            type="url"
                            placeholder="Enter hotel YouTube link"
                            className="form-control"
                            {...register("youtubeLink")}
                        />
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="form-group">
                        <label htmlFor="websiteLink" className="form-label">
                            Website Link
                        </label>
                        <textarea
                            placeholder="Enter hotel website link"
                            className="form-control"
                            {...register("websiteLink")}
                        />
                    </div>
                </div>

                <div className="col-span-full">
                    <h3 className="text-lg md:text-1.7xl font-bold text-golden uppercase mb-4">
                        Nominate Your Hotel for Best Luxury Hotel of the Year Benefits:
                    </h3>
                    <p className="text-sm md:text-1.7xl font-bold uppercase mb-4">
                        When you nominate your hotel, we will launch an email marketing campaign to all of our travelers, encouraging them to Vote for your hotel as the "Best Luxury Hotel of the Year". By the end of the year, all votes will be counted, and if your hotel becomes the winner, runner-up, or secures a top-three position, you will receive a Prestigious Awards from our Luxury Hotels. Additionally, you will gain access to the contact information of all voters, allowing your hotel to connect directly with these potential clients through future email marketing campaigns
                    </p>
                    <h3 className="text-lg md:text-2.7xl font-bold uppercase mb-4">
                        Price: €{amount ?? 50}
                    </h3>
                </div>
                <div className="modal-overlay">
                    <div className="modal-content card shadow">
                        <div className="plan-cardBox">
                            {paymentMethods.map((method) => (
                                <div className="plan-cardItem" key={method.id}>
                                    <input
                                        value={method.value}
                                        {...register("payment_method")}
                                        checked={watch("payment_method") === method.value}
                                        className="form-check-input"
                                        name="payment_method"
                                        type="radio"
                                        id={method.id}
                                    />
                                    <label className="form-check-label" htmlFor={method.id}>
                                        {method.label}
                                    </label>
                                    <img
                                        src={method.imgSrc}
                                        alt={method.label}
                                        className="card-img h-full object-contain"
                                    />
                                </div>
                            ))}
                        </div> <button type="submit" className="save-btn">PROCEED TO CHECKOUT</button>
                    </div>
                </div>

            </div>
        </form>
          )}

          {activeTab === "traveller" && (
            <form onSubmit={handleSubmit(onSubmitTraveler)}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Hotel NAME"
                  {...register("hotelName", { required: "Hotel name is required" })}
                  className="form-control mt-3"
                />
                {errors.hotelName && <p className="text-red-500">{errors.hotelName.message}</p>}
              </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="FULL NAME"
                  {...register("fullName", { required: "Full name is required" })}
                  className="form-control mt-3"
                />
                {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
              </div>

              <div className="form-group">
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  {...register("email", { required: "Email address is required" })}
                  className="form-control mt-3"
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>

              <div className="form-group">
                <textarea
                  placeholder="Leave Message"
                  rows="4"
                  {...register("message")}
                  className="form-control mt-3"
                ></textarea>
              </div>

              <div className="form-group">
                <div className="flex items-center space-x-4 mt-1">
                  <label className="flex items-center space-x-1">
                    <input
                      type="checkbox"
                      value="true"
                      {...register("sampleMagazine", { required: "You must agree to the terms" })}
                      className="h-4 w-4"
                    />
                    <span>
                      I certify that this review is based on my own experience and is my genuine opinion of this hotel.
                    </span>
                  </label>
                  {errors.sampleMagazine && (
                    <p className="text-red-500">{errors.sampleMagazine.message}</p>
                  )}
                </div>
              </div>

              <div className="text-start mt-3">
                <button type="submit" className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-md">
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default NominateForm;
