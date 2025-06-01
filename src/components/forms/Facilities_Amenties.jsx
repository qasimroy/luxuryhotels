"use client"
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useRequest from '@component/hooks/UseRequest';
import { apis, BASEURL } from '@component/apiendpoints/api';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const Facilities_Amenties = () => {
    const { register, handleSubmit, setValue, getValues, reset, formState: { errors } } = useForm();
    const router = useRouter();
    const { request: requestfetch, response: responsefetch } = useRequest();
    const { request: requestedit, response: responseedit, loading } = useRequest();
    const { hotel_highlight, hotel_facility,room_enimities } = useSelector((state) => state.siteSetting)

    const hotel_details = localStorage.getItem("hotel_details") ? JSON.parse(localStorage.getItem("hotel_details")) : null;
    const [selectedHighlights, setSelectedHighlights] = useState([]); // Track selected hotel highlights

    useEffect(() => {
        const facility_info = sessionStorage.getItem("facility_info");

        if (facility_info && !hotel_details) {
            reset(JSON.parse(facility_info));
        } else if (hotel_details) {
            requestfetch("GET", `${apis.GETHOTEL_PROFILE}${hotel_details?._id}`);
        }
    }, []);

    useEffect(() => {
        if (responsefetch?.data) {
            const { room_amenities, hotel_highlights, hotel_facilities } = responsefetch?.data;
            reset({ room_amenities, hotel_highlights, hotel_facilities });
            setSelectedHighlights(hotel_highlights || []); // Initialize highlights selection
        }
    }, [responsefetch]);

    const handleCheckboxChange = (fieldName, e) => {
        const values = getValues(fieldName) || []; // Get current values
        const newValue = e.target.value;

        if (fieldName === "hotel_highlights") {
            if (e.target.checked) {
                if (values.length >= 5) {
                    toast.error("You can only select up to 5 options.");
                    return;
                }
                setSelectedHighlights([...values, newValue]);
                setValue(fieldName, [...values, newValue]);
            } else {
                const updatedSelection = values.filter(value => value !== newValue);
                setSelectedHighlights(updatedSelection);
                setValue(fieldName, updatedSelection);
            }
        } else {
            if (e.target.checked) {
                setValue(fieldName, [...values, newValue]);
            } else {
                setValue(fieldName, values.filter(value => value !== newValue));
            }
        }
    };

    const onSubmit = async () => {
        if (!hotel_details) {
            sessionStorage.setItem("facility_info", JSON.stringify(getValues()));
            router.push("/dashboard/contact-info");
        } else {
            const { hotel_highlights, room_amenities, hotel_facilities } = getValues();
            const edit_response = await requestedit("PUT", `${apis.HOTEL_FACILITY_AMENTIES}`, {
                hotel_highlights: hotel_highlights.join(","),
                room_amenities: room_amenities.join(","),
                hotel_facilities: hotel_facilities.join(","),
                hotel_id: hotel_details?._id
            });

            if (edit_response) {
                toast.success(edit_response.message);
                router.push("/dashboard/contact-info");
            }
        }
    };

    

    return (
        <>
            <h3 className='comman-heading3'>Kindly complete your hotel's information to proceed further!</h3>

            {/* Room Amenities Section */}
            <h3 className='comman-heading4 mt-0 mb-4'>Room Amenities</h3>
            <div className='desh-borderBox'>
                <div className='information-item'>
                {
                // [
                //         { id: 1, value: "Tea & Coffee Machine", label: "Tea & Coffee Machine", img: "TEA-COFFEE-MACHINE" },
                //         { id: 2, value: "Bathrobes", label: "Bathrobes", img: "BATHROBES" },
                //         { id: 3, value: "Minibar", label: "Minibar", img: "MINIBAR" },
                //         { id: 4, value: "Pillow Menu", label: "Pillow Menu", img: "PILLOW-MENU" },
                //         { id: 5, value: "Breakfast", label: "Breakfast", img: "BREAKFAST" },
                //         { id: 6, value: "Slippers", label: "Slippers", img: "SLIPPERS" },
                //         { id: 7, value: "Wi-Fi", label: "Wi-Fi", img: "WIFI" },
                //         { id: 8, value: "Hot Tub", label: "Hot Tub", img: "HOT-TUB" },
                //         { id: 9, value: "Towels", label: "Towels", img: "towel" },
                //         { id: 10, value: "Hair Dryer", label: "Hair Dryer", img: "HAIR-DRYER" },
                //         { id: 11, value: "Private Swimming Pool", label: "Private Swimming Pool", img: "PRIVATE-SWIMMING-POOL" },
                //         { id: 12, value: "Toiletries", label: "Toiletries", img: "TOILETRIES" },
                //         { id: 13, value: "Spa", label: "Spa", img: "SPA" },
                //         { id: 14, value: "Laundry Service", label: "Laundry Service", img: "LAUNDRY-SERVICE" },
                //     ]
                room_enimities && room_enimities?.map(item => (
                        <div className="form-check item-name" key={item._id}>
                            <input type="checkbox" className="form-check-input" value={item._id}
                                {...register("room_amenities")} onChange={(e) => handleCheckboxChange("room_amenities", e)} />
                            <label className="form-check-label">
                                <img src={`${BASEURL}/${item?.amenityIcon}`} alt={item.amenityIcon} /> {item.amenity}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Hotel Facilities Section */}
            <h3 className='comman-heading4 mt-0 mb-4'>Hotel Facilities</h3>
            <div className='desh-borderBox'>
                <div className='information-item'>
                {
                // [
                //         { id: 15, value: "Laundry Service", label: "Laundry Service", img: "LAUNDRY-SERVICE" },
                //         { id: 16, value: "Business Center", label: "Business Center", img: "BATHROBES" },
                //         { id: 17, value: "Gym", label: "Gym", img: "gym" },
                //         { id: 18, value: "Shopping", label: "Shopping", img: "Shopping-2" },
                //         { id: 19, value: "Swimming Pool", label: "Swimming Pool", img: "BREAKFAST" },
                //         { id: 20, value: "Sport Center", label: "Sport Center", img: "SLIPPERS" },
                //         { id: 21, value: "Spa", label: "Spa", img: "SPA" },
                //         { id: 22, value: "Sun Bed", label: "Sun Bed", img: "SUN-BED" },
                //         { id: 23, value: "Private Beach", label: "Private Beach", img: "PRIVATE-BEACH" },
                //         { id: 24, value: "Bar", label: "Bar", img: "Bar" },
                //         { id: 25, value: "Fitness Center", label: "Fitness Center", img: "PRIVATE-SWIMMING-POOL" },
                //         { id: 26, value: "Conference", label: "Conference", img: "CONFERENCE-MEETING-ROOM" },
                //         { id: 27, value: "Private Driver", label: "Private Driver", img: "Private-Driver" },
                //         { id: 28, value: "Parking", label: "Parking", img: "PARKING" },
                //         { id: 29, value: "Restaurant", label: "Restaurant", img: "RESTAURANT5" },
                //     ]
                    
                hotel_facility && hotel_facility?.map(item => (
                        <div className="form-check item-name" key={item._id}>
                            <input type="checkbox" className="form-check-input" value={item._id}
                                {...register("hotel_facilities")} onChange={(e) => handleCheckboxChange("hotel_facilities", e)} />
                            <label className="form-check-label">
                                <img src={`${BASEURL}/${item?.Icon}`} alt={item.facility} /> {item.facility}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Hotel Highlights Section (With 5 Selection Limit) */}
            <h3 className='comman-heading4 mt-0 mb-4'>Hotel Highlights</h3>
            <div className='desh-borderBox'>
                <div className='information-item'>
                {
                // [
                //         { id: 30, value: "Ideal Location", label: "Ideal Location", img: "LAUNDRY-SERVICE" },
                //         { id: 31, value: "Free Airport Transfers", label: "Free Airport Transfers", img: "BATHROBES" },
                //         { id: 32, value: "Free Parking", label: "Free Parking", img: "PARKING" },
                //         { id: 33, value: "Varied Breakfast", label: "Varied Breakfast", img: "BREAKFAST" },
                //         { id: 34, value: "Free Breakfast", label: "Free Breakfast", img: "BREAKFAST" },
                //         { id: 35, value: "High Speed Wifi", label: "High Speed Wifi", img: "WIFI" },
                //         { id: 36, value: "Concierge 24 7", label: "Concierge 24/7", img: "CONCIERGE-SERVICE" },
                //         { id: 37, value: "Fitness Center", label: "Fitness Center", img: "SUN-BED" },
                //         { id: 38, value: "Swimming Pool", label: "Swimming Pool", img: "PRIVATE-BEACH" },
                //         { id: 39, value: "Spa Service", label: "Spa Service", img: "SPA" },
                //         { id: 40, value: "Business Center", label: "Business Center", img: "PRIVATE-SWIMMING-POOL" },
                //         { id: 41, value: "Pet Friendly", label: "Pet Friendly", img: "CONFERENCE-MEETING-ROOM" },
                //         { id: 42, value: "Eco Friendly", label: "Eco Friendly", img: "Private-Driver" },
                //         { id: 43, value: "Family Friendly", label: "Family Friendly", img: "PARKING" },
                //         { id: 44, value: "Rooftop Lounge", label: "Rooftop Lounge", img: "RESTAURANT5" },
                //         { id: 45, value: "Room Service", label: "Room Service", img: "ROOM-SERVICE" },
                //         { id: 46, value: "Accessible Rooms", label: "Accessible Rooms", img: "RESTAURANT5" },
                //         { id: 47, value: "Restaurant And Bar", label: "Restaurant And Bar", img: "RESTAURANT5" },
                //         { id: 48, value: "Event Spaces", label: "Event Spaces", img: "RESTAURANT5" },
                //     ]
                hotel_highlight && hotel_highlight.map(item => (
                        <div className="form-check item-name" key={item.id}>
                            <input type="checkbox" className="form-check-input" value={item._id}
                                checked={selectedHighlights.includes(item._id)}
                                {...register("hotel_highlights")}
                                onChange={(e) => handleCheckboxChange("hotel_highlights", e)} />
                           <label className="form-check-label">
                                <img src={`${BASEURL}/${item?.Icon}`} alt={item.highlight} /> {item.highlight}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className='footer-btn text-end'>
                <Link href="/dashboard/hotel-info" className='next-btn me-auto'>Previous</Link>
                <button onClick={onSubmit} disabled={loading} className='save-btn'>Continue</button>
            </div>
        </>
    );
};

export default Facilities_Amenties;
