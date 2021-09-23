import ScriptPublishing from "@/components/pages/ScriptPublishing";
import { useGetProject } from "@/hooks";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router";
import { myProject3 } from "../fixture/project";
import { socialLoginUser2 } from "../fixture/user";

jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useRouteMatch: () => {
      return {
        params: {
          id: `${socialLoginUser2.id}`
        }
      };
    }
  };
});
jest.mock("@/hooks/api/project/useGetProject");

describe("스크립트 코드 페이지 테스트", () => {
  beforeEach(() => {
    (useGetProject as jest.Mock).mockImplementation(() => {
      return {
        project: myProject3,
        error: false,
        secretKey: myProject3.secretKey,
        isSuccess: true
      };
    });
  });
  test("페이지 첫 진입시, 블로그 상세 가이드가 노출되지 않는다.", () => {
    const history = createMemoryHistory();

    const scriptPublishingPage = render(
      <Router history={history}>
        <ScriptPublishing />
      </Router>
    );

    expect(
      scriptPublishingPage.queryByRole("heading", {
        name: /다라쓰 코드 설치/i
      })
    ).toBeFalsy();

    expect(
      scriptPublishingPage.queryByRole("heading", {
        name: /주의 사항/i
      })
    ).toBeFalsy();

    expect(
      scriptPublishingPage.queryByRole("heading", {
        name: /브라우저 지원 현황/i
      })
    ).toBeFalsy();

    expect(
      scriptPublishingPage.queryByRole("button", {
        name: /copy/i
      })
    ).toBeFalsy();
  });
  test("블로그 로고 클릭 시, 해당 블로그 상세 가이드가 노출된다.", () => {
    const history = createMemoryHistory();

    const scriptPublishingPage = render(
      <Router history={history}>
        <ScriptPublishing />
      </Router>
    );

    const tistoryLogo = scriptPublishingPage.getByRole("img", {
      name: /티스토리/i
    });

    fireEvent.click(tistoryLogo);

    expect(
      scriptPublishingPage.queryByRole("heading", {
        name: /다라쓰 코드 설치/i
      })
    ).toBeTruthy();

    expect(
      scriptPublishingPage.queryByRole("heading", {
        name: /주의 사항/i
      })
    ).toBeTruthy();

    expect(
      scriptPublishingPage.queryByRole("heading", {
        name: /브라우저 지원 현황/i
      })
    ).toBeTruthy();

    expect(
      scriptPublishingPage.queryByRole("button", {
        name: /copy/i
      })
    ).toBeTruthy();
  });
  test("스크립트 코드의 Copy 버튼을 누를 시, 버튼의 문구가 Copied로 변경된다.", () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {}
      }
    });

    const history = createMemoryHistory();

    const scriptPublishingPage = render(
      <Router history={history}>
        <ScriptPublishing />
      </Router>
    );

    const tistoryLogo = scriptPublishingPage.getByRole("img", {
      name: /티스토리/i
    });

    fireEvent.click(tistoryLogo);

    const copyButton = scriptPublishingPage.getByRole("button", {
      name: /copy/i
    });

    fireEvent.click(copyButton);

    expect(
      scriptPublishingPage.queryByRole("button", {
        name: /copied !/i
      })
    ).toBeTruthy();
  });

  test("스크립트 코드의 Copy 버튼은 1번이상 연속으로 눌러도 버튼의 문구가 Copied으로 유지된다.", () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {}
      }
    });

    const history = createMemoryHistory();

    const scriptPublishingPage = render(
      <Router history={history}>
        <ScriptPublishing />
      </Router>
    );

    const tistoryLogo = scriptPublishingPage.getByRole("img", {
      name: /티스토리/i
    });

    fireEvent.click(tistoryLogo);

    const copyButton = scriptPublishingPage.getByRole("button", {
      name: /copy/i
    });

    fireEvent.click(copyButton);

    const copiedButton = scriptPublishingPage.getByRole("button", {
      name: /copied !/i
    });

    fireEvent.click(copiedButton);

    expect(
      scriptPublishingPage.queryByRole("button", {
        name: /copied !/i
      })
    ).toBeTruthy();
  });
  test("스크립트 코드에는 해당 프로젝트의 시크릿키가 노출된다.", () => {
    const history = createMemoryHistory();

    const scriptPublishingPage = render(
      <Router history={history}>
        <ScriptPublishing />
      </Router>
    );

    const tistoryLogo = scriptPublishingPage.getByRole("img", {
      name: /티스토리/i
    });

    fireEvent.click(tistoryLogo);

    expect(scriptPublishingPage.container).toHaveTextContent(myProject3.secretKey);
  });
});
