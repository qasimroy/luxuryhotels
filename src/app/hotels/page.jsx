  import Hotel_visit from "@component/components/hotel_visit/Hotel_visit"

  const page =async ({params}) => {
  params=await params
    return (
      <>
        <Hotel_visit params={params}/>
      </>
    )
  }

  export default page