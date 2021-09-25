import { LINE_HEIGHT_SCALE } from "@/constants/styles/constants";
import { PALETTE } from "@/constants/styles/palette";
import styled from "styled-components";

export const AlarmHeader = styled.div`
  padding: 1rem;
  background-color: ${PALETTE.WHITE};
  line-height: ${1 * LINE_HEIGHT_SCALE};
`;

export const NotificationCount = styled.span`
  color: ${PALETTE.SECONDARY};
  font-weight: 700;
`;

export const NoContent = styled.div`
  width: 100%;
  height: auto;
  border-top: 1px solid ${PALETTE.GRAY_400};
  border-bottom: none;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled(NoContent)`
  cursor: pointer;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: ${PALETTE.GRAY_300};
    }
  }
`;
export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;

export const Notification = styled.span`
  display: flex;
  justify-content: space-between;
`;

export const Name = styled.span`
  line-height: ${1.2 * LINE_HEIGHT_SCALE}rem;
  font-weight: 600;
  color: ${PALETTE.SECONDARY};
`;

export const Text = styled.span`
  display: flex;
  line-height: ${1.2 * LINE_HEIGHT_SCALE}rem;
  margin-top: 0.5rem;
`;

export const Url = styled.span`
  color: ${PALETTE.GRAY_500};
`;
