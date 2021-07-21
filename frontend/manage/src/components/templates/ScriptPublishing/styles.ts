import { PALETTE } from "./../../../styles/palette";
import styled from "styled-components";

const Container = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Section = styled.section`
  margin-bottom: 6rem;
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
`;

const CopyButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 2rem;

  min-width: 10rem;
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
