import convertDateFormat from "../convertDateFormat";

describe("convertDateFormat test", () => {
  test("Date객체를 넣으면, 사이에 YYYY-MM-DD 형태로 포맷팅된다.", () => {
    const now = new Date("1997/02/14");
    const dateString = convertDateFormat(now);

    expect(dateString).toEqual("1997-02-14");
  });
});
