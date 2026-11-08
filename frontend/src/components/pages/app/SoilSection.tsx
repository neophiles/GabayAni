import { cn } from "cn"
import { NUTRIENT_OPTIONS, PH_OPTIONS, type NutrientLevel, type NutrientType } from "../../../data/soil"
import Button, { type ButtonProps } from "../../common/Button"
import Section from "../../common/Section"
import Text from "../../common/Text"
import Widget from "../../common/Widget"
import Divider from "../../layout/Divider"
import { useState } from "react"
import Icon from "../../common/Icon"
import { ChevronUp } from "lucide-react"
import useModal from "../../../stores/modal"

function OptionButton({
  children,
  className,
  ...buttonProps
}: ButtonProps) {
  return (
    <Button
      className={cn(
        "py-1 md:py-2 rounded-lg font-medium",
        className
      )}
      onClick={buttonProps.onClick}
    >
      {children}
    </Button>
  )
}

interface SoilSectionProps {
  selectedNutrients: Record<NutrientType, NutrientLevel | null>;
  onNutrientChange: (nutrient: NutrientType, level: NutrientLevel) => void;
  selectedPhOptionId: string | null;
  onPhChange: (value: number, optionId: string) => void;
}

export default function SoilSection({
  selectedNutrients,
  onNutrientChange,
  selectedPhOptionId,
  onPhChange
}: SoilSectionProps) {
  const [activeKit, setActiveKit] = useState<string | null>(null);
  const { openModal } = useModal()

  return (
    <Section>
      <Text as="h2" size="xl">Soil Information</Text>
      <Text className="text-base-content-muted">
        <b>IMPORTANT:</b>
        {" This app requires using the "}

        <Button onClick={openModal}>
          <Text className="underline underline-offset-2">
            UPLB-ASI Soil Test Kit
          </Text>
        </Button>
        {"."}
      </Text>
      <Widget>
        <div className="flex flex-col gap-4">
          <div>
            <Text as="label" size="lg">Soil Nutrients</Text>
            <Text size="sm" className="text-base-content-muted">How much nutrients does your soil have? Following the steps from the tutorial, select the matching level for the following nutrients based on the color chart.</Text>
          </div>
          {NUTRIENT_OPTIONS.map(({ label, options }) => (
            <div key={label} className="flex flex-col gap-2 w-full">
              <Text as="label">{label}</Text>
              <div className="flex gap-2 text-white" role="group" aria-label={`${label} level`}>
                {options.map(({ level, color }) => {
                  const isSelected = selectedNutrients[label] === level

                  return (
                    <OptionButton
                      key={level}
                      className={cn(
                        "w-full transition-transform active:scale-95",
                        color,
                        isSelected ? 'ring-2 ring-black ring-offset-2' : ''
                      )}
                      aria-pressed={isSelected}
                      onClick={() => onNutrientChange(label, level)}
                    >
                      <Text size="lg">{level}</Text>
                    </OptionButton>
                  )
                })}
              </div>
            </div>
          ))}
          <Divider className="text-base-content-muted/25" />
          <div className="flex flex-col gap-4">
            <div>
              <Text as="label" size="lg">pH Level</Text>
              <Text size="sm" className="text-base-content-muted">
                How sour or acidic is your soil? Following the steps from the tutorial, select the chemical that gave you your final color result then select the final matching pH level from the color chart.
              </Text>
            </div>
            <div className="flex flex-col gap-2">
              {PH_OPTIONS.map(({ kit, acronym, options }) => {
                const isActive = activeKit === kit;

                return (
                  <div key={kit} className="group flex flex-col border border-base-300 rounded-lg overflow-hidden">
                    <OptionButton
                      onClick={() => setActiveKit(isActive ? null : kit)}
                      className="flex justify-between items-center w-full p-3 group-hover:bg-base-200 transition-colors"
                      aria-expanded={isActive}
                    >
                      <Text className="font-medium">
                        {kit} ({acronym})
                      </Text>
                      <Icon icon={ChevronUp} className={cn("transition-transform duration-300", isActive ? "rotate-180" : "")} />
                    </OptionButton>

                    <div
                      className={cn(
                        "group-hover:bg-base-200 grid transition-all duration-300 ease-in-out",
                        isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="flex gap-2 text-white p-3 pt-2" role="group" aria-label={`${kit} pH`}>
                          {options.map(({ label, value, color }) => {
                            const optionId = `${kit}-${label}`;
                            const isSelected = selectedPhOptionId === optionId;
                            
                            return (
                              <OptionButton
                                key={label}
                                className={cn(
                                  "w-full transition-transform active:scale-95",
                                  color,
                                  isSelected ? 'ring-2 ring-black ring-offset-2' : ''
                                )}
                                aria-pressed={isSelected}
                                onClick={() => onPhChange(value, optionId)}
                              >
                                <Text size="lg">{label}</Text>
                              </OptionButton>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Widget>
    </Section>
  )
}
