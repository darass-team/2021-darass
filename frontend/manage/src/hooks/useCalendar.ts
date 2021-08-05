import moment from "moment";
import { useState } from "react";

export const useCalendar = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState<moment.Moment>(() => moment());
  const [startDate, setStartDate] = useState<moment.Moment | null>(currentDate);
  const [endDate, setEndDate] = useState<moment.Moment | null>(currentDate);

  return {
    showCalendar,
    setShowCalendar,
    currentDate,
    setCurrentDate,
    startDate,
    setStartDate,
    endDate,
    setEndDate
  };
};
