import React from "react";

const EntryWinHolidayCondition = ({ closeModal  }) => {
  return (
    <>
      <div  className="modal fade show" id="exampleModalLive" tabIndex="-1" aria-labelledby="exampleModalLiveLabel" style={{display: "block"}} aria-modal="true" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content" >
            <div className="modal-header">
            <h4 className="text-center">
            Conditions for Entry in the "Win a Holiday" Competition
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
                  <h5>1.Winner Selection and Notification:</h5>
                  <ul>
                    <li>The winner will be chosen by the hotel from all entries received.</li>
                    <li>Within 7 days after the competition closing date, the hotel will select the winner.</li>
                    <li>The winner will be notified directly by email from the hotel and will receive a holiday voucher.</li>
                  </ul>
                </div>
                <div className="mb-3">
                  <h5>2.Social Media Obligation:</h5>
                  <ul>
                  
                    <li>
                    The winner is required to post about winning the prize and share their holiday experience on their personal social media accounts.
                    </li>
                    
                    <li>
                    The winner must send a copy of their social media posts, including pictures and videos, to Luxury Hotels at
                      <a href="mailto:winner@LuxuryHotelsMagazines.com">
                        winner@LuxuryHotelsMagazines.com
                      </a>.
                    </li>
                    <li>
                    he winner is also required to share their experience on Instagram by tagging @LuxuryHotels_original.
                    </li>
                    <li>
                    The winner must provide a copy of their social media post to Luxury Hotels for further promotion of the hotel.
                    </li>
                  </ul>
                </div>
                <div className="mb-3">
                  <h5>3.Client Data Protection:</h5>
                  <ul>
                    <li>
                        By entering the competition, the winner confirms that their data may be used by Luxury Hotels and the hotel to send future offers and promotions.
                    </li>
                    <li>
                    •	Luxury Hotels and the hotel will not sell your data to third parties.
                    </li>
                  </ul>
                </div>
                {/* <div className="mb-3">
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
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  );
};

export default EntryWinHolidayCondition;
