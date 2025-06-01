"use client"
import { apis } from '@component/apiendpoints/api';
import useRequest from '@component/hooks/UseRequest';
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";

const AddExclusivePublishNews = ({setShowAddExclusiveOffer}) => {
    const { register, handleSubmit, getValues, formState: { errors }, reset,setValue ,watch} = useForm();
    const { request, response, loading } = useRequest()
    const hotel_details =localStorage.getItem("hotel_details") ? JSON.parse(localStorage.getItem("hotel_details") ):null
    const onSubmit=async(data)=>{
        const formdata=new FormData
        formdata.append("offer_name",data.offer_name)
        formdata.append("offer_url",data.offer_url)
        formdata.append("offer_description",data.offer_description ?? "")
        formdata.append("offer_from",data.offer_from)
        formdata.append("offer_to",data.offer_to)
        formdata.append("hotel",hotel_details._id)
        if(data.offer_image){
            formdata.append("offer_image",data.offer_image[0])
        }
        const res_data=await request('POST',apis.CREATE_EXCLUSIVE,formdata)
        if(res_data?.status){
            toast.success(res_data?.message)
        }
        
    }
  return (
    <>
    <h3 className='comman-heading3'>
                Add Exclusive Offer for Free to the final page of Your Hotel (*Optional)
            </h3>
     <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">
                                Offer title<span>*</span>
                            </label>
                            <input
                            
                            {...register("offer_name", { required: "Offer name is required", setValueAs: v => v.trim() })}
                                type="text"
                                placeholder="  Offer name"
                                className="form-control"
                            />
                            <span className="error_message">
                                {errors["offer_name"] && `${errors.offer_name.message}`}
                            </span>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">
                                Enter Your website url where the offer could be redeem <span>*</span>
                            </label>
                            <input
                            
                            {...register("offer_url", { required: "Offer url is required", setValueAs: v => v.trim() })}
                                type="text"
                                placeholder="Offer url"
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
                            <label htmlFor="name" className="form-label">
                                Offer description
                            </label>
                            <input
                                type="text"
                                placeholder="Offer description "
                                className="form-control"
                                {...register("offer_description", { required: "Offer description is required"})}
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
                            
                            {...register("offer_to", { required: "Offer to is required"})}
                                type="date"
                                className="form-control"
                            />
                            <span className="error_message">
                                {errors["offer_to"] && `${errors.offer_to.message}`}
                            </span>
                        </div>
                    </div>

                    {/* <div className="col-md-6">
    <div className="form-group">
        <label htmlFor="countrySelect" className="form-label">
            Select Type <span>*</span>
        </label>
        
        <select
            id="countrySelect"
            {...register("type", { required: "Please select a Type" })}
            className={
               "form-control "
            }
        >
            
            
            <option value="free">Free</option>
            <option value="payment">Payment</option> 
        </select>
        
    </div>
</div> */}

                    {/* {watch("type")=="payment" &&<div className="col-md-12 mt-4">
                        <div className="form-group">
                            <input {...register("offer_image", { required: "Please select a Type" })} className='d-none' type='file' id='upload-img-2' />
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
                                    <p className="uppercase text-grayDark mb-0">Upload Image for your offer</p>
                                </div>
                            </label>
                            <p className="text-xs uppercase leading-5 text-grayDark mt-1">
                            Attach file. File size of your documents should not exceed 10MB
                            </p>
                            {watch("offer_image") && <span>{watch("offer_image")[0]?.name}</span> }
                        </div>
                    </div>} */}
                    <div className='footer-btn text-end'>
                        <button onClick={()=>setShowAddExclusiveOffer(false)} className='next-btn'>  Cancel </button>
                       
                        <button type='submit' className='save-btn'>  Add Offer </button>
                        {/* <Link href="/win-a-holiday" className='next-btn'>Next</Link> */}
                    </div>
                </div>
            </form>
    </>
  )
}

export default AddExclusivePublishNews;