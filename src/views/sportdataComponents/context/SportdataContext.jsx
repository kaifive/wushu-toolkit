import React, { createContext, useContext, useEffect, useState } from 'react'

export const SportdataContext = createContext(null)

export const useSportdata = () => useContext(SportdataContext)

import { getData } from '../utils/getData';
import { COMPETITION_CONFIG } from '../utils/competitionConfig';

import latestPhoenixSnapshot from "../utils/snapshots/2025-phoenix-2025-06-13T20-57-34-230Z.json"
import latestAdults25Snapshot from "../utils/snapshots/2025-adults-2025-06-13T20-55-51-605Z.json"

import { getAdults2025 } from '../utils/getAdults2025.js'

export const SportdataProvider = ({ competition, children }) => {
    const [filters, setFilters] = useState(() => {
        const stored = localStorage.getItem(`WushuToolkit-Sportdata-${competition}`);
        return stored ? JSON.parse(stored) : {
            genderFilter: "",
            categoryFilter: "",
            eventFilter: "",
            athleteFilter: "",
        };
    });

    const [data, setData] = useState({
        athleteData: null,
        date: new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }),
        isLoading: true,
        error: null,
    });

    const fetchData = async () => {
        setData(prev => ({
            ...prev,
            error: null,
        }));

        try {
            const adults2025 = await getAdults2025(COMPETITION_CONFIG[competition]);

            const dataMap = {
                "2025-adults": adults2025,
                "2025-phoenix": latestPhoenixSnapshot
            };

            const athleteData = dataMap[competition];

            setData({
                athleteData,
                date: new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }),
                isLoading: false,
                error: null
            });
        } catch (error) {
            setData({
                athleteData: null,
                date: new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }),
                isLoading: false,
                error,
            });
        }
    };

    useEffect(() => {
        const stored = localStorage.getItem(`WushuToolkit-Sportdata-${competition}`);
        const initialFilters = stored ? JSON.parse(stored) : {
            genderFilter: "",
            categoryFilter: "",
            eventFilter: "",
            athleteFilter: "",
        };
        setFilters(initialFilters);

        fetchData();

        // Set interval to refetch every 1 minute
        const interval = setInterval(fetchData, 60_000); // 60,000 ms = 1 min

        return () => clearInterval(interval); // cleanup on unmount
    }, [competition]);

    return (
        <SportdataContext.Provider value={{ data, filters, setFilters }}>
            {children}
        </SportdataContext.Provider>
    );
};