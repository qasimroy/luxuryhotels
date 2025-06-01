
import { useState } from "react";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";

const SquarePayment = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  return (
    <div className="container">
      {errorMessage && <p>{errorMessage}</p>}

      <PaymentForm
        applicationId="sandbox-sq0idb-ElE9W86Kyq57l9t6LiimOw"
        locationId="LCPPNE3BHFKMA"
        cardTokenizeResponseReceived={async (token, verifiedBuyer) => {
          console.log("Token:", token);
          console.log("Verified Buyer:", verifiedBuyer);

          try {
            const response = await fetch("/api/pay", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                sourceId: token.token, // Ensure correct token structure
              }),
            });

            if (!response.ok) {
              throw new Error("Failed to process payment");
            }

            console.log("Payment Response:", await response.json());
            alert("Payment successful!");
          } catch (error) {
            setErrorMessage(error.message);
          }
        }}
      >
        <CreditCard
          buttonProps={{
            css: {
              backgroundColor: "#E56B6F",
              fontSize: "14px",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#E56B6F",
              },
            },
          }}
        />
      </PaymentForm>
    </div>
  );
};

export default SquarePayment;
