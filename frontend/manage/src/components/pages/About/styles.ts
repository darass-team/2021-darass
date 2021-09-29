import { contentBoxCSS } from "@/constants/styles/css";
import styled from "styled-components";
import { LINE_HEIGHT_SCALE } from "@/constants/styles/constants";
import { PALETTE } from "@/constants/styles/palette";
import AvatarComponent from "@/components/atoms/Avatar";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h2`
  font-size: 3rem;
  line-height: ${3 * LINE_HEIGHT_SCALE}rem;
  color: ${PALETTE.BLACK_700};
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
`;

export const EmployeeInfoContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;

  & > * {
    &:not(:last-child) {
      margin-bottom: 3rem;
    }
  }
`;

export const Avatar = styled(AvatarComponent)`
  width: 5rem;
  height: 5rem;
  @media all and (max-width: 780px) {
    width: 4rem;
    height: 4rem;
  }
`;

export const EmployeeInfo = styled.div`
  ${contentBoxCSS}
  flex-direction: row;
  align-items: center;
  width: 48rem;
  @media (max-width: 480px) {
    width: 30rem;
  }
`;

export const Detail = styled.div`
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
`;

export const Name = styled.span`
  font-size: 2rem;
  color: ${PALETTE.BLACK_700};
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

export const Description = styled.span`
  font-size: 1.2rem;
  line-height: ${1.2 * LINE_HEIGHT_SCALE}rem;
  word-break: break-all;
  margin: 1rem 0;
`;

export const Role = styled.span`
  font-style: italic;
  margin-bottom: 0.5rem;
`;

export const Email = styled.span``;

export const GithubLink = styled.a`
  font-weight: 600;
`;
