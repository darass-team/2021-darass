import { focusContentEditableTextToEnd } from "../focusContentEditableTextToEnd";

window.getSelection = jest.fn().mockImplementation(() => {
  return {
    removeAllRanges: jest.fn(),
    addRange: jest.fn()
  };
});

document.createRange = jest.fn().mockImplementation(() => {
  return {
    selectNodeContents: jest.fn(),
    collapse: jest.fn()
  };
});

beforeEach(() => {
  (window.getSelection as jest.Mock).mockClear();
  (document.createRange as jest.Mock).mockClear();
});

describe("focusContentEditableTextToEnd test", () => {
  test("element의 innerText의 length가 0보다 크면, selection과 range객체가 생성된다.", () => {
    const $elem = document.createElement("div");
    $elem.innerText = "댓글내용";

    focusContentEditableTextToEnd($elem);

    expect(window.getSelection).toHaveBeenCalled();
    expect(document.createRange).toHaveBeenCalled();
  });
  test("element의 innerText의 length가 0이면, element focus가 수행되고, selection, range 객체가 생성되지 않는다.", () => {
    const $elem = document.createElement("div");
    $elem.innerText = "";

    jest.spyOn($elem, "focus");

    focusContentEditableTextToEnd($elem);
    expect($elem.focus).toHaveBeenCalled();
    expect(window.getSelection).not.toHaveBeenCalled();
    expect(document.createRange).not.toHaveBeenCalled();
  });
});
