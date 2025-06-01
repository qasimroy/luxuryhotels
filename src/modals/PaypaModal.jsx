import React from 'react'

function PaypaModal() {
    return (
        <>
            <div className="bg-white p-8 rounded-lg w-96 text-center relative">
                <div>
                    <button type="button" className="closebtn">✕

                    </button>
                </div>
                <div className="mt-4">
                    <form>
                        <div className="p-2 StripeElement">
                            <div className="__PrivateStripeElement" style="margin: -4px 0px !important; padding: 0px !important; border: none !important; display: block !important; background: transparent !important; position: relative !important; opacity: 1 !important; clear: both !important; transition: height 0.35s !important;">
                                <iframe
                                    name="__privateStripeFrame17010"
                                    allowtransparency="true"  // allowtransparency is valid in JSX as well
                                    scrolling="no"
                                    role="presentation"
                                    allow="payment *; publickey-credentials-get *"
                                    src="https://js.stripe.com/v3/elements-inner-payment-8a4cf584aec2d2b6f9c6f0bf0ca0fe7a.html#wait=false&amp;rtl=false&amp;elementsInitSource=stripe.elements&amp;componentName=payment&amp;keyMode=test&amp;apiKey=pk_test_51IhBByD3gzWFhFEciZYdGAxn60f2PXheRTvCBogy0dqd5pVCcZmxwcL8eCjxDXH0osMIl802a3dKQy6C0iL7et43004Ipi0Y7K&amp;referrer=https%3A%2F%2Fluxuryhotelsplatform.com%2Fdashboard%2Fnominate-hotel&amp;controllerId=__privateStripeController1708"
                                    title="Secure payment input frame"
                                    style={{
                                        border: "0px !important",
                                        margin: "-4px",
                                        padding: "0px !important",
                                        width: "calc(100% + 8px)",
                                        minWidth: "100% !important",
                                        overflow: "hidden !important",
                                        display: "block !important",
                                        userSelect: "none !important",
                                        transform: "translate(0px) !important",
                                        colorScheme: "light only !important",
                                        height: "299.5px",
                                        opacity: "1",
                                        transition: "height 0.35s, opacity 0.4s 0.1s"
                                    }}
                                />
                            </div>
                        </div>
                        <button type="submit" className="py-3 px-5 mt-3 bg-primary text-white font-semibold shadow-md hover:bg-primaryDark focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75 btn-primary uppercase rounded-xl w-full">Pay Now</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default PaypaModal