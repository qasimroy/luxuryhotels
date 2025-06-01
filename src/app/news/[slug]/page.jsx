import NewsPageSection from '@component/components/commonPage/NewsPageSection'
import React from 'react'

async function page({params}) {
    params=await params
    // params= params
  return (
    <>
    <NewsPageSection news_id={params?.slug} />
    </>
  )
}

export default page