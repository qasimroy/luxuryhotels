import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Replace these coordinates with the actual location's latitude and longitude


const Map = ({location,setIViewModal}) => {
  return (
    // <LoadScript googleMapsApiKey="AIzaSyAN-RY595XViAsgKD5nXRkH3zmtc6iqzjE">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px" }}
        center={location}
        zoom={15}
      >
        <Marker position={location} onClick={setIViewModal}/>
      </GoogleMap>
    // </LoadScript>
  );
};

export default Map;
