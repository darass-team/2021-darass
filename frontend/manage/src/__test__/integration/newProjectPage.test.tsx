import NewProject from "@/components/pages/NewProject";
import { useCreateProject, useGetAllProjects } from "@/hooks";
import { Project } from "@/types/project";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { myProject, otherProject } from "../fixture/project";
import { Router } from "react-router";

jest.mock("@/hooks/useCreateProject");
jest.mock("@/hooks/useGetAllProjects");

window.alert = function (str) {
  console.log(str);
  return true;
};

window.confirm = function (str) {
  console.log(str);
  return true;
};

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
    (useGetAllProjects as jest.Mock).mockImplementation(() => {
      return {
        createProject: (str: string): Project => {
          return {
            ...myProject
          };
        }
      };
    });
  });
  test("프로젝트 이름에 공백으로만 구성된 문자열을 입력하고, 등록버튼을 누르면 해당 프로젝트 배포페이지로 이동하지 않는다.", async () => {
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
      expect(history.location.pathname).not.toBe(`/projects/${otherProject.id}/guide`);
    });
  });
  test("프로젝트 이름에 이미 등록되어있는 프로젝트를 입력하고, 등록버튼을 누르면 해당 프로젝트 배포페이지로 이동하지 않는다.", async () => {
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
      expect(history.location.pathname).not.toBe(`/projects/${otherProject.id}/guide`);
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
      expect(push).toBeCalledWith(`/projects/${otherProject.id}/guide`);
    });
  });
});
