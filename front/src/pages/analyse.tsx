import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface Station {
  id_station: string;
  nom_station: string;
  departement_id: string;
  adresse: string;
  latitude: number;
  longitude: number;
  variables: {
    [key: string]: string;
  };
}

// Sample station data
const stationData: Station[] = [
  {
    id_station: "FR03053",
    nom_station: "Marseille L2 Kaddouz",
    departement_id: "13",
    adresse: "SEM rue Charles Kaddouz",
    latitude: 43.308489,
    longitude: 5.425306,
    variables: {
   
      "12": "NOx",
      "24": "PM10",
      "G6": "BC",
      "GA": "BCwb",
      "GB": "BCff",
    },
  },
  {
    id_station: "FR03054",
    nom_station: "Lyon Centre",
    departement_id: "69",
    adresse: "Rue de la République",
    latitude: 45.764,
    longitude: 4.8357,
    variables: {
      "03": "NO2",
      "12": "NOx",
      "24": "PM10",
      "G6": "BC",
      "GA": "BCwb",
      "GB": "BCff",
    },
  },
  {
    id_station: "FR03055",
    nom_station: "Paris La Défense",
    departement_id: "75",
    adresse: "Place de La Défense",
    latitude: 48.8908,
    longitude: 2.2366,
    variables: {
      "02": "NO",
      "03": "NO2",
      "12": "NOx",
      "GB": "BCff",
    },
  },
];

const createCustomMarkerIcon = (pollutant: string) => {
  const colors: { [key: string]: string } = {
    "NO": "#3b82f6",
    "NO2": "#22c55e",
    "NOx": "#f97316",
    "PM10": "#ef4444",
    "BC": "#a855f7",
    "BCwb": "#4b5563",
    "BCff": "#fbbf24",
  };

  return L.divIcon({
    className: "custom-icon",
    html: `<div style="background-color:${colors[pollutant]}; width: 20px; height: 20px; border-radius: 50%;"></div>`,
  });
};

export default function Analyse() {
  const [position] = useState<[number, number]>([46.603354, 1.888334]);
  const [selectedPollutant, setSelectedPollutant] = useState<string>("ALL");
  
  const uniquePollutants = Array.from(
    new Set(stationData.flatMap(station => Object.values(station.variables)))
  );

  const filteredStationData = selectedPollutant === "ALL"
    ? stationData
    : stationData.filter(station => Object.values(station.variables).includes(selectedPollutant));

  const chartData = filteredStationData.map((station) => {
    const pollutantCount = Object.values(station.variables).reduce(
      (acc: { [key: string]: number }, pollutant) => {
        acc[pollutant] = (acc[pollutant] || 0) + 1;
        return acc;
      },
      {}
    );
    return { station: station.nom_station, ...pollutantCount };
  });

  return (
    <div className="flex w-full">
      <div className="w-[60%] p-4 bg-white rounded shadow-lg">
        <h1 className="text-3xl font-bold text-black mb-4">Carte de la Pollution</h1>
        

        <div className="mb-4">
          <label className="mr-2 text-black">Filtrer par polluant:</label>
          <select 
            className="border border-gray-300 rounded p-2"
            value={selectedPollutant}
            onChange={(e) => setSelectedPollutant(e.target.value)}
          >
            <option value="ALL">Tous</option>
            {uniquePollutants.map(pollutant => (
              <option key={pollutant} value={pollutant}>
                {pollutant}
              </option>
            ))}
          </select>
        </div>

        <MapContainer center={position} zoom={6} style={{ height: "80vh", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {filteredStationData.map((station) =>
            Object.entries(station.variables).map(([key, pollutant]) => (
              <Marker
                key={station.id_station + key}
                position={[station.latitude, station.longitude]}
                icon={createCustomMarkerIcon(pollutant)}
              >
                <Popup>
                  <div>
                    <h3 className="text-lg font-semibold">{station.nom_station}</h3>
                    <p>Polluant: {pollutant}</p>
                    <p>Adresse: {station.adresse}</p>
                    {Object.entries(station.variables).map(([varKey, varValue]) => (
                      <p key={varKey}>
                        {varKey}: {varValue}
                      </p>
                    ))}
                  </div>
                </Popup>
              </Marker>
            ))
          )}
        </MapContainer>
      </div>

      <div className="w-[40%] p-4 text-white rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Graphiques</h2>
        <BarChart
          width={500}
          height={300}
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="station" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.keys(chartData[0]).slice(1).map((pollutant) => (
            <Bar key={pollutant} dataKey={pollutant} fill={createCustomMarkerIcon(pollutant).options.className} />
          ))}
        </BarChart>
      </div>
    </div>
  );
}
