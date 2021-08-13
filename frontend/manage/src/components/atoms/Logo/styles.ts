import styled from "styled-components";
import { Size } from ".";

const logoSizeBySize = {
  SM: 40,
  MD: 90,
  LG: 150
};

export const Container = styled.img<{ size: Size }>`
  width: ${props => `${logoSizeBySize[props.size]}px`};
  height: ${props => `${logoSizeBySize[props.size]}px`};
`;
