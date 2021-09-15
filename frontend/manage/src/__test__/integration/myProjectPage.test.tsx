import MyProject from "@/components/pages/MyProject";
import { ROUTE } from "@/constants";
import { useGetAllProjects } from "@/hooks";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { myProject, myProject2, myProject3 } from "../fixture/project";
import { Router } from "react-router";

jest.mock("@/hooks/useGetAllProjects");

describe("myProject 페이지 테스트", () => {
  test("프로젝트가 하나도 없는 경우 프로젝트 추가 안내 메시지를 보여준다.", () => {
    (useGetAllProjects as jest.Mock).mockImplementation(() => {
      return {
        projects: [],
        loading: false,
        error: false
      };
    });
    const history = createMemoryHistory();
    const myProjectPage = render(
      <Router history={history}>
        <MyProject />
      </Router>
    );
    const message = myProjectPage.getByTestId("myproject-no-project-message");

    expect(message).toHaveTextContent("“Add new” 버튼을 눌러 프로젝트를 추가해주세요.");
  });

  test("프로젝트가 존재하는 경우 프로젝트의 이름을 보여준다.", () => {
    const projects = [myProject, myProject2, myProject3];

    (useGetAllProjects as jest.Mock).mockImplementation(() => {
      return {
        projects,
        loading: false,
        error: false
      };
    });

    const history = createMemoryHistory();
    const myProjectPage = render(
      <Router history={history}>
        <MyProject />
      </Router>
    );
    const projectButtons = myProjectPage.getAllByTestId("project-button");

    projectButtons.forEach((projectButton, index) => {
      expect(projectButton).toHaveTextContent(projects[index].name);
    });
  });

  test("프로젝트 추가 버튼을 클릭하면 프로젝트 생성 페이지로 이동한다.", async () => {
    (useGetAllProjects as jest.Mock).mockImplementation(() => {
      return {
        projects: [],
        loading: false,
        error: false
      };
    });

    const history = createMemoryHistory();
    const myProjectPage = render(
      <Router history={history}>
        <MyProject />
      </Router>
    );

    const addNewProjectButton = myProjectPage.getByRole("button", {
      name: /add new/i
    });
    const push = jest.spyOn(history, "push");
    fireEvent.click(addNewProjectButton);

    await waitFor(() => {
      expect(push).toBeCalledWith(ROUTE.AUTHORIZED.NEW_PROJECT);
    });
  });

  test("프로젝트 버튼을 클릭하면 프로젝트 스크립트 가이드 페이지로 이동한다.", async () => {
    const projects = [myProject, myProject2, myProject3];

    (useGetAllProjects as jest.Mock).mockImplementation(() => {
      return {
        projects,
        loading: false,
        error: false
      };
    });

    const history = createMemoryHistory();
    const myProjectPage = render(
      <Router history={history}>
        <MyProject />
      </Router>
    );

    const projectButton = myProjectPage.getAllByTestId("project-button")[0];
    const push = jest.spyOn(history, "push");
    fireEvent.click(projectButton);

    await waitFor(() => {
      expect(push).toBeCalledWith(`/projects/${projects[0].id}/guide`);
    });
  });
});
