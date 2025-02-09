import React, { useEffect, useState } from "react";
import { Button, Modal, Input } from "antd";
import "ol/ol.css";
import { Map } from "ol";
import TileLayer from "ol/layer/Tile";
import { XYZ } from "ol/source";
import View from "ol/View";
import { fromLonLat, toLonLat } from "ol/proj";
import { Point } from "ol/geom";
import { Feature } from "ol";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Circle as CircleStyle, Fill, Style } from "ol/style";
import { AddressPickerProps } from "../interfaces/userInterface";

const GoogleMap: React.FC<AddressPickerProps> = ({
  open,
  address,
  handleClose,
  setAddress,
}) => {
  const fetchAddress = async (lat: number, lon: number) => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`;

    console.log("Fetching address from:", url);

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === "OK") {
        const formattedAddress = data.results[0].formatted_address;
        setAddress(formattedAddress);
      } else {
        setAddress("Address not found");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress("Error fetching address");
    }
  };

  useEffect(() => {
    if (!open) return;

    const googleLayer = new TileLayer({
      source: new XYZ({
        url: "https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}",
      }),
    });

    const map = new Map({
      target: "map",
      layers: [googleLayer],
      view: new View({
        center: fromLonLat([79.9, 6.9271]),
        zoom: 12,
      }),
    });

    const marker = new Feature(new Point(fromLonLat([79.9, 6.9271])));
    marker.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 5,
          fill: new Fill({ color: "red" }),
        }),
      })
    );

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [marker],
      }),
    });

    map.addLayer(vectorLayer);

    map.on("click", (event) => {
      const coordinates = event.coordinate;
      const [lon, lat] = toLonLat(coordinates);
      fetchAddress(lat, lon);
      marker.setGeometry(new Point(coordinates));
    });

    return () => map.setTarget(undefined);
  }, [open]);

  return (
    <Modal
      title="Pick a Location"
      open={open}
      footer={null}
      onCancel={handleClose}
    >
      <div>
        <div>
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Click on the map to get the address"
            style={{ width: "100%", marginBottom: "8px" }}
          />
        </div>
        <div id="map" style={{ width: "50vw", height: "50vh" }}></div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "16px",
        }}
      >
        <Button key="ok" type="primary" onClick={handleClose}>
          Add
        </Button>
      </div>
    </Modal>
  );
};

export default GoogleMap;
