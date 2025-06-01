
import React from 'react'

const PropertyDescription = ({SetShowMore,about,location,room_suite,restuarent_bar,spa_Wellnes,other_facility,}) => {
    return (
        <>
            <div className="modal d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Map view</h5>   
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
                                {about}
                                </p>
                            </div>
                            <div className="mb-4">
                                <p className="text-md text-golden mb-2 border-l-4 border-primary px-3 font-semibold uppercase">
                                Location
                                </p>
                                <p className="text-md text- mb-3">
                               {location}
                                </p>
                            </div>
                            <div className="mb-4">
                                <p className="text-md text-golden mb-2 border-l-4 border-primary px-3 font-semibold uppercase">
                                ROOMS AND SUITS
                                </p>
                                <p className="text-md text- mb-3">
                              {room_suite}
                                </p>
                            </div>
                            <div className="mb-4">
                                <p className="text-md text-golden mb-2 border-l-4 border-primary px-3 font-semibold uppercase">
                                spa wellness
                                </p>
                                <p className="text-md text- mb-3">
                               {spa_Wellnes}
                                </p>
                            </div>
                            <div className="mb-4">
                                <p className="text-md text-golden mb-2 border-l-4 border-primary px-3 font-semibold uppercase">
                                restaurants bars
                                </p>
                                <p className="text-md text- mb-3">
                                {restuarent_bar}
                                </p>
                            </div>
                            <div className="mb-4">
                                <p className="text-md text-golden mb-2 border-l-4 border-primary px-3 font-semibold uppercase">
                                other facilities
                                </p>
                                <p className="text-md text- mb-3">
                                {other_facility}
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default PropertyDescription



