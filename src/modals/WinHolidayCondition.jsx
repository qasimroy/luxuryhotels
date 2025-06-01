import React from "react";

const WinHolidayConditions = ({ closeModal  }) => {
  return (
   
    <>

      <div  className="modal fade show" id="exampleModalLive" tabIndex="-1" aria-labelledby="exampleModalLiveLabel" style={{display: "block"}} aria-modal="true" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content" >
            <div className="modal-header">
            <h4 className="text-center">
                  Conditions for Publishing a Holiday in the "Win a Holiday" Section
                </h4>
                <button type="button" className="btn-close" onClick={closeModal} data-bs-dismiss="modal" aria-label="Close">
                            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 30L30 10M10 10L30 30" stroke="#FAFAFA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>

                        </button>
            </div>
            <div className="modal-body" >
              <div className="card-body" >
                {/* <h4 className="text-center mb-4 ">
                  Conditions for Publishing a Holiday in the "Win a Holiday" Section
                </h4> */}
                <div className="mb-3">
                  <h5>1. Winner Selection:</h5>
                  <ul>
                    <li>The hotel will receive all client entries to select the winner.</li>
                  </ul>
                </div>
                <div className="mb-3">
                  <h5>2. Notification and Voucher:</h5>
                  <ul>
                    <li>
                      The hotel must select a winner from all the entries received from us and
                      notify us by email within 7 days of the closing date with the winner's
                      name.
                    </li>
                    <li>
                      The hotel must send the voucher directly to the client by email and CC the
                      luxury hotel at{" "}
                      <a href="mailto:winner@LuxuryHotelsMagazines.com">
                        winner@LuxuryHotelsMagazines.com
                      </a>.
                    </li>
                  </ul>
                </div>
                <div className="mb-3">
                  <h5>3. Winner Announcement:</h5>
                  <ul>
                    <li>
                      The hotel must inform Luxury Hotels of the winner's name so we can
                      congratulate them.
                    </li>
                  </ul>
                </div>
                <div className="mb-3">
                  <h5>4. Social Media Promotion:</h5>
                  <ul>
                    <li>
                      All holidays will be promoted on social media as soon as they are submitted
                      by the hotel and after the winner is chosen.
                    </li>
                  </ul>
                </div>
                <div className="mb-3">
                  <h5>5. Winner Obligation:</h5>
                  <ul>
                    <li>
                      The winner is obliged to post about winning the prize and their holiday
                      experience on their social media and provide a copy to us for further hotel
                      promotion.
                    </li>
                  </ul>
                </div>
                <div className="mb-3">
                  <h5>6. Data Usage:</h5>
                  <ul>
                    <li>All client data can be used by us and the hotel to send future offers.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  );
};

export default WinHolidayConditions;
