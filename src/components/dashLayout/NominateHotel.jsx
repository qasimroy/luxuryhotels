"use client"
import { apis } from '@component/apiendpoints/api';
import useRequest from '@component/hooks/UseRequest';
import CheckoutModal from '@component/modals/CheckoutModal';
import PaypaModal from '@component/modals/PaypaModal';
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import SquarePayment from '@component/modals/SquarePaymentGateway';
import NominateHotelNewsModal from '@component/modals/NominateHotelNewsModal';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

// const paymentMethods = [
//     {
//         id: "credit",
//         value: "stripe",
//         label: "Debit/Credit Card",
//         imgSrc: "/new/assets/img/card.png",
//     },
//     {
//         id: "Paypal",
//         value: "paypal",
//         label: "Pay with Paypal",
//         imgSrc: "/new/assets/img/paypay.png",
//     },
//     {
//         id: "Square",
//         value: "square",
//         label: "Pay with Square",
//         imgSrc: "/new/assets/img/square_logo.png",
//     },
//     {
//         id: "Tipalti",
//         value: "tipalti",
//         label: "Pay with Tipalti",
//         imgSrc: "/new/assets/img/tipalti.png",
//     },
// ];

const NominateHotel = () => {

    const stripePromise = loadStripe('pk_live_51IhBByD3gzWFhFEcvzKD2S1fOTTiF2CjXgikLRqGH0yQvHR5QFQthkT5zoUe069NFb881KGo1Oj0C0G4xhdPf7dO00ilSXPHBD');

    const { request: request_create } = useRequest(true);
    const router = useRouter()
 

    const { pass_information, countryData } = useSelector((state) => state.siteSetting)

    const [isVisitHotel, setIsVisitHotel] = useState(false);
    const { request: requestfetch, response: responsefetch } = useRequest();
    const { register, handleSubmit, formState: { errors }, watch, getValues, setValue, reset, control } = useForm();
    const [res_data, steRes_data] = useState(null)
    const { request, response, loading } = useRequest(true);
    let amount = 0.5;
    const hotel_details = localStorage.getItem("hotel_details") ? JSON.parse(localStorage.getItem("hotel_details")) : null
    const user_details = localStorage.getItem('userdetails') ? JSON.parse(localStorage.getItem('userdetails')) : null


    const [showModal, setShowModal] = useState(true);
    const [preview, setPreview] = useState(null);

    // const onSubmit = (data) => {
    //     const payload = {
    //         amount: amount,          // Keep the static amount or make it dynamic
    //         months: 6,               // If months is static (like 6 months), set it here
    //         hotel: data.hotelName,   // Use the hotel name from the form input
    //     };

    //     console.log(data,'data')
    //     if(data.payment_method=="paypal"){
    //         create_nomainate("pending")
    //     }else{
    //         request("POST", apis.ADD_NOMINEE_CHECKOUT_HOTEL, payload)
    //     }
    // }

    // useEffect(() => {
    //     if (response) {
    //         console.log(response, "response");
    //         steRes_data(response)
    //         setShowModal(watch("payment_method"));
    //     }
    // }, [response])


    useEffect(() => {
        if (hotel_details) {
            requestfetch("GET", `${apis.GETHOTEL_PROFILE}${hotel_details?._id}`)
        }
    }, [])

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const validTypes = ["image/jpeg", "image/jpg", "image/png"];
            console.log("validTypes", validTypes)
            if (!validTypes.includes(file.type)) {
                toast.error("Only JPG, JPEG, and PNG files are allowed.");
                setPreview(null);
                setValue("file", null); // Reset input
                return;
            }


            setPreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setPreview(null);
        setValue("file", null); // Reset form field
    };


    // const new_fetch_hotel_info = useMemo(() => {

    //     if (responsefetch) {
    //         let {

    //             _id: hotelId,
    //             hotel_name,


    //             website,
    //             youtube,
    //             country, } = responsefetch?.data

    //         reset(
    //             {

    //                 hotelName: hotel_name,
    //                 name: user_details?.name,
    //                 email: user_details?.email,

    //                 country: {
    //                     value: country._id, label: country.country
    //                 },
    //                 youtubeLink: youtube,
    //                 websiteLink: website
    //             }
    //         )

    //         return responsefetch?.data


    //     }

    // }, [responsefetch])


    // const create_nomainate =async (paymaent_status) => {
    //     const { businessType, hotelName, country, name, websiteLink, facebook, instagrameLink, youtubeLink, newsDescription, email, newsTitle, file, validTo, validFrom, description, hotelVisit, } = getValues()

    //     const formdata = new FormData
    //     // Append fields to FormData
    //     formdata.append('nomination_type', "hotel" || '');
    //     formdata.append('hotelName', hotelName || '');
    //     formdata.append('country', JSON.parse(country)?.country || '');
    //     formdata.append('nominatorName', name || '');
    //     formdata.append('hotelWebsite', websiteLink || '');

    //     formdata.append('nominatorEmail', email);

    //     formdata.append('paymaent_status', paymaent_status);

    //     formdata.append('desc', description);
    //     formdata.append('nominationStartDate', validFrom);
    //     formdata.append('nominationEndDate', validTo);
    //     formdata.append('youtube_video_url', youtubeLink);
    //     formdata.append('leave_message', youtubeLink);
    //     formdata.append('request_to_visit', hotelVisit == "true" ? "yes" : "no");
    //     formdata.append('hotel', hotel_details?._id);
    //     formdata.append('pay_amount', amount);
    //     formdata.append('payment_gateway', watch("payment_method"));
    //     // formdata.append('Subscription', "");
    //     // paymaent_status,contactNo,active 

    //     // Append file if it exists
    //     if (file) {
    //         formdata.append('images', file[0]);
    //     }

    //     const res=await  request_create("POST", apis.CREATE_NOMAINATE, formdata)
    //     if(res?.link){
    //         window.location.href=res.link
    //     }
    // }

    //   const countyOptions = useMemo(() => {
    //         if (countryData) {
    //             return countryData?.map((it) => {
    //                 return { value: it.code, label: it.country }
    //             })
    //         }
    //     }, [countryData])
    const [countrySearch, setCountrySearch] = useState("")
    const [selectedCountry, setSelectedCountry] = useState("");
    const [showNomiNateHotelNews, setShowNomiNateHotelNews] = useState(false);

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

    const onSubmit = async () => {
        const { businessType, hotelName, country, name, websiteLink, instagramLink, facebookLink, facebook, instagrameLink, youtubeLink, newsDescription, email, newsTitle, file, validTo, validFrom, description, hotelVisit, } = getValues()

        console.log("country", country);

        const payload = {
            nomination_type: "hotel",
            hotelName: hotelName,
            country: selectedCountry,
            nominatorName: name,
            hotelWebsite: websiteLink,
            nominatorEmail: email,
            // paymaent_status:paymaent_status,
            desc: description,
            nominationStartDate: validFrom,
            nominationEndDate: validTo,
            youtube_video_url: youtubeLink,
            pay_amount: amount,
            instagramLink: instagramLink,
            facebookLink: facebookLink,
            // images:file[0],
            // leave_message:leaveMessage,
            request_to_visit: hotelVisit == "true" ? "yes" : "no",
            key: "nominate"
        }

        console.log("payload", payload)

        const formData = new FormData();
        // if (data.offer_image) {
        //   formData.append("offer_image", getValues().offer_image[0]);
        // }

        formData.append("addOns", "")
        formData.append("packages", "")
        formData.append("exclusiveoffer", "")
        formData.append("nominate_hotel", JSON.stringify(payload))
        formData.append("file", file[0])
        formData.append("hotel", hotel_details?._id);
        formData.append("user_id", user_details?._id)
        const res_data = await request("POST", apis.ADD_TO_CART, formData)

        console.log("res_data",res_data);

        if (res_data) {
            router.push('/dashboard/travel-news')
        }
    }

    useEffect(() => {
        const modalCount = sessionStorage.getItem("modalNominateCount") || 0;

        if (modalCount < 5) {
            setShowNomiNateHotelNews(true);
            sessionStorage.setItem("modalNominateCount", Number(modalCount) + 1);
        }
    }, []);

    const closeNewsLetter = () => {
        setShowNomiNateHotelNews(false)
    }


    return (
        <>
            <h3 className='comman-heading3'>
                NOMINATE YOUR HOTEL FOR PRESTIGIOUS LUXURY HOTELS AWARDS: COMPETE FOR 'BEST LUXURY HOTEL OF THE YEAR,' SECURE 2ND OR 3RD PLACE, AND GAIN VALUABLE VOTER DATA FOR MARKETING
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-md-6">
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

                    <div className="col-md-6">
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

                    <div className="col-md-6">
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

                    <div className="col-md-6">
                        <div className="form-group">

                            <input
                                className="form-control"
                                placeholder='Search your country name'
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
                                        // isSearchable
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
                               
                            </select> */}
                            {errors.country && <span className="text-danger">{errors.country.message}</span>}
                        </div>
                    </div>

                    <div className="col-md-6">
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
                                    {errors.hotelVisit && <span className="text-danger">{errors.hotelVisit.message}</span>}
                                </label>
                                <label className="flex items-center space-x-1">
                                    <input
                                        type="radio"
                                        value="false"
                                        {...register("hotelVisit", { required: "Please select an option" })}
                                        onChange={() => setIsVisitHotel(false)}
                                        className="h-4 w-4"
                                    />
                                    {/* {errors.hotelVisit && <span className="text-danger">{errors.hotelVisit.message}</span>} */}
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
                                        {...register("validFrom")}
                                    />
                                    {/* {errors.validFrom && <span className="text-danger">{errors.validFrom.message}</span>} */}
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
                                        {...register("validTo")}
                                    />
                                    {/* {errors.validTo && <span className="text-danger">{errors.validTo.message}</span>} */}
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
                            {errors.description && <span className="text-danger">{errors.description.message}</span>}
                        </div>
                    </div>

                    <div className="col-md-12 mt-4">
                        <div className="form-group">
                            <input {...register("file", { required: "file is required", setValueAs: (v) => v, onChange: (e) => handleImageChange(e) })} className="d-none" type="file" id="upload-img-2" />
                            {/* <label htmlFor="upload-img-2" className="form-label uploadBox">
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
                            </label> */}
                            {!preview ? (
                                <label htmlFor="upload-img-2" className="form-label uploadBox cursor-pointer">
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
                            <p className="text-xs uppercase leading-5 text-grayDark mt-1">
                                Only one ({1}) photo allowed
                            </p>
                            {errors.file && <span className="text-danger">{errors.file.message}</span>}
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
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="websiteLink" className="form-label">
                                facebook Link
                            </label>
                            <textarea
                                placeholder="Enter hotel Facebook link"
                                className="form-control"
                                {...register("facebookLink")}
                            />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label htmlFor="websiteLink" className="form-label">
                                instagram Link
                            </label>
                            <textarea
                                placeholder="Enter hotel instagram link"
                                className="form-control"
                                {...register("instagramLink")}

                            />
                        </div>
                    </div>
                    {/* <button type="submit" className="save-btn" style={{width:"98%",margin:"0px"}}>PROCEED TO CHECKOUT</button> */}


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
                    {/* <div className="modal-overlay">
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
                            <button type="submit" className="save-btn" style={{width:"98%",margin:"0px"}}>PROCEED TO CHECKOUT</button>
                            </div>
                        </div>
                    </div> */}

                   <div className="footer-btn d-flex justify-content-end align-items-center gap-3">
                        <Link href="/dashboard/win-a-holiday" className="next-btn">Previous</Link>
                        <button type="submit" className="save-btn">PROCEED TO CHECKOUT</button>
                        <div className="text-center mb-5">
                        <p className="mb-4">(If not Nominate Hotel then press)</p>
                        <Link href="/dashboard/travel-news" className="next-btn">Continue</Link>
                    </div>
                    </div>
                </div>
            </form>
            {showNomiNateHotelNews && <NominateHotelNewsModal closeNewsLetter={closeNewsLetter} />}

            {/* {showModal == "stripe" && res_data && <Elements stripe={stripePromise}> <CheckoutModal response_data={res_data} stripePromise={stripePromise} setShowModal={setShowModal} amount={amount} payment_method={watch("payment_method")} detils_data={getValues()} purpose="nomination" time={6} create_function={create_nomainate} redirect={"/dashboard/select-package"} /></Elements>}

            {showModal == "square" && res_data && <SquarePayment />}
            <SquarePayment setShowModal={setShowModal} /> */}
        </>
    )
}

export default NominateHotel