import HotelRep from "../models/hotelrep.js";
import Hotel from "../models/hotel.js";
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import bcrypt from "bcrypt";
import emailQueue from "../queues/emailQueue.js";
import dotenv from "dotenv";
import config from "../config/config.js";
import {sendEmail} from '../queues/emailService.js'
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { verifyToken, generateToken } from "../utils/auth.js";
export const getList = (req, res) => {
  res.render("representatives/list");
};

export const getRepList = async (req, res) => {
  try {
    const hotelProfiles = await HotelRep.find({isAdmin:false}).select("-password").lean();
     res.status(201).json({ message: "List", status:true,data:hotelProfiles })  }
 catch (error) {
    console.error("Error: ", error);
  }

};


export const getRegistration = (req, res) => {
  res.render("representatives/register");
};

export const getVerification = (req, res) => {
  res.render("representatives/verification");
};

// 12-11-2024
// export const verification = async (req, res) => {
//   const { token } = req.params;
//   try {
//     const hotelRep = await HotelRep.findOne({ verificationToken: token });
//     if (!hotelRep) {
//       req.flash("error", "Invalid or expired token");
//       return res.render(`representatives/login`);
//     }
//     hotelRep.verificationStatus = true;
//     hotelRep.verificationToken = undefined;
//     await hotelRep.save();
//     const successMessage = "Email verified. You can now log in";
//     return res.render(`representatives/login`, { successMessage });
//   } catch (error) {
//     console.error("Error verifying email:", error);
//     const errorMessage = encodeURIComponent("Failed to verify email");
//     res
//       .status(500)
//       .redirect(
//         `${backendUrl}/representatives/login?errorMessage=${errorMessage}`,
//       );
//   }
// };
// 12-11-2024

export const verification = async (req, res) => {
  const { token } = req.params;
  try {
    const hotelRep = await HotelRep.findOne({ verificationToken: token });
    if (!hotelRep) {
      // res
      // .status(200)
      // .redirect(
      //   `https://luxuryhotelsplatform.com/login`,
      // );

      res
      .status(200)
      .redirect(
        `http://77.37.120.23:3500/new/login`,
      );
    }
    hotelRep.verificationStatus = true;
    hotelRep.verificationToken = undefined;
    await hotelRep.save();
    const verifyTemplatePath = path.join(__dirname, '../templates', 'userverifyEmail.html');
    let verifyHtml = fs.readFileSync(verifyTemplatePath, 'utf-8');
    verifyHtml = verifyHtml.replace('${name}', hotelRep.name);
    await sendEmail({
      to: hotelRep.email, // Replace with actual verify email
      subject: 'verification successfull!',
      text: `verification successfull!`,
      html: verifyHtml,
    });
    // res
    //   .status(200)
    //   .redirect(
    //     `https://luxuryhotelsplatform.com/login`,
    //   );

    res
      .status(200)
      .redirect(
        `http://77.37.120.23:3500/new/dashboard`,
      );
  } catch (error) {
    console.error("Error verifying email:", error);
    const errorMessage = encodeURIComponent("Failed to verify email");
  }
};

export const login = async (req, res) => {
  res.render("representatives/login");
};

function formatDistanceToNow(date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} days ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} months ago`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} years ago`;
}

export const getHotelProfiles = async (req, res) => {
  const userId = req.session.passport.user.id;

  try {
    const hotelProfiles = await Hotel.find({ representative: userId }).lean();
    hotelProfiles.forEach((hotel) => {
      hotel.updatedAtFormatted = formatDistanceToNow(
        new Date(hotel.updatedAt),
        { addSuffix: true },
      );
    });
    res.render("representatives/hotelprofiles", {
      hotelProfiles,
      pageTitle: "Hotel Profile",
    });
  } catch (error) {
    console.error("Error: ", error);
  }
};

// 12-11-2024
// export const register = async (req, res) => {
//   const { name, email, password, passwordConfirm } = req.body;
//   try {
//     const existingUser = await HotelRep.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already in use" });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const verificationToken = Math.random().toString(36).substring(7);
//     const hotelRep = new HotelRep({
//       name,
//       email,
//       password: hashedPassword,
//       verificationToken: verificationToken,
//       isApproved: false,
//     });
//     await hotelRep.save();
//     res.status(200).json({
//       message: "user registration successful",
//       status: true,
//     });
//   } catch (err) {
//     console.error("Registration failed:", err);
//     res.status(500).json({
//       message: `Registration failed. Please try again, ${err.message}`,
//     });
//   }
// };
// 12-11-2024

export const register = async (req, res) => {
  const { name, email, password, passwordConfirm } = req.body;
  try {
    const existingUser = await HotelRep.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.random().toString(36).substring(7);
    const hotelRep = new HotelRep({
      name,
      email,
      password: hashedPassword,
      verificationToken: verificationToken,
      isApproved: false,
    });
    await hotelRep.save();
    // Send a welcome email to the user
    const userTemplatePath = path.join(__dirname, '../templates', 'userRegister.html');
    let userHtml = fs.readFileSync(userTemplatePath, 'utf-8');
    userHtml = userHtml.replace('${name}', name).replace('${verificationToken}', verificationToken);
    await sendEmail({
      to: email,
      subject: 'Verify your email',
      text: `Hello ${name},\n\nThank you for registering with us.`,
      html: userHtml,
    });
    // Notify admin about the new registration
    const adminTemplatePath = path.join(__dirname, '../templates', 'userRegister.html');
    let adminHtml = fs.readFileSync(adminTemplatePath, 'utf-8');
    adminHtml = adminHtml.replace('${name}', name).replace('${email}', email);
    await sendEmail({
      to: 'vk@yopmail.com', // Replace with actual admin email
      subject: 'New User Registration',
      text: `A new user has registered:\n\nName: ${name}\nEmail: ${email}\n\nPlease review the registration details.`,
      html: adminHtml,
    });


    

    const token = generateToken(hotelRep._id);
    const updateToken = await HotelRep.findOneAndUpdate(
      { email },
      { authToken: token },
      { new: true }
    );
    if (!updateToken || !updateToken.authToken) {
      return res.status(500).json({ message: "Something went wrong while updating the token." });
    }
const x = {
      _id: updateToken._id,
      name: updateToken.name,
      email: updateToken.email,
      telephone: updateToken.telephone,
      verificationStatus: updateToken.verificationStatus,
      adminApproval: updateToken.adminApproval,
      authToken: updateToken.authToken,
      isAdmin: updateToken.isAdmin,
    };
    if (updateToken.authToken && !updateToken.isAdmin) {
      // User is not an admin
      const getHotelInfo = await Hotel.findOne({ representative: updateToken._id }).populate("country");
      return res.status(200).json({ message: "Email sent! Please verify your Email.", status: true, user: x, detail: getHotelInfo });
    } else if (updateToken.authToken && updateToken.isAdmin) {
      // User is an admin
      return res.status(200).json({ message: "Email sent! Please verify your Email.", status: true, user: x, detail: null });
    } else {
      return res.status(500).json({ message: "Something went wrong!" });
    }











    // res.status(200).json({
    //   message: "Email sent! Please verify your Email.",
    //   status: true,
    // });
  } catch (err) {
    console.error("Registration failed:", err);
    res.status(500).json({
      message: `Registration failed. Please try again, ${err.message}`,
    });
  }
};

// Forget Password API
export const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const representative = await HotelRep.findOne({ email });
    if (!representative) {
      return res.status(404).json({ message: 'Email not found' });
    }
    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    representative.otp = await bcrypt.hash(otp, 10); // Hash the OTP
    const fiveMinutesInMillis = 5 * 60 * 1000; // 5 minutes in milliseconds
    const futureTime = Date.now() + fiveMinutesInMillis;
    representative.otpExpires = new Date(futureTime).toISOString()
    await representative.save();
    // Send OTP to email
    const otpPath = path.join(__dirname, '../templates', 'forgetPasswordOTP.html');
    let userHtml = fs.readFileSync(otpPath, 'utf-8');
    userHtml = userHtml.replace('${name}', representative.name).replace('${otp}', otp);
    await sendEmail({
      to: email,
      subject: 'Your OTP for Password Reset',
      text: `Your OTP for Password Reset`,
      html: userHtml,
    });
    return res.status(200).json({ message: 'OTP sent to your email' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Verify OTP API
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const representative = await HotelRep.findOne({ email });
    if (!representative) {
      return res.status(404).json({ message: 'Email not found' });
    }
    // Check if OTP is valid and not expired
    const isOtpValid = await bcrypt.compare(otp, representative.otp);
    if (!isOtpValid || Date.now() > representative.otpExpires) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }
    // Clear OTP and expiration
    representative.otp = undefined;
    representative.otpExpires = undefined;
    await representative.save();
    // Proceed to create new password
    return res.status(200).json({ message: 'OTP verified, proceed to reset password' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Reset Password API
export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const representative = await HotelRep.findOne({ email });
    if (!representative) {
      return res.status(404).json({ message: 'Email not found' });
    }
    // Hash the new password
    representative.password = await bcrypt.hash(newPassword, 10);
    await representative.save();
    return res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
