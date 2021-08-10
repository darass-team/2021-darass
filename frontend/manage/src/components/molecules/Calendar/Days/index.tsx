import dayjs from "dayjs";
import Day from "../Day";
import { Container } from "./styles";

export interface Props {
  date: dayjs.Dayjs;
  startDate: dayjs.Dayjs | null;
  endDate: dayjs.Dayjs | null;
  changeDate: (date: dayjs.Dayjs) => void;
}

const Days = ({ date, startDate, endDate, changeDate }: Props) => {
  const daysInMonth = Array.from({ length: date.clone().daysInMonth() }, (_, index) => {
    return date.clone().startOf("month").add(index, "day");
  });

  return (
    <Container>
      {daysInMonth.map(day => (
        <Day key={day.format("DD")} date={day} startDate={startDate} endDate={endDate} changeDate={changeDate} />
      ))}
    </Container>
  );
};

export default Days;
