import "@testing-library/jest-dom/extend-expect";
import { PALETTE } from "@/constants/styles/palette";
import { render } from "@testing-library/react";
import CheckBox from "..";

describe("CheckBox test", () => {
  test("isChecked 상태이면, 배경이 PALETTE.PRIMARY이다.", () => {
    const { getByTestId } = render(<CheckBox isChecked={true} onChange={() => {}} />);

    expect(getByTestId("checkbox-input")).toHaveStyle(`background-color: ${PALETTE.PRIMARY}`);
  });
  test("isChecked 아닌 상태이면, 배경이 PALETTE.GRAY_500.", () => {
    const { getByTestId } = render(<CheckBox isChecked={false} onChange={() => {}} />);

    expect(getByTestId("checkbox-input")).toHaveStyle(`background-color: ${PALETTE.GRAY_500}`);
  });
  test("labelText가 인자로 주어지면, labelText가 화면에 렌더링된다.", () => {
    const labelText = "labelText";

    const { queryByText } = render(<CheckBox isChecked={false} onChange={() => {}} labelText={labelText} />);

    expect(queryByText(labelText)).toBeTruthy();
  });
});
