'use client'
import HomeRender from "@component/components/home/HomeRender.jsx";

export default function Home() {
  console.log("root page code running")
  return (
    <>
      <div >
        {/* <SquarePayment/> */}
        <HomeRender />
      </div>
    </>
  );
}
