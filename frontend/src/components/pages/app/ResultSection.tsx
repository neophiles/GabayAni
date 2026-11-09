import Section from "../../common/Section";
import Text from "../../common/Text";
import Widget from "../../common/Widget";
import Button from "../../common/Button";
import Divider from "../../layout/Divider";
import type { PredictionResponse } from "../../../api/predict";
import BagIcon from "../../../assets/icons/BagyIcon.svg";
import DocumentIcon from "../../../assets/icons/DocIcon.svg";
import LeafIcon from "../../../assets/icons/LeafIcon.png";
import MagnifyIcon from "../../../assets/icons/MagnifyIcon.svg";

interface ResultSectionProps {
  data: PredictionResponse;
}

export default function ResultSection({ data }: ResultSectionProps) {
  const { output } = data;

  const formatPHP = (amount: number) =>
    new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" }).format(amount)

  const formatCropName = (crop: string) =>
    crop.charAt(0).toUpperCase() + crop.slice(1)

  const SummaryRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between gap-4 text-sm">
      <Text className="text-base-content-muted">{label}</Text>
      <Text className="font-medium text-right">{value}</Text>
    </div>
  )

  const PerformanceRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between gap-4 text-sm">
      <Text className="text-base-content-muted">{label}</Text>
      <Text className="font-medium text-right text-success">{value}</Text>
    </div>
  )

  return (
    <Section>
      <div className="flex flex-col items-center gap-2 text-center">
        <img src={DocumentIcon} alt="Analysis complete" className="size-20" />
        <Text as="h1" size="2xl" className="text-primary">
          Analysis Results Complete!
        </Text>
      </div>

      <Divider className="my-4 border-base-content/30" />

      <Widget className="flex flex-col gap-3">
        <div className="flex justify-between border-b border-base-300 pb-2">
          <Text size="lg" className="font-bold text-primary">Parameters</Text>
          <Text size="lg" className="font-bold text-primary">Value</Text>
        </div>
        <div className="flex flex-col gap-1">
          <SummaryRow label="Temperature:" value={`${data.temperature_c} °C`} />
          <SummaryRow label="Precipitation:" value={`${data.rainfall_mm} mm`} />
          <SummaryRow label="Humidity:" value={`${data.humidity_percent}%`} />
          <SummaryRow label="Soil pH:" value={String(data.ph)} />
        </div>
      </Widget>

      <Divider className="border-base-content/30" />

      <Widget className="flex flex-col gap-3">
        <Text size="lg" className="font-bold text-primary">
          Financial Summary
        </Text>
        <div className="flex flex-col gap-1">
          <SummaryRow label="Profit:" value={formatPHP(output.net_profit_php)} />
          <SummaryRow label="Hectares:" value={`${data.area_ha} ha`} />
        </div>
      </Widget>

      <Divider className="border-base-content/30" />

      <Widget className="flex flex-col gap-3">
        <Text size="lg" className="font-bold text-primary">
          Crop Performance
        </Text>
        <div className="flex flex-col gap-1">
          <PerformanceRow label="Crop Selection:" value={output.recommended_crop} />
          <PerformanceRow
            label="Fertilizer Mix:"
            value={`${output.urea_kg_ha} kg urea, ${output.dap_kg_ha} kg DAP, ${output.mop_kg_ha} kg MOP`}
          />
          <PerformanceRow label="Soil Test:" value={`pH ${data.ph}`} />
        </div>
      </Widget>

      <div className="flex flex-col gap-3">
        <Text size="lg" className="font-bold text-primary">
          Recommendations
        </Text>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4 rounded-xl border border-base-content/30 p-4">
            <img src={LeafIcon} alt="Crop recommendation" className="size-8" />
            <Text className="font-medium text-primary">
              Crop Selection: {formatCropName(output.recommended_crop)}
            </Text>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-base-content/30 p-4">
            <img src={BagIcon} alt="Fertilizer recommendation" className="size-8" />
            <Text className="font-medium text-primary">
              Fertilizer Application: {output.urea_kg_ha} kg Urea, {output.dap_kg_ha} kg DAP, {output.mop_kg_ha} kg MOP
            </Text>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-base-content/30 p-4">
            <img src={MagnifyIcon} alt="Soil recommendation" className="size-8" />
            <Text className="font-medium text-primary">
              Soil Monitoring: Test nutrients and maintain pH {data.ph}
            </Text>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Button
          type="button"
          className="rounded-xl bg-[#D98308] px-4 py-3 font-bold text-white"
        >
          Download PDF
        </Button>
        <Button
          type="button"
          className="rounded-xl bg-[#D98308] px-4 py-3 font-bold text-white"
        >
          Share Link
        </Button>
      </div>
    </Section>
  )
}
