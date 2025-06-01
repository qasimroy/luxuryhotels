"use client";

import { apis } from "@component/apiendpoints/api";
import useRequest from "@component/hooks/UseRequest";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AuthDasbard = (WrappedComponent) => {

 
  return function ProtectedPage(props) {
    const router = useRouter();
    const { request, response, loading } = useRequest(true);
    const [isChecking, setIsChecking] = useState(false); // Track loading state

    useEffect(() => {
      const checkSubscription = async () => {
        try {
          const hotel_details = localStorage.getItem("hotel_details")
            ? JSON.parse(localStorage.getItem("hotel_details"))
            : null;
          const user_details = localStorage.getItem("userdetails")
            ? JSON.parse(localStorage.getItem("userdetails"))
            : null;

          if (!user_details?._id ) {
            router.push("/dashboard/select-package");
            return;
          }

          const response = await request("POST", apis.GET_HOTELS_ADDONS_DATA, {
            userID: user_details?._id,
            hotelId: hotel_details?._id,
          });

          console.log("reponse",response)
          
          if (response?.data?.plan?.endDate) {
            setIsChecking(true);
          } else {
            toast.error("if you want to see the data of this page then You need to purchase a package first!");
            router.push("/dashboard/select-package");
          }
        } catch (error) {
          console.error("Subscription check failed:", error);
          toast.error("Error checking subscription!");
          router.push("/dashboard/select-package");
        }
      };

      checkSubscription();
    }, []);

    if (!isChecking) return <p>Loading...</p>; // Show loading state

    return <WrappedComponent {...props} />;
  };
};

export default AuthDasbard;
