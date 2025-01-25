import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const StadiumMap = () => {
  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer center={[30.6108, -96.3401]} zoom={16} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[30.6108, -96.3401]}>
          <Popup>
            Kyle Field <br /> Home of the Aggies!
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default StadiumMap;
