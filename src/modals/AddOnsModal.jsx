import React from 'react'

function AddOnsModal({closeNewsLetter}) {
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
                                BOOST YOUR HOTEL VISIBILITY
                            </h4>
                           
                             <ol className="aligned-list">
                                <li><span>1.</span> Add Your Hotel to Our Video Banner- Enhance visibility and help travelers quickly understand what your hotel offers. Choose between Homepage or Secondary page.
                                </li>
                                <li>
                                <span>2.</span>Feature in "New Luxe Gateway" – Add your hotel’s YouTube link to attract travelers looking for trending destinations and new experiences.
                                </li>
                                <li>


                                <span>3.</span>Post Your Hotel Logo with a Link – Display your hotel logo with a direct link to your website for more visibility and direct bookings.

                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddOnsModal