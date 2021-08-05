import moment from "moment";
import { useEffect, useState } from "react";
import Days from "./Days";
import { Container, Header, MoveMonthButton, Month, Year } from "./styles";

export interface Props {
  a?: string;
}

const Calendar = ({ a }: Props) => {
  const [date, setDate] = useState(() => moment());

  const [startDate, setStartDate] = useState<moment.Moment | null>(date);
  const [endDate, setEndDate] = useState<moment.Moment | null>(date);

  useEffect(() => {
    console.log(startDate?.format("YY MM DD"), endDate?.format("YY MM DD"));
  }, [startDate, endDate]);

  const resetDate = () => {
    setDate(moment());
  };

  const setPrevMonth = () => {
    setDate(_date => _date.subtract(1, "month").clone());
  };

  const setNextMonth = () => {
    setDate(_date => _date.add(1, "month").clone());
  };

  const changeDate = (_date: moment.Moment) => {
    const startDateIsSelected = startDate !== null;
    const thisDateIsBeforeThanStartDate = startDateIsSelected && _date.isBefore(startDate, "day");

    if (!startDateIsSelected || thisDateIsBeforeThanStartDate || !startDate?.isSame(endDate, "day")) {
      setStartDate(moment(_date));
      setEndDate(moment(_date));
    } else if (_date.isSame(startDate, "day") && _date.isSame(endDate, "day")) {
      setStartDate(null);
      setEndDate(null);
    } else if (_date.isAfter(startDate, "day")) {
      setEndDate(moment(_date));
    }
  };

  return (
    <Container>
      <Header>
        <MoveMonthButton onClick={setPrevMonth}>&#8249;</MoveMonthButton>

        <Month onClick={resetDate}>
          {date.locale("ko").format("MMMM")} <Year>{date.format("YYYY")}</Year>
        </Month>

        <MoveMonthButton onClick={setNextMonth}>&#8250;</MoveMonthButton>
      </Header>

      <Days changeDate={changeDate} date={date} startDate={startDate} endDate={endDate} />
    </Container>
  );
};

export default Calendar;
