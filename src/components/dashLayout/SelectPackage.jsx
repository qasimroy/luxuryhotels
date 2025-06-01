"use client"

import Link from 'next/link'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import CheckoutModal from '@component/modals/CheckoutModal';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useForm } from 'react-hook-form';
import useRequest from '@component/hooks/UseRequest';
import { apis } from '@component/apiendpoints/api';
import moment from 'moment';
import { useRouter } from 'next/navigation';

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



function SelectPackage() {
    const router = useRouter()
    const { register, handleSubmit, formState: { errors }, getValues, watch, reset } = useForm();
    const { request, response, loading } = useRequest(true);
    const { request: requetPaypal, response: responsePaypal } = useRequest(true);
    const { request: request_all_subscription, response: response_all_subscription, } = useRequest(true);
    const [SelectPackage, setSelectPackage] = useState('') 
    const [ActivePackage, setActivePackage] = useState(``);
    const [planDuration, setplanDuration] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [res_data, steRes_data] = useState(null)
    const hotel_details = localStorage.getItem("hotel_details") ? JSON.parse(localStorage.getItem("hotel_details")) : null
    const user_details = localStorage.getItem('userdetails') ? JSON.parse(localStorage.getItem('userdetails')) : null
    const { request: request_create } = useRequest(true);
    const [amount,setAmount] = useState(0);
    const { request: request_create_payment,response:response_create_payment } = useRequest(true);
    const querysearch = new URLSearchParams(window.location.search)
    const { request: request_get,response:reponse_get } = useRequest(true);
    


    const stripePromise = loadStripe('pk_live_51IhBByD3gzWFhFEcvzKD2S1fOTTiF2CjXgikLRqGH0yQvHR5QFQthkT5zoUe069NFb881KGo1Oj0C0G4xhdPf7dO00ilSXPHBD');


 


    const all_subscription = useMemo(() => {
        if (response_all_subscription) {
            return response_all_subscription?.response
        }
    }, [response_all_subscription])



    const addondata_details = useMemo(() => {
        if (response) {
            setSelectPackage(response?.data?.plan?.planId)
            return {
                purchaseDate: response?.data?.plan?.purchaseDate,
                endDate: response?.data?.plan?.endDate,
                plan_name: response?.data?.planDetail?.name,
                planId: response?.data?.plan?.planId
            }

        }
    }, [response])
    const default_addtocart_id=useRef()

    const userdetails = localStorage.getItem("userdetails")
    ? JSON.parse(localStorage.getItem("userdetails"))
    : null;

    const get_addtocart=async()=>{
            const res_data=await request_get("POST",apis.GET_ADD_TO_CART,{user_id:userdetails?._id})
            let objectsWithAddOns = res_data?.data.find(item => item.packages && item.packages !== "\"\"");
            if(objectsWithAddOns){
              default_addtocart_id.current=objectsWithAddOns?._id
              objectsWithAddOns=JSON.parse(objectsWithAddOns?.packages)
               setActivePackage(objectsWithAddOns?.planId)
            }
          }
          useEffect(() => {
            request_all_subscription("GET", apis.GET_ALL_SUBSCRIPTION)
            if (user_details?._id && hotel_details?._id) {
    
             request("POST", apis.GET_HOTELS_ADDONS_DATA, {
                    "userID": user_details?._id,
                    "hotelId": hotel_details?._id
                    
                })
            }
            get_addtocart()
        }, [])


  const onSubmit =async () => {
    const payload={
        "userID": user_details?._id,
        "bestLuxTravellers": "",
        "exclusiveOffers": "",
        "travelNews": "",
        "videoBanner": "",
        "planId": SelectPackage,
        "hotelId": hotel_details?._id,
        "planDuration": planDuration?.duration,
        amount:amount,
        key:"package"
    }
     const formData = new FormData();
        //   console.log("payload",JSON.stringify(payload))
          formData.append("addOns","")
          formData.append("packages",JSON.stringify(payload))
          formData.append("exclusiveoffer","")
          formData.append("nominate_hotel","")
          formData.append("file", "")
          formData.append("user_id", user_details?._id);
          if(default_addtocart_id?.current){
            formData.append("id",default_addtocart_id.current)
          }
        
            
         const  res_data=await request_create_payment("POST",apis.ADD_TO_CART,formData);
         console.log(res_data,"res_data")
         default_addtocart_id.current=res_data?.data?._id
         if(res_data){
            router.push('/dashboard/add-ons')
          }

          
  }

  useEffect(()=>{
    if(response_create_payment){
      router.push("/dashboard/add-ons")
    }
  },response_create_payment)


   
 

          


    return (
        <>
            <h3 className='comman-heading3'>
                Please complete your hotel's information to continue
            </h3>
           

            {/* {addondata_details && <TeamVisitForm addondata_details={addondata_details} />} */}
                <div className="plan_outerBox">
                    {/* Premium Plan */}
                    { all_subscription  && all_subscription?.map((it) => {
                        return(
                        <>
                        <div className="plan-cards" key={it._id}>
                            <div className={`planCardBox ${it?._id==(SelectPackage || ActivePackage) && "activeCard"}  ${it.name==="Celebrity AI Package" ? "text-white bg-red-600" : ""}`}>
                            {it?._id==SelectPackage &&<div className="activeplan">Active</div>}
                            {it?._id==ActivePackage &&<div className="activeplan">Selected</div>}
                            
                                <h3 className="plan-name">  {it.name}</h3>
                                <p className="plan-price">€ {it.price}
                                <span className='text-capitalize'>{" " }{it?.durationMeasure}</span>
                                    </p> 
                                <ul className="plan-info text-capitalize ">

                                    {it.features.map((val, i) => {
                                        return (<li key={i} className="plan-info-item">
                                            <svg
                                                stroke="currentColor"
                                                fill="currentColor"
                                                strokeWidth="0"
                                                viewBox="0 0 512 512"
                                                className="h-5 w-5 text-green-500"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
                                            </svg>
                                            <span className='text-red-800 list-selectPage'>{val}</span>
                                        </li>)
                                    })}



                            </ul>
                        </div>
                        <button className='save-btn' onClick={()=>{
                                setplanDuration(it)
                                setSelectPackage(it._id)
                                setAmount(it.price)
                            }}>Select {it.name}</button>
                    </div>
                            </>
                        )
                })}



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
                    </div>
                </div>
            </div> */}
            {/* <div className='footer-btn text-end'>
                <Link href="/dashboard/preview-hotel" className='next-btn me-auto'>  Previous </Link>
                <button onClick={async () => {
                    if (watch("payment_method") == "paypal") {
                        let redirect_uri = "http://localhost:3000/new/dashboard/select-package?send_payment=true"
                        sessionStorage.setItem('save-hotel', JSON.stringify({
                            "userID": user_details?._id,
                            "bestLuxTravellers": "",
                            "exclusiveOffers": "",
                            "travelNews": "",
                            "videoBanner": "",
                            "planId": SelectPackage,
                            "hotelId": hotel_details?._id,
                            "planDuration": planDuration?.duration
                        }))

                        sessionStorage.setItem("paymentdata", JSON.stringify({
                            "payment_method": "paypal",
                            "detail": JSON.stringify({
                                "userID": user_details?._id,
                                "bestLuxTravellers": "",
                                "exclusiveOffers": "",
                                "travelNews": "",
                                "videoBanner": "",
                                "planId": SelectPackage,
                                "hotelId": hotel_details?._id,
                                "planDuration": planDuration?.duration
                            }),
                            "price": planDuration.price,
                            "time": planDuration?.duration + planDuration?.durationMeasure,

                            "purpose": "publish-news"
                        }))
                        const res = await requetPaypal("POST", "payment/create-payent/paypal", { amount: planDuration.price, redirect_uri })
                        if (res?.link) {
                            window.location.href = res.link
                        }
                    }


                    steRes_data({
                        "userID": user_details?._id,
                        "bestLuxTravellers": "",
                        "exclusiveOffers": "",
                        "travelNews": "",
                        "videoBanner": "",
                        "planId": SelectPackage,
                        "hotelId": hotel_details?._id,
                        "planDuration": planDuration?.duration
                    })
                    setShowModal(true)
                }} className='save-btn'>  Proceed to payment </button>
                <button onClick={onSubmit} className='save-btn'>
                   Proceed to checkout
                </button>
                <div>  
                <p>if not purchase package then </p>
                <Link href="/dashboard/add-ons" className='next-btn me-auto'>  Continue </Link>
                </div>
            </div> */}
            <div className="footer-btn d-flex justify-content-end align-items-center gap-3">
    <Link href="/dashboard/preview-hotel" className="btn next-btn ">
        Previous
    </Link>

    <button onClick={onSubmit} className="btn save-btn">
        Proceed to Checkout
    </button>

    <div className="text-center mb-5">
        <p className="mb-4">(If not purchase package then press)</p>
        <Link href="/dashboard/add-ons" className="btn next-btn">
            Continue
        </Link>
    </div>
</div>


            {showModal && res_data && <Elements stripe={stripePromise}> <CheckoutModal response_data={res_data} stripePromise={stripePromise} setShowModal={setShowModal} amount={planDuration?.price} payment_method={watch("payment_method")} detils_data={getValues()} purpose="publish-news" time={planDuration?.duration + planDuration?.durationMeasure} create_function={create_news} redirect={"/dashboard/voter-information"} /></Elements>}
        </>
    )
}

export default SelectPackage


const TeamVisitForm = ({ addondata_details }) => {
    return (
        <div className="team-visit-form shadow-xl border-radius-2xl p-8 border border-gray rounded-2xl bg-white text-sm mt-8 mb-2">
            <div className="w-full space-y-5">
                <div className="w-full flex flex-col md:flex-row gap-5">
                    {/* Plan Name */}
                    <div className="w-full">
                        <h3 className="inner-heading mb-2">Plan Name</h3>
                        <input
                            type="text"
                            name="name"

                            className="selected-plan"
                            disabled
                            value={addondata_details?.plan_name}
                        />
                    </div>

                    {/* Purchase Date */}
                    <div className="w-full">
                        <h3 className="inner-heading mb-2">Purchase Date</h3>
                        <input
                            type="text"
                            name="purchaseDate"
                            className="selected-plan"
                            disabled
                            value={ addondata_details?.endDate ? moment(addondata_details?.endDate).format("DD-MM-YYYY") : " "}
                        // value="01-25-2025"

                        />
                    </div>

                    {/* Expiry Date */}
                    <div className="w-full">
                        <h3 className="inner-heading mb-2">Expiry Date</h3>
                        <input
                            type="text"
                            name="expiryDate"
                            className="selected-plan"
                            disabled
                            value={ addondata_details?.purchaseDate ? moment(addondata_details?.purchaseDate).format("DD-MM-YYYY") : " "}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};