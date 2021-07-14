import { JSDOM } from "jsdom";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";

global.document = new JSDOM().window.document;

describe("Cookie Util", () => {
  test("쿠키를 저장하고 읽어올 수 있다.", () => {
    const cookieKey = "TEST_COOKIE_KEY";
    const cookieValue = "TEST_COOKIE_VALUE";

    setCookie(cookieKey, cookieValue);

    expect(getCookie(cookieKey)).toBe(cookieValue);
  });

  test("쿠키를 저장하고 삭제할 수 있다.", () => {
    const cookieKey = "TEST_COOKIE_KEY";
    const cookieValue = "TEST_COOKIE_VALUE";

    setCookie(cookieKey, cookieValue);

    expect(getCookie(cookieKey)).toBe(cookieValue);

    deleteCookie(cookieKey);

    expect(getCookie(cookieKey)).toBe(null);
  });
});
