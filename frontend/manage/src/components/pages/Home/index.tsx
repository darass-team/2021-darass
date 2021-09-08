import { useHistory } from "react-router-dom";
import { ROUTE } from "@/constants";
import { useScrollFadeInOut } from "@/hooks";
import { PALETTE } from "@/styles/palette";
import ScreenContainer from "@/styles/ScreenContainer";
import Logo from "@/components/atoms/Logo";
import {
  Button,
  Container,
  MainText,
  Text,
  ScrollDownTrigger,
  SectionContainer,
  PhoneImage,
  HighlightText,
  Letter,
  Companies,
  CompanyLogo,
  TextContentContainer
} from "./styles";
import scrollDownButton from "@/assets/svg/scroll-down.svg";
import phoneSmall from "@/assets/png/phone_small.png";
import homeBackgroundImage from "@/assets/png/home_background_image.png";
import homeBackgroundImage2 from "@/assets/png/home_background_image2.png";
import wooteco from "@/assets/png/wooteco.png";

const Home = () => {
  const history = useHistory();

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
        라: useScrollFadeInOut({ direction: "up", duration: 1, delay: 0, threshold: 0.1, fadeType: "both" }),
        쓰: useScrollFadeInOut({ direction: "left", duration: 1, delay: 0, threshold: 0.1, fadeType: "both" })
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
      text: useScrollFadeInOut({ direction: "up", duration: 1, delay: 0, threshold: 0.1 }),
      companies: useScrollFadeInOut({ direction: "up", duration: 1, delay: 0.5, threshold: 0.1 })
    }
  };

  const companies = [
    {
      src: wooteco,
      alt: "우아한 테크코스"
    }
  ];

  const moveLoginPage = () => {
    history.push(ROUTE.LOGIN);
  };

  return (
    <>
      <ScreenContainer bgImage={homeBackgroundImage}>
        <Container>
          <MainText {...animation.section1.introductionText}>
            댓글의 모든것,
            <br />
            다라쓰에서 쉽고 간편하게
          </MainText>

          <Button type="button" onClick={moveLoginPage} {...animation.section1.startButton}>
            Get Started
          </Button>

          <ScrollDownTrigger href="#section2">
            <img src={scrollDownButton} width="100px" height="100px" />
          </ScrollDownTrigger>
        </Container>
      </ScreenContainer>

      <SectionContainer id="section2" minHeightVh={100} bgColor={PALETTE.WHITE}>
        <Container {...animation.section2.questionText}>
          <Text color={PALETTE.BLACK_700} fontSize={2}>
            내 모든 댓글 내역을 한눈에 조회하고 한 곳에서 관리하세요.
            <br />
            이제껏 경험 못 했던 쉽고 편리한 댓글 서비스,
            <br />
            <HighlightText color={PALETTE.SECONDARY}>다라쓰</HighlightText>와 함께라면 당신의 블로그가 새로워질 거예요.
          </Text>
          <PhoneImage src={phoneSmall} {...animation.section2.phoneSmall} />
        </Container>
      </SectionContainer>

      <SectionContainer id="section3" minHeightVh={50} bgImage={homeBackgroundImage2}>
        <Container>
          <Text color={PALETTE.WHITE} fontSize={4} textAlign="left">
            내 블로그의 첫걸음,
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

      <SectionContainer id="section4" minHeightVh={50} bgColor={PALETTE.PRIMARY}>
        <Container>
          <Text color={PALETTE.WHITE} fontSize={3} textAlign="center" {...animation.section3.text}>
            현재 사용중인 기업들
          </Text>

          <Companies {...animation.section3.companies}>
            {companies.map(({ src, alt }) => {
              return <CompanyLogo key={alt} src={src} alt={alt} />;
            })}
          </Companies>
        </Container>
      </SectionContainer>
    </>
  );
};

export default Home;
