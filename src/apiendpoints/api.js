export const BASEURL=  "https://backend.luxuryhotelsplatform.com"
// export const BASEURL=  "http://localhost:3200"

export const apis={
    LOGIN:  `representatives/login`,
    SIGNUP:  `representatives/register`,
    FORGOT_PASSWORD:`representatives/forget-password`,
    RESET_PASSWORD:`representatives/reset-password`,
    GETUSERPROFILE:`representatives/get-user-profile`,
    // home apis
    GET_COUNTRY:`countries`,
    GETADD_ONS_HOME_DATA:`addons/addondata/home`,
    SEARCH_HOTEL:`hotelsAPI/searchHotels`,
    GET_NEWLY_LISTED_HOTEL:`hotelsAPI/newly-listed-hotel`,
    GET_COUNTRY_VIDEOS:`country-videos`,
    GET_PARTNERS:`partners`,
    GET_ALL_HOTELS:`hotelsAPI/allHotels`,
    GET_BEST_LUXURY_HOTEL_OF_YEAR:`nominate/best-luxury-hotel-of-year`,
    GET_UPCOMMING_MAGAZINE:`admin/get-upcoming-magazine`,
    GET_LATEST_NEWS:`news/admin/get-latest-news`,
    GET_TRAVEL_NEWS:`news/admin/get-travel-news`,
    GET_EXCLUSIVEOFFERS:`exclusiveoffers/get-all-offers`,
    GET_HOME_DATA:`admin/get-home-data`,
    SUBSCRIBE_NEWSLATTER:`newsletter/subscribe`,
    GETHOTEL_PROFILE:`hotels/profile/`,
    PARTNERS:`partners`,
    // GET_ALL_HOTELS:`hotelsAPI/allHotels`,
    BEST_LUXURY_HOTEL_OF_YEAR:`best-luxury-hotel-of-year`,
    UPCOMMING_MAGAZINE:`admin/get-upcoming-magazine`,
    LATEST_NEWS:`news/get-latest-news`,
    TRAVEL_NEWS:`news/get-travel-news`,
    EXCLUSIVEOFFERS:`exclusiveoffers/get-all-offers`,
    GET_HOME_DATA:`admin/get-home-data`,
    VERIFY_OTP:`verify-otp`,
    CONTACT_US_FORM:`contact/create-contact`,
    LOGOUT_API:`representatives/logout`,

    //add nominee hotel api 
    ADD_NOMINEE_CHECKOUT_HOTEL:`nominate/create-checkout-session`,
    CREATE_INTENT:`nominate/create-intent`,
    //add addons  Section
    ADD_ADD_ONOFFER :`hotels/save-hotel-addons`,
    
    // win a holiday Api 
    WIN_A_HOLIDAY_API :`hotels/create-holiday`,
    GET_ALL_WIN_HOLIDAY_DATA :`hotels/get-holiday-hotels`,
    GET_ALL_WIN_HOLIDAY__DATA_DASHBOARD:`hotels/get-all-holidays`,
    PAYMENT_POST:`payment`,
    // voter info mation api
    GET_ALL_VOTER_INFORMATION:`nominate/nominator-listing`,
    GET_SINGLE_VOTE_INFO:`nominate/nomination-detail`,
    GET_ALL_ADDONS:`addons`,
    GET_HOLIDAY_DETAILS:`hotels/get-holiday-detail`,
    APPLY_WIN_HOLIDAY: `hotels/apply-for-holiday`,
    DECLARE_WINNER_HOLIDAY:`hotels/declare-winner`,

    //GRAPH API
    GET_ALL_DATA_FROM_GRAPH:`news/graph/data`,

    //api hotel review
    GET_ALL_REVIEWS:`hotelsAPI/reviews`,
    //send Review for Hotel
    POST_REVIEW_HOTEL:`hotelsAPI/guest-reviews`,
    GET_REVIEW_HOTEL:`hotelsAPI/reviews`,
    REPLY_HOTEL_REVIEW:`hotelsAPI/review/hotel-reply`,
    


    // Genrate Content With AI
    GENRATE_HOTEL_CONTENT_WITH_AI:`hotels/content`,
    HOTEL_BY_COUNTRY:`hotelsAPI/hotels-by-country-name`,

    HOTEL_GENRAL_INFORMATION:`hotels/generalinformation`,
    FETCH_HOTEL:`hotels/fetch-hotels`,
    GET_HOTEL_DETAILS:`hotels/fetch-hotel-details`,
    HOTEL_EDIT:`hotels/editgeneralinformation`,
    HOTEL_FACILITY_AMENTIES:`hotels/edit-Facilities-Amenities`,
    HOTEL_CONTACT_INFO:`hotels/edit-hotel-contact-info`,
    CREATE_EXCLUSIVE:`exclusiveoffers/create-offer`,
    EDIT_HOTEL_INFORMATION_FROM_PREVIEW:`hotels/editgeneralinformationFrom_priview`,
    UPLOAD_HOTEL_LOGO:`hotels/upload-logo-image`,
    UPLOAD_HOTEL_IMAGE:`hotels/upload-image`,
    DELETE_HOTEL_IMAGE: `hotels/delete-hotels-image`,
    CREATE_HOTEL_NEWS:`news/create-news`,
    CREATE_NOMAINATE:`nominate/create-nominate`,
    SAVE_HOTEL_SUBSCRIPTION:`hotels/save-hotel-subscription`,
    GET_ALL_SUBSCRIPTION:`subscription/get-subscriptions`,
    GET_HOTELS_ADDONS_DATA:`hotels/get-hotel-plan-addons-data`,
    GET_HOTEL_DETAILS_BY_SLUG:`hotelsAPI/hotel`,
    GET_EXCLUSIVEOFFERS_BY_HOTEL_ID:`exclusiveoffers/offer`,
    GET_HOTEL_REVIEWS:`hotelsAPI/reviews`,
    GET_ROOM_AMIMETIES:`room-amenities`,
    GET_Hotel_HIGHLIGTH:`hotel-highlights`,
    GET_HOTEL_FACILITY:`hotel-facilities`,
    POST_GUEST_REVIEWS:`hotelsAPI/guest-reviews`,
    NEARBY_BY_HOTEL:`hotels/nearby-transport`,
    NEARBY_BY_ATTRACTIONS:`hotels/nearby-attraction`,
    GET_NEWS_PAGE_DEATILS:`news/get-news-details`,
  
    upDateLike:`news/updatelike`,
    ADD_TO_CART:`hotels/addtocart/create`,
    GET_ADD_TO_CART:`hotels/addtocart/get`,
    DELETE_ADD_TO_CART:`hotels/addtocart/delete`,
    LIKE_HOTELS:`hotels/updatelike`,
    UPDATE_VISIT:`hotels/updatevisit`,

    
}