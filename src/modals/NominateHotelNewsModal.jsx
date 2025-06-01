import React from 'react'

function NominateHotelNewsModal({ closeNewsLetter }) {
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

                            <h5 className="text-center newsletter-heading1">
                                NOMINATE YOUR HOTEL FOR LUXURY HOTEL AWARDS
                            </h5>

                            <ol className="aligned-list">
                                <li>Submit your hotel and receive:
                                </li>
                                <li>
                                    <span>1.</span>
                                    Maximum Exposure – Your hotel will be seen by all travelers on the homepage.
                                </li>
                                <li>
                                    <span>2.</span>
                                    Email Marketing Boost – We send your nomination and invite our clients to vote for you, ensuring millions of subscribers learn about your hotel.
                                </li>
                                <li>
                                    <span>3.</span>
                                    Collect Valuable Data – Download voter details and use them for your own marketing needs.
                                </li>
                                <li>
                                    <span>4.</span>

                                    Win Recognition – Hotels ranking 1st, 2nd, or 3rd will receive exclusive Luxury Hotels Awards.
                                </li>


                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NominateHotelNewsModal