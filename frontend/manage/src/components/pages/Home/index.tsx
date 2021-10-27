import TypingText from "@/components/atoms/TypingText";
import { ROUTE } from "@/constants";
import { useDocumentTitle, useScrollFadeInOut } from "@/hooks";
import { PALETTE } from "@/constants/styles/palette";
import { useHistory } from "react-router-dom";
import {
  Button,
  Companies,
  CompanyLogo,
  Container,
  HighlightText,
  Letter,
  MainText,
  PhoneImage,
  ScrollDownTrigger,
  SectionContainer,
  Text,
  TextContentContainer
} from "./styles";
import { useUserContext } from "@/hooks/context/useUserContext";
import { PNG, SVG } from "@/constants/clientAssets";

const Home = () => {
  const history = useHistory();
  const { user } = useUserContext();
  useDocumentTitle("홈");

  const animation = {
    section1: {
      introductionText: useScrollFadeInOut({
        direction: "up",
        duration: 1,
        delay: 0
      }),
      startButton: useScrollFadeInOut({
        direction: "up",
        duration: 1,
        delay: 0.3
      })
    },
    section2: {
      questionText: useScrollFadeInOut({ direction: "up", duration: 1, delay: 0, threshold: 0.1 }),
      phoneSmall: useScrollFadeInOut({ direction: "left", duration: 1, delay: 0, threshold: 0.1, fadeType: "both" }),
      letter: {
        다: useScrollFadeInOut({ direction: "right", duration: 1, delay: 0, threshold: 0.1, fadeType: "both" }),
        라: useScrollFadeInOut({ direction: "up", duration: 1, delay: 0.2, threshold: 0.1, fadeType: "both" }),
        쓰: useScrollFadeInOut({ direction: "left", duration: 1, delay: 0.4, threshold: 0.1, fadeType: "both" })
      },
      texts: {
        check1: useScrollFadeInOut({ direction: "right", duration: 1, delay: 0, threshold: 0.1 }),
        check2: useScrollFadeInOut({ direction: "right", duration: 1, delay: 0, threshold: 0.1 }),
        check3: useScrollFadeInOut({ direction: "right", duration: 1, delay: 0, threshold: 0.1 }),
        text1: useScrollFadeInOut({ direction: "left", duration: 1, delay: 0, threshold: 0.1 }),
        text2: useScrollFadeInOut({ direction: "left", duration: 1, delay: 0, threshold: 0.1 }),
        text3: useScrollFadeInOut({ direction: "left", duration: 1, delay: 0, threshold: 0.1 })
      }
    },
    section3: {
      text: useScrollFadeInOut({ direction: "up", duration: 1, delay: 0 }),
      companies: useScrollFadeInOut({ direction: "up", duration: 1, delay: 0.3 }),
      startButton: useScrollFadeInOut({
        direction: "up",
        duration: 1,
        delay: 0.4,
        fadeType: "both"
      })
    }
  };

  const companies = [
    {
      src: PNG.WOOTECO,
      alt: "우아한 테크코스"
    },
    {
      src: PNG.BABBLE,
      alt: "Babble"
    }
  ];

  const moveLoginPage = () => {
    history.push(user ? ROUTE.AUTHORIZED.MY_PROJECT : ROUTE.NON_AUTHORIZED.LOGIN);
  };

  return (
    <>
      <SectionContainer bgImage={PNG.HOME_BACKGROUND_IMAGE_1}>
        <Container>
          <MainText {...animation.section1.introductionText}>
            댓글의 모든것,
            <br />
            <HighlightText color={PALETTE.PRIMARY}>다라쓰</HighlightText>에서 쉽고 간편하게
            <br />
            <br />
            <TypingText texts={["내 블로그에", "내 홈페이지에", "내 쇼핑몰에"]} />
            <>
              {" "}
              댓글을 <HighlightText color={PALETTE.PRIMARY}>다라쓰</HighlightText>
            </>
          </MainText>

          <Button type="button" onClick={moveLoginPage} {...animation.section1.startButton}>
            시작하기
          </Button>
        </Container>

        <ScrollDownTrigger href="#section2">
          <img src={SVG.SCROLL_DOWN} width="100px" height="100px" alt="아래로 이동" />
        </ScrollDownTrigger>
      </SectionContainer>

      <SectionContainer id="section2" bgColor={PALETTE.WHITE}>
        <Container {...animation.section2.questionText}>
          <Text as="h2" color={PALETTE.BLACK_700} fontSize={2}>
            내 모든 댓글 내역을 한눈에 조회하고 한 곳에서 관리하세요.
            <br />
            이제껏 경험 못 했던 쉽고 편리한 댓글 서비스,
            <br />
            <HighlightText color={PALETTE.SECONDARY}>다라쓰</HighlightText>와 함께라면 당신의 블로그가 새로워질 거예요.
          </Text>
          <PhoneImage src={PNG.PHONE_SMALL} alt="phone view" {...animation.section2.phoneSmall} />
        </Container>
      </SectionContainer>

      <SectionContainer id="section3" subtractMinHeight="50vh" bgImage={PNG.HOME_BACKGROUND_IMAGE_2}>
        <Container>
          <Text as="h2" color={PALETTE.WHITE} fontSize={4}>
            내 홈페이지 댓글 관리,
            <br />
            <HighlightText color={PALETTE.PRIMARY}>
              <Letter {...animation.section2.letter.다}>다</Letter>
              <Letter {...animation.section2.letter.라}>라</Letter>
              <Letter {...animation.section2.letter.쓰}>쓰</Letter>
            </HighlightText>
            와 함께하세요
          </Text>

          <TextContentContainer>
            <Text color={PALETTE.WHITE} fontSize={2} textAlign="left">
              <Letter {...animation.section2.texts.check1}>✅</Letter>
              {"   "}
              <Letter {...animation.section2.texts.text1}>손쉬운 설치</Letter>
            </Text>
            <Text color={PALETTE.WHITE} fontSize={2} textAlign="left">
              <Letter {...animation.section2.texts.check2}>✅</Letter>
              {"   "}
              <Letter {...animation.section2.texts.text2}>심플한 UI</Letter>
            </Text>
            <Text color={PALETTE.WHITE} fontSize={2} textAlign="left">
              <Letter {...animation.section2.texts.check3}>✅</Letter>
              {"   "}
              <Letter {...animation.section2.texts.text3}>무료</Letter>
            </Text>
          </TextContentContainer>
        </Container>
      </SectionContainer>

      <SectionContainer id="section4" subtractMinHeight="50vh" bgColor={PALETTE.WHITE}>
        <Container>
          <Text as="h2" color={PALETTE.BLACK_700} fontSize={3} textAlign="center" {...animation.section3.text}>
            현재 사용중인 기업들
          </Text>

          <Companies {...animation.section3.companies}>
            {companies.map(({ src, alt }) => {
              return <CompanyLogo key={alt} src={src} alt={alt} />;
            })}
          </Companies>

          <Button type="button" onClick={moveLoginPage} {...animation.section3.startButton}>
            시작하기
          </Button>
        </Container>
      </SectionContainer>
    </>
  );
};

export default Home;
