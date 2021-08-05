import moment from "moment";

export interface Props {
  currentDate: moment.Moment;
  date: moment.Moment;
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
  onClick: () => void;
}

const Day = ({ currentDate, date, startDate, endDate, onClick }: Props) => {
  let className = [];

  if (moment().isSame(date, "day")) {
    className.push("active");
  }

  if (date.isSame(startDate, "day")) {
    className.push("start");
  }

  if (date.isBetween(startDate, endDate, "day")) {
    className.push("between");
  }

  if (date.isSame(endDate, "day")) {
    className.push("end");
  }

  if (!date.isSame(currentDate, "month")) {
    className.push("muted");
  }

  return (
    //   <span onClick={onClick} currentDate={date} className={className.join(" ")}>
    <span onClick={onClick} className={className.join(" ")}>
      {date.date()}
    </span>
  );
};

export default Day;
