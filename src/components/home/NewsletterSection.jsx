import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import HeadingWithoutSwiper from "../headingWithoutSwiper";
import { useForm } from "react-hook-form";
import useRequest from "@component/hooks/UseRequest";
import { apis } from "@component/apiendpoints/api";
import Footer from "../footer";

const NewsletterSection = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { request, response, loading } = useRequest(true);
  const [hover, setHover] = useState(false);

  const handleSubmitNewsLatter = (data) => {
    request("POST", apis.SUBSCRIBE_NEWSLATTER, data);
  };

  useEffect(() => {
    if (response) {
      console.log("Response:", response);
      reset(); // Reset the form only on successful response
    }
  }, [response, reset]);

  useEffect(() => {
    AOS.init({
      duration: 2500, // Animation duration (in ms)
      easing: "ease-in-out", // Easing for the animation
      once: true, // Whether animation should happen only once
    });
  }, []);

  return (
    <>
      <HeadingWithoutSwiper name={"SUBSCRIBE NEWSLETTER"} />
      {/* <h3 className="text-center">SUBSCRIBE NEWSLETTER</h3>    */}
      <div
          style={{
            backgroundImage: 'url("/new/assets/img/transparent-bg.png")',
            backgroundSize: "contain",
            // backgroundPosition: "center center",
            padding: "80px 100px", 
            // backgroundColor:"#000000",
            backgroundRepeat: "no-repeat",
            borderRadius: "25px",
            border: "1px solid golden",
            position: "relative",
            // bottom: "30px",
            top: "50px",
            marginRight: "300px",
            left: "200px"
          }}
          className="newsletter-section"
        >
       {/* <div className="newsletter-section"> */}
      <section className="section-padding-newsletter">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center text-white ">
            {/* Left Side - Image */}
            {/* <div className="md:w-1/3" data-aos="fade-left">
              <img
                src="/new/assets/img/resort.png" // Replace with your image URL
                alt="Scenic View"
                className="object-cover"
              />
            </div> */}

            {/* Right Side - Content */}
            <div className="md:w-2/3 md:mt-0 md:ml-20 md:text-center ">
              <h3 className="text-2xl font-bold ml-20">SIGN UP For Our NEWSLETTER</h3>
              <p className="mt-3 text-capitalize ml-20">
                {/* SIGN UP NOW TO RECEIVE HOT SPECIAL OFFERS AND INFORMATION ABOUT THE
                BEST TOURS! */}
                To Recieve the latest news, exclusive deals, and a chence to win a free holiday while discovering the best luxury hotels and top destination !
              </p>
              <form className="mt-6" onSubmit={handleSubmit(handleSubmitNewsLatter)}>
                <div className="border-b pb-3 d-flex ml-20">
                  <input
                    {...register("name", { required: "Name is required" })}
                    type="text"
                    placeholder="YOUR NAME"
                    className="w-full bg-transparent text-black focus:outline-none"
                  />
                  {errors?.name?.message && (
                    <span className="error_message">
                      {errors.name.message}
                    </span>
                  )}
                  <input
                    {...register("email", { required: "Email is required" })}
                    type="email"
                    placeholder="YOUR EMAIL"
                    className="w-full bg-transparent text-black focus:outline-none"
                  />
                  {errors?.email?.message && (
                    <span className="error_message">
                      {errors.email.message}
                    </span>
                  )}
                  <button
                    type="submit"
                    className="flex-grow-0 text-[16px] px-2 m-1 h-8 w-48 rounded-md grid place-items-center focus:outline-none"
                    disabled={loading}
                    style={{ background: 'linear-gradient(to right, rgb(204, 164, 89), rgb(230, 205, 113), rgb(204, 163, 86))',
                            color: hover ? 'red' : 'white',
                            border: hover ? '1px solid red' : '1px solid transparent'
                     }}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                  >
                    {loading ? "Loading..." : "SUBSCRIBE"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* </div> */}
      </div>
      <Footer />
    </>
  );
};

export default NewsletterSection;
