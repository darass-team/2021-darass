import styled from "styled-components";
import { InputCSS } from "../../../styles/css";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TextArea = styled.textarea`
  ${InputCSS};
  padding: 1.6rem;
  height: 9rem;
  margin-bottom: 1.6rem;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GuestInfo = styled.input`
  ${InputCSS};
  padding: 1.1rem 1.6rem;
  width: 10rem;
  height: 3.6rem;
  line-height: 1.4rem;

  :first-child {
    margin-right: 1.6rem;
  }
`;

export { Container, TextArea, Wrapper, GuestInfo };
