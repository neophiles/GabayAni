import useDateTime from "../../../hooks/useDateTime";
import Button from "../../common/Button";
import Section from "../../common/Section";
import Text from "../../common/Text";
import Widget from "../../common/Widget";
import Divider from "../../layout/Divider";
import Spacer from "../../layout/Spacer";
import weatherIcon from "../../../assets/icons/weather.svg"
import useWeather from "../../../hooks/useWeather";
import Spinner from "../../common/Spinner";
import { cn } from "cn";

export default function WeatherSection() {
  const { date, time } = useDateTime()
  const { weather, isLoading, error, getWeather } = useWeather()

  const formattedDate = date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
  })

  const formattedTime = time.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })

  return (
    <Section>
      <Text as="h2" size="xl" className="text-base-content">
        Weather
      </Text>
      <Widget className="flex flex-col">
        <div className="flex gap-2 items-center">
          <div>
            <Text>Today, {formattedDate}</Text>
            <Text size="xl" className="font-medium">{formattedTime}</Text>
          </div>
          <Spacer />
          <img
            src={weatherIcon}
            className="size-12"
          />
        </div>
        <Divider className="text-base-content-muted/25" />
        <div className="w-full flex flex-col md:flex-row gap-4">
          {!error
            ? (<div className="w-full flex justify-center text-center md:justify-start md:text-start gap-4">
                <div className="flex-1 md:flex-none">
                  <Text size="sm">Temperature</Text>
                  <Text size="lg" className="font-medium">
                    {isLoading
                      ? "---"
                      : `${weather?.temperature_c} C`
                    }
                  </Text>
                </div>
                <div className="flex-1 md:flex-none">
                  <Text size="sm">Humidity</Text>
                  <Text size="lg" className="font-medium">
                    {isLoading
                      ? "---"
                      : `${weather?.humidity_percent}%`
                    }
                  </Text>
                </div>
                <div className="flex-1 md:flex-none">
                  <Text size="sm">Rainfall</Text>
                  <Text size="lg" className="font-medium">
                    {isLoading
                      ? "---"
                      : `${weather?.rainfall_mm} mm`
                    }
                    
                  </Text>
                </div>
              </div>)
            : (
              <Text className="text-warning">
                {error}
              </Text>
            )
          }
          <Button
            onClick={getWeather}
            disabled={isLoading || Boolean(error)}
            className={cn(
              "shrink-0 px-4 py-2 flex items-center justify-center bg-primary text-primary-content font-bold rounded-lg",
              isLoading || Boolean(error) ? "brightness-75" : undefined
            )}
          >
            <Text size="lg">
              {isLoading
                ? <Spinner />
                : "Reload"
              }
            </Text>
          </Button>
        </div>
      </Widget>
    </Section>
  )
}
