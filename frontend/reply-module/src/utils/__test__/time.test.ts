import { getTimeDifference } from "../time";

describe("Time Util", () => {
  test("getTimeDifference", () => {
    const beforeThirtySeconds = new Date();
    beforeThirtySeconds.setSeconds(beforeThirtySeconds.getSeconds() - 1);

    const beforeOneMinute = new Date();
    beforeOneMinute.setMinutes(beforeOneMinute.getMinutes() - 1);

    const beforeOneHour = new Date();
    beforeOneHour.setHours(beforeOneHour.getHours() - 1);

    const beforeOneDay = new Date();
    beforeOneDay.setDate(beforeOneDay.getDate() - 1);

    const beforeOneWeek = new Date();
    beforeOneWeek.setDate(beforeOneWeek.getDate() - 7);

    const beforeOneMonth = new Date();
    beforeOneMonth.setMonth(beforeOneMonth.getMonth() - 1);

    const beforeOneYear = new Date();
    beforeOneYear.setFullYear(beforeOneYear.getFullYear() - 1);

    expect(getTimeDifference(beforeThirtySeconds.toString())).toEqual("방금 전");
    expect(getTimeDifference(beforeOneMinute.toString())).toEqual("1분 전");
    expect(getTimeDifference(beforeOneHour.toString())).toEqual("1시간 전");
    expect(getTimeDifference(beforeOneDay.toString())).toEqual("1일 전");
    expect(getTimeDifference(beforeOneWeek.toString())).toEqual("1주 전");
    expect(getTimeDifference(beforeOneMonth.toString())).toEqual("1개월 전");
    expect(getTimeDifference(beforeOneYear.toString())).toEqual("1년 전");
  });
});
