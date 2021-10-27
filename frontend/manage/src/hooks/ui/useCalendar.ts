import dayjs from "dayjs";
import { useState } from "react";
interface Props {
  initialStartDate: dayjs.Dayjs;
  initialEndDate: dayjs.Dayjs;
}

export const useCalendar = ({ initialStartDate, initialEndDate }: Props) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState<dayjs.Dayjs>(initialStartDate);
  const [endDate, setEndDate] = useState<dayjs.Dayjs>(initialEndDate);
  const [currentDate, setCurrentDate] = useState<dayjs.Dayjs>(endDate);

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
