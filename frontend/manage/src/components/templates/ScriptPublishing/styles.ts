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
  padding: 3rem 2rem;
`;

const P = styled.p`
  font-size: 1.4rem;
  word-break: keep-all;
`;

export { Container, Section, Title, CodeBlockWrapper, P };
