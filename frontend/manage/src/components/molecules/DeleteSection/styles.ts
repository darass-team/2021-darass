import styled from "styled-components";
import { LINE_HEIGHT_SCALE } from "../../../styles/constants";
import { subTitleCSS } from "../../../styles/css";
import { PALETTE } from "../../../styles/palette";
import DeleteButtonComponent from "../../atoms/Buttons/DeleteButton";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${PALETTE.BAR};
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
  line-height: ${1 * LINE_HEIGHT_SCALE}rem;
  font-weight: 700;
  padding: 1rem;
`;
