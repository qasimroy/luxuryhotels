import Hotel from "../models/hotel.js";
import HotelOffer from "../models/hoteloffer.js";
import Country from "../models/country.js";
import Nomination from "../models/nomination.js";
import Review from "../models/review.js";

export const getHotel = async (req, res) => {
  const { hotelId } = req.params;
  try {
    //console.log(hotelId);
    
    // const hotel = await Hotel.findById(hotelId).populate('country'); //changed by HTL
    const hotel = await Hotel.findOne({"slug":hotelId}).populate('country');
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
  }
    let coverPhoto = hotel?.images[0];

   const similarHotels = await Hotel.find({
      country: hotel.country,
      _id: { $ne: hotel._id },
    })
      .select("hotel_name images country slug")
      .populate("country");

    const similarHotelsData = similarHotels.map((similarHotel) => {
      return {
        id: similarHotel?._id,
        name: similarHotel?.hotel_name,
        coverPhoto: similarHotel?.images[0],
        country: similarHotel?.country,
        slug: similarHotel?.slug,
      };
    });
    // Fetch reviews for the specific hotel
    const reviews = await Review.find({ hotelId: hotel._id });

    // Initialize sums and count
    let cleanlinessSum = 0;
    let facilitiesSum = 0;
    let comfortSum = 0;
    let freewifiSum = 0;
    let overallSum = 0;
    let count = reviews.length;

    // Calculate sums
    reviews.forEach(review => {
      cleanlinessSum += review.cleanliness_rating;
      facilitiesSum += review.facilities_rating;
      comfortSum += review.comfort_rating;
      freewifiSum += review.freewifi_rating;
      overallSum += parseInt(review.overall_rating); // Convert to integer
    });

    // Calculate averages
    const rating = {
      cleanliness_rating: count ? (cleanlinessSum / count).toFixed(2) : 0,
      facilities_rating: count ? (facilitiesSum / count).toFixed(2) : 0,
      comfort_rating: count ? (comfortSum / count).toFixed(2) : 0,
      freewifi_rating: count ? (freewifiSum / count).toFixed(2) : 0,
      overall_rating: count ? (overallSum / count).toFixed(2) : 0,
    };

    res.json({
      hotel: hotel,
      similarHotels: similarHotelsData,
      coverPhoto: coverPhoto,
      rating: rating // sent calculated ratings
    });  } catch (error) {
    console.error("Error fetching hotel information:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const formatHotelData = (hotel) => {
  const baseImageUrl = !hotel.representative
    ? "https://luxuryhotelsplatform.com/luxuryimages/"
    : `${process.env.BACKEND}/`;

  //const imagesWithUrls = baseImageUrl
    //? hotel.images.map((image) => `${baseImageUrl}${image}`)
    //: hotel.images;
  
  //const imagesWithUrls = baseImageUrl
    //? hotel.images.map((image) => (!image.includes("uploads/hotel"))?`${fpath}${baseImageUrl}${image}`:`${baseImageUrl}${image}`)
    //: hotel.images;
  

  //const coverImagesWithUrls = baseImageUrl
  //  ? `${baseImageUrl}${hotel.images[0]}`
  //  : hotel.images[0];
  
  
  const fpath = 'uploads/hotel/';
	//const baseImageUrl = `${process.env.BACKEND}/`;
  const imagesWithUrlsOLD = baseImageUrl
    ? hotel.images.map((image) => (!image.includes("uploads/hotel"))?`${baseImageUrl}${fpath}${image}`:`${baseImageUrl}${image}`)
    : hotel.images;
	
	
  const imagesWithUrls = baseImageUrl
    ? hotel.images.map((image) => (!image.includes("uploads/hotel") && !image.startsWith("https://maps.googleapis.com"))?`${baseImageUrl}${fpath}${image}`:(image.startsWith("https://maps.googleapis.com"))?image:`${baseImageUrl}${image}`)
    : hotel.images;

  //const coverImagesWithUrls = baseImageUrl
  //  ? `${baseImageUrl}${hotel.images[0]}`
  //  : hotel.images[0];

const coverImagesWithUrls = hotel?.images[0]?.startsWith("https://maps.googleapis.com") ? hotel.images[0] : baseImageUrl
    ? (!hotel?.images[0]?.includes("uploads/hotel"))?`${baseImageUrl}${fpath}${hotel.images[0]}`:`${baseImageUrl}${hotel.images[0]}`
    : hotel.images[0];
  
  
  
  

//const coverImagesWithUrls = hotel?.images[0]?.startsWith("https://maps.googleapis.com") ? hotel.images[0] : baseImageUrl
  //  ? `${baseImageUrl}${hotel.images[0]}`
    //: hotel.images[0];

  return {
    ...hotel._doc,
    coverPhoto: coverImagesWithUrls,
    images: imagesWithUrls,
  };
};

export const getAllHotelsOLD = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  try {
    const count = await Hotel.countDocuments({status: "approved"});
    const hotels = await Hotel.find({ status: "approved" })
  .populate("country")
  .sort({ createdAt: -1 });    //commented by HTL//
    // .skip((page - 1) * limit)
    //.limit(limit)
    //.select("-__v");
    const hotelsData = hotels.map(formatHotelData);
    res.json({
      hotels: hotelsData,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching hotels:", error);
    res.status(500).json({ error: `Internal Server Error` });
  }
};

export const getAllHotels = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  try {
    const count = await Hotel.countDocuments({ status: "approved" });
    const hotels = await Hotel.find({ status: "approved" })
      .select(["_id","hotel_name","slug","images","coverPhoto","representative"])
      .populate("country")
      .sort({ createdAt: -1 })    //commented by HTL//
      .skip((page - 1) * limit)
      .limit(limit);
      
    const hotelsData = hotels.map(formatHotelData);
    res.json({
      hotels: hotelsData,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching hotels:", error);
    res.status(500).json({ error: `Internal Server Error` });
  }
};

export const getAllHotelSearch = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  try {
    const count = await Hotel.countDocuments({ status: "approved" });
    const hotels = await Hotel.find({ status: "approved" })
      .select(["_id","hotel_name","slug"])
      .populate("country")
      .sort({ createdAt: -1 });    //commented by HTL//    
    res.json({
      hotels: hotels,
      totalPages: count,
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching hotels:", error);
    res.status(500).json({ error: `Internal Server Error` });
  }
};

export const getAllHotelsByAdmin = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  try {
    const count = await Hotel.countDocuments();
const hotels = await Hotel.find({ }).populate("country").populate("representative").sort({ createdAt: -1 });
    //commented by HTL//
    // .skip((page - 1) * limit)
    //.limit(limit)
    //.select("-__v");
    const hotelsData = hotels.map(formatHotelData);
    res.json({
      hotels: hotelsData,
      // totalPages: Math.ceil(count / limit),
      // currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching hotels:", error);
    res.status(500).json({ error: `Internal Server Error` });
  }
};

export const getAllCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    res.json({ countries });
  } catch (error) {
    console.error("Error fetching countries:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllHotelsByCountry = async (req, res) => {
  const { countryId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;

  try {
    const count = await Hotel.countDocuments();
    const hotels = await Hotel.find({ country: countryId })
      .populate("country")
      .skip((page - 1) * limit)
      .limit(limit);

    const hotelsData = hotels.map((hotel) => {
      return {
        ...hotel._doc,
        coverPhoto: hotel.images[0],
      };
    });

    res.status(200).json({
      hotels: hotelsData,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching hotels by country:", error);
    res
      .status(500)
      .json({ message: "Server error encountered whiile fetching countries" });
  }
};

// 08-10-2024 commented by anubhav start
// export const submitGuestReview = async (req, res) => {
//   try {
//     const {
//       reviewer_name,
//       reviewer_email,
//       cleanliness_rating,
//       facilities_rating,
//       comfort_rating,
//       freewifi_rating,
//       overall_rating,
//       review,
//       hotelId,
//     } = req.body;

//     const result = await Review.create({
//       reviewer_name,
//       reviewer_email,
//       cleanliness_rating,
//       facilities_rating,
//       comfort_rating,
//       freewifi_rating,
//       overall_rating,
//       review,
//       hotelId,
//     });
//     res.status(201).json(result);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

export const submitGuestReview = async (req, res) => {
  try {
    const {
      reviewer_name,
      reviewer_email,
      country,
      formDate,
      toDate,
      cleanliness_rating,
      facilities_rating,
      comfort_rating,
      freewifi_rating,
      overall_rating,
      review,
      hotelId,
    } = req.body;
    const isImage = req.file ? req.file.path : "";
    const result = await Review.create({
      reviewer_name,
      reviewer_email,
      country,
      formDate,
      toDate,
      cleanliness_rating : cleanliness_rating ? cleanliness_rating : '5',
      facilities_rating:facilities_rating ? facilities_rating : '5',
      comfort_rating:comfort_rating ? comfort_rating : '5',
      freewifi_rating:freewifi_rating ? freewifi_rating : '5',
      overall_rating:overall_rating ? overall_rating : "5",
      review,
      hotelId,
      reviewer_image: isImage,
    });
    res.status(201).json({
      message: "reviews created successfully",
      review: result,
      status: 201,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getHotelReviews = async (req, res) => {
  const { hotelId } = req.params;
  try {
    const reviews = await Review.find({ hotelId }).lean().exec();

    if (reviews.length === 0) {
      return res.status(200).json({ message: 'No reviews found for this hotel' });
    }

    const structuredReviews = reviews.map(review => {
      // Sorting replies based on createdAt field
      review.hotel_replies?.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      review.traveller_replies?.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

      const replies = [];

      // Adding hotel replies
      review.hotel_replies?.forEach(hotelReply => {
        replies.push({
          type: 'hotel_reply',
          ...hotelReply
        });

        // Adding traveller replies to hotel replies
        review.traveller_replies?.forEach(travellerReply => {
          if (travellerReply.replying_to && travellerReply.replying_to.toString() === hotelReply._id.toString()) {
            replies.push({
              type: 'traveller_reply',
              ...travellerReply
            });
          }
        });
      });

      return {
        ...review,
        replies
      };
    });

    res.json({
      message: "Review retrieved successfully",
      reviews: structuredReviews,
      status: 200
    });
  } catch (error) {
    console.error("Error fetching hotel information:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// 08-10-2024 commented


export const getAllNominatedHotels = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;

  try {
    const count = await Nomination.countDocuments();
    const hotels = await Nomination.find()
      .populate("hotel")
      .skip((page - 1) * limit)
      .limit(limit)
      .select("-__v");

    const hotelsData = hotels.map(formatHotelData);

    res.json({
      hotels: hotelsData,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching hotels:", error);
    res.status(500).json({ error: `Internal Server Error: ${error}` });
  }
};

export const getAllExclusiveOffers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;

  try {
    const count = await HotelOffer.countDocuments();
    const offers = await HotelOffer.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .select("-__v");

    res.json({
      offers: offers,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching offers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const hello = async (req, res) => {
  try {
    res.json({ hello: "world" });
  } catch (error) {
    console.error("Error fetching greeting:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getHotelsByCountryName = async(req, res) => {

  const { countryName } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  //console.log("countryName---",countryName);
  try {
      const countryData = await Country.findOne({country: countryName}).select(['_id']);
      //console.log("countryName---",countryData);
      const count = await Hotel.countDocuments({country:countryData._id, status: "approved"});      

      const hotels = await Hotel.find({ country: countryData._id })
		.select(["_id","images","coverPhoto","hotel_name","representative","slug"])
        .populate("country")
        .skip((page - 1) * limit)
        .limit(limit);

      const hotelsData = hotels.map(formatHotelData);

      res.status(200).json({
        hotels: hotelsData,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
  } catch (error) {
    console.error("Error fetching greeting:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
