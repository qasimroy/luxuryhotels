import React from 'react'
import Pagination from './Pagination'

function MediaKit() {
  return (
   <>
   <section
                style={{
                    backgroundImage: 'url("/new/assets/img/nominate-hotel-bg.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    borderRadius: '12px',
                    marginBottom: '50px'
                }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="divider divider-secondary w-1/4 mx-auto text-xl text-golden uppercase text-center pt-5  mb-5 "> <span className=''>  Media Kit </span></div>
                        </div>
                        <div className='col-12'>
                            <div className="flex media-card p-4 bg-white rounded-lg mb-7 connan-shadow">
                                <div className="relative w-40 h-40">
                                    <img
                                        src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=AVzFdbnjp1hshOdfkWPf8FtIiuFMD2hjUZOFxtBJ0Q4d0gES5keSi8c1uoXSj2yJwmRFRb0VOe2xfreWRNmkEZLFek_PmPkk3SKtVQP7e4KFjk6_e6XfyYBFW-XKVwpOCVoDWire-LtkBHZR5VhLqaNZh7yP4P-MOYfkjvDhAsL6ExkFRvCz&key=AIzaSyAN-RY595XViAsgKD5nXRkH3zmtc6iqzjE" // Replace with the actual image path
                                        alt="Hotel Room"
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                    <button className="absolute  top-2 right-2 w-8 h-8 grid place-items-center bg-white border-none rounded-full  text-red-500 text-xl">&#9825;</button>
                                </div>

                                <div className="px-4 flex-1">
                                    <h2 className="text-lg font-bold text-gray-800 mb-2">
                                        Hotel Park Green Suites Delhi Airport BY Prithvi Palace
                                        <span className="text-yellow-500 text-base ml-2">⭐⭐⭐⭐</span>
                                    </h2>
                                    {/* <div className="text-sm text-gray-600 mb-2">
                                        <a href="#" className="text-blue-600 hover:underline mr-2">Mahipalpur, New Delhi</a>
                                        <span>18 Km </span>
                                    </div> */}
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        Hotel Park Green Suites Delhi Airport BY Prithvi Palace has a fitness centre, garden, a terrace and restaurant in New Delhi.
                                    </p>
                                    <div className='mt-4'>
                                        <a href="#" className='theme-btn mt-5'>Show prices</a>
                                    </div>
                                </div>
                            </div>
                            <div className="flex media-card p-4 bg-white rounded-lg connan-shadow">
                                <div className="relative w-40 h-40">
                                    <img
                                        src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=AVzFdbnjp1hshOdfkWPf8FtIiuFMD2hjUZOFxtBJ0Q4d0gES5keSi8c1uoXSj2yJwmRFRb0VOe2xfreWRNmkEZLFek_PmPkk3SKtVQP7e4KFjk6_e6XfyYBFW-XKVwpOCVoDWire-LtkBHZR5VhLqaNZh7yP4P-MOYfkjvDhAsL6ExkFRvCz&key=AIzaSyAN-RY595XViAsgKD5nXRkH3zmtc6iqzjE" // Replace with the actual image path
                                        alt="Hotel Room"
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                    <button className="absolute  top-2 right-2 w-8 h-8 grid place-items-center bg-white border-none rounded-full  text-red-500 text-xl">&#9825;</button>
                                </div>

                                <div className="px-4 flex-1">
                                    <h2 className="text-lg font-bold text-gray-800 mb-2">
                                        Hotel Park Green Suites Delhi Airport BY Prithvi Palace
                                        <span className="text-yellow-500 text-base ml-2">⭐⭐⭐⭐</span>
                                    </h2>
                                    {/* <div className="text-sm text-gray-600 mb-2">
                                        <a href="#" className="text-blue-600 hover:underline mr-2">Mahipalpur, New Delhi</a>
                                        <span>· !8 km</span>
                                    </div> */}
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        Hotel Park Green Suites Delhi Airport BY Prithvi Palace has a fitness centre, garden, a terrace and restaurant in New Delhi.
                                    </p>
                                    <div className='mt-4'>
                                        <a href="#" className='theme-btn mt-5'>Show prices</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="p-3" >
      <Pagination setCurrentPage={1} currentPage={1} totalPages={4} />
      </div>
   </>
  )
}

export default MediaKit