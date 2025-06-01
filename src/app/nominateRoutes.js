import express from "express";
const router = express.Router();
import Nominate from "../models/nomination.js";
import { createMulterMiddleware } from "../utils/uploads.js";
import Stripe from "stripe"
import NewsLetter from "../models/newsLetter.js";
import BestLuxuryHotelOfYearSchema from "../models/bestLuxuryHotelOfYear.js";
import paypal from 'paypal-rest-sdk'


paypal.configure({
  'mode': "sandbox", //sandbox or live
  'client_id': "AZiQiUttgbY94BK4gyT_lhSABghIO1mBOAjKJ3sqDg6VDqPni0UwoB_6a-pG4voWJPEmvKmbY29gsgOv",
  'client_secret': "ELN0z_SbjRClpRVJaDpdhn8xLR_U5GDK9ya1pqcUGaijx-hXgwRgBOg2Bcvx2Di5eCn1ZWWeRVe1-xPk"
});
const uploadSingle = (folderPath) =>
  createMulterMiddleware(folderPath).single("images");

// router.post(
//   "/create-nominate",
//   uploadSingle("uploads/nominate"),
//   async (req, res) => {
//     try {
//       const {
//         nomination_type,
//         hotelName,
//         hotelWebsite,
//         images,
//         nominatorName,
//         nominatorEmail,
//         country,
//         desc,
//         nominationStartDate,
//         nominationEndDate,
//         youtube_video_url,
//         Subscription,
//         leave_message,
//         paymaent_status,
//         request_to_visit,
//         hotel,
//       } = req.body;

//       const nominate = new Nominate({
//         nomination_type,
//         hotelName,
//         hotelWebsite,
//         images,
//         nominatorName,
//         nominatorEmail,
//         country,
//         desc,
//         images: req.file ? req.file.path : "",
//         nominationStartDate,
//         nominationEndDate,
//         youtube_video_url,
//         Subscription,
//         leave_message,
//         paymaent_status,
//         request_to_visit,
//         hotel,
//       });

//       const newsLetter = new NewsLetter({
//         name:nominatorName,
//         email:nominatorEmail,
//     });
//       const savedNominate = await nominate.save();
//       const savedNewsLetter = await newsLetter.save();

//       res.status(201).json({
//         status: true,
//         message: "nominated successfully",
//         response: savedNominate,
//       });
//     } catch (error) {
//       res.status(400).json({
//         message: "Failed to create nominate",
//         error: error.message,
//       });
//     }
//   }
// );

router.post(
  "/create-nominate",
  uploadSingle("uploads/nominate"),
  async (req, res) => {
    try {
      const {
        nomination_type,
        hotelName,
        hotelWebsite,
        images,
        nominatorName,
        nominatorEmail,
        country,
        desc,
        nominationStartDate,
        nominationEndDate,
        youtube_video_url,
        Subscription,
        leave_message,
        paymaent_status,
        request_to_visit,
        hotel,
        payment_gateway,
        pay_amount,
        time,
        purpose
      } = req.body;

      const nominate = new Nominate({
        nomination_type,
        hotelName,
        hotelWebsite,
        images,
        nominatorName,
        nominatorEmail,
        country,
        desc,
        images: req.file ? req.file.path : "",
        nominationStartDate,
        nominationEndDate,
        youtube_video_url,
        Subscription,
        leave_message,
        paymaent_status,
        request_to_visit,
        hotel,
      });

      const newsLetter = new NewsLetter({
        name: nominatorName,
        email: nominatorEmail,
      });
      const savedNominate = await nominate.save();
      const savedNewsLetter = await newsLetter.save();

      if (payment_gateway == "paypal") {
        const create_payment_json = {
          "intent": "sale",
          "payer": {
            "payment_method": "paypal"
          },
          "redirect_urls": {
            "return_url": `https://backend.luxuryhotelsplatform.com/nominate/capture-payent/paypal?amount=${pay_amount}nominate_id=${savedNominate._id}&newsLetter_id=${savedNewsLetter._id}`,
            "cancel_url": `https://backend.luxuryhotelsplatform.com/nominate/cancel?amount=${pay_amount}nominate_id=${savedNominate._id}&newsLetter_id=${savedNewsLetter._id}`
          },
          "transactions": [{

            "amount": {
              "currency": "USD",
              "total": parseFloat(pay_amount).toFixed(2)
            },
            "description": "Hat for the best team ever"
          }]
        };

        paypal.payment.create(create_payment_json, function (error, payment) {
          if (error) {
            throw error;
          } else {
            const approvalUrl = payment.links.find(
              (link) => link.rel === "approval_url"
            )?.href;
            // for (let i = 0; i < payment.links.length; i++) {
            //   if (payment.links[i].rel === 'approval_url') {
            //    return res.status(200).send({status:true,link:payment.links[i].href});
            //   }
            // }
            return res.status(200).send({status:true,link:approvalUrl});
          }
        });
      }else{

        
        res.status(201).json({
          status: true,
          message: "nominated successfully",
          response: savedNominate,
        });
      }
    } catch (error) {
      res.status(400).json({
        message: "Failed to create nominate",
        error: error.message,
      });
    }
  }
);



router.get("/nominator-listing/:hotelid", async(req,res)=>{
  try {
    const getNominationsOfHotel = await Nominate.find({
      hotel: req.params.hotelid,
      $or: [
        // { nomination_type: "hotel", Subscription: null },
        { nomination_type: "hotel", Subscription: { $ne: null } },
        { nomination_type: "traveller" }
      ]
    });
    res.status(200).json({message:"nominator list", status:true,data:getNominationsOfHotel})
  } catch (error) {
    res.status(400).json({
      message: "Failed to fetch nominate",
      error: error.message,
    });
  }
})

router.get("/nomination-detail/:id", async(req,res)=>{
  try {
    const getNominationsOfHotel = await Nominate.findOne(
      req.params.hotelid
    );
    res.status(200).json({message:"nomination detail", status:true,data:getNominationsOfHotel})
  } catch (error) {
    res.status(400).json({
      message: "Failed to fetch nominate",
      error: error.message,
    });
  }
})


const stripe = new Stripe(process.env.TEST_STRIPE_SECRET, {
  apiVersion: '2020-08-27'
});

//06-11-2024
// router.post('/create-checkout-session', async (req, res) => {
//   try {
//     const { amount, months, hotel, hotelIMG, payment_method } = req.body;
//     const lineItem = {
//       price_data: {
//         currency: 'EUR',
//         product_data: {
//           name: hotel,
//           images: [hotelIMG],
//           description: `Subscription for ${months}`,
//         },
//         unit_amount: Math.round(amount * 100),
//       },
//       quantity: 1,
//     };
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [lineItem],
//       mode: 'payment',
//       success_url: 'https://luxuryhotelsplatform.com/nominate-hotel?session_id={CHECKOUT_SESSION_ID}', // Update URL for your own success page
//       cancel_url: 'https://luxuryhotelsplatform.com/nominate-hotel',
//       payment_intent_data: {
//         setup_future_usage: 'off_session',
//       },
//     });
//     const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
//     res.status(200).json({
//       id: session.id,
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       message: 'Failed to create checkout session',
//       error: error.message,
//     });
//   }
// });

// router.post('/payment-intent', async (req, res) => {
//   const { amount } = req.body;
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Math.round(amount * 100),
//       currency: 'EUR',
//       automatic_payment_methods: {
//         enabled: true,
//       },
//     });
//     res.json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     console.error("Error creating payment intent:", error);
//     res.status(500).json({ error: error.message });
//   }
// });
//06-11-2024

router.post('/create-checkout-session', async (req, res) => {
  try {
    const { amount, months, hotel, hotelIMG } = req.body;

    const lineItem = {
      price_data: {
        currency: 'EUR',
        product_data: {
          name: hotel,
          images: [hotelIMG],
          description: `Subscription for ${months} months`,
        },
        unit_amount: Math.round(amount * 100), // Stripe expects the amount in cents
      },
      quantity: 1,
    };

    const session = await stripe.checkout.sessions.create({
payment_method_types: ['card'],
      line_items: [lineItem],
      mode: 'payment',
      success_url: 'https://luxuryhotelsplatform.com/nominate-hotel?session_id={CHECKOUT_SESSION_ID}', // Update URL for your own success page
      cancel_url: 'https://luxuryhotelsplatform.com/nominate-hotel',
      payment_intent_data: {
        setup_future_usage: 'off_session',
      },
    });

    const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
    res.status(200).json({
      id: session.id,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'Failed to create checkout session',
      error: error.message,
    });
  }
});


router.post('/create-intent', async (req, res) => {
  try {
    const { amount } = req.body;
    const intent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'EUR',
      automatic_payment_methods: { enabled: true },
    });
    res.json({ client_secret: intent.client_secret });
  } catch (error) {
    res.status(500).json({ message: "error in /create-intent", error: error.message });
  }
});

router.get('/capture-payent/paypal', async (req, res) => {
  try {

    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    const amount = req.query.amount
const nominate_id = req.query.nominate_id, newsLetter_id = req.query.newsLetter_id
    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
        "amount": {
          "currency": "USD",
          "total": parseFloat(amount).toFixed(2)
        }
      }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
      if(nominate_id){
      
        const find_nominate = await Nominate.findOne({ _id: nominate_id })
        find_nominate.paymaent_status="completed"
        await find_nominate.save()

        const paymentData = new PaymentData({
          payment_method: "paypal",
          detail: JSON.stringify(find_nominate),
          price: amount,
          time: time,
          paymentID: paymentId,
          purpose: "nominate"
        });
        }
        console.log(JSON.stringify(payment));
        res.redirect('http://localhost:3000/new/dashboard/nominate-hotel');
      }
    });
  } catch (error) {
    res.status(500).json({ message: "error in /create-intent", error: error.message });
  }
});


router.get("/count", async (req, res) => {
  try {
    // Get the current year and its start date
    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(`${currentYear}-01-01`); // Start of the current year

    // Aggregate top 2 hotels based on occurrences within the current year
    const aggregatedData = await Nominate.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfYear, // Include documents from the start of the current year
          },
        },
      },
      {
        $group: {
          _id: "$hotel", // Group by the hotel (assumed to be an ObjectId)
          hotelName: { $first: "$hotelName" }, // Get the first hotelName
          hotelWebsite: { $first: "$hotelWebsite" }, // Get the first hotelWebsite
          number_of_time_occur: { $sum: 1 }, // Count the occurrences
        },
      },
      {
        $project: {
          _id: 0, // Exclude MongoDB's default `_id` field
          hotelId: "$_id", // Rename `_id` to `hotelId`
          hotelName: 1,
          hotelWebsite: 1,
          number_of_time_occur: 1,
        },
      },
      {
        $sort: { number_of_time_occur: -1 }, // Sort by occurrences in descending order
      },
      {
        $limit: 2, // Limit the results to the top 2
      },
    ]);

    // Add year and winner/runnerup fields
    aggregatedData.forEach((hotel, index) => {
      hotel.year = currentYear; // Add the current year
      hotel.winner = index === 0 ? "winner" : "runnerup"; // Mark the winner and runner-up
    });

    // Insert the data into BestLuxuryHotelOfYear collection
    const insertPromises = aggregatedData.map(async (hotel) => {
      // Check if the hotel entry for the year already exists
      const existingEntry = await BestLuxuryHotelOfYearSchema.findOne({
        hotelId: hotel.hotelId,
        year: hotel.year,
      });

      if (!existingEntry) {
        // Insert new entry
        return BestLuxuryHotelOfYearSchema.create(hotel)
;
      } else {
        // Update the existing entry
        existingEntry.hotelName = hotel.hotelName;
        existingEntry.hotelWebsite = hotel.hotelWebsite;
        existingEntry.number_of_time_occur = hotel.number_of_time_occur;
        existingEntry.winner = hotel.winner;
        return existingEntry.save();
      }
    });

    await Promise.all(insertPromises);

    res.status(200).json({
      status: true,
      message:
        "Successfully fetched and stored top 2 hotel occurrences for the year.",
      data: aggregatedData,
    });
  } catch (error) {
    console.error("Error fetching and storing hotel occurrences:", error);
    res.status(500).json({
      status: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
});
router.get("/best-luxury-hotel-of-year", async (req, res) => {
  try {
        const hotels = await BestLuxuryHotelOfYearSchema.find().populate({
      path: "hotelId",
      select: "hotel_name website country slug images", // Only select the fields you want
      populate: {
        path: 'country', // Populate the country reference
        select: 'country', // Select the country_name field
      },
    });
    res.status(200).json({
      status: true,
      message: "Successfully fetched best hotel of the year.",
      length: hotels.length,
      data: hotels,
    });
  } catch (error) {
    console.error("Error fetching and storing hotel occurrences:", error);
    res.status(500).json({
      status: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
});

export default router;