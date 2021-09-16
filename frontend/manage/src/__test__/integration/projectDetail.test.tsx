import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import ProjectDetail from "@/components/pages/ProjectDetail";
import { ROUTE } from "@/constants";
import { useDeleteProject, useEditProject, useGetProject } from "@/hooks";
import { EditProjectRequest } from "@/types/project";
import { myProject } from "../fixture/project";

jest.mock("@/hooks/useEditProject");
jest.mock("@/hooks/useGetProject");
jest.mock("@/hooks/useDeleteProject");

window.alert = function (str) {
  console.log(str);
  return true;
};

window.confirm = function (str) {
  console.log(str);
  return true;
};

let testProject: any = null;

describe("project Detail 페이지 테스트", () => {
  beforeEach(() => {
    testProject = myProject;

    (useGetProject as jest.Mock).mockImplementation(() => {
      return {
        project: testProject,
        isLoading: false,
        error: false
      };
    });
    (useEditProject as jest.Mock).mockImplementation(() => {
      return {
        editProject: ({ id, name, description }: EditProjectRequest) => {
          testProject.id = id;
          testProject.name = name;
          testProject.description = description;
        },
        isLoading: false,
        error: false
      };
    });
    (useDeleteProject as jest.Mock).mockImplementation(() => {
      return {
        deleteProject: () => {
          testProject = null;
        },
        isLoading: false,
        error: false
      };
    });
  });

  it("프로젝트 이름 입력란에 길이 20글자 이하의 문자열을 입력하고, 수정 버튼을 누르면 프로젝트 이름이 수정할 수 있다.", async () => {
    const history = createMemoryHistory();
    const projectDetail = render(
      <Router history={history}>
        <ProjectDetail />
      </Router>
    );

    const $projectNameInput = projectDetail.getByRole("textbox", {
      name: /이름/i
    });

    const $submitButton = projectDetail.getByRole("button", {
      name: /수정/i
    });

    const projectName = "1234567890";
    fireEvent.change($projectNameInput, { target: { value: projectName } });

    fireEvent.click($submitButton);

    await waitFor(() => {
      expect(($projectNameInput as HTMLInputElement).value).toEqual(projectName);
      expect(testProject.name).toEqual(projectName);
    });
  });
  it("프로젝트 이름 입력란에 길이 20글자 초과의 문자열을 입력하고, 수정 버튼을 누르면 프로젝트 이름이 수정할 수 없다.", async () => {
    const history = createMemoryHistory();
    const projectDetail = render(
      <Router history={history}>
        <ProjectDetail />
      </Router>
    );

    const $projectNameInput = projectDetail.getByRole("textbox", {
      name: /이름/i
    });

    const $submitButton = projectDetail.getByRole("button", {
      name: /수정/i
    });

    const projectName = "1234567890".repeat(3);
    fireEvent.change($projectNameInput, { target: { value: projectName } });

    fireEvent.click($submitButton);

    await waitFor(() => {
      expect(testProject.name).not.toEqual(projectName);
    });
  });

  it("프로젝트 설명에 문자열을 입력하고, 수정 버튼을 누르면 프로젝트 설명을 수정할 수 있다.", async () => {
    const history = createMemoryHistory();
    const projectDetail = render(
      <Router history={history}>
        <ProjectDetail />
      </Router>
    );

    const $projectDescInput = projectDetail.getByRole("textbox", {
      name: /설명/i
    });

    const $submitButton = projectDetail.getByRole("button", {
      name: /수정/i
    });

    const projectDesc = "This is test project.";
    fireEvent.change($projectDescInput, { target: { value: projectDesc } });

    fireEvent.click($submitButton);

    await waitFor(() => {
      expect(testProject.description).toEqual(projectDesc);
    });
  });
  it("프로젝트 삭제 버튼을 누르면, 프로젝트 정보가 없어지고 내 프로젝트 페이지로 이동한다.", async () => {
    const history = createMemoryHistory();
    const replace = jest.spyOn(history, "replace");

    const projectDetail = render(
      <Router history={history}>
        <ProjectDetail />
      </Router>
    );

    const $deleteButton = projectDetail.getByRole("button", {
      name: /프로젝트 삭제/i
    });

    fireEvent.click($deleteButton);

    await waitFor(() => {
      expect(testProject).toBeFalsy();
      expect(replace).toBeCalledWith(ROUTE.AUTHORIZED.MY_PROJECT);
    });
  });
});
