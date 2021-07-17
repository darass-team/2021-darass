import styled from "styled-components";
import { PALETTE } from "../../../styles/palette";

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

const B = styled.b`
  font-size: 2rem;
  word-break: keep-all;
`;

const P = styled.p`
  font-size: 1.4rem;
  word-break: keep-all;
`;

export { Container, Section, Title, CodeBlockWrapper, Content, B, P, CopyButton };
