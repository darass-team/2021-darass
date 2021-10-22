import { LINE_HEIGHT_SCALE } from "@/constants/styles/constants";
import { PALETTE } from "@/constants/styles/palette";
import styled from "styled-components";

export const AlarmHeader = styled.div`
  position: sticky;
  top: 0;
  padding: 1rem;
  background-color: ${PALETTE.WHITE};
  line-height: ${1 * LINE_HEIGHT_SCALE};
`;

export const NotificationCount = styled.span`
  color: ${({ theme }) => theme.primaryColor};
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
  padding-right: 2rem;

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
  color: ${({ theme }) => theme.primaryColor};
`;

export const Text = styled.span`
  line-height: ${1.2 * LINE_HEIGHT_SCALE}rem;
  margin-top: 0.5rem;
  box-orient: vertical;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Url = styled.span`
  color: ${PALETTE.GRAY_500};
`;

export const LockIcon = styled.span`
  margin-left: 0.5rem;
`;
