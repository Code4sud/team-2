import React, { useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface Station {
  id_station: string
  nom_station: string
  departement_id: string
  adresse: string
  latitude: number
  longitude: number
  variables: {
    [key: string]: string
  }
}

const stationData: Station[] = [
  {
    id_station: "FR03053",
    nom_station: "Marseille L2 Kaddouz",
    departement_id: "13",
    adresse: "SEM rue Charles Kaddouz",
    latitude: 43.308489,
    longitude: 5.425306,
    variables: {
      "02": "NO",
      "03": "NO2",
      "12": "NOx",
      "24": "PM10",
      "G6": "BC",
      "GA": "BCwb",
      "GB": "BCff",
    },
  },
  {
    id_station: "FR03058",
    nom_station: "Port de Fos-sur-Mer",
    departement_id: "13",
    adresse: "Fos-sur-Mer, Bouches-du-Rhône",
    latitude: 43.4442,
    longitude: 4.8892,
    variables: {
      "02": "NO",
      "03": "NO2",
      "12": "NOx",
      "24": "PM10",
      "G6": "BC",
      "GA": "BCwb",
      "GB": "BCff",
    },
  },
]

const createCustomMarkerIcon = (pollutant: string) => {
  const colors: { [key: string]: string } = {
    "NO": "#3b82f6",
    "NO2": "#22c55e",
    "NOx": "#f97316",
    "PM10": "#ef4444",
    "BC": "#a855f7",
    "BCwb": "#4b5563",
    "BCff": "#fbbf24",
  }

  return L.divIcon({
    className: "custom-icon",
    html: `<div style="background-color:${colors[pollutant]}; width: 20px; height: 20px; border-radius: 50%;"></div>`,
  })
}

const CenterMap = ({ stations }: { stations: Station[] }) => {
  const map = useMap()
  const bounds = L.latLngBounds(stations.map(station => [station.latitude, station.longitude]))
  map.fitBounds(bounds)
  return null
}

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`bg-white shadow-md rounded-lg overflow-hidden ${className}`}>
    {children}
  </div>
)

const CardHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="px-6 py-4 border-b border-gray-200">{children}</div>
)

const CardTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-xl font-semibold text-gray-800">{children}</h2>
)

const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="p-6">{children}</div>
)

const Select: React.FC<{
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
}> = ({ value, onChange, options }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
)

export default function Analyse() {
  const [position] = useState<[number, number]>([43.3753, 5.1577])
  const [selectedPollutant, setSelectedPollutant] = useState<string>("ALL")
  
  const uniquePollutants = Array.from(
    new Set(stationData.flatMap(station => Object.values(station.variables)))
  )

  const filteredStationData = selectedPollutant === "ALL"
    ? stationData
    : stationData.filter(station => Object.values(station.variables).includes(selectedPollutant))

  const chartData = filteredStationData.map((station) => {
    const pollutantCount = Object.values(station.variables).reduce(
      (acc: { [key: string]: number }, pollutant) => {
        acc[pollutant] = (acc[pollutant] || 0) + 1
        return acc
      },
      {}
    )
    return { station: station.nom_station, ...pollutantCount }
  })

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Analyse de la Pollution</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Carte de la Pollution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Select
                value={selectedPollutant}
                onChange={setSelectedPollutant}
                options={[
                  { value: "ALL", label: "Tous les polluants" },
                  ...uniquePollutants.map(pollutant => ({ value: pollutant, label: pollutant }))
                ]}
              />
            </div>
            <div className="h-[60vh] w-full rounded-lg overflow-hidden">
              <MapContainer center={position} zoom={10} style={{ height: "100%", width: "100%" }}>
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
                <CenterMap stations={filteredStationData} />
              </MapContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Graphique des Polluants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[60vh]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="station" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {Object.keys(chartData[0]).slice(1).map((pollutant) => (
                    <Bar key={pollutant} dataKey={pollutant} fill={createCustomMarkerIcon(pollutant)?.options.html.match(/background-color:(.*?);/)?.[1] || '#000'} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}