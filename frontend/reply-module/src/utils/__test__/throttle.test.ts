import throttling from "../throttle";

jest.useFakeTimers();

describe("throttle test", () => {
  test("callback을 인자로 넘기면, delay전에 한번 더 실행이 되어도, delay뒤에 해당 callback이 수행된다.", () => {
    const callback = jest.fn().mockName("callbackMock");
    const delay = 2000;

    const fn = throttling({ callback, delay });

    fn();

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(0);

    fn();

    jest.advanceTimersByTime(2001);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
