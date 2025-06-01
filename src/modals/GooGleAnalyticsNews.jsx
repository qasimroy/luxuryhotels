import React from 'react'

function GooGleAnalyticsNews({ closeNewsLetter }) {
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
                                HOTEL ANALYTICS – FREE OF CHARGE

                            </h4>

                            <ol className="aligned-list">
                                <li>
                                    Access our AI Analytics Tool (PERC) for free, available for selected hotels.
                                </li>
                                <li><span>1.</span>Visitor Insights – Track visitors’ location, device, and traffic sources.
                                </li>
                                <li>
                                    <span>2.</span>
                                    Audience Demographics – See where your customers are from and their interests.
                                </li>
                                <li>
                                    <span>3.</span>
                                    Behavior Analytics – Monitor page engagement, Views, Likes, and redirection to Hotel website for bookings.
                                </li>
                                <li>
                                    <span>4.</span>
                                    Review Insights – Track guest interactions with your reviews.
                                </li>
                                <li>
                                    <span>5.</span>
                                    Traffic Data – See daily and monthly website visits.
                                </li>


                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GooGleAnalyticsNews