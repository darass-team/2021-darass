import moment from "moment";
import { VIEW_OPTION } from "./../constants/statistics";
import { useGetCommentsOfProjectPerPage } from ".";
import { Comment, GetCommentsOfProjectPerPageRequest } from "../types/comment";

const commentsGroupByDay = (
  type: ObjectValueType<typeof VIEW_OPTION>,
  comments: Comment[],
  startDate: moment.Moment,
  endDate: moment.Moment
) => {
  const allDates: { [key: string]: number } = {};

  // const unit = {
  //   TIME: "hour",
  //   DAY: "day",
  //   MONTH: "month"
  // };

  // const format = {
  //   TIME: "HH-MM",
  //   DAY: "YYYY-MM-DD",
  //   MONTH: "YYYY-MM"
  // };

  const currentDate = startDate.clone();

  while (currentDate.diff(endDate) < 0) {
    currentDate.add(1, "day");
    allDates[currentDate.format("YYYY-MM-DD")] = 0;
  }

  for (const { createdDate } of comments) {
    const time = moment(createdDate).format("YYYY-MM-DD");

    allDates[time]++;
  }

  const newRes = [];
  for (const key of Object.keys(allDates)) {
    newRes.push({
      time: key,
      count: allDates[key]
    });
  }

  return newRes;
};

interface Props extends Omit<GetCommentsOfProjectPerPageRequest, "page" | "size" | "keyword"> {
  type: ObjectValueType<typeof VIEW_OPTION>;
}

export const useCommentStatisticsData = ({ type, projectKey, startDate, endDate }: Props) => {
  const { comments, totalComment, totalPage, refetch, isLoading, error, prefetch } = useGetCommentsOfProjectPerPage({
    sortOption: "latest",
    projectKey,
    startDate,
    endDate,
    page: 1,
    size: 9999,
    keyword: ""
  });

  const data = commentsGroupByDay(type, comments, moment(startDate), moment(endDate));

  return { data, refetch };
};
