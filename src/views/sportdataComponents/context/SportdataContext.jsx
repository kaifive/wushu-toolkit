import React, { createContext, useContext, useEffect, useState } from 'react'

export const SportdataContext = createContext(null)

export const useSportdata = () => useContext(SportdataContext)

export const SportdataProvider = ({ competition, getData, children }) => {
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
                const athleteData = await getData();

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
