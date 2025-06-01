"use client"
import { apis } from '@component/apiendpoints/api';
import useRequest from '@component/hooks/UseRequest';
import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Controller, useForm } from 'react-hook-form';
import CheckoutModal from '@component/modals/CheckoutModal';
import SquarePayment from '@component/modals/SquarePaymentGateway';
import Link from 'next/link';

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
function PaymentDescription() {
    const stripePromise = loadStripe('pk_live_51IhBByD3gzWFhFEcvzKD2S1fOTTiF2CjXgikLRqGH0yQvHR5QFQthkT5zoUe069NFb881KGo1Oj0C0G4xhdPf7dO00ilSXPHBD');
    // const stripePromise = loadStripe('sk_test_51PdbSIEe0eJ754NYb2mjRqPtODtnoiYJ3gfDo68XwoMGZWDae3COzLX5jYyWEwwkChjAj2ws2uXUqccJ2nX1dBNb00cViAdfUo');

    const { register, handleSubmit, formState: { errors }, watch, getValues, setValue, reset, control } = useForm();
    const [showModal, setShowModal] = useState(true);
    const [res_data, steRes_data] = useState(null)
    const [defaultdata, setDefaultData] = useState(null)

    const { request, response, loading } = useRequest(true);
    const { request: request_checkout, response: response_checkout } = useRequest(true);
    const { request: request_create } = useRequest(true);

    const [data, setData] = useState([])
    const userdetails = localStorage.getItem("userdetails")
        ? JSON?.parse(localStorage.getItem("userdetails"))
        : null;
    const totalAmount = data.reduce((sum, it) => sum + (parseFloat(it.amount) || parseFloat(it.price) || parseFloat(it.pay_amount) || 0), 0);

    const hotel_details = localStorage.getItem("hotel_details")
        ? JSON?.parse(localStorage.getItem("hotel_details"))
        : null;
    console.log("hotel_details", userdetails)
    const onSubmit = (data) => {
        const payload = {
            amount: totalAmount,          // Keep the static amount or make it dynamic
            months: "all payments",               // If months is static (like 6 months), set it here
            hotel: "all carts checkout",   // Use the hotel name from the form input
        };

        // create_data("completed")
        request_checkout("POST", apis.ADD_NOMINEE_CHECKOUT_HOTEL, payload)
    }

    useEffect(() => {
        if (userdetails) {
            const user_id = userdetails?._id
            request("POST", apis.GET_ADD_TO_CART, { user_id: user_id })
        }
    }, [])

    useEffect(() => {
        if (response_checkout) {
            steRes_data(response_checkout)
            setShowModal(watch("payment_method"));
        }
    }, [response_checkout])



    useEffect(() => {
        if (response) {


            const newarray = response?.data?.map((it) => {
                let exclusive_offer = it.exclusiveoffer ? JSON.parse(it.exclusiveoffer) : null;
                console.log(exclusive_offer,"exclusive_offer")
                let nominate_hotel = it.nominate_hotel ? JSON.parse(it.nominate_hotel) : null;
                let packages = it.packages ? JSON.parse(it.packages) : null;
                let addOns = it.addOns ? JSON.parse(it.addOns) : null;
                let Travel_news = it.Travel_news ? JSON.parse(it.Travel_news) : null;

                console.log(addOns, "Parsed addOns");

                // Convert addOns object to an array
                // let addOnsArray = addOns ? Object.values(addOns).map(item => JSON.parse(item)) : [];
                let addOnsArray = addOns
                    ? Object.values(addOns)
                        .filter(item => item && item.trim() !== "") // Ensure it's not empty or undefined
                        .map(item => {
                            try {
                                return JSON.parse(item);
                            } catch (error) {
                                console.error("Invalid JSON:", item, error);
                                return null; // Return null or handle accordingly
                            }
                        })
                    : [];


                let obj = [
                    exclusive_offer,
                    nominate_hotel,
                    packages,
                    Travel_news,
                    ...addOnsArray // Spread the add-ons safely
                ];

                console.log(obj, "Final obj");

                return obj;
            });
            setDefaultData(response?.data)
            setData(newarray.flat(Infinity).filter(item => item !== null && item !== "" && item !== 0))
            console.log(newarray, "Final newarray");
        }
    }, [response]);

    const exclusiveoffer = data[0]?.exclusiveoffer ? JSON.parse(data[0]?.exclusiveoffer) : {}

    console.log("response", data)

    const render_html = (index, name, description, amount) => {
        return (<><td>{index}</td>
            <td>{name}</td>
            
            <td>{description}</td>
            <td><span className='font-auto'>{amount || 0} </span> </td></>)
    }

    //     const create_data = (payment_status) => {
    //         console.log("Calling this function");
    //         let addons = defaultdata.find((it)     => it.addOns ? it : null)
    //         if (addons) {
    //             addons=JSON.parse(addons?.addOns)
    //             console.log(addons,"test")

    //             request_create("POST", apis.ADD_ADD_ONOFFER, {
    //                 userID: userdetails._id,
    //                 bestLuxTravellers: addons?.best_luxury_hotels ?JSON.parse(addons?.best_luxury_hotels)._id : "",
    //                 exclusiveOffers: addons?.exclusive_offer ?JSON.parse(addons?.exclusive_offer)._id:  "",
    //                 travelNews:  addons?.news ?JSON.parse(addons?.news)._id:  "",
    //                 videoBanner:  addons?.banner ?JSON.parse(addons?.banner)._id:  "",
    //                 luxury_getaway:  addons?.luxury_getaway ?JSON.parse(addons?.luxury_getaway)._id:  "",
    //                 logo_link:  addons?.logo_link ?JSON.parse(addons?.logo_link)._id:  "",
    //                 hotelId: hotel_details?._id,
    //             });
    //         }

    //         // Create a new FormData instance for the second request
    //         const nominate = data.find((it) => it.key == "nominate")
    //         console.log(nominate,"test")
    //         if (nominate) {

    //             const formData2 = new FormData();

    //             // Append fields to FormData
    //             formData2.append("nomination_type", "hotel");
    //             formData2.append("hotelName", nominate?.hotelName || "");
    //             formData2.append("country", nominate?.country || "");
    //             formData2.append("nominatorName", nominate?.nominatorName || "");
    //             formData2.append("hotelWebsite",nominate?.hotelWebsite || "");
    //             formData2.append("nominatorEmail", nominate?.nominatorEmail || "");
    //             formData2.append("paymaent_status", payment_status || "");
    //             formData2.append("desc", nominate?.desc || "");
    //             formData2.append("nominationStartDate", nominate?.nominationStartDate || "");
    //             formData2.append("nominationEndDate",nominate?.nominationEndDate  || "");
    //             formData2.append("youtube_video_url", nominate?.youtube_video_url || "");
    //             formData2.append("leave_message", "youtube" || "");  // Duplicate of youtubeLink
    //             formData2.append("request_to_visit", nominate?.request_to_visit === "true" ? "yes" : "no");
    //             formData2.append("hotel", hotel_details?._id || "");
    //             formData2.append("pay_amount",nominate?.pay_amount || "");



    //             // Send second request
    //             request_create("POST", apis.CREATE_NOMAINATE, formData2);
    //         }

    //         const travel_news = data.find((it) => it.key == "travel_news")
    //         console.log(travel_news,"test")
    //         if (travel_news) {

    //             const formdata3 = new FormData

    //             formdata3.append('news_type', travel_news.news_type || '');
    //             formdata3.append('hotel', travel_news.hotel || '');
    //             formdata3.append('country', travel_news.country || '');
    //             formdata3.append('user_name', travel_news.user_name || '');
    //             formdata3.append('website_url', travel_news.website_url || '');
    //             formdata3.append('facebook_page', travel_news.facebook_page || '');
    //             formdata3.append('instagrameLink', travel_news.instagrameLink || '');
    //             formdata3.append('youtube_video_url', travel_news.youtube_video_url || '');
    //             formdata3.append('news_description', travel_news.news_description);
    //             formdata3.append('email', travel_news.email);
    //             formdata3.append('news_title', travel_news.news_title);
    //             formdata3.append('paymaent_status', payment_status);
    //             formdata3.append('business_name', travel_news?.business_name);

    //             formdata3.append("offer_name", travel_news.offer_name)
    //             formdata3.append("offer_url", travel_news.offer_url)
    //             formdata3.append("offer_description", travel_news.offer_description ?? "")
    //             formdata3.append("offer_from", travel_news.offer_from)
    //             formdata3.append("offer_to", travel_news.offer_to)
    //             formdata3.append("hotel_id", travel_news._id)
    //             formdata3.append("file", travel_news.file)
    //             // formdata3.append("show_on_home", paidExclusiveOffer)

    //             // paymaent_status,contactNo,active 



    //             request_create("POST", apis.CREATE_HOTEL_NEWS, formdata3)
    //         }

    //         const package_plan = data.find((it) => it.key == "package")
    //         console.log(package_plan,"test")
    //         if (package_plan) {

    //             request_create("POST", apis.SAVE_HOTEL_SUBSCRIPTION, {
    //                 "userID": userdetails?._id,
    //                 "bestLuxTravellers": "",
    //                 "exclusiveOffers": "",
    //                 "travelNews": "",
    //                 "videoBanner": "",
    //                 "planId": package_plan.planId,
    //                 "hotelId": hotel_details._id,
    //                 "planDuration": package_plan?.planDuration
    //             })
    //         }

    //         const exclusive_offer = data.find((it) => it.key == "exclusive_offer")
    // console.log(exclusive_offer,"test")
    //         if (exclusive_offer) {


    //             const formData = new FormData
    //             formData.append("offer_name", exclusive_offer.offer_name);
    //             formData.append("offer_url", exclusive_offer.offer_url);
    //             formData.append("offer_description", exclusive_offer.offer_description ?? "");
    //             formData.append("offer_from", exclusive_offer.offer_from);
    //             formData.append("offer_to", exclusive_offer.offer_to);
    //             formData.append("hotel", hotel_details?._id);
    //             formData.append("show_on_home", exclusive_offer?.show_on_home);
    //             formData.append('paymaent_status', payment_status);
    //             formData.append('file', hotel_details.file);



    //             request_create("POST", apis.CREATE_EXCLUSIVE, formData);

    //             const ids=defaultdata.map((it)=>it._id)
    //             request_create("POST",apis.DELETE_ADD_TO_CART,{ids})
    //         }
    //     };


    const create_data = async (payment_status) => {
        console.log("Calling this function");
        let apiRequests = []; // Store all API calls here

        let addons = defaultdata.find((it) => it.addOns ? it : null);
        if (addons) {
            addons = JSON.parse(addons?.addOns);
            console.log(addons, "test");

            apiRequests.push(request_create("POST", apis.ADD_ADD_ONOFFER, {
                userID: userdetails._id,
                bestLuxTravellers: addons?.best_luxury_hotels ? JSON.parse(addons?.best_luxury_hotels)._id : "",
                exclusiveOffers: addons?.exclusive_offer ? JSON.parse(addons?.exclusive_offer)._id : "",
                travelNews: addons?.news ? JSON.parse(addons?.news)._id : "",
                videoBanner: addons?.banner ? JSON.parse(addons?.banner)._id : "",
                luxury_getaway: addons?.luxury_getaway ? JSON.parse(addons?.luxury_getaway)._id : "",
                logo_link: addons?.logo_link ? JSON.parse(addons?.logo_link)._id : "",
                hotelId: hotel_details?._id,
            }));
        }

        const nominate = data.find((it) => it.key == "nominate");
        console.log(nominate, "test");
        if (nominate) {
            const formData2 = new FormData();
            formData2.append("nomination_type", "hotel");
            formData2.append("hotelName", nominate?.hotelName || "");
            formData2.append("country", nominate?.country || "");
            formData2.append("nominatorName", nominate?.nominatorName || "");
            formData2.append("hotelWebsite", nominate?.hotelWebsite || "");
            formData2.append("nominatorEmail", nominate?.nominatorEmail || "");
            formData2.append("paymaent_status", payment_status || "");
            formData2.append("desc", nominate?.desc || "");
            formData2.append("nominationStartDate", nominate?.nominationStartDate || "");
            formData2.append("nominationEndDate", nominate?.nominationEndDate || "");
            formData2.append("youtube_video_url", nominate?.youtube_video_url || "");
            formData2.append("leave_message", "youtube" || "");
            formData2.append("request_to_visit", nominate?.request_to_visit === "true" ? "yes" : "no");
            formData2.append("hotel", hotel_details?._id || "");
            formData2.append("pay_amount", nominate?.pay_amount || "");
            formData2.append("images",nominate?.file || "")

            apiRequests.push(request_create("POST", apis.CREATE_NOMAINATE, formData2));
        }

        const travel_news = data.find((it) => it.key == "travel_news");
        console.log(travel_news, "test");
        if (travel_news) {
            const formdata3 = new FormData();
            formdata3.append('news_type', travel_news.news_type || '');
            formdata3.append('hotel', travel_news.hotel || '');
            formdata3.append('country', travel_news.country || '');
            formdata3.append('user_name', travel_news.user_name || '');
            formdata3.append('website_url', travel_news.website_url || '');
            formdata3.append('facebook_page', travel_news.facebook_page || '');
            formdata3.append('instagrameLink', travel_news.instagrameLink || '');
            formdata3.append('youtube_video_url', travel_news.youtube_video_url || '');
            formdata3.append('news_description', travel_news.news_description);
            formdata3.append('email', travel_news.email);
            formdata3.append('news_title', travel_news.news_title);
            formdata3.append('paymaent_status', payment_status);
            formdata3.append('business_name', travel_news?.business_name);
            formdata3.append("offer_name", travel_news.offer_name);
            formdata3.append("offer_url", travel_news.offer_url);
            formdata3.append("offer_description", travel_news.offer_description ?? "");
            formdata3.append("offer_from", travel_news.offer_from);
            formdata3.append("offer_to", travel_news.offer_to);
            formdata3.append("hotel_id", travel_news._id);
            formdata3.append("file", travel_news.file);

            apiRequests.push(request_create("POST", apis.CREATE_HOTEL_NEWS, formdata3));
        }

        const package_plan = data.find((it) => it.key == "package");
        console.log(package_plan, "test");
        if (package_plan) {
            apiRequests.push(request_create("POST", apis.SAVE_HOTEL_SUBSCRIPTION, {
                "userID": userdetails?._id,
                "bestLuxTravellers": "",
                "exclusiveOffers": "",
                "travelNews": "",
                "videoBanner": "",
                "planId": package_plan.planId,
                "hotelId": hotel_details._id,
                "planDuration": package_plan?.planDuration
            }));
        }

        const exclusive_offer = data.find((it) => it.key == "exclusive_offer");
        console.log(exclusive_offer, "test==");
        if (exclusive_offer) {
            const formData = new FormData();
            formData.append("offer_name", exclusive_offer.offer_name);
            formData.append("offer_url", exclusive_offer.offer_url);
            formData.append("offer_description", exclusive_offer.offer_description ?? "");
            formData.append("offer_from", exclusive_offer.offer_from);
            formData.append("offer_to", exclusive_offer.offer_to);
            formData.append("hotel", hotel_details?._id);
            formData.append("show_on_home", exclusive_offer?.show_on_home);
            formData.append('paymaent_status', payment_status);
            formData.append('offer_image', exclusive_offer.file);

            apiRequests.push(request_create("POST", apis.CREATE_EXCLUSIVE, formData));
        }

        // Wait for all API calls to finish
        try {
            await Promise.all(apiRequests);
            // Now call DELETE API
            const ids = defaultdata.map((it) => it._id);
            await request_create("POST", apis.DELETE_ADD_TO_CART, { ids,user_id:userdetails._id });
            console.log("Deleted add to cart items successfully");
        } catch (error) {
            console.error("Error in API requests:", error);
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="mb-4 summary-text text-center">Payment Summary</h2>
            <div className="card shadow-sm">
                <div className="card-body">
                    <h5 className="card-title">Features Details</h5>
                    <div className='table-responsive '>
                        <table className="table theme-table table-bordered mt-3">
                            <thead className="table-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Features</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data &&
                                    data.map((it, i) => {
                                        let category =
                                            it.key === "exclusive_offer" ? "Exclusive Offer" :
                                                it.key === "travel_news" ? "Travel News" :
                                                    it.key === "nominate" ? "Nominate" : it.key == "package" ? "Package" :
                                                        "AddOns"; // Default to AddOns if key doesn't match other cases

                                        let description = it.offer_description || it.description || it.desc || it?.news_description || "N/A"; // Fallback to description
                                        let amount = it.amount || it.price || it.pay_amount || 0; // Use amount for exclusive offers, price for addons
                                        let index = i + 1;

                                        return (
                                            <tr key={i}>
                                                {render_html(index, category, description, amount)}
                                            </tr>
                                        );
                                    })}



                                {/* <tr>
                                    <td>2</td>
                                    <td>Travel News</td>
                                    <td>Travel news On Secondary Page</td>
                                    <td><span className='font-auto'>$10 </span></td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Add Exclusive Offer</td>
                                    <td>Home Page</td>
                                    <td><span className='font-auto'>$10 </span></td>
                                </tr> */}
                            </tbody>
                        </table>
                    </div>
                    {/* Billing & Summary Section */}
                    <div className="row">
                        <div className="col-md-6">
                            <h5 className="mt-3 details-h">Billing Details</h5>
                            <div className='user-info-text'>
                                <p><strong>Name:</strong> {userdetails?.name}</p>
                                <p><strong>Email:</strong> {userdetails?.email}</p>
                                {/* <p><strong>Address:</strong> 123 Main St, New York, USA</p> */}
                            </div>
                        </div>
                        <div className="col-md-6 text-end">
                            <h5 className="mt-3 details-h">Total Summary</h5>
                            {/* <p className='details-h2 mb-2'><strong>Subtotal:</strong> <span className='font-auto'> $45</span></p> */}
                            <h4 className='totle-pay'><strong>Total:</strong> <span className='font-auto'>${totalAmount}</span> </h4> {/* Corrected total */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal-overlay pt-3">
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
                        <button type="submit" onClick={onSubmit} className="save-btn" style={{ width: "98%", margin: "0px" }}>PROCEED TO CHECKOUT</button>
                    </div>
                </div>
                <div className='footer-btn text-end'>
                                <Link href="/dashboard/travel-news" className='next-btn'>Previous</Link>

                                <Link href="/dashboard/voter-information" className='next-btn'>Continue</Link>
                            </div>
            </div>

            {/* Payment Button */}
            {/* <div className="text-end mt-4">
                <button className="theme-btn">Proceed to Payment</button>
            </div> */}
            {showModal == "stripe" && res_data && <Elements stripe={stripePromise}> <CheckoutModal response_data={res_data} stripePromise={stripePromise} setShowModal={setShowModal} amount={totalAmount} payment_method={watch("payment_method")} detils_data={data} purpose="nomination" time={6} create_function={create_data} redirect={"/dashboard/preview-hotel"} /></Elements>}
            {/* <SquarePayment setShowModal={setShowModal} />  */}
        </div>
    );
}

export default PaymentDescription;