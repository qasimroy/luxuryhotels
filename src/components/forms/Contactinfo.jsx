"use client"
import React, { use, useEffect } from 'react'
import { useForm } from "react-hook-form";
import Link from 'next/link'
import useRequest from "@component/hooks/UseRequest";
import { apis } from '@component/apiendpoints/api';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
const Contactinfo = () => {
    const { register, handleSubmit, getValues, formState: { errors }, reset } = useForm();
    const { request, response, loading } = useRequest()
    const { pass_files } = useSelector((state) => state.siteSetting)
    const gethotel_info = JSON.parse(sessionStorage.getItem("hotel_info_data") ?? "{}")
    const router=useRouter()
    const { request: requestfetch, response: responsefetch } = useRequest();
        const { request: requestedit, response: responseedit,loading:loadingedit } = useRequest();
        const hotel_details =localStorage.getItem("hotel_details") ? JSON.parse(localStorage.getItem("hotel_details") ):null

      
    const onSubmit = async (data) => {
        const formdata = new FormData
        const { about, additional_information, country, lat, description, location, long, map_url, meta_description, meta_tags, meta_target_age_groups, meta_target_country, meta_title, other_facilities, restaurants_bars, rooms_suites, spa_wellness, website, youtube, hotel_name,google_photos } = gethotel_info
        console.log("data",gethotel_info)
        if(!hotel_details){

        
        if (pass_files?.hotel_logo) {

            formdata.append("hotel_logo", pass_files.hotel_logo)
        }
        if (pass_files?.images) {
            pass_files?.images?.map((it)=>{
                formdata.append("images", it)
            })
        }
        const facility_info = JSON.parse(sessionStorage.getItem("facility_info"))
        const user_details = JSON.parse(localStorage.getItem("userdetails") ?? "{}")
        formdata.append("about", about)
        formdata.append("hotel_name", hotel_name)
        formdata.append("representative", user_details?._id)
        formdata.append("additional_information", additional_information)
        formdata.append("country", JSON.parse(country).value)
        formdata.append("description", description)
        formdata.append("lat", lat)
        formdata.append("location", location)
        formdata.append("long", long)
        formdata.append("map_url", map_url)
        formdata.append("meta_description", meta_description)
        formdata.append("meta_tags", meta_tags)
        formdata.append("meta_target_age_groups", meta_target_age_groups)
        formdata.append("meta_target_country", meta_target_country)
        formdata.append("meta_title", meta_title)
        formdata.append("other_facilities", other_facilities)
        formdata.append("restaurants_bars", restaurants_bars)
        formdata.append("rooms_suites", rooms_suites)
        formdata.append("spa_wellness", spa_wellness)
        formdata.append("website", website)
        formdata.append("youtube", youtube)
        formdata.append("hotel_facilities", typeof facility_info?.hotel_facilities == "object" ? facility_info?.hotel_facilities?.join(",") : "")
        formdata.append("hotel_highlights", typeof facility_info?.hotel_highlights == "object" ? facility_info?.hotel_highlights?.join(",") : "")
        formdata.append("room_amenities", typeof facility_info?.room_amenities == "object" ? facility_info?.room_amenities?.join(",") : "")
        formdata.append("hotel_manager_name", data.hotel_manager_name)

        formdata.append("hotel_manager_email", data.hotel_manager_email)
        formdata.append("hotel_manager_telephone", data.hotel_manager_telephone)
        formdata.append("marketing_manager_name", data.marketing_manager_name)
        formdata.append("marketing_manager_email", data.marketing_manager_email)
        formdata.append("marketing_manager_telephone", data.marketing_manager_telephone)
        formdata.append("actual_person_name", data.actual_person_name ?? "")
        formdata.append("actual_person_telephone", data.actual_person_telephone ?? "")
        formdata.append("actual_person_email", data.actual_person_email ?? "")
        formdata.append("google_photos", google_photos)

        
        

        const response_data = await request("POST", apis.HOTEL_GENRAL_INFORMATION, formdata)
       
       

        if (response_data?.data) {
            console.log("response", response_data);
            toast.success(response_data?.message);
            sessionStorage.removeItem("hotel_info_data");
            sessionStorage.removeItem("facility_info")
            localStorage.setItem("hotel_details", JSON.stringify(response_data.data));
            router.push("/dashboard/preview-hotel");
        }

    }else{
        const edit_responsne=await requestedit("PUT",`${apis.HOTEL_CONTACT_INFO}`,{
            ...data,hotel_id:hotel_details._id
            })
            console.log("response_data?.data",edit_responsne);
        if(edit_responsne){
            router.push("/dashboard/preview-hotel");
            toast.success(edit_responsne.message)
            
        }
    }
    }



    useEffect(()=>{
        if(hotel_details){
            requestfetch("GET", `${apis.GETHOTEL_PROFILE}${hotel_details?._id}`)
        }
    },[])
    
       
    

    useEffect(() => {
    
            if (responsefetch?.data) {
                let { hotel_manager_name, 
                    hotel_manager_email , 
                    hotel_manager_telephone ,marketing_manager_email ,marketing_manager_name,marketing_manager_telephone,actual_person_name,
                    actual_person_telephone,
                    actual_person_email, } = responsefetch?.data

                reset(
                    {
                        hotel_manager_name, 
                    hotel_manager_email , 
                    hotel_manager_telephone ,marketing_manager_email ,marketing_manager_name,marketing_manager_telephone,actual_person_name,
                    actual_person_telephone,
                    actual_person_email,
                    }
                )
    
    
            }
    
        }, [responsefetch])
    return (
        <div><h3 className='comman-heading3'>
            Please complete all sections with*. The rest of the sections are optional
        </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h4 className='comman-heading4'>
                    Contact 1
                </h4>
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder='Hotel Manager Name'

                                {...register("hotel_manager_name", { required: "hotel manager name is required", setValueAs: v => v.trim() })}
                                className="form-control"
                            />
                            <span className="error_message">
                                {errors["hotel_manager_name"] && `${errors.hotel_manager_name.message}`}
                            </span>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <input
                                type="email"

                                placeholder='Email'
                                {...register("hotel_manager_email", { required: "hotel manager email is required", setValueAs: v => v.trim() })}
                                className="form-control"
                            />
                            <span className="error_message">
                                {errors["hotel_manager_email"] && `${errors.hotel_manager_email.message}`}
                            </span>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <input
                                type="text"

                                placeholder='Telephone'
                                {...register("hotel_manager_telephone", { required: "hotel manager telephone is required", setValueAs: v => v.trim() })}
                                className="form-control"
                            />
                            <span className="error_message">
                                {errors["hotel_manager_telephone"] && `${errors.hotel_manager_telephone.message}`}
                            </span>
                        </div>
                    </div>
                </div>
                <h4 className='comman-heading4'>
                    Contact 2
                </h4>
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <input
                                type="text"

                                placeholder='Marketing Manager Name'
                                {...register("marketing_manager_name", { required: "marketing manager name is required", setValueAs: v => v.trim() })}
                                className="form-control"
                            />
                            <span className="error_message">
                                {errors["marketing_manager_name"] && `${errors.marketing_manager_name.message}`}
                            </span>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <input
                                type="email"

                                placeholder='Email'
                                {...register("marketing_manager_email", { required: "marketing manager email is required", setValueAs: v => v.trim() })}
                                className="form-control"
                            />
                            <span className="error_message">
                                {errors["marketing_manager_email"] && `${errors.marketing_manager_email.message}`}
                            </span>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <input
                                type="text"


                                placeholder='Telephone'
                                {...register("marketing_manager_telephone", { required: "marketing manager email is required", setValueAs: v => v.trim() })}
                                className="form-control"
                            />
                            <span className="error_message">
                                {errors["marketing_manager_telephone"] && `${errors.marketing_manager_telephone.message}`}
                            </span>
                        </div>
                    </div>
                    
                </div>
                <h4 className='comman-heading4'>
                    Contact 3 (Optional)
                </h4>
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <input
                                type="text"

                                placeholder='Your Name'
                                {...register("actual_person_name",{setValueAs: v => v.trim()})}
                                className="form-control"
                            />
                           
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <input
                                type="email"

                                placeholder='Email'
                                {...register("actual_person_email",{setValueAs: v => v.trim()})}
                                className="form-control"
                            />

                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <input
                                type="text"


                                placeholder='Telephone'
                                {...register("actual_person_telephone",{setValueAs: v => v.trim()})}
                                className="form-control"
                            />
                            
                        </div>
                    </div>
                    
                </div>
                <div className='footer-btn text-end'>
                    <Link href="/dashboard/facilities-amenities" className='next-btn '>  Previous
                    </Link>
                    <button type="submit" disabled={loading || loadingedit} className='save-btn ms-3'>  Continue </button>
                </div>
            </form></div>
    )
}

export default Contactinfo