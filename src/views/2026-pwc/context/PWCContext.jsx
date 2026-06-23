import React, { createContext, useContext, useEffect, useState } from 'react'
import { getPWC2026 } from '../utils/getPWC2026.js'
import { PWC_2026 } from '../utils/pwcConfig.js'

export const PWCContext = createContext(null)
export const usePWC = () => useContext(PWCContext)

const nowCentral = () =>
  new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })

export const PWCProvider = ({ children }) => {
  const [data, setData] = useState({
    athletes: [],
    topN: 3,
    date: nowCentral(),
    isLoading: true,
    error: null,
  })

  const fetchData = async () => {
    try {
      const { athletes, topN } = await getPWC2026()
      setData({
        athletes,
        topN,
        date: nowCentral(),
        isLoading: false,
        error: null,
      })
    } catch (error) {
      setData((prev) => ({
        ...prev,
        date: nowCentral(),
        isLoading: false,
        error,
      }))
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, PWC_2026.REFRESH_MS)
    return () => clearInterval(interval)
  }, [])

  return <PWCContext.Provider value={{ data }}>{children}</PWCContext.Provider>
}
