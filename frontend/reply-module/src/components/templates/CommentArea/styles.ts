import styled from "styled-components";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  & > *:first-child {
    margin-bottom: 2.4rem;
  }
`;

export { Container };
