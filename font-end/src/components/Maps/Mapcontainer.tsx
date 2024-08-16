import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import osmProvider from "../../osm-provider";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import L from "leaflet";
import RouteMap from "./RouteMap";
import { fetchPlaceDetails, fetchPlaceDetailsWithExtras } from "../../fetchApi/fetchLocationDetails ";

const markerColors = [
  "red",
  "blue",
  "green",
  "purple",
  "orange",
  "yellow",
  "pink",
  "cyan",
];

const createNumberedIcon = (number: number, color: string) => {
  return new L.DivIcon({
    html: `<div style="background-color: ${color}; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;">${number}</div>`,
    iconSize: [30, 30],
    className: "numbered-icon",
  });
};

const MapComponent: React.FC = () => {
  const days = useSelector((state: RootState) => state.destinations.days);
  const coordinates = useSelector(
    (state: RootState) => state.destinations.selectedCityCoordinates
  );

  const [placeInfo, setPlaceInfo] = useState<{ [key: string]: any }>({});

  const position = coordinates
    ? [coordinates.lat, coordinates.lng]
    : [21.0285, 105.8542];

  useEffect(() => {
    const fetchInfo = async () => {
      if (coordinates) {
        const info = await fetchPlaceDetailsWithExtras(coordinates.lat, coordinates.lng);

        const infoMap = info.reduce((acc, curr) => {
          acc[curr.name] = curr;
          return acc;
        }, {});

        setPlaceInfo(infoMap);
      }
    };

    fetchInfo();
  }, [coordinates]);

  return (
    <MapContainer center={position} zoom={12} className="w-full h-full">
      <TileLayer
        url={osmProvider.maptiler.url}
        attribution={osmProvider.maptiler.attribution}
      />
      {days.map((day, dayIndex) =>
        day.destinations.map((destination, index) => {
          const placeDetails = placeInfo[destination.name];

          return (
            <Marker
              key={destination.name}
              position={[destination.lat, destination.lng]}
              icon={createNumberedIcon(
                index + 1,
                markerColors[dayIndex % markerColors.length]
              )}
            >
              <Popup>
                <div className="space-y-2">
                  <h2 className="font-bold text-lg">{destination.name}</h2>
                  {placeDetails && (
                    <>
                      <p><strong>Type:</strong> {placeDetails.type || "N/A"}</p>
                      {placeDetails.image && (
                        <img
                          src={placeDetails.image}
                          alt={destination.name}
                          className="w-full h-32 object-cover rounded-md"
                        />
                      )}
                      <p><strong>Coordinates:</strong> {destination.lat}, {destination.lng}</p>
                    </>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })
      )}
      <RouteMap days={days} />
    </MapContainer>
  );
};

export default MapComponent;
