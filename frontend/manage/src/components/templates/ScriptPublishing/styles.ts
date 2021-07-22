import styled from "styled-components";
import { PALETTE } from "./../../../styles/palette";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Section = styled.section`
  margin-bottom: 6rem;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 2.4rem;
  font-weight: 800;
  margin-bottom: 2rem;
  align-self: flex-start;
`;

const CodeBlockWrapper = styled.div`
  border: 1px solid ${PALETTE.BLACK_700};
  border-radius: 10px;
  padding: 0 2rem;
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

const Content = styled.div`
  margin-top: 5rem;
`;

const BlogLogoWrapper = styled.div`
  display: flex;
  & > * {
    margin: 0 1rem;
  }
`;

const BlogLogo = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  object-fit: contain;
  cursor: pointer;
  border: 1px solid ${PALETTE.BLACK_700};
`;

const B = styled.b`
  font-size: 2rem;
  word-break: keep-all;
`;

const P = styled.p`
  font-size: 1.4rem;
  word-break: keep-all;
`;

const Ol = styled.ol`
  font-size: 1.4rem;
`;

export { Container, Section, Title, CodeBlockWrapper, Content, BlogLogoWrapper, BlogLogo, B, P, Ol, CopyButton };
