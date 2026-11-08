const INITIAL_INPUTS = {
  nitrogen: 90,
  phosphorus: 42,
  potassium: 43,
  temperature_c: 21.0,
  humidity_percent: 82.0,
  ph: 6.5,
  rainfall_mm: 200.0,
  area_ha: 1.0,
}

const MAX_PHONE_SCREEN_WIDTH = 426

const OPEN_METEO_BASE_URL = "https://api.open-meteo.com/v1/forecast"

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

export {
  INITIAL_INPUTS,
  MAX_PHONE_SCREEN_WIDTH,
  OPEN_METEO_BASE_URL,
  API_BASE_URL
}