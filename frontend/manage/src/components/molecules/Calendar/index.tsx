import dayjs from "dayjs";
import Days from "./Days";
import { Container, Header, Month, MoveMonthButton, Year } from "./styles";

export interface Props {
  date: dayjs.Dayjs;
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  setDate: (date: dayjs.Dayjs) => void;
  setStartDate: (date: dayjs.Dayjs) => void;
  setEndDate: (date: dayjs.Dayjs) => void;
  className?: string;
}

const Calendar = ({ date, startDate, endDate, setDate, setStartDate, setEndDate, className }: Props) => {
  const resetDate = () => {
    setDate(dayjs());
    setStartDate(dayjs());
    setEndDate(dayjs());
  };

  const setPrevMonth = () => {
    setDate(date.clone().subtract(1, "month"));
  };

  const setNextMonth = () => {
    setDate(date.clone().add(1, "month"));
  };

  const changeDate = (_date: dayjs.Dayjs) => {
    const startDateIsSelected = startDate !== null;
    const thisDateIsBeforeThanStartDate = startDateIsSelected && _date.isBefore(startDate, "day");

    if (!startDateIsSelected || thisDateIsBeforeThanStartDate || !startDate?.isSame(endDate, "day")) {
      setStartDate(dayjs(_date));
      setEndDate(dayjs(_date));
    } else if (_date.isSame(startDate, "day") && _date.isSame(endDate, "day")) {
      setStartDate(date);
      setEndDate(date);
    } else if (_date.isAfter(startDate, "day")) {
      setEndDate(dayjs(_date));
    }
  };

  return (
    <Container className={className}>
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
