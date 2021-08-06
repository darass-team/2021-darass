import styled from "styled-components";
import { LINE_HEIGHT_SCALE } from "../../../styles/constants";
import { PALETTE } from "../../../styles/palette";
import AvatarComponent from "../../atoms/Avatar";

export const Avatar = styled(AvatarComponent)`
  width: 4rem;
  height: 4rem;
  @media all and (max-width: 780px) {
    height: auto;
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const ContentMeta = styled.div`
  display: flex;
  align-items: center;
`;

export const Name = styled.span`
  font-size: 1.2rem;
  line-height: ${1.2 * LINE_HEIGHT_SCALE}rem;
  font-weight: 600;
  margin-right: 1rem;
  color: ${PALETTE.SECONDARY};
`;

export const Date = styled.span``;

export const Content = styled.span`
  font-size: 1.2rem;
  line-height: ${1.2 * LINE_HEIGHT_SCALE}rem;
  margin: 0.5rem 0;
`;

export const Url = styled.span`
  color: ${PALETTE.GRAY_500};
`;
