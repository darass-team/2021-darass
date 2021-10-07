import { render } from "@testing-library/react";
import "react";
import { useQuery } from "react-query";
import { useToken } from "../useToken";

jest.mock("react-query");

const MockComponent = () => {
  const { accessToken, refetchAccessToken, deleteMutation, error } = useToken();

  return <div></div>;
};

describe("useToken test", () => {
  test("useToken을 호출하게되면 useQuery가 호출된다.", () => {
    render(<MockComponent />);

    expect(useQuery).toHaveBeenCalled();
  });
});
