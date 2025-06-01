"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import useRequest from "@component/hooks/UseRequest";
import { apis } from "@component/apiendpoints/api";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutModal from "@component/modals/CheckoutModal";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import AddOnsModal from "@component/modals/AddOnsModal";

const paymentMethods = [
  {
    id: "credit",
    value: "stripe",
    label: "Pay with Stripe",
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

let keys=[{key:"banner",label:"Show your Hotel on Our Vedio Banner"}, {key:"luxury_getaway", label:"Feature your Hotel in the New Luxe GetaWay Every WeeK"}, {key:"best_luxury_hotels",label:" add Hotel To the homepage section best luxury hotel of the year"}, {key:"logo_link",label:"Show Your Hotel Logo on Our Website"}]

const Addons = () => {
  const stripePromise = loadStripe(
    "pk_live_51IhBByD3gzWFhFEcvzKD2S1fOTTiF2CjXgikLRqGH0yQvHR5QFQthkT5zoUe069NFb881KGo1Oj0C0G4xhdPf7dO00ilSXPHBD"
  );

  const { register, handleSubmit, getValues, watch, formState: { errors } ,resetField,setValue} = useForm();
  const [addOnData, setAddOnData] = useState([]);
  const { request, response } = useRequest();
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showModal, setShowModal] = useState(true);
  const [res_data, setResData] = useState(null);
  const { request: request_create,response:reponse_create } = useRequest(true);
  const { request: request_get,response:reponse_get } = useRequest(true);
  const { hotel_add_on_Data } = useSelector((state) => state.siteSetting);
  const router = useRouter();
  const default_addtocart_id=useRef()

  const hotel_details = localStorage.getItem("hotel_details")
    ? JSON.parse(localStorage.getItem("hotel_details"))
    : null;

  const user_details = localStorage.getItem("userdetails")
    ? JSON.parse(localStorage.getItem("userdetails"))
    : null;
  const get_addtocart=async()=>{
    const res_data=await request_get("POST",apis.GET_ADD_TO_CART,{user_id:user_details?._id})
    const objectsWithAddOns = res_data.data.find(item => item.addOns && item.addOns !== "");
    
    if(objectsWithAddOns){

      const parsedAddOns = JSON.parse(objectsWithAddOns.addOns)
      console.log(parsedAddOns,'res_data')

      if (Array.isArray(keys)) {
        keys.forEach((keyObj) => {
            if (keyObj?.key) {
              console.log(parsedAddOns[keyObj.key],keyObj.key,"suraj")
              setValue(keyObj.key, parsedAddOns[keyObj.key] || "");
            }
        });
    }
    default_addtocart_id.current=objectsWithAddOns?._id
      // setAddOnData(parsedAddOns)
    }

  }

  const [showModalNews, setShowModalNews] = useState(false);

  useEffect(() => {
      const modalCount = sessionStorage.getItem("modalShownCount") || 0;

      if (modalCount < 5) {
          setShowModalNews(true);
          sessionStorage.setItem("modalShownCount", Number(modalCount) + 1);
      }
  }, []);

  const closeNewsLetter = () => {
    setShowModalNews(false);
  };

  

  const [amount, setAmount] = useState(0);

  // Calculate the total amount
  useEffect(() => {
    const totalAmount = Object.values(selectedOptions).reduce(
      (sum, option) => sum + (option?.price || 0),
      0
    );
    setAmount(totalAmount);
  }, [selectedOptions]);

  const handleOptionChange = (key, value) => {
    console.log("key",key)
    const selectedItem = addOnData[key]?.find((item) => item._id === value);
    console.log(selectedItem,"selectedItem")
    setSelectedOptions((prev) => ({
      ...prev,
      [key]: selectedItem || null, // Store selected option details or null
    }));
  };

  useEffect(() => {
    request("GET", apis.GET_ALL_ADDONS);
    get_addtocart()
  }, []);

  useMemo(() => {
    if (response) {
      setAddOnData(response?.addons);
    }
  }, [response]);

  useEffect(()=>{
    if (hotel_add_on_Data?.outdata) {
      const typeToAddOnId = hotel_add_on_Data.outdata.reduce((acc, item) => {
          if (item?.details?.type && item?.addOnId) {
              acc[item.details.type] = item.addOnId;
          }
          return acc;
      }, {});

      console.log(typeToAddOnId, "typeToAddOnId");

      if (Array.isArray(keys)) {
          keys.forEach((keyObj) => {
              if (keyObj?.key) {
                console.log(typeToAddOnId[keyObj.key],keyObj.key,"suraj")
                setValue(keyObj.key, typeToAddOnId[keyObj.key] || "");
              }
          });
      }
  }
  },[hotel_add_on_Data])

  // const onSubmit = (data) => {
  //   setResData({
  //     userID: user_details,
  //     bestLuxTravellers: data?.best_luxury_hotels ?? "",
  //     // exclusiveOffers: data?.exclusive_offer ?? "",
  //     // travelNews: data?.news ?? "",
  //     videoBanner: data?.banner ?? "",
  //     luxury_getaway: data?.luxury_getaway ?? "",
  //     logo_link: data?.logo_link ?? "",
  //     hotelId: hotel_details,
  //   });
  //   setShowModal(true);
  // };

  const onSubmit = async(e) => {
    e.preventDefault();
    const data=getValues()
    console.log(data,"data")
    // let payload=[...data]
    // console.log(payload,"payload")
    const formdata=new FormData()
    formdata.append("addOns",JSON.stringify({...data}))
    formdata.append("packages","")
    formdata.append("exclusiveoffer","")
    formdata.append("nominate_hotel","")
    formdata.append("file","")
    formdata.append("user_id",user_details?._id)
    if(default_addtocart_id?.current){
      formdata.append("id",default_addtocart_id.current)
    }

    const res_data= await request_create("POST",apis.ADD_TO_CART,formdata) 
    console.log(res_data,"res_data")
    default_addtocart_id.current=res_data?.data?._id
    // console.log.log("res_data",res_data)
    // if(res_data){
    //   router.push('/dashboard/add-exclusive-offer')
    // }
  }

  useEffect(() => {
    if(reponse_create){
      router.push('/dashboard/add-exclusive-offer')
    }
  },[reponse_create])

  // const create_addons = (payment_status) => {
  //   const { best_luxury_hotels, exclusive_offer, news, banner, luxury_getaway, logo_link } = getValues();
  //   request_create("POST", apis.ADD_ADD_ONOFFER, {
  //     userID: user_details,
  //     bestLuxTravellers: best_luxury_hotels ?? "",
  //     // exclusiveOffers: exclusive_offer ?? "",
  //     // travelNews: news ?? "",
  //     videoBanner: banner ?? "",
  //     luxury_getaway: luxury_getaway ?? "",
  //     logo_link: logo_link ?? "",
  //     hotelId: hotel_details,
  //   });
  // };

  console.log(getValues(),"getValues",hotel_add_on_Data)

  return (
    <>
      <h3 className="comman-heading3">
        ENHANCE YOUR HOTEL'S VISIBILITY WITH OUR OPTIONAL ADD-ONS
      </h3>

      <form>
        <div className="desh-borderBox gold-label">
          {keys?.map((key) => (
            <div className="form-group" key={key}>
              <label className="form-label black-color">
                {key.label.toUpperCase()}
              </label>
              <select
                className="form-select"
                {...register(key.key)}
                onChange={(e) => handleOptionChange(key.key, e.target.value)}
              >
                <option value="">SELECT OPTION</option>
                {  addOnData[key?.key]?.map((item) => (
                  <option key={item}  value={JSON.stringify({...item,key:"addons"})}>
                    {item?.name} ({item?.location}) - €{item?.price}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {/* <div>
            <ul>
              {Object.entries(selectedOptions).map(([key, option]) =>
                option ? (
                  <li key={key}>
                    <strong>{key.replace(/_/g, " ")}</strong>: {option.name} ({option.location}) - €{option.price}
                  </li>
                ) : null
              )}
            </ul>
            <h3 className="text-lg md:text-2.7xl font-bold uppercase mb-4">
              Total Amount: €{amount}
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
                <button onClick={()=>{onSubmit()}} type="submit" className="save-btn w-100">
                      PROCEED TO CHECKOUT
                    </button>
              </div>
            </div>
          </div> */}
          
        </div>
       

        <div className="footer-btn d-flex justify-content-end align-items-center gap-3">
        <Link href="/dashboard/select-package" className="next-btn">
            Previous
          </Link>
          <button type="submit" className="save-btn" onClick={onSubmit}>
                      PROCEED TO CHECKOUT
                    </button>
          <div className="text-center mb-5">
        <p className="mb-4">(If not Select any addon then press) </p>
        <Link href="/dashboard/add-exclusive-offer" className="btn next-btn">
            Continue
        </Link>
    </div>
        </div>
        {showModalNews && (<AddOnsModal closeNewsLetter={closeNewsLetter}/>)}
      </form>

      {/* {showModal && res_data && (
        <Elements stripe={stripePromise}>
          <CheckoutModal
            response_data={res_data}
            stripePromise={stripePromise}
            setShowModal={setShowModal}
            amount={amount}
            payment_method={watch("payment_method")}
            detils_data={getValues()}
            purpose="nomination"
            time={6}
            create_function={create_addons}
          />
        </Elements>
      )} */}
    </>
  );
};

export default Addons;