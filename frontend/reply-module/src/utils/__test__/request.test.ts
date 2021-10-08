import { QUERY } from "@/constants/api";
import { customAxios } from "../customAxios";
import { request } from "../request";

jest.mock("../customAxios");

jest.spyOn(customAxios, "get");
jest.spyOn(customAxios, "post");
jest.spyOn(customAxios, "patch");
jest.spyOn(customAxios, "delete");

describe("request test", () => {
  test("request.get을 요청하면 axios.get이 호출된다", async () => {
    try {
      await request.get(QUERY.ALARM);
    } catch (error) {}

    expect(customAxios.get).toBeCalled();
  });
  test("request.post을 요청하면 axios.post이 호출된다", async () => {
    try {
      await request.post(QUERY.ALARM, {});
    } catch (error) {}

    expect(customAxios.post).toBeCalled();
  });
  test("request.patch을 요청하면 axios.patch이 호출된다", async () => {
    try {
      await request.patch(QUERY.ALARM, {});
    } catch (error) {}

    expect(customAxios.patch).toBeCalled();
  });
  test("request.delete을 요청하면 axios.delete이 호출된다", async () => {
    try {
      await request.delete(QUERY.ALARM);
    } catch (error) {}

    expect(customAxios.delete).toBeCalled();
  });
});
