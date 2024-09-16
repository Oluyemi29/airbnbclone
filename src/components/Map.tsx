import React from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Countries } from "@/app/create/[id]/_components/GetCountries";
import { icon } from "leaflet";

type LocationValueProps = {
  locationValue: string | undefined;
};
const Map = ({ locationValue }: LocationValueProps) => {
  const longLat = Countries();
  const latLong = longLat.find((items) => {
    return items.name === locationValue;
  });
  const ICON = icon({
    iconUrl: "/remark.png",
    iconSize: [50, 50],
  });
  return (
    <MapContainer
      scrollWheelZoom={false}
      zoom={5}
      center={latLong?.latLang || [51.505, -0.09]}
      className="w-[50%] rounded-md h-[50vh]"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={latLong?.latLang || [51.505, -0.09]}
        icon={ICON}
      ></Marker>
    </MapContainer>
  );
};

export default Map;
