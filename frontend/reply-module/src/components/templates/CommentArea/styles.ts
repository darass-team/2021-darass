import styled from "styled-components";
import { PALETTE } from "../../../styles/palette";

const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
`;

const CommentCountWrapper = styled.span`
  font-size: 24px;
`;

const CommentCount = styled.span`
  color: ${PALETTE.RED_500};
  font-weight: 800;
  margin-left: 0.5rem;
`;

const CommentListWrapper = styled.div`
  margin-top: 3rem;
`;

export { Container, Header, CommentCountWrapper, CommentCount, CommentListWrapper };
