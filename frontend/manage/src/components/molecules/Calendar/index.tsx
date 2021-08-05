import moment from "moment";
import { useState } from "react";
import Days from "./Days";
import { Container, Header, MoveMonthButton, Month, Year } from "./styles";

export interface Props {
  a: string;
}

const Calendar = ({ a }: Props) => {
  const [date, setDate] = useState(moment());

  const [startDate, setStartDate] = useState<moment.Moment | null>(() => date.subtract(5, "day"));
  const [endDate, setEndDate] = useState<moment.Moment | null>(() => date.add(3, "day"));

  const resetDate = () => {
    setDate(moment());
  };

  const changeMonth = (month: string | number) => {
    date.month(month);

    setDate(date);
  };

  const changeDate = () => {
    if (startDate === null || date.isBefore(startDate, "day") || !startDate.isSame(endDate, "day")) {
      setStartDate(moment(date));
      setEndDate(moment(date));
    } else if (date.isSame(startDate, "day") && date.isSame(endDate, "day")) {
      setStartDate(null);
      setEndDate(null);
    } else if (date.isAfter(startDate, "day")) {
      setEndDate(moment(date));
    }
  };

  return (
    <Container>
      <Header>
        <MoveMonthButton onClick={() => changeMonth(date.month() - 1)}>&#8249;</MoveMonthButton>

        <Month onClick={() => resetDate()}>
          {date.format("MMMM")} <Year>{date.format("YYYY")}</Year>
        </Month>

        <MoveMonthButton onClick={() => changeMonth(date.month() + 1)}>&#8250;</MoveMonthButton>
      </Header>

      {/* <Days onClick={changeDate} date={date} startDate={startDate} endDate={endDate} /> */}
    </Container>
  );
};

export default Calendar;
