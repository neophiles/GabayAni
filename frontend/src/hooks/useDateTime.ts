import { Temporal } from "@js-temporal/polyfill";
import { useEffect, useState } from "react";

const useDateTime = () => {
  const [date, setDate] = useState<Temporal.PlainDate>(Temporal.Now.plainDateISO())
  const [time, setTime] = useState<Temporal.PlainTime>(Temporal.Now.plainTimeISO())

  useEffect(() => {
    setDate(Temporal.Now.plainDateISO())
    setTime(Temporal.Now.plainTimeISO())

    const handleUpdateTime = () => {
      setTime(Temporal.Now.plainTimeISO())
    }
    
    const timeIntervalId = setInterval(handleUpdateTime, 1000)

    return () => clearInterval(timeIntervalId)
  }, [])

  return { date, time }
}

export default useDateTime
