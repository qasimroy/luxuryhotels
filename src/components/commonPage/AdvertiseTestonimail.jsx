import React from 'react'

function AdvertiseTestonimail() {
  return (
    <div style={{  backgroundImage: 'url("/new/assets/img/new1.jpg")',
      backgroundSize: 'cover'}}>

    <div className="review-section">
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 mx-auto max-w-7xl pb-14 pt-24 my-14">
        <div className="text-center">
          <div className="company-logo -my-10 text-center w-48 mx-auto">
              <img src="./assets/img/company-logo.png" alt="company-logo" />
            </div>
            <p className="text-md text-black border border-black p-4 m-3 bg-white bg-opacity-30 rounded">
              Lorem ipsum dolor sit amet consectetur. Orci nulla penatibus tortor
              nulla nisl pellentesque ipsum. Et integer ac et elit risus blandit urna
              imperdiet magna. A imperdiet risus scelerisque at. habitant.
            </p>
            <div className="rating">
              {[...Array(5)].map((_, index) => (
                <input key={index} type="radio" name="rating-1" className="mask mask-star-2 bg-star" />
              ))}
            </div>
          </div>

          <div className="text-center">
          <div className="company-logo -my-10 text-center w-48 mx-auto">
              <img src="./assets/img/company-logo.png" alt="company-logo" />
            </div>
            <p className="text-md text-black border border-black p-4 m-3 bg-white bg-opacity-30 rounded">
              Lorem ipsum dolor sit amet consectetur. Orci nulla penatibus tortor
              nulla nisl pellentesque ipsum. Et integer ac et elit risus blandit urna
              imperdiet magna. A imperdiet risus scelerisque at. habitant.
            </p>
            <div className="rating">
              {[...Array(5)].map((_, index) => (
                <input key={index} type="radio" name="rating-1" className="mask mask-star-2 bg-star" />
              ))}
            </div>
          </div>

          <div className="text-center">
          <div className="company-logo -my-10 text-center w-48 mx-auto">
              <img src="./assets/img/company-logo.png" alt="company-logo" />
            </div>
            <p className="text-md text-black border border-black p-4 m-3 bg-white bg-opacity-30 rounded">
              Lorem ipsum dolor sit amet consectetur. Orci nulla penatibus tortor
              nulla nisl pellentesque ipsum. Et integer ac et elit risus blandit urna
              imperdiet magna. A imperdiet risus scelerisque at. habitant.
            </p>
            <div className="rating">
              {[...Array(5)].map((_, index) => (
                <input key={index} type="radio" name="rating-1" className="mask mask-star-2 bg-star" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    
  
  )
}

export default AdvertiseTestonimail