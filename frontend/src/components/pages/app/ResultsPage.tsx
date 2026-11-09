import Page from "../../common/Page";
import Text from "../../common/Text";
import { useEffect } from "react";
import { useLocation } from "react-router";
import ResultSection from "./ResultSection";
import type { PredictionResponse } from "../../../api/predict";

interface ResultsLocationState {
  result?: PredictionResponse;
}

export default function ResultsPage() {
  const location = useLocation();
  const state = location.state as ResultsLocationState | null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Page>
      {state?.result ? (
        <ResultSection data={state.result} />
      ) : (
        <>
          <Text as="h1" size="2xl">
            Results
          </Text>
          <Text>
            No analysis results are available yet. Please analyze your farm first.
          </Text>
        </>
      )}
    </Page>
  );
}
