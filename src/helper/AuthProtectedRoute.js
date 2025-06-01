"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AuthMiddleware = ({ children }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let storedUser = localStorage.getItem("userdetails");

      if (!storedUser) {
        // Check if user details are in the URL (after email verification)
        const userDetailsFromUrl = searchParams.get("userDetails");

        if (userDetailsFromUrl) {
          try {
            const user = JSON.parse(decodeURIComponent(userDetailsFromUrl));

            if (user.authToken) {
              localStorage.setItem("userdetails", JSON.stringify(user));
              setIsAuthenticated(true);
            } else {
              router.push("/login");
              return;
            }
          } catch (error) {
            console.error("Error parsing user details:", error);
            router.push("/login");
            return;
          }
        } else {
          router.push("/login");
          return;
        }
      } else {
        const user = JSON.parse(storedUser);
        if (user.authToken) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("userdetails");
          router.push("/login");
          return;
        }
      }
    }
    setLoading(false);
  }, []);

  if (loading) return <p>Loading...</p>; // Prevents flashing
  if (!isAuthenticated) return toast.success("Please login first");

  return <>{children}</>;
};

export default AuthMiddleware;
