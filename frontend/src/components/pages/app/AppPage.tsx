import { useState } from "react";
import { useNavigate } from "react-router";
import WeatherSection from "./WeatherSection";
import Page from "../../common/Page";
import SoilSection from "./SoilSection";
import FarmSection from "./FarmSection";
import Button from "../../common/Button";
import Text from "../../common/Text";
import useModal from "../../../stores/modal";
import PrerequisiteModal from "./PrerequisiteModal";
import useWeather from "../../../hooks/useWeather";
import Spinner from "../../common/Spinner";
import { fetchPrediction } from "../../../api/predict";
import type { NutrientLevel, NutrientType } from "../../../data/soil";

export default function AppPage() {
  const navigate = useNavigate();
  const { isOpen } = useModal()

  const { weather } = useWeather()
  const [selectedNutrients, setSelectedNutrients] = useState<Record<NutrientType, NutrientLevel | null>>({
    Nitrogen: null,
    Phosphorus: null,
    Potassium: null,
  });
  const [selectedPhValue, setSelectedPhValue] = useState<number | null>(null);
  const [selectedPhOptionId, setSelectedPhOptionId] = useState<string | null>(null);
  const [farmArea, setFarmArea] = useState<number | "">("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false)

  const handleNutrientChange = (nutrient: NutrientType, level: NutrientLevel) => {
    setSelectedNutrients((prev) => ({
      ...prev,
      [nutrient]: level,
    }));
  };

  const handlePhChange = (value: number, optionId: string) => {
    setSelectedPhValue(value);
    setSelectedPhOptionId(optionId);
  };

  const handleAnalyze = async () => {
    if (!weather || Object.values(selectedNutrients).includes(null) || selectedPhValue === null || farmArea === "" || farmArea <= 0) {
      alert("Please select all nutrient levels, a pH level, and enter a valid farm area.");
      return;
    }
    
    setIsAnalyzing(true)
    navigate("/app/loading");

    try {
      const payload = {
        temperature_c: weather.temperature_c,
        humidity_percent: weather.humidity_percent,
        rainfall_mm: weather.rainfall_mm,
        ph: selectedPhValue,
        area_ha: farmArea,
        nitrogen_level: selectedNutrients.Nitrogen!,
        phosphorus_level: selectedNutrients.Phosphorus!,
        potassium_level: selectedNutrients.Potassium!,
      };

      const prediction = await fetchPrediction(payload);
      navigate("/app/results", { state: { result: prediction } });
      console.log("Input:", payload);
      
    } catch (error) {
      console.error(error);
      navigate("/app");
      alert("Prediction failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Page>
      {isOpen && <PrerequisiteModal />}
      <WeatherSection />
      <SoilSection
        selectedNutrients={selectedNutrients}
        onNutrientChange={handleNutrientChange}
        selectedPhOptionId={selectedPhOptionId}
        onPhChange={handlePhChange}
      />
      <FarmSection
        area={farmArea}
        onAreaChange={setFarmArea}
      />
      <Button
        onClick={handleAnalyze}
        className="w-full py-2 flex items-center justify-center bg-primary text-primary-content font-medium rounded-lg"
      >
        {isAnalyzing
          ? <Spinner />
          : <Text size="lg">Analyze</Text>
        }
      </Button>
    </Page>
  )
}
