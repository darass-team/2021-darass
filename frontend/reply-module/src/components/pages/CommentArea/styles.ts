import styled from "styled-components";
import { PALETTE } from "../../../styles/palette";
import CommentListComponent from "../../organisms/CommentList";

export const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
`;

export const CommentCountWrapper = styled.span`
  font-size: 24px;
`;

export const CommentCount = styled.span`
  color: ${PALETTE.RED_500};
  font-weight: 800;
  margin-left: 0.5rem;
`;

export const CommentList = styled(CommentListComponent)`
  margin-top: 3rem;
`;

export const LoginMethodWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

export const LoginMethod = styled.button`
  margin-left: 0.5rem;
  font-weight: 700;
  background-color: transparent;
`;

export const LogOut = styled.button`
  font-weight: 700;
  background-color: transparent;
`;
