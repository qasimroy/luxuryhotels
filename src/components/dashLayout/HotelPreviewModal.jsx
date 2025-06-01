import React from 'react'

export default function HotelPreviewModal(
    {SetShowMore,data}
) {
  return (
    <>
     <div className="modal d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">About Hotel Information</h5>   
                            <button type="button" className="close" onClick={() => SetShowMore(false)}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-4">
                                <p className="text-md text-golden mb-2 border-l-4 border-primary px-3 font-semibold uppercase">
                                    About Hotel
                                </p>
                                <p className="text-md text- mb-3">
                                   {data?.about}
                                </p>
                            </div>
                            <div className="mb-4">
                                <p className="text-md text-golden mb-2 border-l-4 border-primary px-3 font-semibold uppercase">
                                Description
                                </p>
                                <p className="text-md text- mb-3">
                                {data?.meta?.meta_description}                                </p>
                            </div>
                            <div className="mb-4">
                                <p className="text-md text-golden mb-2 border-l-4 border-primary px-3 font-semibold uppercase">
                                ROOMS AND SUITS
                                </p>
                                <p className="text-md text- mb-3">
                                    {data?.rooms_suites}
                                </p>
                            </div>
                            <div className="mb-4">
                                <p className="text-md text-golden mb-2 border-l-4 border-primary px-3 font-semibold uppercase">
                                spa wellness
                                </p>
                                <p className="text-md text- mb-3">
                                    {data?.spa_wellness}
                                </p>
                            </div>
                            <div className="mb-4">
                                <p className="text-md text-golden mb-2 border-l-4 border-primary px-3 font-semibold uppercase">
                                restaurants bars
                                </p>
                                <p className="text-md text- mb-3">{data?.restaurants_bars}
                                </p>
                            </div>
                            <div className="mb-4">
                                <p className="text-md text-golden mb-2 border-l-4 border-primary px-3 font-semibold uppercase">
                                other facilities
                                </p>
                                <p className="text-md text- mb-3">{data?.other_facilities}
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}
