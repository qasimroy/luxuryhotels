
"use client"
import { useEffect, useMemo, useRef } from "react";
import { apis, BASEURL } from "@component/apiendpoints/api";
import useRequest from "@component/hooks/UseRequest";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import CheckoutModal from '@component/modals/CheckoutModal';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useRouter } from "next/navigation";
import AddExclusiveNewsModal from "@component/modals/AddExclusiveNewsModal";

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
const AddExclusive = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
    getValues
  } = useForm();
    const stripePromise = loadStripe('pk_live_51IhBByD3gzWFhFEcvzKD2S1fOTTiF2CjXgikLRqGH0yQvHR5QFQthkT5zoUe069NFb881KGo1Oj0C0G4xhdPf7dO00ilSXPHBD');
  
  const { request,response:responsecreate } = useRequest();
  const [showNewsModal,setShowNewsModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [res_data, steRes_data] = useState(null)
    const router = useRouter()
      const { request: request_get,response:reponse_get } = useRequest(true);
    
  
  const { request:requestget,response } = useRequest();
  const { hotel_add_on_Data } = useSelector((state) => state.siteSetting)
  const [paidExclusiveOffer, setPaidExclusiveOffer] = useState(false)

  let amount =10;
//   const [isPayment, setIsPayment] = useState(false);
  const hotel_details = localStorage.getItem("hotel_details")
    ? JSON?.parse(localStorage.getItem("hotel_details"))
    : null;

    const userdetails = localStorage.getItem("userdetails")
    ? JSON.parse(localStorage.getItem("userdetails"))
    : null;
    

    const selectedType = watch("type");
  const default_addtocart_id=useRef()

    const amountAddExclusive ={
      week:5,
      month:10,
    }

    const get_addtocart=async()=>{
      
        const res_data=await request_get("POST",apis.GET_ADD_TO_CART,{user_id:userdetails?._id})
        let objectsWithAddOns = res_data.data.find(item => item.exclusiveoffer && item.exclusiveoffer !== "\"\"");

        console.log("get_addtocart",objectsWithAddOns,res_data.data)
        if(objectsWithAddOns){
          default_addtocart_id.current=objectsWithAddOns?._id
          objectsWithAddOns=JSON.parse(objectsWithAddOns?.exclusiveoffer)
          console.log(objectsWithAddOns,"objectsWithAddOns")
         reset({
      offer_name:objectsWithAddOns?.offer_name,
      offer_url:objectsWithAddOns?.offer_url,
      offer_description:objectsWithAddOns?.offer_description,
      offer_from:objectsWithAddOns?.offer_from,
      offer_to:objectsWithAddOns?.offer_to,
      amount:objectsWithAddOns?.amount,
      offer_image:objectsWithAddOns.file,
      type:objectsWithAddOns.show_on_home?"payment":""
    })
    setPaidExclusiveOffer(objectsWithAddOns.show_on_home?true:false)
    setPreview(`${BASEURL}/${objectsWithAddOns.file}`)
        
        
          // setAddOnData(parsedAddOns)
        }
    
      }


      console.log(errors,"error")
  // const onSubmit = async (data) => {
  //   // const formData = new FormData();
  //   // formData.append("offer_name", data.offer_name);
  //   // formData.append("offer_url", data.offer_url);
  //   // formData.append("offer_description", data.offer_description ?? "");
  //   // formData.append("offer_from", data.offer_from);
  //   // formData.append("offer_to", data.offer_to);
  //   // formData.append("hotel", hotel_details?._id);
  //   // if (data.offer_image) {
  //   //   formData.append("offer_image", data.offer_image[0]);
  //   // }
  //   // const res_data = await request("POST", apis.CREATE_EXCLUSIVE, formData);
  //   // if (res_data?.status) {
  //   //   toast.success(res_data?.message);
  //   // }

  //   if(paidExclusiveOffer){

  //     const payload = {
  //       amount: watch("homepage"),          // Keep the static amount or make it dynamic
  //       months: 6,               // If months is static (like 6 months), set it here
  //       hotel: "data.hotelName",   // Use the hotel name from the form input
  //     };
  //     // create_news("pending")
  //     request("POST", apis.ADD_NOMINEE_CHECKOUT_HOTEL, payload);
  //   }else{
  //     afterpaymentCallAPI()
  //   }
  // };

  // const afterpaymentCallAPI=async()=>{
  //   const formData = new FormData();
  //   formData.append("offer_name", getValues().offer_name);
  //   formData.append("offer_url", getValues().offer_url);
  //   formData.append("offer_description", getValues().offer_description ?? "");
  //   formData.append("offer_from", getValues().offer_from);
  //   formData.append("offer_to", getValues().offer_to);
  //   formData.append("hotel", hotel_details?._id);

  //   if (data.offer_image) {
  //     formData.append("offer_image", getValues().offer_image[0]);
  //   }

  //   const res_data = await request("POST", apis.CREATE_EXCLUSIVE, formData);
  //   if (res_data?.status) {
  //     toast.success(res_data?.message);
  //   }

  // }

  const onSubmit = async(e) => {
      // e.preventDefault();
      // const data=getValues()
      // const formdata=new FormData()

      const {offer_name,offer_url,offer_description,offer_from,offer_to,homepage}= getValues();
      const payload={
        offer_name: offer_name,
        offer_url: offer_url,
        offer_description: offer_description ?? "",
        offer_from: offer_from,
        offer_to: offer_to,
        show_on_home: selectedType == "payment" ? true : false,
        // show_on_home:true,
        homepage: homepage,
        amount:selectedType == "payment"?1:0,
        key:"exclusive_offer"
      }

      // console.log("getValues().offer_image[0]",getValues().offer_image[0])
      // if (data.offer_image) {
        //   formData.append("offer_image", getValues().offer_image[0]);
        // }
      const formData = new FormData();
      console.log("payload",JSON.stringify(payload))
      formData.append("addOns","")
      formData.append("packages","")
      formData.append("exclusiveoffer",JSON.stringify(payload))
      formData.append("nominate_hotel","")
      formData.append("file",getValues()?.offer_image ? getValues().offer_image?.[0] : "")
      formData.append("user_id", userdetails?._id);
      if(default_addtocart_id?.current){
        formData.append("id",default_addtocart_id.current)
      }
    
        
      const res_data= await request("POST",apis.ADD_TO_CART,formData)

      // if(res_data){
      //   router.push('/dashboard/win-a-holiday')
      // }

    
        // const res_data = await request("POST", apis.CREATE_EXCLUSIVE, formData);
        // if (res_data?.status) {
        //   toast.success(res_data?.message);
        // }
      
      //  if(selectedType === "payment"){
      //  }else{
      //    request("POST", apis.CREATE_EXCLUSIVE, formData);
      //  }
    }


    useEffect(() => {
      if (responsecreate) {
        console.log(responsecreate, "responsecreate");
        router.push('/dashboard/win-a-holiday')
        steRes_data(responsecreate)
        setShowModal(true);
      }
    }, [responsecreate]);
  

  const getOffer_details = useMemo(()=>{
    if(hotel_add_on_Data?.outdata){
      
      return hotel_add_on_Data.outdata.find((item)=>item.details?.type === "exclusive_offer")
    }
    
  },[hotel_add_on_Data])

  console.log(getOffer_details,"getOffer_details")

  useEffect(()=>{
    if(hotel_details?._id){
      requestget("GET",`${apis.GET_EXCLUSIVEOFFERS_BY_HOTEL_ID}/${hotel_details?._id}`)
    }
    get_addtocart()
  },[])

  console.log("response",response)

const get_details=useMemo(()=>{
if(response){
  console.log(response,"response")
  if(response?.hotel_offer){

    reset({
      offer_name:response.hotel_offer?.offer_name,
      offer_url:response.hotel_offer?.offer_url,
      offer_description:response.hotel_offer?.offer_description,
      offer_from:response.hotel_offer?.offer_from,
      offer_to:response.hotel_offer?.offer_to,
      
    })
  }
  return response.hotel_offer
  
}
},[response])
const [preview, setPreview] = useState(null);
console.log("preview",preview);
  const [error, setError] = useState("");

  const handleImageChange = (event) => {
    console.log("event",event)
    const file = event.target.files[0];

    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];

      if (!validTypes.includes(file.type)) {
        setError("Only JPG, JPEG, and PNG files are allowed.");
        setPreview(null);
        setValue("offer_image", null); // Reset input
        return;
      }

      setError("");
      setPreview(URL.createObjectURL(file));
    }
  };
  console.log("preview",preview,getValues());

  const handleRemoveImage = () => {
    setPreview(null);
    setError("");
    setValue("offer_image", null); // Reset form field
  };

  function closeNewsLetter(){
    setShowNewsModal(false); //
  }

  useEffect(() => {
    const modalCount = sessionStorage.getItem("modalAddExclusiveCount") || 0;

    if (modalCount < 5) {
        setShowNewsModal(true);
        sessionStorage.setItem("modalAddExclusiveCount", Number(modalCount) + 1);
    }
}, []);

// const isPayment = selectedType === "payment" || getOffer_details?.details?.name=="Homepage"

  return (
    <>
      <h3 className="comman-heading3">
      Publishing your Exclusive Offer on your Hotel Profile Page is free (*Optional)
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              {/* <label htmlFor="name" className="form-label">
                Offer name<span>*</span>
              </label> */}
              <input
                {...register("offer_name", {
                  required: "Offer name is required",
                  setValueAs: (v) => v.trim(),
                })}
                type="text"
                placeholder="Offer name"
                className="form-control"
              />
              <span className="error_message">
                {errors["offer_name"] && errors.offer_name.message}
              </span>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              {/* <label htmlFor="name" className="form-label">
                Offer url<span>*</span>
              </label> */}
              <input
                {...register("offer_url", {
                  required: "Offer url is required",
                  setValueAs: (v) => v.trim(),
                })}
                type="text"
                placeholder=" offer Url where this offer could be reedem"
                className="form-control"
              />
              <span className="error_message">
                {errors["offer_url"] && errors.offer_url.message}
              </span>
            </div>
          </div>         
          <div className="col-md-12">
  <div className="form-group">
    {/* <label htmlFor="offer_description" className="form-label">
      Offer description
    </label> */}
   <input
      type="text"
      placeholder="Offer description"
      className="form-control"
      {...register("offer_description", {
        required: "Offer description is required",
        validate: (value) => {
          const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
          return wordCount <= 15 || "Maximum 15 words allowed";
        },
      })}
    />
    <span className="error_message">
      {errors.offer_description && errors.offer_description.message}
    </span>
  </div>
</div>

          
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Offer valid from
              </label>
              <input
                {...register("offer_from", { required: "Offer from is required" })}
                type="date"
                className="form-control"
              />
              <span className="error_message">
                {errors["offer_from"] && errors.offer_from.message}
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
                {errors["offer_to"] && errors.offer_to.message}
              </span>
            </div>
          </div>


          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="countrySelect" className="form-label">
              Publishing your Exclusive Offer on the Homepage, an additional fee applies 
              </label>
              <div className="mt-1">
                <input
                  {...register("type")}
                  type="radio"
                  value="payment"
                  className="h-3 w-4"
                  checked={paidExclusiveOffer === true}
                  onChange={()=>setPaidExclusiveOffer(true)}
                  disabled={getOffer_details&& getOffer_details?.details?.name!="Homepage"}
                />
                <span className="p-1">YES</span>
             
             
                <input
                  {...register("type")}
                  type="radio"
                  value="free"
                  className="h-3 w-4"
                  checked={paidExclusiveOffer === false}
                  onChange={()=>setPaidExclusiveOffer(false)}
                  disabled={getOffer_details && getOffer_details?.details?.name=="Homepage"}
                />
                <span className="p-1">NO</span>
                </div>
            </div>
          </div>


          {paidExclusiveOffer && (
                      <>
                        <div className="col-md-12 mt-4">
                        <div className="form-group">
      <input
        {...register("offer_image", {setValueAs:(v)=>v, 
          // required: "Please select an image",
          onChange:(e)=>{
          handleImageChange(e)
        } })}
        className="hidden"
        type="file"
        id="upload-img-2"
        accept=".jpg,.jpeg,.png"
        
      />

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
            <p className="uppercase text-grayDark mb-0">Upload Image for your offer</p>
          </div>
        </label>
      ) : (
        <div className="relative mt-2">
          <img src={preview} alt="Selected" className="w-32 h-32 object-cover rounded-md shadow-md" />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-md"
          >
            ✕
          </button>
        </div>
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      <p className="text-xs uppercase leading-5 text-grayDark mt-1">Only JPG, JPEG, and PNG allowed</p>
    </div>
                        </div>
                        
                        <div className="col-md-12">
                          <div className=' '>
                            <div className="form-group" >
                              {/* <label className="form-label black-color">
                
              </label> */}
                              <select
                                className="form-control p-2"
                                {...register("homepage")}
                              // onChange={(e) => handleOptionChange(key.key, e.target.value)}
                              >
                                <option value="">SELECT OPTION</option>

                                <option value={5} >
                                  Week € {amountAddExclusive?.week}
                                </option>
                                <option value={10} >
                                  Month € {amountAddExclusive?.month}
                                </option>

                              </select>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
          {/* {paidExclusiveOffer && (
            <>
                     <div className="col-span-full">
                <h3 className="text-lg md:text-2.7xl font-bold uppercase mb-4">
                  Price: €{parseFloat(watch("homepage")) ?? 0 }
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
            </>

          )} */}
          <div className="footer-btn d-flex justify-content-end align-items-center gap-3">
            <Link href="/dashboard/add-ons" className="next-btn">
              Previous
            </Link>
            <button type="submit" className="save-btn">
              Add Offer
            </button>
            <div className="text-center mb-5">
            <p className="mb-4">(If not Add Offer then Press)</p>
            <Link href="/dashboard/win-a-holiday" className="next-btn">
              Continue
            </Link>
            </div>
          </div>
          </div>
      </form>
      {showNewsModal && (<AddExclusiveNewsModal closeNewsLetter={closeNewsLetter}/>)}

    
      {/* {showModal && res_data && <Elements stripe={stripePromise}> <CheckoutModal response_data={res_data} stripePromise={stripePromise} setShowModal={setShowModal} amount={watch("homepage")} payment_method={watch("payment_method")} detils_data={getValues()} purpose="publish-news" time={"1 Months"} create_function={afterpaymentCallAPI} redirect={watch("businessType") == "others_business" ? "travel-news" : "latest-news"} /></Elements>} */}
    </>
  );
};

export default AddExclusive;