import styled from "styled-components";
import { PALETTE } from "../../../styles/palette";

export const Container = styled.div``;

export const Title = styled.h3`
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${PALETTE.GRAY_400};
`;

export const UserGrid = styled.div`
  padding-top: 0.7rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 1rem;
  width: 20rem;
  max-height: 20rem;
  overflow-y: scroll;
`;

export const UserWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const UserNickName = styled.span`
  margin-left: 0.5rem;
  font-size: 0.8rem;
  max-width: 5rem;
  word-break: break-all;
`;
