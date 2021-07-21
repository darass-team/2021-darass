import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { xcode } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { GUIDE_FILE } from "../../../constants";
import { useCopyButton } from "../../../hooks";
import ScreenContainer from "../../../styles/ScreenContainer";
import {
  B,
  CodeBlockWrapper,
  Container,
  Content,
  CopyButton,
  P,
  Ol,
  Section,
  Title,
  BlogLogoWrapper,
  BlogLogo
} from "./styles";

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

export interface Props {
  projectSecretKey?: string;
}

const ScriptPublishing = ({ projectSecretKey }: Props) => {
  const [selectedBlogInfo, setSelectedBlogInfo] = useState(GUIDE_FILE.UNIVERSAL);
  const { isCopyButtonClicked, onCopy } = useCopyButton();
  const script = scriptCode(projectSecretKey || "코드를 불러오는 중입니다...");

  return (
    <ScreenContainer>
      <Container>
        <Section>
          <Title>스크립트</Title>
          <CodeBlockWrapper>
            <CopyButton type="button" onClick={() => onCopy(script)}>
              {isCopyButtonClicked ? "Copied !" : "Copy"}
            </CopyButton>
            <SyntaxHighlighter language="javascript" style={xcode}>
              {script}
            </SyntaxHighlighter>
          </CodeBlockWrapper>
        </Section>

        <Section>
          <Title>스크립트 적용 가이드</Title>

          <BlogLogoWrapper>
            {console.log()}
            {Object.entries(GUIDE_FILE).map(([blogName, info]) => (
              <BlogLogo src={info.logoURL} alt={blogName} key={blogName} onClick={() => setSelectedBlogInfo(info)} />
            ))}
          </BlogLogoWrapper>

          <Content>
            <B>1. 다라쓰 코드 설치</B>
            <P> 다라쓰를 설치하고자 하는 위치에 홈페이지에서 발급 받은 설치코드를 삽입해주세요.</P>
            <iframe src={selectedBlogInfo.iframeSrc} style={{ width: "100%", height: "700px" }} frameBorder="0" />
          </Content>

          <Content>
            <B>2. 주의 사항</B>
            <P>스크립트 내부의 코드는 변경해서는 안됩니다.</P>
          </Content>

          <Content>
            <B>3. 브라우저 지원 현황</B>
            <P>
              다라쓰는 아래의 최신 브라우저 사용을 권장합니다. 구형 브라우저에서는 일부 기능이 동작하지 않을 수
              있습니다.
            </P>
            <Ol>
              <li>Chrome</li>
              <li>Safari</li>
              <li>Samsung browser</li>
            </Ol>
          </Content>
        </Section>
      </Container>
    </ScreenContainer>
  );
};

export default ScriptPublishing;
