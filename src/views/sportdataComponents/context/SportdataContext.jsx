import React, { createContext, useContext, useEffect, useState } from 'react';
import { COMPETITION_CONFIG } from '../utils/competitionConfig';
import latestPhoenixSnapshot from "../utils/snapshots/2025-phoenix-2025-06-13T20-57-34-230Z.json";
import latestAdults25Snapshot from "../utils/snapshots/2025-adults-2025-06-13T20-55-51-605Z.json";
import { getAdults2025 } from '../utils/getAdults2025.js';

export const SportdataContext = createContext(null);
export const useSportdata = () => useContext(SportdataContext);

const getDefaultFilters = () => ({
  genderFilter: "",
  categoryFilter: "",
  eventFilter: "",
  athleteFilter: "",
});

const getStoredFilters = (competition) => {
  try {
    const stored = localStorage.getItem(`WushuToolkit-Sportdata-${competition}`);
    const parsed = JSON.parse(stored);
    if (parsed && typeof parsed === 'object') {
      return parsed;
    }
  } catch (err) {
    console.warn("Failed to parse stored filters:", err);
  }
  return getDefaultFilters();
};

export const SportdataProvider = ({ competition, children }) => {
  const [filters, setFilters] = useState(() => getStoredFilters(competition));

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
        "2025-phoenix": latestPhoenixSnapshot,
      };

      const athleteData = dataMap[competition];

      setData({
        athleteData,
        date: new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }),
        isLoading: false,
        error: null,
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
    setFilters(getStoredFilters(competition));
    fetchData();

    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [competition]);

  const updateFilters = (newFilters) => {
    const merged = {
      ...filters,
      ...newFilters,
    };
    setFilters(merged);
    localStorage.setItem(`WushuToolkit-Sportdata-${competition}`, JSON.stringify(merged));
  };

  return (
    <SportdataContext.Provider value={{ data, filters, setFilters: updateFilters }}>
      {children}
    </SportdataContext.Provider>
  );
};
