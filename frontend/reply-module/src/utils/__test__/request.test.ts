import { QUERY } from "@/constants/api";
import { customAxios } from "../customAxios";
import { request } from "../request";

jest.spyOn(customAxios, "get");
jest.spyOn(customAxios, "post");
jest.spyOn(customAxios, "patch");
jest.spyOn(customAxios, "delete");

describe("request test", () => {
  test("request.get을 요청하면 axios.get이 호출된다", () => {
    request.get(QUERY.ALARM);

    expect(customAxios.get).toBeCalled();
  });
  test("request.post을 요청하면 axios.post이 호출된다", () => {
    request.post(QUERY.ALARM, {});

    expect(customAxios.post).toBeCalled();
  });
  test("request.patch을 요청하면 axios.patch이 호출된다", () => {
    request.patch(QUERY.ALARM, {});

    expect(customAxios.patch).toBeCalled();
  });
  test("request.delete을 요청하면 axios.delete이 호출된다", () => {
    request.delete(QUERY.ALARM);

    expect(customAxios.delete).toBeCalled();
  });
});
