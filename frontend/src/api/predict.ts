import type { NutrientLevel } from "../data/soil";

export interface PredictionRequest {
  temperature_c: number;
  humidity_percent: number;
  rainfall_mm: number;
  ph: number;
  area_ha: number;
  nitrogen_level: NutrientLevel;
  phosphorus_level: NutrientLevel;
  potassium_level: NutrientLevel;
}

export interface PredictionResponse {
  id: string;
  output_id: string;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  temperature_c: number;
  humidity_percent: number;
  ph: number;
  rainfall_mm: number;
  area_ha: number;
  output: {
    id: string;
    recommended_crop: string;
    deficit_n_kg_ha: number;
    deficit_p_kg_ha: number;
    deficit_k_kg_ha: number;
    urea_kg_ha: number;
    dap_kg_ha: number;
    mop_kg_ha: number;
    total_cost_php: number;
    total_yield_mt: number;
    gross_revenue_php: number;
    net_profit_php: number;
  };
}

export const fetchPrediction = async (payload: PredictionRequest): Promise<PredictionResponse> => {
  const response = await fetch(`/api/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`Server Error: ${response.statusText}`)
  }

  return response.json()
}
