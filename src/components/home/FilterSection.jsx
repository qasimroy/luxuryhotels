"use client"
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles 
import CreatableSelect from "react-select/creatable";
import useRequest from "@component/hooks/UseRequest";
import { apis } from "@component/apiendpoints/api";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";


const FilterSection = () => {
  const [search, setSearch] = useState("");
  const [data, setData] =useState([])
  const [countrySearch,setCountrySearch] = useState("")
  const {request,response}=useRequest(true);
  const route = useRouter();

  const {countryData } = useSelector((state) => state.siteSetting)

  console.log("countryData",countryData)

  useEffect(()=>{
     request("GET",apis.SEARCH_HOTEL)

  },[])

  useEffect(()=>{
    
    if(response){
      setData(response?.hotels)
    }
  },[response?.hotels]);

  const filteredHotels = data?.filter((hotel) =>
    hotel.hotel_name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCountryRoute = (country)=>{
    route.push(`/luxury-hotels-resorts/country/${country}`)
  }
  
  const handleRoute =(slug)=>{
    route.push(`/hotels/${slug}`)
  }
  const filteredCountryData = countryData?.filter((country) =>
    country?.country.toLowerCase().includes(countrySearch.toLowerCase())
  );
    
  return (
    <section data-aos="fade-up" className="filter-section pt-16" >
      <div className="container">
        <form className="filter-box">

          <div className="custom-dropdown-container">
            <input className="form-control" placeholder="Hotel Name" type="text"  value={search}
             onChange={(e) => setSearch(e.target.value)} />
            {search && (
                <ul className="hotel-list">
                  {filteredHotels.map((hotel, index) => {
                    console.log("hotel: ",hotel)
                    return(
                    <li key={index} className="hotel-item border-b border-grayDark">
                      <h3 className="text-lg mb-0 uppercase h-name text-golden cursor-pointer" onClick={()=>handleRoute(hotel?.slug)}>{hotel?.hotel_name}</h3>
                      <div className="flex items-center c-name gap-2">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 384 512"
                          className="text-golden"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                        </svg>
                        {hotel?.country?.country}
                      </div>
                    </li>

                    )
                  }
                  )}
                </ul>
            )}
          </div>
          <div className="custom-dropdown-container">
          <input className="form-control" placeholder="Country" type="text" 
          value={countrySearch} 
          onChange={(e)=>setCountrySearch(e.target.value)}
          />
          {countrySearch && (
            <ul className="hotel-list">
            {filteredCountryData?.map((hotel, index) => (
              <li key={index} className="hotel-item border-b border-grayDark">
                <div className="flex items-center c-name gap-2 cursor-pointer" onClick={()=>handleCountryRoute(hotel?.country)}>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 384 512"
                    className="text-golden"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                  </svg>
                  {hotel?.country}
                </div>
              </li>
            ))}
          </ul>
          )}
          </div>
          <button type="submit" className="theme-btn with-icon" style={{ background: 'linear-gradient(to right, rgb(204, 164, 89), rgb(230, 205, 113), rgb(204, 163, 86))' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
              />
            </svg>
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default FilterSection;
