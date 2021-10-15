import { alarmContents } from "@/__test__/fixture/alarmContent";

export const useGetAlarmContents = jest.fn().mockReturnValue({
  data: alarmContents,
  refetch: jest.fn(),
  isLoading: false,
  isError: false,
  hasNewAlarmOnRealTime: true,
  setHasNewAlarmOnRealTime: jest.fn()
});
