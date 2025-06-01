
import HotelWithCountry from "@component/components/commonPage/HotelWithCountry"

const page = async({params}) => {
  // params=await params
  params= await params
  return (
    <>
      <HotelWithCountry params={params}/>
    </>
  )
}

export default page