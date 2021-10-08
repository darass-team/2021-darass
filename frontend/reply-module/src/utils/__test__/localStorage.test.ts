import { getLocalStorage, removeLocalStorage, setLocalStorage } from "../localStorage";

jest.spyOn(window.localStorage.__proto__, "getItem");
jest.spyOn(window.localStorage.__proto__, "setItem");
jest.spyOn(window.localStorage.__proto__, "removeItem");

describe("localStorage test", () => {
  test("로컬스토리지에서 정보를 읽어올 수 있다.", () => {
    getLocalStorage("key");

    expect(localStorage.getItem).toHaveBeenCalledWith("key");
  });

  test("로컬스토리지에 정보를 저장할 수 있다.", () => {
    const [key, value] = ["key", "value"];
    setLocalStorage(key, value);

    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value));
  });

  test("로컬스토리지에서 정보를 제거할 수 있다.", () => {
    removeLocalStorage("remove-key");

    expect(localStorage.removeItem).toHaveBeenCalledWith("remove-key");
  });
});
