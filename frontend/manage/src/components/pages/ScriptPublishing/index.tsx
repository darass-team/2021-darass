import { useState } from "react";
import { Redirect, useRouteMatch } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { GUIDE_FILE, PROJECT_MENU, ROUTE } from "../../../constants";
import { useCopyButton, useGetProject } from "../../../hooks";
import ScreenContainer from "../../../styles/ScreenContainer";
import { MenuType } from "../../../types/menu";
import BlogLogoButton from "../../atoms/Buttons/BlogLogoButton";
import ProjectSideBar from "../../organisms/SideBar";
import SideBarTemplate from "../../organisms/SideBarTemplate";
import { BlogLogoWrapper, CodeBlockWrapper, Container, CopyButton, Ol, P, Section, SubTitle, Title } from "./styles";

const scriptCode = (projectSecretKey: string) => `
<!-- 다라쓰 설치 코드 -->
<div id="darass" data-project-key="${projectSecretKey}">
    <script type="text/javascript" defer>
        (function () {
        var $document = document;

        var $script = $document.createElement("script");
        $script.src = "https://d1edjs6hdnpl8s.cloudfront.net/embed.js";
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
    return <Redirect to={ROUTE.MY_PROJECT} />;
  }

  return (
    <ScreenContainer>
      <SideBarTemplate menus={PROJECT_MENU.get(projectId)}>
        <Container>
          <Title>스크립트 적용 가이드</Title>
          <Section>
            <SubTitle>다라쓰를 적용할 플랫폼을 선택하세요.</SubTitle>
            <BlogLogoWrapper>
              {Object.entries(GUIDE_FILE).map(([blogName, info]) => (
                <BlogLogoButton
                  src={info.logoURL}
                  name={info.name}
                  key={info.name}
                  isSelected={selectedBlogInfo === info}
                  onClick={() => setSelectedBlogInfo(info)}
                />
              ))}
            </BlogLogoWrapper>
          </Section>
          {selectedBlogInfo && (
            <>
              <Section>
                <SubTitle>다라쓰 코드 설치</SubTitle>
                <P> 다라쓰를 설치하고자 하는 웹 페이지에 발급 받은 설치코드를 삽입해주세요.</P>
                <iframe src={selectedBlogInfo.iframeSrc} style={{ width: "100%", height: "650px" }} frameBorder="0" />
              </Section>

              <Section>
                <SubTitle>주의 사항</SubTitle>
                <P>스크립트 내부의 코드는 변경해서는 안됩니다.</P>
              </Section>

              <Section>
                <SubTitle>브라우저 지원 현황</SubTitle>
                <P>
                  다라쓰는 아래의 최신 브라우저 사용을 권장합니다. 구형 브라우저에서는 일부 기능이 동작하지 않을 수
                  있습니다.
                </P>
                <Ol>
                  <li>Chrome</li>
                  <li>Safari</li>
                  <li>Samsung browser</li>
                </Ol>
              </Section>

              <Section>
                <SubTitle>스크립트</SubTitle>
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
                    style={atomOneDark}
                  >
                    {script}
                  </SyntaxHighlighter>
                </CodeBlockWrapper>
              </Section>
            </>
          )}
        </Container>
      </SideBarTemplate>
    </ScreenContainer>
  );
};

export default ScriptPublishing;
