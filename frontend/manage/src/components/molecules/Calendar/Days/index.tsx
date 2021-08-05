import moment from "moment";
import Day from "../Day";
import { Container, DayOfWeeks } from "./styles";

export interface Props {
  date: moment.Moment;
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
  onClick: () => void;
}

const Days = ({ date, startDate, endDate, onClick }: Props) => {
  const thisDate = moment(date);
  const daysInMonth = moment(date).daysInMonth();
  const firstDayDate = moment(date).startOf("month");
  const previousMonth = moment(date).subtract(1, "month");
  const previousMonthDays = previousMonth.daysInMonth();
  const nextsMonth = moment(date).add(1, "month");
  let days = [];

  for (let i = firstDayDate.day(); i > 1; i--) {
    previousMonth.date(previousMonthDays - i + 2);

    days.push(
      <Day
        key={moment(previousMonth).format("DD MM YYYY")}
        onClick={onClick}
        currentDate={date}
        date={moment(previousMonth)}
        startDate={startDate}
        endDate={endDate}
      />
    );
  }

  for (let i = 1; i <= daysInMonth; i++) {
    thisDate.date(i);

    days.push(
      <Day
        key={moment(thisDate).format("DD MM YYYY")}
        onClick={onClick}
        currentDate={date}
        date={moment(thisDate)}
        startDate={startDate}
        endDate={endDate}
      />
    );
  }

  const daysCount = days.length;
  for (let i = 1; i <= 42 - daysCount; i++) {
    nextsMonth.date(i);
    days.push(
      <Day
        key={moment(nextsMonth).format("DD MM YYYY")}
        onClick={onClick}
        currentDate={date}
        date={moment(nextsMonth)}
        startDate={startDate}
        endDate={endDate}
      />
    );
  }

  return (
    <Container>
      {Array.from({ length: 7 }, (_, index) => index + 1).map(num => {
        return <DayOfWeeks>{moment().day(num)}</DayOfWeeks>;
      })}
      {days.concat()}
    </Container>
  );
};

export default Days;
