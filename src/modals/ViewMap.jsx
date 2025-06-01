import Map from '@component/components/Map';
import axios from 'axios';
import React, { useState } from 'react'

const getDistance = async (originLat, originLng, destLat, destLng) => {
    try {
        const response = await axios.get('http://localhost:3200/api/distance', {
            params: { originLat, originLng, destLat, destLng }
        });
        const { distance, duration } = response.data.rows[0].elements[0];
        console.log(`Distance: ${distance.text}, Time: ${duration.text}`);
    } catch (error) {
        console.error('Error fetching distance data:', error);
    }
};
const ViewMap = ({ setIViewModal, nearbyData, hotel_details_fetch,nearbyAttraction }) => {
    console.log("nearbyData", nearbyAttraction);
    return (
        <>
            <div className="modal d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Map view</h5>
                            <button type="button" className="close" onClick={() => setIViewModal(false)}>
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className=" mainMapView">
                                {/* Left Section: Map */}
                                <div className="mapView_left">
                                    {/* <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.3690186047796!2d115.26247721478466!3d-8.506088993877654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd240c0117b95a1%3A0x2b93f6f69353dc1!2sMaya%20Ubud%20Resort%20%26%20Spa!5e0!3m2!1sen!2sid!4v1617968070723!5m2!1sen!2sid"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                    ></iframe> */}

                                    <Map location={{ lat: parseFloat(hotel_details_fetch?.lat), lng: parseFloat(hotel_details_fetch?.long) }}
                                        setIViewModal={setIViewModal}

                                    />
                                      <div className=" main-border-topMap p-6 pb-0 pt-4 rounded-md">
                                        <h3 className="text-xl font-bold text-gray-800 mb-4 ">
                                            Top Attraction
                                        </h3>
                                        {nearbyAttraction?.attraction?.length > 0 ? (<>
                                            {nearbyAttraction?.attraction?.map((item) => (
                                                <div className="my-4 border-topMap">
                                                    <h4 className="text-lg font-semibold text-[#9e7922] flex items-center gap-2">
                                                        <img src={item?.icon} alt="Airport Icon" style={{ width: "1rem", height: "1rem" }} />
                                                        </h4>
                                                    <ul className="text-gray-600 ps-0">
                                                        <li> <strong>{item?.name}</strong> <br /> About {item?.distance?.duration?.text}(s) from hotel by car ({item?.distance?.distance?.text})</li>
                                                        {/* <li> <strong>Amtrak Railway Station</strong> <br />
                                                    About 32min(s) from hotel by car (15.3 miles)
                                                </li> */}
                                                    </ul>
                                                </div>
                                            ))}
                                        </>) : (
                                            <div className="my-4 border-topMap">
                                                <h4 className="text-lg font-semibold text-[#9e7922] flex items-center gap-2"> <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M448 96v256c0 51.815-61.624 96-130.022 96l62.98 49.721C386.905 502.417 383.562 512 376 512H72c-7.578 0-10.892-9.594-4.957-14.279L130.022 448C61.82 448 0 403.954 0 352V96C0 42.981 64 0 128 0h192c65 0 128 42.981 128 96zm-48 136V120c0-13.255-10.745-24-24-24H72c-13.255 0-24 10.745-24 24v112c0 13.255 10.745 24 24 24h304c13.255 0 24-10.745 24-24zm-176 64c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56z"></path></svg>
                                                    <span>No Nearby top Attractions</span>
                                                </h4>
                                            </div>
                                        )}
                                        </div>
                                </div>

                                {/* Right Section: Hotel Info */}
                                <div className="mapView_right ">
                                    {/* Hotel Details */}
                                    <div className="bg-white p-6 rounded-md">
                                        <h2 className="text-2xl font-bold text-gray-800">
                                            {hotel_details_fetch?.hotel_name}                                        </h2>
                                        <p className="text-gray-600 flex items-center gap-2">
                                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 384 512" class="text-golden" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path></svg>
                                            <span>{hotel_details_fetch?.location}</span>
                                        </p>
                                        <div className="flex items-center mt-2">
                                            <span className="text-red-600 text-xl font-bold">4.2/5</span>
                                            <span className="ml-2 text-gray-500">Very Good - 62 Reviews</span>
                                        </div>
                                        <button onClick={() => window.location.href = hotel_details_fetch?.website} className="bg-red-600 text-white px-6 py-2 rounded mt-4 hover:bg-red-700">
                                            Book Now
                                        </button>
                                    </div>

                                    {/* Transportation Details */}
                                    <div className="bg-white main-border-topMap p-6 pb-0 pt-0 rounded-md">
                                        <h3 className="text-xl font-bold text-gray-800 mb-4 ">
                                            Transportation
                                        </h3>
                                        {nearbyData?.subwayStations?.length > 0 ? (<>
                                            {nearbyData?.subwayStations?.map((item) => (

                                                <div className="my-4 border-topMap">
                                                    <h4 className="text-lg font-semibold text-[#9e7922] flex items-center gap-2">
                                                        <img src={item?.icon} alt="Airport Icon" style={{ width: "1rem", height: "1rem" }} />
                                                        <span>Metro Station</span></h4>
                                                    <ul className="text-gray-600 ps-0">
                                                        <li> <strong>{item?.name}</strong> <br /> About {item?.distance?.duration?.text}(s) from hotel by car ({item?.distance?.distance?.text})</li>
                                                        {/* <li> <strong>Amtrak Railway Station</strong> <br />
                                                    About 32min(s) from hotel by car (15.3 miles)
                                                </li> */}
                                                    </ul>
                                                </div>
                                            ))}
                                        </>) : (
                                            <div className="my-4 border-topMap">
                                                <h4 className="text-lg font-semibold text-[#9e7922] flex items-center gap-2"> <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M448 96v256c0 51.815-61.624 96-130.022 96l62.98 49.721C386.905 502.417 383.562 512 376 512H72c-7.578 0-10.892-9.594-4.957-14.279L130.022 448C61.82 448 0 403.954 0 352V96C0 42.981 64 0 128 0h192c65 0 128 42.981 128 96zm-48 136V120c0-13.255-10.745-24-24-24H72c-13.255 0-24 10.745-24 24v112c0 13.255 10.745 24 24 24h304c13.255 0 24-10.745 24-24zm-176 64c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56z"></path></svg>
                                                    <span>No Nearby Metro Station</span>
                                                </h4>
                                            </div>
                                        )}

                                        {nearbyData?.trainStations?.length ? (<>
                                            {nearbyData?.trainStations?.map((item) => {
                                                return (
                                                    <div className="my-4 border-topMap">
                                                        <h4 className="text-lg font-semibold text-[#9e7922] flex items-center gap-2">
                                                            <img src={item?.icon} alt="Airport Icon" style={{ width: "1rem", height: "1rem" }} />
                                                            <span>Railway Station</span></h4>
                                                        <ul className="text-gray-600 ps-0">
                                                            <li> <strong>{item?.name}</strong> <br /> About {item?.distance?.duration?.text}(s) from hotel by car ({item?.distance?.distance?.text})</li>
                                                            {/* <li> <strong>Amtrak Railway Station</strong> <br />
                                                    About 32min(s) from hotel by car (15.3 miles)
                                                </li> */}
                                                        </ul>
                                                    </div>
                                                )
                                            })}

                                        </>) : (<>
                                            <div className="my-4 border-topMap">
                                                <h4 className="text-lg font-semibold text-[#9e7922] flex items-center gap-2">
                                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M448 96v256c0 51.815-61.624 96-130.022 96l62.98 49.721C386.905 502.417 383.562 512 376 512H72c-7.578 0-10.892-9.594-4.957-14.279L130.022 448C61.82 448 0 403.954 0 352V96C0 42.981 64 0 128 0h192c65 0 128 42.981 128 96zm-48 136V120c0-13.255-10.745-24-24-24H72c-13.255 0-24 10.745-24 24v112c0 13.255 10.745 24 24 24h304c13.255 0 24-10.745 24-24zm-176 64c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56z"></path></svg>
                                                    <span>No Nearby Railway Station</span>
                                                </h4>
                                            </div>
                                        </>)}

                                        {nearbyData?.airports?.length > 0 ? (
                                            nearbyData?.airports?.map((item) => (
                                                <div key={item?.name} className="my-4 border-topMap">
                                                    <h4 className="text-lg font-semibold text-[#9e7922] flex items-center gap-2">
                                                        <img src={item?.icon} alt="Airport Icon" style={{ width: "1rem", height: "1rem" }} />
                                                        <span> Airport </span>
                                                    </h4>
                                                    <ul className="text-gray-600 ps-0">
                                                        <li>
                                                            <strong>{item?.name}</strong> <br />
                                                            About {item?.distance?.duration?.text}(s) from hotel by car ({item?.distance?.distance?.text})
                                                        </li>
                                                    </ul>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="my-4 border-topMap">
                                                <h4 className="text-lg font-semibold text-[#9e7922] flex items-center gap-2">
                                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 640 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M624 448H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h608c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM80.55 341.27c6.28 6.84 15.1 10.72 24.33 10.71l130.54-.18a65.62 65.62 0 0 0 29.64-7.12l290.96-147.65c26.74-13.57 50.71-32.94 67.02-58.31 18.31-28.48 20.3-49.09 13.07-63.65-7.21-14.57-24.74-25.27-58.25-27.45-29.85-1.94-59.54 5.92-86.28 19.48l-98.51 49.99-218.7-82.06a17.799 17.799 0 0 0-18-1.11L90.62 67.29c-10.67 5.41-13.25 19.65-5.17 28.53l156.22 98.1-103.21 52.38-72.35-36.47a17.804 17.804 0 0 0-16.07.02L9.91 230.22c-10.44 5.3-13.19 19.12-5.57 28.08l76.21 82.97z"></path></svg>
                                                    <span>No Nearby Airport</span>
                                                </h4>
                                            </div>
                                        )}


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewMap