import moment from "moment";
import Day from "../Day";
import { Container } from "./styles";

export interface Props {
  date: moment.Moment;
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
  changeDate: (date: moment.Moment) => void;
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
