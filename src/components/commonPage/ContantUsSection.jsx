import React from 'react'
import HearderNameSection from '../hearderNameIcon'
import Link from 'next/link'

function ContantUsSection() {
  return (
    <>
    <HearderNameSection name={"Contact Us"} />
     <div className="py-14">
        <div className="mx-auto max-w-7xl contact-us">
          <div className="border-8 border-golden contact-us-box">
            <div>
              <p className="text-golden text-center mb-2 text-md uppercase">
                Continue Reading
              </p>
              <Link href="/what-we-do" className="text-xl uppercase text-white text-center">
                WHAT WE DO
              </Link>
            </div>
          </div>
          <div className="border-8 border-golden contact-us-box">
            <div>
              <p className="text-white text-center mb-2 text-md uppercase">
                Looks Great?
              </p>
              <Link href="/Contact-us" className="text-xl uppercase text-white">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContantUsSection