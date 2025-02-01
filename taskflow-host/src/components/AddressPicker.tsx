import React, { useState, useRef } from "react";
import { Modal, Button, Input, Tooltip } from "antd";
import { PushpinOutlined } from "@ant-design/icons";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface AddressPickerProps {
  open: boolean;
  handleClose: () => void;
  setAddress: (address: string) => void;
}

const AddressPicker: React.FC<AddressPickerProps> = ({
  open,
  handleClose,
  setAddress,
}) => {
  const [location, setLocation] = useState<string>("");
  const [marker, setMarker] = useState<any>(null);
  const [map, setMap] = useState<any>(null);

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  };

  // Handle map click event to update marker and location
  const handleMapClick = (event: any) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const latLng = { lat, lng };
    setMarker(latLng);
    getAddressFromLatLng(lat, lng);
  };

  // Get address from latLng using Google Maps Geocoder API
  const getAddressFromLatLng = (lat: number, lng: number) => {
    if (window.google) {
      const geocoder = new window.google.maps.Geocoder();
      const latLng = new window.google.maps.LatLng(lat, lng);
      geocoder.geocode({ location: latLng }, (results: any, status: any) => {
        if (status === "OK" && results[0]) {
          const address = results[0].formatted_address;
          setLocation(address); // Set address to state
        } else {
          setLocation("Address not found");
        }
      });
    }
  };

  const handleAdd = () => {
    setAddress(location); // Send the address back to the parent component
    handleClose(); // Close the modal
  };

  return (
    <Modal
      open={open}
      title="Please pin the location"
      onCancel={handleClose}
      footer={[
        <Button type="primary" onClick={handleAdd} disabled={!location}>
          Add
        </Button>,
      ]}
    >
      <div style={{ marginBottom: "10px" }}>
        <Input
          value={location}
          placeholder="Picked location"
          readOnly
          suffix={
            <Tooltip title="Selected Address">
              <PushpinOutlined style={{ color: "rgba(0,0,0,.45)" }} />
            </Tooltip>
          }
        />
      </div>

      {/* LoadScript ensures the Maps API is loaded before rendering GoogleMap */}
      <LoadScript
        googleMapsApiKey="AIzaSyArBG08oaUyHS4NVqY1llB5K8v6aTSu05U"
        libraries={["places"]}
      >
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={15}
          center={{ lat: 6.927079, lng: 79.861243 }} // Default location (Sri Lanka)
          onLoad={(map) => setMap(map)}
          onClick={handleMapClick} // Handle map click
        >
          {marker && <Marker position={marker} />}
        </GoogleMap>
      </LoadScript>
    </Modal>
  );
};

export default AddressPicker;
