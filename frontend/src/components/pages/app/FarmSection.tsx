import Section from "../../common/Section";
import Text from "../../common/Text";
import Widget from "../../common/Widget";

interface FarmSectionProps {
  area: number | "";
  onAreaChange: (value: number | "") => void;
}

export default function FarmSection({
  area,
  onAreaChange,
}: FarmSectionProps) {
  return (
    <Section>
      <Text as="h2" size="xl" className="text-base-content">
        Weather
      </Text>
      <Widget className="flex flex-col">
        <div>
          <Text as="label">Farm Area (hectares)</Text>
          <Text size="sm" className="text-base-content-muted">
            What is the total size of your land or the area you want to plant crops on?
          </Text>
        </div>
        <input
          type="number"
          min={0.1}
          step="any"
          placeholder="Enter area in hectares here"
          value={area}
          onChange={(e) => onAreaChange(e.target.value === "" ? "" : Number(e.target.value))}
          className="py-1 px-2 bg-base-200 rounded-lg"
        />
      </Widget>
    </Section>
  )
}
