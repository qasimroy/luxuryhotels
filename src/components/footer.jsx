"use client"
import Link from "next/link";
import React, { useState } from "react"


function Footer() {
  const [email, setEmail] = useState("");

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribed with email:", email);
    // Perform subscription logic here.
  };

  return (
    <footer className="footer_wrapper footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="footer-block">
              <figure>
                <img src="/new/assets/img/logo.svg" alt="Footer Logo" />
              </figure>
              <p>
                LUXURY HOTELS, A RENOWNED GLOBAL BRAND FOUNDED IN ENGLAND 17 YEARS AGO, IS CURRENTLY PRESENT IN 89 COUNTRIES. WE PROVIDE LUXURY HOTELS FOR AFFLUENT TRAVELERS THROUGH OUR ONLINE PLATFORM AND IN PRINT AND DIGITAL FORMATS.
              </p>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="row">
              <div className="col-md-3">
                <h6>LUXURY HOTEL</h6>
                <ul className="footer-links">
                  <li>
                    <Link href="/luxury-hotels-resorts">LUXURY HOTEL AND RESORTS</Link>
                  </li>
                  <li>
                    <Link href="/luxury-hotels-magazines">Luxury Hotels Magazines</Link>
                  </li>
                  <li>
                    <Link href="/travel-news">TRAVEL NEWS</Link>
                  </li>
                  <li>
                    <Link href="/latest-news">LATEST NEWS</Link>
                  </li>
                  <li>
                    <Link href="/win-a-holiday">WIN A HOLIDAY</Link>
                  </li>
                </ul>
              </div>
              <div className="col-md-3">
                <h6>ABOUT US</h6>
                <ul className="footer-links">
                  <li>
                    <Link href="/my-team">OUR TEAM</Link>
                  </li>
                  <li>
                    <Link href="/about-us">ABOUT US</Link>
                  </li>
                  <li>
                    <Link href="/what-we-do">WHAT WE DO</Link>
                  </li>
                  <li>
                    <Link href="/franchise-resale">FRANCHISE RESALE</Link>
                  </li>
                  <li>
                    <Link href="/colaborative-advantages">COLLABORATIVE ADVANTAGES</Link>
                  </li>
                  <li>
                    <Link href="/Contact-us">CONTACT US</Link>
                  </li>
                </ul>
              </div>
              <div className="col-md-3">
                <h6>ADVERTISE WITH US</h6>
                <ul className="footer-links">
                  <li>
                    <Link href="/distribution">DISTRIBUTION</Link>
                  </li>
                  <li>
                    <Link href="/publish-news">PUBLISH NEWS</Link>
                  </li>
                  <li>
                    <Link href="/media-kit">Media Kit</Link>
                  </li>
                  
                  <li>
                    <Link href="/dashboard">LIST YOUR HOTEL</Link>
                  </li>
                  
                  <li>
                    <Link href="/advertise-with-us">
                    Advertise With Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/nominate-hotel">
                      NOMINATE HOTEL
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-md-3">
                <h6>CONTACT US</h6>
                <div className="newsletter-form">
                  <div className="form-group">
                    <Link
                      href="/Contact-us"
                      className="form-control"
                    >
                      CONTACT US
                    </Link>

                    <Link
                      href="mailto:info@luxuryhotelsmagazines.com"
                      className="form-control"
                    >
                      info@luxuryhotelsmagazines.com
                    </Link>


                    <button type="submit" className="btn subscribe-btn">
                      <i className="ion-paper-airplane"></i>
                    </button>
                  </div>
                  {/* <div className="subscribe_text">Sign up for Alerts and Updates.</div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SocialLinks />
    </footer>
  );
}

export default Footer;




const SocialLinks = () => {
  const socialLinks = [
    { href: "https://www.tiktok.com/@luxuryhotels_cy?_t=ZN-8t4HxGtu3TK&_r=1", imgSrc: "/new/assets/img/tictok.png", alt: "Tiktok" },
    // { href: "https://x.com/LuxuryHotelsOrg?t=4SbruUXHeRHoN0sKhUQg5w&s=09", imgSrc: "/new/assets/img/twit.png", alt: "twiter" },
    { href: "https://wa.me/", imgSrc: "/new/assets/img/whatsaap.png", alt: "WhatsApp" },
    { href: "https://x.com/LuxuryHotelsOrg?t=Bz0AeCLaO88Ue_fzyVujWw&s=09", imgSrc: "/new/assets/img/twitter.png", alt: "Twitter" },
    { href: "https://youtube.com/@luxuryhotelswebsite?si=HyeOt3MBjF1ArCbK", imgSrc: "/new/assets/img/youtube.png", alt: "YouTube" },
    { href: "https://www.luxuryhotelsmagazines.com/", imgSrc: "/new/assets/img/telegram.png", alt: "Telegram" },
    { href: "https://www.linkedin.com/in/macs-marketing?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", imgSrc: "/new/assets/img/linkedin.png", alt: "LinkedIn" },
    { href: "https://www.facebook.com/LuxuryHotelsMagazines/", imgSrc: "/new/assets/img/luxury-hotel-orignal.png", alt: "Facebook" },
    { href: "https://www.facebook.com/LuxuryHotelsCelebrities/", imgSrc: "/new/assets/img/-Luxury-HotelsCelebrities.png", alt: "Facebook Celebrities" },
    { href: "https://www.facebook.com/LuxuryHotelsDubaiAbuDhabi/", imgSrc: "/new/assets/img/Luxury-Hotels-dubai-and-abu-dhabi.png", alt: "Facebook Dubai Abu Dhabi" },
    { href: "https://www.facebook.com/LuxuryHotelsPacificOcean/", imgSrc: "/new/assets/img/Luxury-Hotels-Pacific-Ocean.png", alt: "Facebook Pacific Ocean" },
    { href: "https://www.facebook.com/LuxuryHotelsUK/", imgSrc: "/new/assets/img/Luxury-Hotels-UK.png", alt: "Facebook UK" },
    { href: "https://www.instagram.com/luxuryhotels_original?igsh=dW81cjJsZWhiNDhm ", imgSrc: "/new/assets/img/luxury-hotel-orignal-insta.png", alt: "Instagram" },
    { href: "https://www.instagram.com/luxuryhotels_uk/profilecard/?igsh=ejBodDB0dHAxMXBk ", imgSrc: "/new/assets/img/instagram-celebrities.png", alt: "Instagram Celebrities" },
    { href: "https://www.instagram.com/luxuryhotels_dubai_abudhabi/profilecard/?igsh=MTl4cHZlZTBteDhxcQ== ", imgSrc: "/new/assets/img/Luxury-Hotels-Dubai-&-Abu-Dhabi.png", alt: "Instagram Dubai & Abu Dhabi" },
    { href: "https://www.instagram.com/luxuryhotels_celebrities/profilecard/?igsh=amx1dHQ5cmhjbGlq ", imgSrc: "/new/assets/img/Luxury-Hotels-Pacific.png", alt: "Instagram Pacific" },
    { href: "https://www.instagram.com/luxuryhotels_pacific_ocean?igsh=MTRubjRqczEwY2g1ag==", imgSrc: "/new/assets/img/Luxury-Hotels-UK-insta.png", alt: "Instagram UK" },
  ];

  return (
    <div className="copyright">
      <div className="container">
        <h6>Social Networks</h6>
        <div className="Social-block">
          {socialLinks.map((link, index) => (
            <a key={index} target="_blank" href={link.href} rel="noopener noreferrer">
              <img src={link.imgSrc} alt={link.alt} className="w-14 rounded-xl" />
            </a>
          ))}
        </div>
      </div>
      <p className="text-center mt-4 text-slate-50 text-capitalize">© 2023-2024 Luxury Hotels. All Rights Reserved.</p>
    </div>
  );
};


