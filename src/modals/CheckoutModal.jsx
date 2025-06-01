import React, { useState } from 'react'
import { useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement, Elements } from '@stripe/react-stripe-js';
import useRequest from '@component/hooks/UseRequest';
import { apis } from '@component/apiendpoints/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


const CheckoutModal = ({ setShowModal, response_data ,amount,payment_method,detils_data,purpose,time,create_function,redirect}) => {
    const stripe = useStripe();
    const elements = useElements();
    const {request,response,loading} = useRequest(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const user_details = localStorage.getItem('userdetails') ? JSON.parse(localStorage.getItem('userdetails')) : null

    const router=useRouter()

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);
        const create_intent=await request("POST",apis.CREATE_INTENT,{amount})
        console.log("create_intent",create_intent)
        // Create a payment method
        // const cardNumber = elements.getElement(CardNumberElement);
        const result = await stripe.confirmCardPayment(create_intent?.client_secret, {
            payment_method: {
                card: elements.getElement(CardNumberElement),
                billing_details: {
                    name: user_details?.name && user_details?.name,
                    email: user_details?.email && user_details?.email,
                    address: {
                        line1: "daya nagar",
                        city: "beawar",
                        state: "rajasthan",
                        postal_code: "903487",
                        country: "IN",
                    }
                }
            }
        })
        console.log(result.error,"result");

       
        if(result?.paymentIntent?.status==="succeeded"){
            let payload={
                "payment_method": payment_method,
                "detail": JSON.stringify(detils_data),
                "price": amount,
                "time": time,
                "paymentID": result.paymentIntent.id,
                "purpose": purpose
            }
           
            const create_payment=await request("POST",apis.PAYMENT_POST,payload)
            
            create_function(result?.paymentIntent?.status==="succeeded" ?"completed":"failed")
            if(create_payment){
                setShowModal(false)
                if(redirect){

                    router.push(redirect)
                }
                return toast.success("payment successfully")

            }

        }
        if(result?.error){
            toast.error(result?.error?.message)
        }

        
        setErrorMessage('');
        setIsProcessing(false);

        // You can now send the paymentMethod.id to your server for processing.
    };

    return (

        <>


            <div className="modal d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Payment Details</h5>
                            <button type="button" className="close" onClick={() => setShowModal(false)}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className='row with-border' onSubmit={handleSubmit}>
                                <div className="form-group col-12">
                                    <label>Card Number</label>
                                    <CardNumberElement className='form-control' />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Expiry Date</label>
                                    <CardExpiryElement  className='form-control' />
                                </div>
                                <div className="form-group col-md-6" >
                                    <label>CVC</label>
                                    <CardCvcElement  className='form-control' />
                                </div>
                                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                                <button className='theme-btn '  type="submit" disabled={!stripe || isProcessing}>
                                    {isProcessing ? 'Processing...' : 'Pay'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>



        </>



    )
}

export default CheckoutModal