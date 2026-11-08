import { useEffect, useState } from "react"
import fetchWeather, { type WeatherData } from "../api/weather"
import useUserLocation from "./useUserLocation"

const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData>()
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>()
  const { getLocation } = useUserLocation();

  const getWeather = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const location = await getLocation()
      const weatherData = await fetchWeather(location)
      setWeather(weatherData)
    } catch (err: any) {
      if (err instanceof Error && err.message) {
        setError(err.message)
      } else {
        setError("Failed to get weather.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getWeather()
  }, [])

  return { weather, error, isLoading, getWeather }
} 

export default useWeather
