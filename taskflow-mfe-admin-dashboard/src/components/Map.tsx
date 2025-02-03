import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 40.748817,
  lng: -73.985428,
};

const GoogleMapComponent: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate the map load event
    setIsLoaded(true);
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyArBG08oaUyHS4NVqY1llB5K8v6aTSu05U">
      {isLoaded && (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          <Marker position={center} />
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default GoogleMapComponent;
