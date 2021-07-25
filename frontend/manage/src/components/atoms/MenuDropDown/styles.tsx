import styled from "styled-components";
import { PALETTE } from "../../../styles/palette";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const MainTitle = styled.button<{ isDropDown: Boolean }>`
  text-align: left;
  display: flex;
  justify-content: space-between;
  font-size: 1.4rem;
  font-weight: 700;
  padding: 0.3rem 0 0.3rem 1rem;

  transition: background-color 0.3s;

  &:hover {
    background-color: ${PALETTE.WHITE_HOVER};
  }

  & > img {
    transform: ${props => props.isDropDown && "rotate(180deg);"};
  }
`;

const SubTitle = styled.button`
  text-align: left;
  padding: 0.3rem 0 0.3rem 2rem;
  font-size: 1.2rem;
  font-weight: 700;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${PALETTE.WHITE_HOVER};
  }
`;

export { Container, MainTitle, SubTitle };
