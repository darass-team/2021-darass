import styled from "styled-components";
import { PALETTE } from "./../../../styles/palette";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Section = styled.section`
  margin-bottom: 6rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 2rem;
  align-self: flex-start;
`;

const CodeBlockWrapper = styled.div`
  border-radius: 10px;
  padding: 0;
  position: relative;
  box-sizing: border-box;
`;

const CopyButton = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 1rem;

  min-width: fit-content;
  width: fit-content;
  height: 3.6rem;
  background-color: ${PALETTE.SECONDARY};
  color: ${PALETTE.WHITE};
  font-size: 1.6rem;
  font-weight: 500;
  border-radius: 10px;
  padding: 0.7rem 1.6rem;
  transform: scale(0.8);
`;

const BlogLogoWrapper = styled.div`
  margin-top: 3em;
  display: flex;
  & > * {
    margin: 0 2rem;
  }
`;

const SubTitle = styled.h3`
  font-size: 1.6rem;
  word-break: keep-all;
  margin-bottom: 1rem;
`;

const P = styled.p`
  font-size: 1.4rem;
  word-break: keep-all;
  margin-bottom: 1rem;
`;

const Ol = styled.ol`
  font-size: 1.4rem;
`;

export { Container, Section, Title, CodeBlockWrapper, BlogLogoWrapper, SubTitle, P, Ol, CopyButton };
