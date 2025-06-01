import Link from 'next/link'
import React from 'react'

function InfoPage() {
  return (
    <>
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
              <p className="steps-text text-center mb-3 capitalize" style={{color:"#9E7921"}}>
                Please Check Your email and login in to your new Hotel DashBoard 
              </p>
              <p className='text-center capitalize' style={{color:"#9E7921"}}>Using The VeriFication link </p>
            </div>
            <div className="form-group both-btn">

                  

            <Link href="/login" className="theme-btn">Login</Link>
                </div>

          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default InfoPage