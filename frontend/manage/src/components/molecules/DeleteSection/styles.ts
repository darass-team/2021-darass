import styled from "styled-components";
import { subTitleCSS } from "../../../styles/css";
import DeleteButtonComponent from "../../atoms/Buttons/DeleteButton";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;

  & > h3 {
    ${subTitleCSS};
    margin-top: 5rem;
  }
`;

export const DeleteWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DeleteAlertMessage = styled.span`
  font-size: 1rem;
  font-weight: 700;
`;

export const DeleteButton = styled(DeleteButtonComponent)`
  font-size: 1rem;
  font-weight: 700;
`;
