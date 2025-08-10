"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { useEffect } from "react";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type LatLng = { lat: number; lng: number };

type LocationPickerProps = {
  value: LatLng;
  onChange: (val: LatLng) => void;
};

const LocationMarker = ({ value, onChange }: LocationPickerProps) => {
  useMapEvents({
    click: ({ latlng }) => onChange(latlng),
  });

  return (
    <Marker
      position={[value.lat, value.lng]}
      icon={markerIcon}
      draggable
      eventHandlers={{
        dragend: (e) => {
          const { lat, lng } = e.target.getLatLng();
          onChange({ lat, lng });
        },
      }}
    />
  );
};

const Recenter = ({ lat, lng }: LatLng) => {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng], map.getZoom());
  }, [lat, lng, map]);

  return null;
};

const LocationPicker = ({ value, onChange }: LocationPickerProps) => {
  const center: [number, number] = [value.lat || 23.8103, value.lng || 90.4125];

  return (
    <div className="w-full h-full rounded overflow-hidden">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker value={value} onChange={onChange} />
        <Recenter lat={value.lat} lng={value.lng} />
      </MapContainer>
    </div>
  );
};

export default LocationPicker;
