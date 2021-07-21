import { isEmptyString } from "../../utils/validation";

describe("isEmptyString", () => {
  test("문자열을 인자로 넣을 시, 반환값으로 공백과 개행 문자가 모두 제거된 문자열이 반환된다.", () => {
    const fixture = [
      {
        input: "           ",
        expectedOutput: ""
      },
      {
        input: "   \n  \n   \n   ",
        expectedOutput: ""
      },
      {
        input: "a",
        expectedOutput: "a"
      },
      {
        input: " a  a  a  \na  a \nna\n ",
        expectedOutput: "aaaaana"
      },
      {
        input: "\n\n\n\n\n\n ",
        expectedOutput: ""
      }
    ];

    fixture.forEach(({ input, expectedOutput }) => {
      expect(isEmptyString(input)).toEqual(expectedOutput);
    });
  });
});
