import { isEmptyString } from "@/utils/validation";

describe("isEmptyString", () => {
  test("문자열을 인자로 넣을 시, 해당 문자열이 공백 또는 개행으로만 이루어져 있는지 여부를 반환한다.", () => {
    const fixture = [
      {
        input: "           ",
        expectedOutput: true
      },
      {
        input: "   \n  \n   \n   ",
        expectedOutput: true
      },
      {
        input: "a",
        expectedOutput: false
      },
      {
        input: " a  a  a  \na  a \nna\n ",
        expectedOutput: false
      },
      {
        input: "\n\n\n\n\n\n ",
        expectedOutput: true
      }
    ];

    fixture.forEach(({ input, expectedOutput }) => {
      expect(isEmptyString(input)).toEqual(expectedOutput);
    });
  });
});
