import styled from "styled-components";

import { Size } from ".";

const avatarSizeBySize = {
  SM: 30,
  MD: 40,
  LG: 90
};

const Container = styled.img<{ size: Size }>`
  border-radius: 50%;
  width: ${props => `${avatarSizeBySize[props.size]}px`};
  height: ${props => `${avatarSizeBySize[props.size]}px`};
`;

export { Container };
