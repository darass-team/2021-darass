import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: fit-content;

  & > img {
    cursor: pointer;
  }
`;

const UserOptionWrapper = styled.div`
  position: absolute;
  right: 166px;
  top: 50px;
`;

export { Container, UserOptionWrapper };
