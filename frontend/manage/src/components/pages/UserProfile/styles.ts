import styled from "styled-components";
import { PALETTE } from "../../../styles/palette";
import Avatar from "../../atoms/Avatar";
import SubmitButtonComponent from "../../atoms/SubmitButton";

export const Container = styled.div`
  width: 45rem;
  padding: 6rem 5.5rem;
  background-color: ${PALETTE.WHITE};
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
`;

export const Title = styled.h2`
  font-size: 1.6rem;
  font-weight: 800;
  margin-bottom: 3rem;
  align-self: flex-start;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 4rem;
`;

export const UserProfileImage = styled(Avatar)`
  width: 100%;
  height: 100%;
`;

export const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
  align-self: flex-start;
  margin-bottom: 0.8rem;
`;

export const CameraIcon = styled.img`
  background-position: 0px -46px;
  background-size: 25px 207px;
  width: 30px;
  height: 30px;
  background-repeat: no-repeat;
  display: inline-block;
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 0;
`;

export const FileLabel = styled(Label)`
  position: relative;
  transform: scale(1.8);
  margin: 0 auto;
  > input {
    display: none;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 3rem;
  border: 1px solid ${PALETTE.BLACK_700};
  border-radius: 10px;
  font-size: 1.2rem;
  padding: 0.7rem 1rem;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${PALETTE.BLACK_700};
  }
`;

export const SubmitButton = styled(SubmitButtonComponent)`
  background-color: ${PALETTE.GRAY_300};
  color: ${PALETTE.BLACK_700};
`;
