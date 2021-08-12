import { useState } from "react";
import { Redirect, useRouteMatch } from "react-router-dom";
import { GUIDE_FILE, PROJECT_MENU, ROUTE } from "../../../constants";
import { REPLY_MODULE_BASE_URL } from "../../../constants/domain";
import { useCopyButton, useGetProject } from "../../../hooks";
import ScreenContainer from "../../../styles/ScreenContainer";
import { AlertError } from "../../../utils/error";
import BlogLogoButton from "../../atoms/Buttons/BlogLogoButton";
import GuideStep from "../../molecules/GuideStep";
import ContainerWithSideBar from "../../organisms/ContainerWithSideBar";
import { BlogLogoWrapper, CodeBlockWrapper, Container, CopyButton, Ol, Title } from "./styles";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import prism from "react-syntax-highlighter/dist/cjs/styles/prism/darcula";

SyntaxHighlighter.registerLanguage("javascript", js);

const scriptCode = (projectSecretKey: string) => `
<!-- 다라쓰 설치 코드 -->
<div id="darass" data-project-key="${projectSecretKey}">
    <script type="text/javascript" defer>
        (function () {
        var $document = document;

        var $script = $document.createElement("script");
        $script.src = "${REPLY_MODULE_BASE_URL}/embed.js";
        $script.defer = true;

        $document.head.appendChild($script);
        })();
    </script>
    <noscript>다라쓰 댓글 작성을 위해 JavaScript를 활성화 해주세요</noscript>
</div>
<!-- 다라쓰 설치 코드 끝 -->
`;

const ScriptPublishing = () => {
  const [selectedBlogInfo, setSelectedBlogInfo] = useState<ObjectValueType<typeof GUIDE_FILE>>();
  const match = useRouteMatch<{ id: string }>();

  const projectId = Number(match.params.id);
  const { project, error } = useGetProject(projectId);
  const projectSecretKey = project?.secretKey;
  const { isCopyButtonClicked, onCopy } = useCopyButton();
  const script = scriptCode(projectSecretKey || "코드를 불러오는 중입니다...");

  if (error) {
    if (error instanceof AlertError) {
      alert(error.message);
    }

    return <Redirect to={ROUTE.MY_PROJECT} />;
  }

  return (
    <ScreenContainer>
      <ContainerWithSideBar menus={PROJECT_MENU.get(projectId)}>
        <Container>
          <Title>스크립트 적용 가이드</Title>
          <GuideStep title="다라쓰를 적용할 플랫폼을 선택하세요.">
            <BlogLogoWrapper>
              {Object.values(GUIDE_FILE).map(info => (
                <BlogLogoButton
                  src={info.logoURL}
                  name={info.name}
                  key={info.name}
                  isSelected={selectedBlogInfo === info}
                  onClick={() => setSelectedBlogInfo(info)}
                />
              ))}
            </BlogLogoWrapper>
          </GuideStep>

          {selectedBlogInfo && (
            <>
              <GuideStep
                title="다라쓰 코드 설치"
                description="다라쓰를 설치하고자 하는 웹 페이지에 발급 받은 설치코드를 삽입해주세요."
              >
                <iframe src={selectedBlogInfo.iframeSrc} style={{ width: "100%", height: "650px" }} frameBorder="0" />
              </GuideStep>

              <GuideStep title="주의 사항" description="스크립트 내부의 코드는 변경해서는 안됩니다." />

              <GuideStep
                title="브라우저 지원 현황"
                description="다라쓰는 아래의 최신 브라우저 사용을 권장합니다. 구형 브라우저에서는 일부 기능이 동작하지 않을 수
                  있습니다."
              >
                <Ol>
                  <li>Chrome</li>
                  <li>Safari</li>
                  <li>Samsung browser</li>
                </Ol>
              </GuideStep>

              <GuideStep title="스크립트">
                <CodeBlockWrapper>
                  <CopyButton type="button" onClick={() => onCopy(script)}>
                    {isCopyButtonClicked ? "Copied !" : "Copy"}
                  </CopyButton>
                  <SyntaxHighlighter
                    customStyle={{
                      margin: "0",
                      borderRadius: "10px",
                      padding: "1rem 2rem"
                    }}
                    codeTagProps={{
                      style: {
                        fontFamily: "Hack, monospace"
                      }
                    }}
                    language="javascript"
                    style={prism}
                  >
                    {script}
                  </SyntaxHighlighter>
                </CodeBlockWrapper>
              </GuideStep>
            </>
          )}
        </Container>
      </ContainerWithSideBar>
    </ScreenContainer>
  );
};

export default ScriptPublishing;
