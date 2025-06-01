"use client"
import { apis, BASEURL } from '@component/apiendpoints/api';
import useRequest from '@component/hooks/UseRequest';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Map from '../Map';
import ImagesModal from '@component/modals/ImagesModal';


function Previewhotel() {
    const { request, response } = useRequest();
    const { request: request_edit } = useRequest();
    const [data, setData] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const hotel_details = JSON.parse(localStorage.getItem("hotel_details") ?? "{}")
    // const user_Details=typeof window !== 'undefined' && localStorage.getItem('userdetails')
    useEffect(() => {

        request("GET", `${apis.GETHOTEL_PROFILE}${hotel_details?._id}`)
    }, [])


    useEffect(() => {
        if (response?.data) {
            console.log(response, "response")

            setData(response?.data)
            let {
                description,
                about,
                rooms_suites,
                restaurants_bars,
                spa_wellness,
                other_facilities,
                additional_information, } = response?.data
            reset({
                description,
                about,
                rooms_suites,
                restaurants_bars,
                spa_wellness,
                other_facilities,
                additional_information,
            })
        }
    }, [response])

    const onSubmit = async (data) => {
        console.log('Form Data:', data);
        const res_data = await request_edit("PUT", `${apis.EDIT_HOTEL_INFORMATION_FROM_PREVIEW}?hotel_id=${hotel_details?._id}`, data)
        console.log(res_data, 'res_data')
        if (res_data) {
            toast.success(res_data?.message)
        }
    };
    const allImages = [
        ...(data?.google_photos || []),
        ...(data?.images || [])
    ];

    // Get preview images (first 6)
    const previewImages = allImages.slice(0, 6);

    // Get remaining images (after the first 6)
    const remainingImages = allImages.slice(6);
    return (
        <>
            {data ? (<>
                <h3 className='comman-heading3'>
                    Edit Your Hotel ALL Text Fields
                </h3>
                <div className="aboutHotel-card">
                    {/* <div className="hotelImg">
                    <img src={`${BASEURL}/${data?.hotel_logo}`} />
                </div> */}
                    <h3 className="hotelName">
                        {data?.hotel_name}
                    </h3>
                    <div className="hotelLocation aboutHotel-info">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 384 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" ><path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path></svg> <span>
                            {data?.country?.country}, {data?.country?.code}
                        </span>
                    </div>
                    <div className="hotelWebsit aboutHotel-info">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z"></path></svg>
                        <Link href={data?.website ?? ""}>{data?.website}</Link>
                    </div>
                </div>

                <div className='desh-borderBox mt-4'>
                    <div className='row'>
                        <h3 className="hotelName">
                            My hotel gallery
                        </h3>
                        <div className='col-md-6'>
                            <ul className='hotel-img-list'>
                                {allImages?.map((it, i) => (
                                    <li key={i} className='hotel-img-item'>
                                        {it.slice(0, 5) == "https" ? <img src={`${it}`} alt="Gallery 1" style={{ width: "100%", borderRadius: "8px" }} /> : <img src={`${BASEURL}/${it}`} alt="Gallery 1" style={{ width: "100%", borderRadius: "8px" }} />}

                                    </li>
                                ))}
                                {/* {remainingImages?.length > 0 && (
                                    <>
                                        <li className='hotel-img-item last-grid-item relative cursor-pointer'>
                                            <img className="backdrop-blur-md" src={remainingImages?.[0]?.startsWith("https") ? remainingImages?.[0] : `${BASEURL}/${remainingImages?.[0]}`} />
                                            <div className='absolute inset-0 gird-info-number  flex items-center justify-center'>

                                                <span className='text-white text-sm text-center' onClick={() => setIsOpen(true)}>
                                                    See All {remainingImages?.length} Photos
                                                </span>
                                            </div>
                                        </li>
                                    </>
                                )}
                                 {isOpen && (
                                    <div>
                                        <ImagesModal previewImages={remainingImages} setIsOpen={setIsOpen} />
                                    </div>
                                )} */}
                        </ul>
                            {/* <p className="hotelName">Khanna</p>
                            <p className='contectNo'><b>Contact :</b><span> </span></p>
                            <p className='Location'><b>Location :</b><span><span className="locality">Khanna</span>, <span className="region">Punjab</span>, <span className="country-name">India</span></span></p> */}
                        </div>
                        <div className='col-md-6'>
                            {/* <iframe height="400" width="100%" src={data?.map_url}></iframe> */}
                            <Map location={{ lat: parseFloat(hotel_details?.lat), lng: parseFloat(hotel_details?.long) }} />

                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="aboutHotel-card mt-5">
                        <h3 className="hotelName">
                            About Hotel
                        </h3>
                        {/* <p>
                   {data?.about}
                </p> */}
                        <div className="accordion-body" >
                            <textarea style={{ height: "auto", width: "100%" }}

                                {...register('about')}
                            >
                            </textarea>
                        </div>

                        <div className="accordion theme-accordion" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Description
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <textarea style={{ height: "auto" }}
                                            {...register('description')}

                                        >

                                        </textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        ROOMS AND SUITS
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <textarea style={{ height: "auto" }}
                                            {...register('rooms_suites')}

                                        >

                                        </textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        Spa & wellness
                                    </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <textarea style={{ height: "auto" }}
                                            {...register('spa_wellness')}

                                        >
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                            Spa & wellness
                            </button>
                        </h2>
                        <div id="collapse4" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                            <textarea style={{ height: "auto" }}>
                                    From JFK International
                                </textarea>
                            </div>
                        </div>
                    </div> */}
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse5" aria-expanded="false" aria-controls="collapse5">
                                        Restaurant and bar
                                    </button>
                                </h2>
                                <div id="collapse5" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <textarea style={{ height: "auto" }}

                                            {...register('restaurants_bars')}
                                        >

                                        </textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse6" aria-expanded="false" aria-controls="collapse6">
                                        Additional information
                                    </button>
                                </h2>
                                <div id="collapse6" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <textarea style={{ height: "auto", width: "100%" }}
                                            {...register('additional_information')}

                                        >
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse7" aria-expanded="false" aria-controls="collapse7">
                                        Other Facilities
                                    </button>
                                </h2>
                                <div id="collapse7" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <textarea style={{ height: "auto" }}

                                            {...register('other_facilities')}
                                        >
                                        </textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='footer-btn text-end'>
                            <Link href="/dashboard/reviews" className='next-btn'>Previous </Link>
                            <button type='submit' className='save-btn'>Save </button>

                            <Link href="/dashboard/hotel-analytics" className='next-btn'>Continue </Link>
                        </div>
                    </div>
                </form>


            </>) : (<h3 className='comman-heading3'>
                No Hotel Added
            </h3>)}

        </>
    )
}

export default Previewhotel;