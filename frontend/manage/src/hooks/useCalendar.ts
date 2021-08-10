import moment from "moment";
import { useState } from "react";
interface Props {
  initialStartDate: moment.Moment;
  initialEndDate: moment.Moment;
}

export const useCalendar = ({ initialStartDate, initialEndDate }: Props) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState<moment.Moment>(initialStartDate);
  const [endDate, setEndDate] = useState<moment.Moment>(initialEndDate);
  const [currentDate, setCurrentDate] = useState<moment.Moment>(endDate);

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
