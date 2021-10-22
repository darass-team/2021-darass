import ScreenContainer from "@/components/@style/ScreenContainer";
import BlogLogoButton from "@/components/atoms/Buttons/BlogLogoButton";
import SubmitButton from "@/components/atoms/Buttons/SubmitButton";
import CheckBox from "@/components/atoms/CheckBox";
import DarkModeToggleButton from "@/components/molecules/DarkModeToggleButton";
import GuideStep from "@/components/molecules/GuideStep";
import ContainerWithSideBar from "@/components/organisms/ContainerWithSideBar";
import { GUIDE_FILE, PROJECT_MENU, ROUTE } from "@/constants";
import { REPLY_MODULE_DOMAIN } from "@/constants/domain";
import { useCopyButton, useDocumentTitle, useGetProject } from "@/hooks";
import Darass from "darass-react";
import { useState } from "react";
import { Redirect, useRouteMatch } from "react-router-dom";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import prism from "react-syntax-highlighter/dist/cjs/styles/prism/darcula";
import {
  BlogLogoWrapper,
  CodeBlockWrapper,
  Container,
  CopyButton,
  FormLabel,
  FormRow,
  Ol,
  PreviewForm,
  ScriptContainer,
  Title
} from "./styles";

SyntaxHighlighter.registerLanguage("javascript", js);

const htmlScriptCode = (projectSecretKey: string, isDarkModePage = false, primaryColor = "#10DF99") => `
<!-- 다라쓰 설치 코드 -->
<div id="darass" 
    data-project-key="${projectSecretKey}" 
    data-dark-mode="${isDarkModePage}"
    data-primary-color="${primaryColor}"
    >
    <script type="text/javascript" defer>
        (function () {
        var $document = document;

        var $script = $document.createElement("script");
        $script.src = "${REPLY_MODULE_DOMAIN}/embed.js";
        $script.defer = true;

        $document.head.appendChild($script);
        })();
    </script>
    <noscript>다라쓰 댓글 작성을 위해 JavaScript를 활성화 해주세요</noscript>
</div>
<!-- 다라쓰 설치 코드 끝 -->
`;

const JsxScriptCode = (projectSecretKey: string, isDarkModePage = false, primaryColor = "#10DF99") => `
import Darass from "darass-react";

<Darass projectKey="${projectSecretKey}" darkMode={${isDarkModePage}} primaryColor="${primaryColor}"/>;
`;

const ScriptPublishing = () => {
  const [selectedBlogInfo, setSelectedBlogInfo] = useState<ObjectValueType<typeof GUIDE_FILE>>();
  const [isDarkModePage, setIsDarkModePage] = useState(false);
  const match = useRouteMatch<{ id: string }>();

  const projectId = Number(match.params.id);
  const { project } = useGetProject({
    id: projectId
  });

  const projectSecretKey = project?.secretKey || "스크립트 정보를 불러오는 중입니다...";
  const { isCopyButtonClicked, onCopy } = useCopyButton();
  useDocumentTitle("스크립트 발급");

  const script =
    selectedBlogInfo?.scriptType === "HTML"
      ? htmlScriptCode(projectSecretKey, isDarkModePage)
      : JsxScriptCode(projectSecretKey, isDarkModePage);

  if (Number.isNaN(projectId)) {
    return <Redirect to={ROUTE.COMMON.HOME} />;
  }

  return (
    <ScreenContainer>
      <ContainerWithSideBar menus={PROJECT_MENU.getByProjectId(projectId)}>
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
                <iframe
                  title="install-guide"
                  src={selectedBlogInfo.iframeSrc}
                  style={{ width: "100%", height: "650px" }}
                  frameBorder="0"
                />
              </GuideStep>

              <GuideStep title="주의 사항" description="스크립트 내부의 코드는 변경해서는 안됩니다." />

              <GuideStep
                title="브라우저 지원 현황"
                description="다라쓰는 아래의 최신 브라우저 사용을 권장합니다. 구형 브라우저에서는 일부 기능이 동작하지 않을 수
                  있습니다."
              >
                <Ol>
                  <li>Chrome</li>
                  <li>FireFox</li>
                  <li>Samsung browser</li>
                </Ol>
              </GuideStep>

              <GuideStep title="UI 커스텀">
                <PreviewForm>
                  <FormRow>
                    <FormLabel>삽입할 페이지가 어둡나요?</FormLabel>
                    <DarkModeToggleButton
                      isDarkModePage={isDarkModePage}
                      onToggleDarkMode={() => setIsDarkModePage(state => !state)}
                    />
                  </FormRow>
                  <FormRow>
                    <FormLabel>어떤 색상이 페이지와 가장 잘어울리나요?</FormLabel>
                    <input type="color" />
                  </FormRow>
                  <FormRow>
                    <FormLabel>댓글 정렬기능이 필요한가요?</FormLabel>
                    <CheckBox isChecked={false} onChange={() => {}} />
                  </FormRow>
                  <FormRow>
                    <FormLabel>소셜 로그인을 허용할까요?</FormLabel>
                    <CheckBox isChecked={false} onChange={() => {}} />
                  </FormRow>
                  <FormRow>
                    <FormLabel>다라쓰의 로고를 보일까요?</FormLabel>
                    <CheckBox isChecked={false} onChange={() => {}} />
                  </FormRow>

                  <SubmitButton>적용</SubmitButton>
                </PreviewForm>
              </GuideStep>

              <GuideStep title="미리보기">
                <ScriptContainer isDarkModePage={isDarkModePage}>
                  <Darass
                    key={`${isDarkModePage}`}
                    projectKey="Veo0nVY3H4aiNUt1"
                    darkMode={isDarkModePage}
                    primaryColor="#FF0000"
                  />
                </ScriptContainer>
              </GuideStep>

              <GuideStep title="스크립트">
                {project && (
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
                )}
              </GuideStep>
            </>
          )}
        </Container>
      </ContainerWithSideBar>
    </ScreenContainer>
  );
};

export default ScriptPublishing;
