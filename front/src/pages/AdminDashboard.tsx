import React, { useState } from 'react';
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Définition des interfaces
interface Stat {
    title: string;
    value: string;
    unit: string;
    trend: 'up' | 'down' | 'neutral';
    status: 'danger' | 'warning' | 'success';
}

interface Pollutant {
    date: string;
    CO2: number;
    NOx: number;
    SO2: number;
    "Particules fines": number;
}

const stats: Stat[] = [
    { title: "Émissions de CO2", value: "1250", unit: "tonnes", trend: "up", status: "danger" },
    { title: "Consommation d'eau", value: "3.2", unit: "millions m³", trend: "down", status: "success" },
    { title: "Déchets produits", value: "450", unit: "tonnes", trend: "up", status: "warning" },
    { title: "Qualité de l'air", value: "65", unit: "AQI", trend: "neutral", status: "warning" },
    { title: "Bruit", value: "72", unit: "dB", trend: "up", status: "danger" },
    { title: "Biodiversité marine", value: "230", unit: "espèces", trend: "down", status: "danger" },
];

const pollutants: string[] = ["CO2", "NOx", "SO2", "Particules fines"];

const pollutantData: Pollutant[] = [
    { date: '2023-01-01', CO2: 1000, NOx: 50, SO2: 30, "Particules fines": 20 },
    { date: '2023-02-01', CO2: 1200, NOx: 55, SO2: 35, "Particules fines": 22 },
    { date: '2023-03-01', CO2: 1100, NOx: 52, SO2: 32, "Particules fines": 21 },
    { date: '2023-04-01', CO2: 1300, NOx: 58, SO2: 38, "Particules fines": 24 },
    { date: '2023-05-01', CO2: 1250, NOx: 56, SO2: 36, "Particules fines": 23 },
];

const statusColors: { [key: string]: string } = {
    danger: "text-red-600",
    warning: "text-yellow-600",
    success: "text-green-600",
};

const trendIcons: { [key: string]: JSX.Element } = {
    up: <ArrowUpIcon className="w-4 h-4" />,
    down: <ArrowDownIcon className="w-4 h-4" />,
    neutral: <MinusIcon className="w-4 h-4" />,
};

export default function AdminDashboard() {
    const [selectedPollutant, setSelectedPollutant] = useState<string>(pollutants[0]);
    const [startDate, setStartDate] = useState<string>('2023-01-01');
    const [endDate, setEndDate] = useState<string>('2023-05-01');

    return (
        <div className="min-h-screen bg-white">
            <header className="bg-white text-blue-800 p-4 shadow-sm">
                <div className="container mx-auto flex items-center">
                    <svg className="w-10 h-10 mr-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 19V5H21V19H3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 9H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <h1 className="text-2xl font-bold">Port Maritime Fos-Marseille - Tableau de Bord Administrateur</h1>
                </div>
            </header>

            <main className="container mx-auto p-4">
                <div className="flex flex-wrap -mx-2">
                    {stats.map((stat, index) => (
                        <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-2">
                            <div className="bg-gray-100 rounded-lg shadow-sm p-4 h-full">
                                <h2 className="text-lg font-semibold text-gray-700 mb-2">{stat.title}</h2>
                                <div className="flex items-baseline">
                                    <span className="text-3xl font-bold text-blue-800">{stat.value}</span>
                                    <span className="ml-1 text-gray-500">{stat.unit}</span>
                                </div>
                                <div className={`flex items-center mt-2 ${statusColors[stat.status]}`}>
                                    {trendIcons[stat.trend]}
                                    <span className="ml-1 text-sm">
                                        {stat.trend === 'up' ? 'Augmentation' : stat.trend === 'down' ? 'Diminution' : 'Stable'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 bg-gray-100 rounded-lg shadow-sm p-4">
                    <h2 className="text-xl font-bold text-gray-700 mb-4">Évolution des polluants</h2>
                    <div className="flex flex-wrap items-center mb-4">
                        <div className="w-full sm:w-auto mb-2 sm:mb-0 mr-4">
                            <label htmlFor="pollutant" className="block text-sm font-medium text-gray-700 mb-1">Polluant</label>
                            <select
                                id="pollutant"
                                value={selectedPollutant}
                                onChange={(e) => setSelectedPollutant(e.target.value)}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            >
                                {pollutants.map((pollutant) => (
                                    <option key={pollutant} value={pollutant}>{pollutant}</option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full sm:w-auto mb-2 sm:mb-0 mr-4">
                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
                            <input
                                type="date"
                                id="startDate"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            />
                        </div>
                        <div className="w-full sm:w-auto">
                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
                            <input
                                type="date"
                                id="endDate"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                            />
                        </div>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={pollutantData}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey={selectedPollutant} stroke="#8884d8" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </main>
        </div>
    );
}
