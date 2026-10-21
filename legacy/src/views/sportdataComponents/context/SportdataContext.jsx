import React, { createContext, useContext, useEffect, useState } from 'react';
import { COMPETITION_CONFIG } from '../utils/competitionConfig';
import latestPhoenixSnapshot from "../utils/snapshots/2025-phoenix-2025-06-13T20-57-34-230Z.json";
import latestAdults25Snapshot from "../utils/snapshots/tempadults2025-2025-08-04T16-02-48-343Z.json";
import juniors2025 from "../../2025-junior-team-trials/scripts/Juniors2025.json"
import { getAdults2025 } from '../utils/getAdults2025.js';
import { getData } from '../utils/getData.js';
import { getJuniors2025 } from '../utils/getJuniors2025.js';

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
      const juniors2025live = await getJuniors2025(COMPETITION_CONFIG[competition]);

      const dataMap = {
        "2025-adults": latestAdults25Snapshot,
        "2025-phoenix": latestPhoenixSnapshot,
        "2025-juniors": juniors2025live,
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
