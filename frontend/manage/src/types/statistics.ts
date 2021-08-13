import { PERIODICITY } from "../constants/statistics";

export interface COMMENT_STATISTICS {
  date: string;
  count: number;
}

export interface GetCommentStatisticsRequest {
  periodicity: ObjectValueType<typeof PERIODICITY>;
  projectKey?: string;
  startDate: string;
  endDate: string;
}
