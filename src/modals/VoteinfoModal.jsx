import React from 'react'

function VoteinfoModal({ singleVoterInfoData, setVoteInfoModal }) {
    return (
        <div
            className="modal show d-block"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content border-0">

                        <div className="modal-header">
                            <h5 className="modal-title" style={{ color: "#9e7922" }}>Voter Details</h5>
                            <button
                                type="button"
                                className="btn-close theme-btn-close"
                                style={{ color: "white", backgroundColor: "#9e7922" }}
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => setVoteInfoModal(false)}
                            >
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 21L21 1M1 1L21 21" stroke="#FAFAFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                        </div>

                        <div className='details-box'>
                            <div className='row'>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="name" className="form-label">
                                            Hotel name
                                        </label>
                                        <input
                                            type="text"
                                            value={singleVoterInfoData?.hotelName}
                                            // placeholder="Hotel name"
                                            // {...register("hotel_name", { required: "hotel name is required", setValueAs: v => v.trim() })}

                                            className={
                                                "form-control "
                                            }
                                        />

                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="name" className="form-label">
                                            Nomination type
                                        </label>
                                        <input
                                            type="text"
                                            value={singleVoterInfoData?.nomination_type}
                                            // placeholder="Hotel name"
                                            // {...register("hotel_name", { required: "hotel name is required", setValueAs: v => v.trim() })}

                                            className={
                                                "form-control "
                                            }
                                        />

                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="name" className="form-label">
                                            Nominator Name
                                        </label>
                                        <input
                                            type="text"
                                            value={singleVoterInfoData?.nominatorName}
                                            // placeholder="Hotel name"
                                            // {...register("hotel_name", { required: "hotel name is required", setValueAs: v => v.trim() })}

                                            className={
                                                "form-control "
                                            }
                                        />

                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="name" className="form-label">
                                            country
                                        </label>
                                        <input
                                            type="text"
                                            value={singleVoterInfoData?.country}

                                            // placeholder="Hotel name"
                                            // {...register("hotel_name", { required: "hotel name is required", setValueAs: v => v.trim() })}

                                            className={
                                                "form-control "
                                            }
                                        />

                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="name" className="form-label">
                                            Description
                                        </label>
                                        <input
                                            type="text"
                                            value={singleVoterInfoData?.desc}

                                            // placeholder="Hotel name"
                                            // {...register("hotel_name", { required: "hotel name is required", setValueAs: v => v.trim() })}

                                            className={
                                                "form-control "
                                            }
                                        />

                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="name" className="form-label">
                                            Hotel Website
                                        </label>
                                        <input
                                            type="text"
                                            value={singleVoterInfoData?.hotelWebsite}

                                            // placeholder="Hotel name"
                                            // {...register("hotel_name", { required: "hotel name is required", setValueAs: v => v.trim() })}

                                            className={
                                                "form-control "
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    )
}

export default VoteinfoModal