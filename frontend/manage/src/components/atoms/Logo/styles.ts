import styled from "styled-components";
import { Size } from ".";

const logoSizeBySize = {
  SM: 60,
  MD: 90,
  LG: 150,
  XL: 300
};

const Container = styled.img<{ size: Size }>`
  margin: 0 auto;
  width: ${props => `${logoSizeBySize[props.size]}px`};
  height: ${props => `${logoSizeBySize[props.size]}px`};
`;

export { Container };
