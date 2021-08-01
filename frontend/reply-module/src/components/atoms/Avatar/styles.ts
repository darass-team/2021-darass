import styled from "styled-components";

import { Size } from ".";

export const avatarSizeBySize = {
  SM: 1.875,
  MD: 2.5,
  LG: 5.625
};

export const Container = styled.img<{ size: Size }>`
  border-radius: 50%;
  width: ${props => `${avatarSizeBySize[props.size]}rem`};
  height: ${props => `${avatarSizeBySize[props.size]}rem`};
`;
