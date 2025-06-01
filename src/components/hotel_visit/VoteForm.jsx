"use client"
import { apis } from '@component/apiendpoints/api';
import useRequest from '@component/hooks/UseRequest';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

function VoteForm({new_fetch_hotel_info,setShowVoteForm}) {

    const {request:requestVote,resposne,loading} =useRequest(true)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
      } = useForm();

     const submitVote = async(data)=>{
        try{
          const formData = new FormData();
          formData.append("hotel",new_fetch_hotel_info?.hotel?._id)
          formData.append("nominatorName",data.nominatorName)
          formData.append("hotelName",new_fetch_hotel_info?.hotel?.hotel_name)
          formData.append("nomination_type","traveller")
          formData.append("nominatoremail",data.nominatoremail)
          formData.append("leave_message",data.leave_message)
         const responseData = await requestVote("POST",`${apis.CREATE_NOMAINATE}`,formData)
        
         if(responseData?.status == true){
          toast.success(responseData?.message)
          reset()
          setShowVoteForm(false)
         }
        }
        catch (error) {
          console.log("error", error)
        }
      }
    
      // useEffect(()=>{
      //   if(resposne){
      //     reset()
      //       // reset({
      //       //     nominatorName :" ",
      //       //     nomination_type : ' ',
      //       //     nominatoremail : " ",
      //       //     leave_message :" ",
      //       // })
      //       setShowVoteForm(false)
      //   }
      // },[resposne])
  return (
    <>
     <form className="row px-3 pt-2" onSubmit={handleSubmit(submitVote)}>
      {/* Name Field */}
      <div className="col-12">
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            className="form-control"
            {...register("nominatorName")}
          />
        </div>
      </div>

      {/* Email Field */}
      <div className="col-12">
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            className="form-control"
            {...register("nominatoremail")}
          />
        </div>
      </div>

     

      {/* Description Field */}
      <div className="col-md-12">
        <div className="form-group">
          <textarea
            className="form-control"
            placeholder="Description"
            style={{ height: "auto", minHeight: "100px" }}
            {...register("leave_message")}
          ></textarea>
        </div>
      </div>

      {/* Checkbox Field */}
      <div className="col-md-12">
        <div className="mt-1 flex items-start gap-3">
          <input
            id="comments"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 mt-1"
            {...register("agreement", { required: true })}
          />
          <p className="text-gray-500 text-sm">
            Note:- I certify that this review is based on my own experience and
            is my genuine opinion of this hotel, and that I have no personal or
            business relationship with this establishment, and have not been
            offered any incentive or payment originating from the establishment
            to write this review. I understand that Luxury Hotels Magazines
            Platform has a zero-tolerance policy on fake reviews.
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="col-md-12 mt-3">
        <button className="theme-btn" type="submit">
          {!loading ? "Submit" : "Submit ..."}
        </button>
      </div>
    </form>
    </>
  )
}

export default VoteForm