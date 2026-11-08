import Section from "../../common/Section";
import Text from "../../common/Text";
import Widget from "../../common/Widget";
import Divider from "../../layout/Divider";
import type { PredictionResponse } from "../../../api/predict";

interface ResultSectionProps {
  data: PredictionResponse;
}

export default function ResultSection({ data }: ResultSectionProps) {
  const { output } = data;

  const formatPHP = (amount: number) =>
    new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(amount)

  return (
    <Section>
      <Text as="h2" size="xl">
        Analysis Results
      </Text>
      
      <Widget className="flex flex-col gap-6 bg-primary/20 border-primary/50">
        <div className="text-center">
          <Text size="sm" className="text-base-content-muted uppercase tracking-widest">
            Recommended Crop
          </Text>
          <Text size="3xl" className="font-black text-primary capitalize mt-1">
            {output.recommended_crop}
          </Text>
        </div>

        <Divider className="text-primary/10" />

        <div className="flex flex-col gap-4">
          <Text size="lg" className="font-bold">Fertilizer Plan</Text>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-base-100 p-3 rounded-lg shadow-sm border border-base-200">
              <Text size="sm" className="text-base-content-muted">Urea</Text>
              <Text size="xl" className="font-bold">{output.urea_kg_ha}</Text>
              <Text size="sm">kg/ha</Text>
            </div>
            <div className="bg-base-100 p-3 rounded-lg shadow-sm border border-base-200">
              <Text size="sm" className="text-base-content-muted">DAP</Text>
              <Text size="xl" className="font-bold">{output.dap_kg_ha}</Text>
              <Text size="sm">kg/ha</Text>
            </div>
            <div className="bg-base-100 p-3 rounded-lg shadow-sm border border-base-200">
              <Text size="sm" className="text-base-content-muted">MOP</Text>
              <Text size="xl" className="font-bold">{output.mop_kg_ha}</Text>
              <Text size="sm">kg/ha</Text>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Text size="lg" className="font-bold">Financial Projections</Text>
          <div className="flex flex-col gap-2 bg-base-100 p-4 rounded-lg shadow-sm border border-base-200">
            <div className="flex justify-between items-center">
              <Text>Estimated Yield:</Text>
              <Text className="font-medium">{output.total_yield_mt} MT</Text>
            </div>
            <div className="flex justify-between items-center">
              <Text>Fertilizer Cost:</Text>
              <Text className="font-medium">-{formatPHP(output.total_cost_php)}</Text>
            </div>
            <div className="flex justify-between items-center">
              <Text>Gross Revenue:</Text>
              <Text className="font-medium">{formatPHP(output.gross_revenue_php)}</Text>
            </div>
            <Divider className="my-1" />
            <div className="flex justify-between items-center">
              <Text size="xl" className="font-bold">Net Profit:</Text>
              <Text size="xl" className="font-black text-primary">{formatPHP(output.net_profit_php)}</Text>
            </div>
          </div>
        </div>

      </Widget>
    </Section>
  )
}
