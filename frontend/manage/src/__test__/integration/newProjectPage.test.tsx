import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { useCreateProject, useGetAllProjects } from "../../hooks";
import { myProject, otherProject } from "../fixture/project";
import { Project } from "../../types/project";
import { ROUTE } from "../../constants";
import NewProject from "../../components/pages/NewProject";

jest.mock("../../hooks/useCreateProject");
jest.mock("../../hooks/useGetAllProjects");

let alertMsg = "";

describe("newProject 페이지 테스트", () => {
  beforeEach(() => {
    (useCreateProject as jest.Mock).mockImplementation(() => {
      return {
        createProject: (str: string): Project => {
          return {
            ...otherProject
          };
        }
      };
    });

    alertMsg = "";
    window.alert = str => {
      alertMsg = str;
    };
  });
  test("프로젝트 이름에 공백으로만 구성된 문자열을 입력하고, 등록버튼을 누르면, 얼럿창이 노출된다.", async () => {
    (useGetAllProjects as jest.Mock).mockImplementation(() => {
      return { projects: [] };
    });

    const inputValue = "           \n \n \n \n \n ";
    const history = createMemoryHistory();
    const newProject = render(
      <Router history={history}>
        <NewProject />
      </Router>
    );

    const projectNameInput = newProject.getByRole("textbox", {
      name: /프로젝트 이름/i
    });

    const projectSubmitButton = newProject.getByRole("button", {
      name: /등록/i
    });

    fireEvent.change(projectNameInput, { target: { value: inputValue } });
    fireEvent.click(projectSubmitButton);

    await waitFor(() => {
      expect(alertMsg).toEqual("프로젝트 이름을 입력해주세요.");
    });
  });
  test("프로젝트 이름에 이미 등록되어있는 프로젝트를 입력하고, 등록버튼을 누르면, 중복안내 얼럿 메시지가 노출된다.", async () => {
    (useGetAllProjects as jest.Mock).mockImplementation(() => {
      return { projects: [myProject] };
    });

    const inputValue = myProject.name;
    const history = createMemoryHistory();
    const newProject = render(
      <Router history={history}>
        <NewProject />
      </Router>
    );

    const projectNameInput = newProject.getByRole("textbox", {
      name: /프로젝트 이름/i
    });

    const projectSubmitButton = newProject.getByRole("button", {
      name: /등록/i
    });

    fireEvent.change(projectNameInput, { target: { value: inputValue } });
    fireEvent.click(projectSubmitButton);

    await waitFor(() => {
      expect(alertMsg).toEqual("중복된 프로젝트 이름입니다. 다시 입력해주세요.");
    });
  });
  test("프로젝트 이름에 유효한 문자열을 입력하고, 등록버튼을 누르면, 프로젝트가 생성된다.", async () => {
    (useGetAllProjects as jest.Mock).mockImplementation(() => {
      return { projects: [] };
    });

    const inputValue = "유효한 프로젝트";
    const history = createMemoryHistory();
    const newProject = render(
      <Router history={history}>
        <NewProject />
      </Router>
    );

    const projectNameInput = newProject.getByRole("textbox", {
      name: /프로젝트 이름/i
    });

    const projectSubmitButton = newProject.getByRole("button", {
      name: /등록/i
    });

    fireEvent.change(projectNameInput, { target: { value: inputValue } });
    fireEvent.click(projectSubmitButton);

    const push = jest.spyOn(history, "push");
    await waitFor(() => {
      expect(push).toBeCalledWith(ROUTE.GET_SCRIPT_PUBLISHING(otherProject.id));
    });
  });
});
