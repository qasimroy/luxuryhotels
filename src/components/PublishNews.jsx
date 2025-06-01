"use client"
import { apis } from '@component/apiendpoints/api';
import useRequest from '@component/hooks/UseRequest';

import React, { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import HeadingWithoutSwiper from './headingWithoutSwiper';
import AddExclusive from './dashLayout/AddExclusive';
import AddExclusivePublishNews from './AddExclusivePublishNews';
import CheckoutModal from '@component/modals/CheckoutModal';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import toast from 'react-hot-toast';
import { getLatestNews, getTravelNews } from '@component/lib/slice/sitesSetting';
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


const PublishNews = () => {
  const [isVisitHotel, setIsVisitHotel] = useState(false);
  const dispatch = useDispatch()
  const { register, handleSubmit, setValue, formState: { errors }, getValues, watch, reset, control } = useForm();
  console.log("errors", errors)
  const { request, response, loading } = useRequest(true);
  const { request: request_create } = useRequest(true);
  const stripePromise = loadStripe('pk_live_51IhBByD3gzWFhFEcvzKD2S1fOTTiF2CjXgikLRqGH0yQvHR5QFQthkT5zoUe069NFb881KGo1Oj0C0G4xhdPf7dO00ilSXPHBD');

  const { pass_information, countryData } = useSelector((state) => state.siteSetting)
  const hotel_details = localStorage.getItem("hotel_details") ? JSON.parse(localStorage.getItem("hotel_details")) : null


  const [showAddExclusive, setShowAddExclusiveOffer] = useState(false);
  let amount = 0.5;
  const [res_data, steRes_data] = useState(null)
  const [paidExclusiveOffer, setPaidExclusiveOffer] = useState(false)

  const [showModal, setShowModal] = useState(false);

  const onSubmit = (data) => {
    console.log("data", data);
    const payload = {
      amount: amount,          // Keep the static amount or make it dynamic
      months: 6,               // If months is static (like 6 months), set it here
      hotel: data.hotelName,   // Use the hotel name from the form input
    };
    // create_news("pending")
   const response = request("POST", apis.ADD_NOMINEE_CHECKOUT_HOTEL, payload);
   if(response){
     dispatch(getLatestNews());
     dispatch(getTravelNews())
   }
  };

  useEffect(() => {
    if (response) {
      console.log(response, "response");
      steRes_data(response)
      setShowModal(true);
    }
  }, [response]);

  const handleShowExclusiveOffer = () => {
    setShowAddExclusiveOffer(!showAddExclusive);
  };
  console.log("paidExclusiveOffer",paidExclusiveOffer);

  const create_news = (paymaent_status) => {
    const { businessType, hotelName, country, yourName, websiteLink, facebook, instagrameLink, youtubeLink, newsDescription, email, newsTitle, file, offer_image } = getValues()

    const formdata = new FormData
    // Append fields to FormData
    formdata.append('news_type', businessType || '');
    formdata.append('hotel', hotelName || '');
    formdata.append('country', country || '6799049904729e939c9cbe9b');
    formdata.append('user_name', yourName || '');
    formdata.append('website_url', websiteLink || '');
    formdata.append('facebook_page', facebook || '');
    formdata.append('instagrameLink', instagrameLink || '');
    formdata.append('youtube_video_url', youtubeLink || '');
    formdata.append('news_description', newsDescription);
    formdata.append('email', email);
    formdata.append('news_title', newsTitle);
    formdata.append('paymaent_status', paymaent_status);
    formdata.append('business_name', hotelName);
    formdata.append('amount', amount)

    formdata.append("offer_name", getValues().offer_name)
    formdata.append("offer_url", getValues().offer_url)
    formdata.append("offer_description", getValues().offer_description ?? "")
    formdata.append("offer_from", getValues().offer_from)
    formdata.append("offer_to", getValues().offer_to)
    formdata.append("hotel_id", hotel_details?._id ?? " ")
    formdata.append("show_on_home", paidExclusiveOffer)
    formdata.append("offer_time", getValues().offer_time)

    // paymaent_status,contactNo,active 

    // Append file if it exists
    if (file) {
      formdata.append('news_image', file[0]);
    }

    if (offer_image) {
      formdata.append('offer_image', offer_image[0]);
    }

    request_create("POST", apis.CREATE_HOTEL_NEWS, formdata)
  }

  const [preview, setPreview] = useState(null);
  const [preview1, setPreview1] = useState(null);

  const handleImageChange1 = (event) => {
    console.log("event", event)
    const file = event.target.files[0];

    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      console.log("validTypes", validTypes)
      if (!validTypes.includes(file.type)) {
        toast.error("Only JPG, JPEG, and PNG files are allowed.");
        setPreview1(null);
        setValue("file", null); // Reset input
        return;
      }


      setPreview1(URL.createObjectURL(file));
    }
  };

  const handleImageChange = (event) => {
    console.log("event", event)
    const file = event.target.files[0];

    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      console.log("validTypes", validTypes)
      if (!validTypes.includes(file.type)) {
        toast.error("Only JPG, JPEG, and PNG files are allowed.");
        setPreview(null);
        setValue("offer_image", null); // Reset input
        return;
      }


      setPreview(URL.createObjectURL(file));
    }
  };
  console.log("preview", preview);

  const handleRemoveImage = () => {
    setPreview(null);
    setValue("offer_image", null); // Reset form field
  };


  const countyOptions = useMemo(() => {
    if (countryData) {
      return countryData?.map((it) => {
        return { value: it._id, label: it.country }
      })
    }
  }, [countryData])

  const [countrySearch, setCountrySearch] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("");

  const filteredCountryData = countryData?.filter((country) =>
    countrySearch
      ? country?.country.toLowerCase().includes(countrySearch.toLowerCase())
      : ""
  );

  const handleSelectCountry = (country) => {
    console.log("country", country)
    setValue("country", country?._id);
    setSelectedCountry(country?.country);
    setCountrySearch("");
  };

  const handlclose = () => {
    reset({
      offer_name: '',
      offer_url: "",
      offer_description: "",
      offer_from: "",
      offer_to: "",
      offer_image: "",
    })
    setShowAddExclusiveOffer(false)
  }

  const handleWordCountValidation = (value) => {
    console.log(value,"value")
    const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
    
    if (wordCount > 10) {
      toast.error("You can enter a maximum of 10 words");
      
    } 
  };

  return (
    <>
      <HeadingWithoutSwiper name={"Publish News"} />
      <div className="m-4">
        <section
          className="dashboard-section section_wrap"
          style={{
            backgroundImage: "url('/new/assets/img/nominate-hotel-bg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: " 0px 42px"
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className='m-4'>
            <div className="row p-6">
              <div className="col-md-12">
                <div className="form-group">
                  <select
                    className="form-control"
                    {...register("businessType", { required: "Business type is required" })}
                  >
                    <option value="">SELECT BUSINESS</option>
                    <option value="hotel">HOTEL</option>
                    <option value="other_business">OTHER BUSINESS</option>
                  </select>
                  {errors.businessType && (
                    <p className="text-red-500 text-sm">{errors.businessType.message}</p>
                  )}
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group">
                  <input
                    placeholder='Name of Hotel / Business'
                    className="form-control"
                    {...register("hotelName", { required: "Hotel/Business name is required" })}
                  />
                  {errors.hotelName && (
                    <p className="text-red-500 text-sm">{errors.hotelName.message}</p>
                  )}
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group">

                  <input
                    className="form-control"
                    placeholder='Country'
                    value={selectedCountry || countrySearch}
                    //     {...register("country", {
                    //     required: "Please select a country", onChange: (e) => {
                    //       setCountrySearch(e.target.value)  
                    //       setSelectedCountry("");  
                    //     }
                    // })}
                    onChange={(e) => {
                      setCountrySearch(e.target.value);
                      setSelectedCountry(""); // Clear selected country when typing
                    }}
                  />
                  <input type="hidden" {...register("country")} />
                  {filteredCountryData && (
                    <ul className="country-list">
                      {filteredCountryData?.map((country) => (
                        <li className="country-item" onClick={() => handleSelectCountry(country)}>{country?.country}</li>
                      ))}
                    </ul>
                  )}
                  {/* <Controller
                    name="country"
                    control={control}
                    rules={{ required: "Country selection is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        classNamePrefix="react-select"
                        options={countyOptions}
                        placeholder="Choose a country"
                        isSearchable
                        onChange={(selectedOption) => field.onChange(selectedOption)}
                      />
                    )}
                  /> */}

                  {/* <select
                                id="countrySelect"
                                {...register("country", {
                                    required: "Please select a country", onChange: (e) => {
                                        const val = JSON.parse(e.target.value);
                                        
                                    }

                                })}
                                className= "form-control"
                        
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
                  {/* </select> */}
                  {errors.country && (
                    <p className="text-red-500 text-sm">{errors.country.message}</p>
                  )}
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <input
                    placeholder='Your Name'
                    className="form-control"
                    {...register("yourName", { required: "Your name is required" })}
                  />
                  {errors.yourName && (
                    <p className="text-red-500 text-sm">{errors.yourName.message}</p>
                  )}
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">

                  <input
                    placeholder='Your Email'
                    type="email"
                    className="form-control"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group">
                  <textarea
                    placeholder=' News Title'
                    className="form-control"
                    {...register("newsTitle", { required: "News title is required" })}
                  />
                  {errors.newsTitle && (
                    <p className="text-red-500 text-sm">{errors.newsTitle.message}</p>
                  )}
                </div>
              </div>



              <div className="col-md-12">
                <div className="form-group">
                  <textarea
                    placeholder=' News Description'
                    className="form-control"
                    {...register("newsDescription", { required: "News description is required" })}
                  />
                  {errors.newsDescription && (
                    <p className="text-red-500 text-sm">{errors.newsDescription.message}</p>
                  )}
                </div>
              </div>

              <div className="col-md-12 mt-4">
                <div className="form-group">
                  <input {...register("file", { required: "file is required", setValueAs: (v) => v, onChange: (e) => handleImageChange1(e) })} className="d-none" type="file" id="upload-img-2" />



                  {!preview1 ? (
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
                  ) : (
                    <div className="relative mt-2">
                      <img src={preview1} alt="Selected" className="w-32 h-32 object-cover rounded-md shadow-md" />
                      <button
                        type="button"
                        onClick={(e) => {
                          setPreview1(null)
                          setValue("file", null)
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-md"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                  {errors.file && (
                    <p className="text-red-500 text-sm">{errors.file.message}</p>
                  )}
                  {!preview1 && (

                    <p className="text-xs uppercase leading-5 text-grayDark mt-1">
                      Only one photo allowed
                    </p>
                  )}



                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group">
                  <input
                    placeholder='YouTube Link (optional)'
                    type="text"
                    className="form-control"
                    {...register("youtubeLink",
                      //   {
                      //   pattern: {
                      //     value: /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9(@:%_\+.~#?&//=)]*$/,
                      //     message: "Please enter a valid url YouTube URL use https",
                      //   },
                      // }
                    )}
                  />
                  {errors.youtubeLink && (
                    <p className="text-red-500 text-sm">{errors.youtubeLink.message}</p>
                  )}
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">

                  <input
                    type="text"
                    placeholder="Instagram Link (optional)"
                    className="form-control"
                    {...register("instagrameLink",
                      //    {
                      //   pattern: {
                      //     value: /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9(@:%_\+.~#?&//=)]*$/,
                      //     message: "Please enter a valid Instagram URL use https",
                      //   },
                      // }
                    )}
                  />

                  {errors.instagrameLink && (
                    <p className="text-red-500 text-sm">{errors.instagrameLink.message}</p>
                  )}

                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="add your facebook page like this ( optional )"
                    className="form-control"
                    {...register("facebook",
                      // {
                      //   pattern: {
                      //     value: /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9(@:%_\+.~#?&//=)]*$/,
                      //     message: "Please enter a valid facebook URL use https",
                      //   },
                      // }
                    )}
                  />
                  {errors.facebook && (
                    <p className="text-red-500 text-sm">{errors.facebook.message}</p>
                  )}
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-group">
                  <textarea
                    placeholder="Website Link"
                    className="form-control"
                    {...register("websiteLink", { required: "Website Link is required" })}
                  />
                  {errors.websiteLink && (
                    <p className="text-red-500 text-sm">{errors.websiteLink.message}</p>
                  )}
                </div>
              </div>

              <div className="col-md-12">
                {!showAddExclusive && (
                  <label
                    // htmlFor="websiteLink"
                    className="form-label cursor-pointer"
                    onClick={handleShowExclusiveOffer}
                  >
                    Publishing your "Exclusive Offer" on your Final News page is free (*optional)
                  </label>
                )}
                {showAddExclusive && (
                  <div className="row mt-2">
                    <div className="col-md-6">
                      <div className="form-group">
                        {/* <label htmlFor="name" className="form-label">
                          Offer title<span>*</span>
                        </label> */}
                        <input

                          {...register("offer_name", { required: "Offer name is required", setValueAs: v => v.trim() })}
                          type="text"
                          placeholder="Offer Title"
                          className="form-control"
                        />
                        <span className="error_message">
                          {errors["offer_name"] && `${errors.offer_name.message}`}
                        </span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        {/* <label htmlFor="name" className="form-label">
                          Enter Your website url where the offer could be redeem <span>*</span>
                        </label> */}
                        <input

                          {...register("offer_url", { required: "Offer url is required", setValueAs: v => v.trim() })}
                          type="text"
                          placeholder="Enter Your website url where the offer could be redeem"
                          className="form-control"
                        />
                        <span className="error_message">
                          {errors["offer_url"] && `${errors.offer_url.message}`}
                        </span>
                      </div>
                    </div>

                    {/* {watch("type")=="payment" &&  */}
                    <div className="col-md-12">
                      <div className="form-group">
                        {/* <label htmlFor="name" className="form-label">
                          Offer description
                        </label> */}
                        <input
                          type="text"
                          placeholder="Offer description"
                          className="form-control"
                          {...register("offer_description", {
                            required: "Offer description is required",
                            onChange: (e) => handleWordCountValidation(e.target.value),
                          })}
                        />

                        <span className="error_message">
                          {errors["offer_description"] && `${errors.offer_description.message}`}
                        </span>
                      </div>
                    </div>
                    {/* } */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="name" className="form-label">
                          Offer valid from
                        </label>
                        <input
                          {...register("offer_from", { required: "Offer from is required", })}
                          type="date"
                          className="form-control"
                        />
                        <span className="error_message">
                          {errors["offer_from"] && `${errors.offer_from.message}`}
                        </span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="name" className="form-label">
                          Offer valid to
                        </label>
                        <input

                          {...register("offer_to", { required: "Offer to is required" })}
                          type="date"
                          className="form-control"
                        />
                        <span className="error_message">
                          {errors["offer_to"] && `${errors.offer_to.message}`}
                        </span>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label htmlFor="name" className="form-label">
                          Publishing your Excusive Offer" on the Homepage, an additional fee applies
                        </label>

                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <label>
                        <input
                          {...register("show_on_home")}
                          type="radio"
                          value="true"
                          checked={paidExclusiveOffer === true}
                          onChange={() => setPaidExclusiveOffer(true)}
                          className="h-4 w-4 p-1"
                        // name="payment"
                        />
                        Yes
                      </label>
                      <label>
                        <input
                          {...register("show_on_home")}
                          type="radio"
                          value="false"
                          checked={paidExclusiveOffer === false}
                          onChange={() => {
                            setPaidExclusiveOffer(false);
                            setValue("homepage", 0); // Set homepage amount to zero
                          }}
                          className="h-4 w-4 p-1"
                        />
                        No
                      </label>

                    </div>

                    {paidExclusiveOffer && (
                      <>
                        <div className="col-md-12 mt-4">
                          <div className="form-group">
                            <input
                              {...register("offer_image", { required: "Please select an image", setValueAs: (v) => v, onChange: (e) => handleImageChange(e) })}
                              className="hidden"
                              type="file"
                              id="suraj"
                              accept=".jpg,.jpeg,.png"

                            />

                            {!preview ? (
                              <label htmlFor="suraj" className="form-label uploadBox cursor-pointer">
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
                                  <p className="uppercase text-grayDark mb-0">Upload Image for your offer</p>
                                </div>
                              </label>
                            ) : (
                              <div className="relative mt-2">
                                <img src={preview} alt="Selected" className="w-32 h-32 object-cover rounded-md shadow-md" />
                                <button
                                  type="button"
                                  onClick={handleRemoveImage}
                                  className="absolute -top-2 -right-3 bg-red-500 text-white p-1 rounded-2xl shadow-md"
                                >
                                  ✕
                                </button>
                              </div>
                            )}

                            {errors?.offer_image && <p className="text-red-500 text-xs mt-1">{errors?.offer_image?.message}</p>}
                            {!preview && (
                              <p className="text-xs uppercase leading-5 text-red-500 mt-1">Only JPG, JPEG, and PNG allowed</p>

                            )}
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className=' '>
                            <div className="form-group" >
                              {/* <label className="form-label black-color">
                
              </label> */}
                              {/* <select
                                className="form-control p-2"
                                {...register("homepage", {
                                  onchange: (e) => {

                                  }
                                })}
                                placeholder="Select Option"
                             
                              >
                                <option value="">SELECT OPTION</option>
                                <option value={5} >
                                  Week € 5
                                </option>
                                <option value={10} >
                                  Month € 10
                                </option>

                              </select> */}
                              <select
                                className="form-control p-2"
                                {...register("homepage", {
                                  onChange: (e) => {
                                    const selectedValue = e.target.value;
                                    const offerTime = selectedValue === "5" ? "7" : selectedValue === "10" ? "30" : "";
                                    setValue("offer_time", offerTime);
                                  },
                                })}
                              >
                                <option value="">SELECT OPTION</option>
                                <option value="5">Week € 5</option>
                                <option value="10">Month € 10</option>
                              </select>

                            </div>
                          </div>
                        </div>
                      </>
                    )}


                    <div className='footer-btn text-end'>
                      {/* <button onClick={() => setShowAddExclusiveOffer(false)} className='next-btn'>  Cancel </button> */}

                      <button onClick={handlclose} className='next-btn'>  Cancel </button>
                      {/* <button type='submit' className='save-btn'>  Add Offer </button> */}
                      {/* <Link href="/win-a-holiday" className='next-btn'>Next</Link> */}
                    </div>
                  </div>
                )}
              </div>

              <div className="col-span-full">
                <h3 className="text-lg md:text-2.7xl font-bold uppercase mb-4">
                  Price: €{parseFloat(watch("homepage") || 0) + parseFloat(amount)}
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

                    <button type="submit" className="save-btn w-100">
                      PROCEED TO CHECKOUT
                    </button>

                  </div>
                </div>
              </div>


            </div>
          </form>
        </section>
      </div>

      {/* {showModal && <PaypaModal />} */}
      {showModal && res_data && <Elements stripe={stripePromise}> <CheckoutModal response_data={res_data} stripePromise={stripePromise} setShowModal={setShowModal} amount={amount} payment_method={watch("payment_method")} detils_data={getValues()} purpose="publish-news" time={"1 Months"} create_function={create_news} redirect={watch("businessType") == "other_business" ? "latest-news" : "travel-news"} /></Elements>}
    </>
  );
};

export default PublishNews;