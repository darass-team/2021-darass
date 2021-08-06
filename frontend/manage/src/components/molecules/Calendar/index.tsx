import moment from "moment";
import Days from "./Days";
import { Container, Header, Month, MoveMonthButton, Year } from "./styles";

export interface Props {
  date: moment.Moment;
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
  setDate: (date: moment.Moment) => void;
  setStartDate: (date: moment.Moment | null) => void;
  setEndDate: (date: moment.Moment | null) => void;
}

const Calendar = ({ date, startDate, endDate, setDate, setStartDate, setEndDate }: Props) => {
  const resetDate = () => {
    setDate(moment());
    setStartDate(moment());
    setEndDate(moment());
  };

  const setPrevMonth = () => {
    setDate(date.clone().subtract(1, "month"));
  };

  const setNextMonth = () => {
    setDate(date.clone().add(1, "month"));
  };

  const changeDate = (_date: moment.Moment) => {
    const startDateIsSelected = startDate !== null;
    const thisDateIsBeforeThanStartDate = startDateIsSelected && _date.isBefore(startDate, "day");

    if (!startDateIsSelected || thisDateIsBeforeThanStartDate || !startDate?.isSame(endDate, "day")) {
      setStartDate(moment(_date));
      setEndDate(moment(_date));
    } else if (_date.isSame(startDate, "day") && _date.isSame(endDate, "day")) {
      setStartDate(date);
      setEndDate(date);
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
