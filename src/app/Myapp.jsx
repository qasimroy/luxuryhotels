"use client";
import { apis } from "@component/apiendpoints/api";
import Footer from "@component/components/footer";
import Navbar from "@component/components/Navbar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReduxProvider from "./ReduxProvider";
import Cookies from "js-cookie";
import { Toaster } from "react-hot-toast";
import { getUserProfile } from "@component/lib/slice/authslice";
import Loader from "@component/components/Loader";
import {
  getCountry,
  getHotelfacility,
  getHotelHightlight,
  getRommenimeties,
} from "@component/lib/slice/sitesSetting";
// import LiveChat from '@component/components/LiveChat';
import { initGA, logPageView } from "@component/googleAnalytics";
import { usePathname } from "next/navigation";
import useRequest from "@component/hooks/UseRequest";

const Myapp = ({ children }) => {
  return (
    <>
      <ReduxProvider>
        <CommonComponent children={children} />
        {/* <LiveChat /> */}
      </ReduxProvider>
    </>
  );
};
export default Myapp;

const CommonComponent = ({ children }) => {
  const [app_loading, app_setloading] = useState(true);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.auth);
  const { loading } = useSelector((state) => state.siteSetting);
  const { request, response } = useRequest();
  const token = Cookies.get("token");
  const pathname = usePathname();
  
  // useEffect(() => {
  // //   dispatch(getCmspage());
  // }, [dispatch]);

  // useEffect(() => {
  //   // Initialize Google Analytics only once
  //   initGA();
  // }, []);

  useEffect(() => {
    dispatch(getCountry());
    dispatch(getHotelHightlight());
    dispatch(getHotelfacility());
    dispatch(getRommenimeties());
  }, [token]);

  // useEffect(() => {
  //   // Log page view on route change
  //   logPageView(pathname);
  // }, [pathname]);

  useEffect(() => {
    if (response) {
      if (response?.status == true) {
        //   dispatch(AuthActions.setAuthUser(response?.user));
      }
    }
  }, [response]);

  useEffect(() => {
    setTimeout(() => {
      app_setloading(false);
    }, 1000);
  }, []);

  console.log(loading, "loading");
  return (
    <>
      {!app_loading ? (
        <>
          <Navbar />
          {loading && <Loader />}
          {children}
          {location.pathname !== "/new" ? <Footer /> : null }
        </>
      ) : (
        <>
          <div className="center-layout">
            <img src="/new/assets/img/logo.svg" alt="" />
            <div className="loader2">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </>
      )}

      <Toaster />
    </>
  );
};
