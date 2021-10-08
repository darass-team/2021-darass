import { alarmContents } from "@/__test__/fixture/alarmContent";

export const useGetAlarmContents = jest.fn().mockImplementation(() => {
  return {
    data: alarmContents,
    refetch: jest.fn(),
    isLoading: false,
    isError: false,
    isSuccess: true,
    hasNewAlarmOnRealTime: true,
    setHasNewAlarmOnRealTime: jest.fn()
  };
});
