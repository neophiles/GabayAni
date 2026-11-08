import { OPEN_METEO_BASE_URL } from "../constants"

export interface WeatherData {
  temperature_c: any;
  humidity_percent: any;
  rainfall_mm: any;
}

async function fetchWeather(location: GeolocationCoordinates): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: location.latitude.toString(),
    longitude: location.longitude.toString(),
    current: 'temperature_2m,relative_humidity_2m,precipitation',
    timezone: 'auto',
  })

  const response = await fetch(`${OPEN_METEO_BASE_URL}?${params.toString()}`)
  if (!response.ok) {
    throw new Error("Failed to get weather. Please try again later")
  }

  const data = await response.json()
  const current = data.current || {}

  return {
    temperature_c: current.temperature_2m ?? 0.0,
    humidity_percent: current.relative_humidity_2m ?? 0.0,
    rainfall_mm: current.precipitation ?? 0.0,
  }
}

export default fetchWeather
