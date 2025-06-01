'use client'
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { apis } from '@component/apiendpoints/api';
import useRequest from '@component/hooks/UseRequest';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import InfoPage from './InfoPage';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();
  // const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showInfoPage, setShowInfoPage] = useState(false)
  
  const [showConfirmPassword, setShowConfirmPassword]=useState(false)
  const { request, response, loading } = useRequest(true)

  const onSubmit = (data) => {
    request("POST", apis.SIGNUP, data)
  };
 
  useEffect(() => {
    if (response) {
      // console.log("response: " + response)
      if (response.status) {
        // localStorage.setItem("userdetails",JSON.stringify(response.user))
        // localStorage.setItem("hotel_details",JSON.stringify(response.detail))
        toast.success("SIGNUP SUCCESSFULLY AND PLEASE CHECK YOUR EMAIL TO VERIFY YOUR ACCOUNT.")
        setShowInfoPage(true)
        // router.push('/login')
      }
    }
  }, [response])

  const handleConFirmShowPassword =()=>{
    setShowConfirmPassword(!showConfirmPassword);
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  return (
<>
{!showInfoPage ? (
   <section className="login-section">
   <div className="container-fluid">
     <div className="row align-items-center form-bg-color">
       <div className="col-md-6">
         <div className="login-img">
           <img src="/new/assets/img/5stored-building.png" alt="" />
         </div>
       </div>
       <div className="col-md-6">
         <div className="login-content">
           <h3 className="register-heading">WELCOME TO</h3>
           <p className="register-info" >
             List your luxury hotel on our platform to receive direct commission-free bookings.</p>
           <p className="steps-text text-center mb-3 capitalize">
             Create a Hotel Profile only takes 5 mintues!
           </p>

           <form onSubmit={handleSubmit(onSubmit)} className="login-form">
             <div className="form-group">
               <input
                 type="text"


                 className={
                   errors.name
                     ? "form-control is-invalid"
                     : "form-control border-input"
                 }
                 {...register('name', { required: 'Name is required' })}

                 placeholder="ENTER YOUR NAME"


               />

               <span className="error_message">
                 {errors["name"] && `${errors.name.message}`}
               </span>
             </div>
             <div className="form-group">
               <input

                 type="email"

                 className={
                   errors.email
                     ? "form-control is-invalid"
                     : "form-control border-input"
                 }
                 {...register('email', {
                   required: 'Email is required',
                   pattern: {
                     value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                     message: 'Invalid email format',
                   },
                 })}
                 placeholder="Enter YOUR EMAIL"
               />
               <span className="error_message">
                 {errors["email"] && `${errors.email.message}`}
               </span>
             </div>
             <div className="form-group">
               <input
                 type={showPassword ? "text":"password"}
                 className={
                   errors.password
                     ? "form-control is-invalid"
                     : "form-control border-input"
                 }
                 {...register('password', {
                   required: 'Password is required',
                   minLength: {
                     value: 6,
                     message: 'Password must be at least 6 characters long',
                   },
                 })}

                 placeholder="CREATE PASSWORD"
               />
               <span onClick={handleShowPassword} className="show-password">
                 {!showPassword ? (
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="h-6 w-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"></path></svg>
                ) : (
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="h-6 w-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path></svg>
                 )}
               </span>
               {errors?.password?.message &&(
               <span className="error_message">
                 {errors["password"] && `${errors?.password?.message}`}
               </span>
               )}
             </div>
             <div className="form-group">
               <input
                 type={showConfirmPassword ? "text" : "password"}
                 className={
                   errors.confirmPassword
                     ? "form-control is-invalid"
                     : "form-control border-input"
                 }
                 {...register('passwordConfirm', {
                   required: 'Please confirm your password',
                   validate: (value) =>
                     value === watch('password') || 'Passwords do not match',
                 })}

                 placeholder="CONFIRM PASSWORD"
               />
               <span onClick={handleConFirmShowPassword} className="show-password">
                 {!showConfirmPassword ? (<span>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="h-6 w-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"></path></svg>
                 </span>) : (

                   <span>
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" className="h-6 w-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path></svg>
                   </span>
                 )}
               </span>
                {errors?.passwordConfirm?.message && (
               <span className="error_message">
                 {errors["passwordConfirm"] && `${errors?.passwordConfirm?.message}`}
               </span>
                )}
             </div>
             <div className="form-group both-btn">

               <button type="submit" className="theme-btn">{loading ? "...SIGN UP" : "SIGN UP"}</button>

             </div>
             <div className="form-group">
               <p className="swich-account">
                 ALREADY HAVE AN ACCOUNT? <a href="/login" className="page-link"></a>
               </p>
             </div>
             <div className="form-group">
               <p className="swich-account">
                 By signing up, I have read and agree to{' '}
                 <a href="/terms" className="page-link">Terms</a>
                 <span> and </span>
                 <a href="/privacy-policy" className="page-link">Privacy Policy</a>
               </p>

             </div>
           </form>
         </div>
       </div>
     </div>
   </div>
 </section>
):(
   <InfoPage />
)}
</>
    
  );
};

export default SignUp;
