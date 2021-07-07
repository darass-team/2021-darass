import styled from "styled-components";

const Container = styled.div<{ $width: number; $height: number }>`
  background-size: ${props => `${props.$width} ${props.$height}`};
`;

export { Container };
