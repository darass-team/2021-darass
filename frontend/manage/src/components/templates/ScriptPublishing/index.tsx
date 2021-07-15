import { Container, Section, Title, CodeBlockWrapper, P } from "./styles";

const scriptCode = (projectSecretKey: string) => `
<!-- 다라쓰 설치 코드 -->
<div id="darass" data-project-key="${projectSecretKey}">
    <script type="text/javascript">
        (function () {
        // DON'T EDIT BELOW THIS LINE
        var $document = document;

        var $script = $document.createElement("script");
        $script.src = "./src/embed.js";
        $script.defer = true;

        $document.head.appendChild($script);
        })();
    </script>
    <noscript>다라쓰 댓글 작성을 위해 JavaScript를 활성화 해주세요</noscript>
</div>
<!-- 다라쓰 설치 코드 끝 --> 
`;

export interface Props {
  projectSecretKey: string;
}

const ScriptPublishing = ({ projectSecretKey }: Props) => {
  return (
    <Container>
      <Section>
        <Title>다라쓰 설치 코드</Title>
        <CodeBlockWrapper>{scriptCode(projectSecretKey)}</CodeBlockWrapper>
      </Section>

      <Section>
        <Title>코드 적용 방법</Title>
        <P>
          Condimentum venenatis blandit massa proin nunc, curabitur sit. Lacus dolor ut aliquet semper lorem eros.
          Ultrices id scelerisque aliquam mattis egestas. Orci ornare varius amet ornare. Nulla nullam imperdiet
          hendrerit cras enim quis nisi cursus. Elit massa adipiscing fermentum imperdiet vulputate iaculis malesuada.
          Urna aliquet vitae enim, id in luctus. Risus aliquam amet eu, fames iaculis mauris, metus, sem nascetur.
          Vulputate ac nibh proin nisi eu fermentum eget eu nulla. Cum id in convallis urna fringilla quam congue
          turpis. Nibh volutpat a vestibulum tempor purus odio nunc est lacus. Eros libero sed tortor aliquam purus ut.
          Faucibus at vulputate molestie congue convallis proin proin duis et. Velit tincidunt facilisis vel orci
          adipiscing id et, vel.
        </P>
      </Section>
    </Container>
  );
};

export default ScriptPublishing;
