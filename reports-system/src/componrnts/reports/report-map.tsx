import React, { useState } from "react";
import Map, { Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

interface ReportMapProps {
  latitude: number;
  longitude: number;
  onLocationSelect?: (lat: number, lng: number) => void;
  interactive?: boolean;
  height?: string;
  zoom?: number;
  markerColor?: string;
}

const ReportMap: React.FC<ReportMapProps> = ({
  latitude,
  longitude,
  onLocationSelect,
  interactive = false,
  height = "300px",
  zoom = 14,
  markerColor = "red",
}) => {
  const [selectedLocation, setSelectedLocation] = useState({
    lat: latitude,
    lng: longitude,
  });

  const handleMapClick = (event: { lngLat: { lng: number; lat: number } }) => {
    if (!interactive) return;

    const { lng, lat } = event.lngLat;
    setSelectedLocation({ lat, lng });

    if (onLocationSelect) {
      onLocationSelect(lat, lng);
    }
  };

  return (
    <div style={{ width: "100%", height }}>
      <Map
        initialViewState={{
          longitude: selectedLocation.lng,
          latitude: selectedLocation.lat,
          zoom,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        onClick={handleMapClick}
        cursor={interactive ? "pointer" : "grab"}
      >
        <Marker
          longitude={selectedLocation.lng}
          latitude={selectedLocation.lat}
          color={markerColor}
        />
      </Map>
      {interactive && (
        <div
          style={{
            marginTop: "8px",
            fontSize: "12px",
            color: "#666",
          }}
        >
          Click on map to select location
        </div>
      )}
    </div>
  );
};

export default ReportMap;
