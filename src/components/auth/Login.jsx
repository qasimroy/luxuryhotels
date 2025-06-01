
"use client"
import { apis } from '@component/apiendpoints/api';
import useRequest from '@component/hooks/UseRequest';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import Link from 'next/link';




const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { request, response, loading } = useRequest(true)
  const { register, handleSubmit, formState: { errors } } = useForm();

  const router = useRouter()

  const onsubmit = (data) => {
    request("POST", apis.LOGIN, data)
  }
  useEffect(() => {
    if (response) {
      if (response?.status) {
        router.push('/dashboard')
        toast.success("login successfully")
      }
    }
  }, [response])



  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }
useEffect(()=>{
  if(response){
    if(response.status){
      router.push('/dashboard')
      let payload={
user: response.user,
hotel_details: response.detail
      }
      localStorage.setItem("userdetails",JSON.stringify(response.user))
      localStorage.setItem("hotel_details",JSON.stringify(response.detail))
      toast.success("login successfully")
    }
  }
}, [response])
  return (
    <section className="login-section">
      <div className="container-fluid">
        <div className="row align-items-center form-bg-color">
          {/* Image Section */}
          <div className="col-md-6">
            <div className="login-img">
              <img src="/new/assets/img/5stored-building.png" alt="Luxury Hotel Building" className="img-fluid" />
            </div>
          </div>

          {/* Form Section */}
          <div className="col-md-6">
            <div className="login-content">
              <h3 className="login-heading">LIST YOUR LUXURY HOTEL AND SHINE GLOBALLY!</h3>
              <div className="login-info">
                <p className="intro-text">
                  Why pay commissions when you can keep 100% of your bookings? Join the luxury hotels platform today and:
                </p>
                <ol className="aligned-list">
                  <li>
                    <span>1.</span> Enjoy direct, commission-free bookings
                  </li>
                  <li>
                    <span>2.</span> Showcase your hotel to a global audience
                  </li>
                  <li>
                    <span>3.</span> Control your profile & customize anytime
                  </li>
                </ol>
                <p className="closing-text">
                  Creating your hotel profile is quick and easy—just 5 minutes to put your property on the map!
                  Get started now and make your mark in the world of luxury!
                </p>
              </div>

              <form className="login-form" onSubmit={handleSubmit(onsubmit)}>
                <div className="form-group">
                  <input
                    className={
                      errors.email
                        ? "form-control is-invalid"
                        : "form-control border-input"
                    }
                    type="email" {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: 'Invalid email format',
                      },
                    })} placeholder="Enter Your Email" />
                  <span className="error_message">
                    {errors["email"] && `${errors.email.message}`}
                  </span>

                </div>
                <div className="form-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={
                      errors.password
                        ? "form-control is-invalid"
                        : "form-control border-input"
                    }
                    {...register('password', { required: 'Password is required' })}
                    placeholder="Enter Password"
                  />
                  <span onClick={handleShowPassword} className="show-password">
                    {!showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="h-6 w-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"></path></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="h-6 w-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path></svg>
                      
                    )}
                  </span>
                  {errors?.password?.message && (
                  <span className="error_message">
                    {errors["password"] && `${errors.password.message}`}
                  </span>
                  )}
                </div>
                <div className="form-group">
                  <Link href="/forget-password" className="F-password page-link">FORGET PASSWORD?</Link>
                </div>
                <div className="form-group both-btn">

                  <button type="submit" className="theme-btn">{loading ? "...LOGIN" : "LOGIN"}</button>

                </div>
                <div className="form-group">
                  <p className="switch-account">
                    DONT'T HAVE AN ACCOUNT? <Link href="/register"
                      className="page-link"
                    >REGISTER</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
