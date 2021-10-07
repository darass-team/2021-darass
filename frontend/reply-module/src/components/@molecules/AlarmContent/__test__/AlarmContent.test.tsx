import { GetAlarmResponse } from "@/types/comment";
import { alarmContents } from "@/__test__/fixture/alarmContent";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, waitFor } from "@testing-library/react";
import AlarmContent from "..";

window.open = jest.fn();

describe("AlarmContent test", () => {
  test("alarmContents의 length가 0이면, NoContent 문구를 띄운다.", () => {
    const alarmContentData: GetAlarmResponse[] = [];

    const alarmContent = render(<AlarmContent alarmContents={alarmContentData} />);

    const noContentText = '"최근 30일간 받은 알람이 없습니다."';
    expect(alarmContent.queryByText(noContentText)).toBeTruthy();
  });

  test("alarmContents가 존재하면 알람정보를 렌더링한다.", () => {
    const alarmContentData: GetAlarmResponse[] = [...alarmContents];

    const alarmContent = render(<AlarmContent alarmContents={alarmContentData} />);

    const allAlarmContent = alarmContent.queryAllByTestId("alarm-content-container");
    expect(allAlarmContent.length).toEqual(alarmContentData.length);
  });

  test("각 alarmContent를 클릭하면 alarmContent의 url의 window.open이 호출된다.", () => {
    const alarmContentData: GetAlarmResponse[] = [...alarmContents];

    const alarmContent = render(<AlarmContent alarmContents={alarmContentData} />);
    const allAlarmContent = alarmContent.queryAllByTestId("alarm-content-container");

    fireEvent.click(allAlarmContent[0]);

    expect(window.open).toHaveBeenCalledWith(alarmContentData[0].comment.url, "_blank", "noopener");
  });
});
