import React, { createContext, useContext, useEffect, useState } from 'react'

export const SportdataContext = createContext(null)

export const useSportdata = () => useContext(SportdataContext)

import { getData } from '../utils/getData';
import { COMPETITION_CONFIG } from '../utils/competitionConfig';

import latestPhoenixSnapshot from "../utils/snapshots/2025-phoenix-2025-06-13T20-57-34-230Z.json"
import latestAdults25Snapshot from "../utils/snapshots/2025-adults-2025-06-13T20-55-51-605Z.json"


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
    })

    useEffect(() => {
        const fetchData = async () => {
            setData(prev => ({
                ...prev,
                isLoading: true,
                error: null,
            }));

            try {
                const SNAPSHOTS = {
                    "2025-adults": latestAdults25Snapshot,
                    "2025-phoenix": latestPhoenixSnapshot
                }

                const athleteData = SNAPSHOTS[competition];

                //const athleteData = await getData(COMPETITION_CONFIG[competition]);

                setData({
                    athleteData,
                    date: new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }),
                    isLoading: false,
                    error: null
                })
            } catch (error) {
                setData({
                    athleteData: null,
                    date: new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }),
                    loading: false,
                    error,
                })
            }
        }

        const stored = localStorage.getItem(`WushuToolkit-Sportdata-${competition}`);
        const initialFilters = stored ? JSON.parse(stored) : {
            genderFilter: "",
            categoryFilter: "",
            eventFilter: "",
            athleteFilter: "",
        };
        setFilters(initialFilters);

        fetchData()
    }, [competition]);

    return (
        <SportdataContext.Provider value={{ data, filters, setFilters }}>
            {children}
        </SportdataContext.Provider>
    )
}
