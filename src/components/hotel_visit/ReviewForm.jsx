"use client"
import { apis } from '@component/apiendpoints/api';
import useRequest from '@component/hooks/UseRequest';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

function ReviewForm({ new_fetch_hotel_info, setShowReviewForm ,setIsTrue}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm();

  const { request: requestGuestReview, resposne, loading } = useRequest(true);
  const { countryData } = useSelector((state) => state.siteSetting)
  const [countrySearch, setCountrySearch] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("");

  const filteredCountryData = countryData?.filter((country) =>
    countrySearch
      ? country?.country.toLowerCase().includes(countrySearch.toLowerCase())
      : ""
  );



  const handleSelectCountry = (country) => {
    console.log("country", country)
    setValue("country", country?.country);
    setSelectedCountry(country?.country);
    setCountrySearch("");
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("reviewer_name", data.reviewer_name);
      formData.append("reviewer_email", data.reviewer_email);
      formData.append("country", data.country);
      formData.append("formDate", data.formDate);
      formData.append("toDate", data.toDate);
      formData.append("cleanliness_rating", data.cleanliness_rating);
      formData.append("facilities_rating", data.facilities_rating);
      formData.append("comfort_rating", data.comfort_rating);
      formData.append("freewifi_rating", data.freewifi_rating);
      formData.append("overall_rating", data.overall_rating);
      formData.append("review", data.review);
      formData.append("hotelId", new_fetch_hotel_info?.hotel?._id)
      const response = await requestGuestReview("POST", `${apis.POST_GUEST_REVIEWS}`, formData)
      if (response) {
        setShowReviewForm(false);
        reset()
        setIsTrue(true);
        toast.success(response?.message)
        console.log("response", response)
      }
    } catch (error) {
      console.log("error", error)
    }
  };
  console.log("response", resposne)
  useEffect(() => {
    if (resposne) {
      reset({
        reviewer_name: "",
        reviewer_email: ""
      })
    }
  }, [resposne])
  return (
    <>
      <form className='row px-3 pt-2' onSubmit={handleSubmit(onSubmit)}>
        <div className='col-12'>
          <div className="form-group">
            <input
              type="text"
              placeholder='Name'
              className="form-control"
              {...register("reviewer_name", { required: true })}
            />
            {errors.reviewer_name && <span className='text-danger'>Name is required</span>}
          </div>
        </div>

        <div className='col-12'>
          <div className="form-group">
            <input
              type="email"
              placeholder='Email Address'
              className="form-control"
              {...register("reviewer_email", { required: true })}
            />
            {errors.reviewer_email && <span className='text-danger'>Email is required</span>}
          </div>
        </div>
        <div className="col-12">
          <div className="mt-2 w-full relative">
            <input
              className="block w-full border-b border-primary uppercase p-1.5 shadow-sm focus:border-primaryDark placeholder-black text-sm text-black"
              placeholder='Country'
              value={selectedCountry || countrySearch}
              onChange={(e) => {
                setCountrySearch(e.target.value);
                setSelectedCountry(""); // Clear selected country when typing
              }}
            />
            <input type="hidden" {...register("country", { required: "Country is required" })} />
            {filteredCountryData && (
              <ul className="country-list text-black">
                {filteredCountryData?.map((country) => (
                  <li className="country-item" onClick={() => handleSelectCountry(country)}>{country?.country}</li>
                ))}
              </ul>
            )}
            {errors.country && <p className="text-red-500 text-xs">{errors.country.message}</p>}
          </div>

        </div>

        <div className='col-12 my-3'>
          <p>The Date you visit / stayed at the hotel.</p>
        </div>

        <div className='col-md-6'>
          <div className="form-group">
            <label>From</label>
            <input
              type="date"
              className="form-control"
              {...register("formDate", { required: true })}
            />
          </div>
        </div>

        <div className='col-md-6'>
          <div className="form-group">
            <label>To</label>
            <input
              type="date"
              className="form-control"
              {...register("toDate", { required: true })}
            />
          </div>
        </div>

        <div className='col-md-12'>
          <div className="form-group">
            <textarea
              className="form-control"
              placeholder='Description'
              style={{ height: "auto", minHeight: "100px" }}
              {...register("review", { required: "Your Review Is Required" })}
            ></textarea>
            {errors.review && <span className='text-danger'>{errors.review.message}</span>}
          </div>
        </div>

        {[
          { name: "comfort_rating", label: "Comfort" },
          { name: "cleanliness_rating", label: "Cleanliness" },
          { name: "facilities_rating", label: "Facilities" },
          { name: "freewifi_rating", label: "Free WiFi" },
          { name: "overall_rating", label: "Overall Ratting" },
        ].map(({ name, label }) => (
          <div className='col-md-3' key={name}>
            <div className='flex justify-between'>
              <label className='uppercase inline-block mb-2 p-1'>{label}</label>
              <div className='rating'>
                {[1, 2, 3, 4, 5].map((value) => (
                  <input
                    key={value}
                    type='radio'
                    className='mask mask-star-2 bg-orange-400'
                    {...register(name, { required: true })}
                    value={value}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}

        <div className='col-md-12'>
          <div className="mt-1 flex items-start gap-3">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 mt-1"
              {...register("certify", { required: "You must certify this review before submitting." })}
            />

            <p className="text-gray-500 text-sm">
              Note:- I certify that this review is based on my own experience and is my
              genuine opinion of this hotel, and that I have no personal or business
              relationship with this establishment.
            </p>
          </div>
          {errors.certify && <span className='text-danger'>{errors.certify.message}</span>}
        </div>

        <div className='col-md-12'>
          <button type="submit" className="theme-btn">
            {!loading ? "Submit Review" : "Submit Review ..."}
          </button>
        </div>
      </form>
    </>
  )
}

export default ReviewForm