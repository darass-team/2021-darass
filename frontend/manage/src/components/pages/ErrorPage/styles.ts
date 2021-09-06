import styled from "styled-components";
import ErrorNoticeComponent from "@/components/organisms/ErrorNotice";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -2rem;
`;

export const ErrorNotice = styled(ErrorNoticeComponent)`
  transform: scale(1.2);
`;
