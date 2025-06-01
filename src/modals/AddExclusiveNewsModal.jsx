import React from 'react'

function AddExclusiveNewsModal({closeNewsLetter}) {
  return (
    <>
<div className="modal modal-newsletter d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="newsletter-outerBox ">
                            {/* Close Icon */}
                            <button
                                className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                                onClick={closeNewsLetter}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <h4 className="text-center newsletter-heading1">
                            ADD EXCLUSIVE OFFERS
                            </h4>
                           
                             <ol className="aligned-list">
                                <li><span>1.</span>Post an Exclusive Offer on Your Hotel Page – One offer at a time. Once expired, you can add a new one during your contract period.
                                </li>
                                <li>
                                <span>2.</span>
                                 Feature Your Offer on the Home Page – Pay a small fee to show your offer to more travelers.
                                </li>
                                

                            </ol>
                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}

export default AddExclusiveNewsModal