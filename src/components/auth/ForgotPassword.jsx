'use client'
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { apis } from '@component/apiendpoints/api';
import useRequest from '@component/hooks/UseRequest';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
const ForgetPassword = () => {

  const [opt,setOtp]=useState("");``
  const [showOtp,setShowOtp] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();
  const router=useRouter()
  const {request,response,loading}=useRequest(true)

  const onSubmit = (data) => {
    request("POST",apis.FORGOT_PASSWORD,data)
  };
  const otpSubmit = (data) => {
    request("POST",apis.VERIFY_OTP,data)
  };

  useEffect(()=>{
    if(response){
        setShowOtp(true)
        // router.push('/')
        toast.success("Opt send successfully.")
      
    }
  },[response])
  return (
    <section className="login-section">
      <div className="container-fluid">
        <div className="row align-items-center form-bg-color">
          <div className="col-md-6">
            <div className="login-img">
              <img src="/new/assets/img/5stored-building.png" alt="" />
            </div>
          </div>
          {!showOtp ?(
            <div className="col-md-6">
            <div className="login-content">
              <h3 className="register-heading">Forget Password</h3>
              <p className="register-info">
                List your luxury hotel on our platform to receive direct commission-free bookings
              </p>
              <p className="steps-text text-center mb-3">
                Create a Hotel profile. Only takes 5 minutes!
              </p>

              <form action="" className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Enter Your Email"
                    className={
                      errors.email
                        ? "form-control is-invalid"
                        : "form-control border-input"
                    }
                    {...register('email', {
                      required: 'Email is required',
                      minLength: {
                        
                        message: 'Email must be at least 6 characters long',
                      },
                    })}

                  />
                  <span className="error_message">
                          {errors["email"] && `${errors.email.message}`}
                        </span>
                </div>
                <div className="form-group both-btn">
                  <button type="submit" className="theme-btn">

                    {loading?"...SEND OTP":"SEND OTP"}

                  </button>
                </div>
              </form>
            </div>
          </div>
          ):(
            <div className="col-md-6">
            <div className="login-content">
              <h3 className="register-heading">ONE TIME PASSWORD</h3>
              <p className="register-info">
                List your luxury hotel on our platform to receive direct commission-free bookings
              </p>
              <p className="steps-text text-center mb-3">
                Create a Hotel profile. Only takes 5 minutes!
              </p>

              <form action="" className="login-form" onSubmit={handleSubmit(otpSubmit)}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Enter Your OTP"
                    className={
                      errors.email
                        ? "form-control is-invalid"
                        : "form-control border-input"
                    }
                    {...register('otp', {
                      required: 'OTP IS REQUIRED',
                      // minLength: {
                        
                      //   message: 'Email must be at least 6 characters long',
                      // },
                    })}

                  />
                  <span className="error_message">
                          {errors["otp"] && `${errors.otp.message}`}
                        </span>
                </div>
                <div className="form-group both-btn">
                  <button type="submit" className="theme-btn">

                    {loading?"...VERIFY OTP":"VERIFY OTP"}

                  </button>
                </div>
              </form>
            </div>
          </div>
          )}
          
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;
