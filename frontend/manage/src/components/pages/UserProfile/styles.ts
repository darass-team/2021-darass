import styled from "styled-components";
import { contentBoxCSS, inputCSS, labelCSS, titleCSS } from "../../../constants/styles/css";
import Avatar from "@/components/atoms/Avatar";
import SubmitButtonComponent from "@/components/atoms/Buttons/SubmitButton";

export const Container = styled.div`
  max-width: 40rem;
  ${contentBoxCSS}
`;

export const Title = styled.h2`
  ${titleCSS}
  margin-bottom: 5rem;
  align-self: flex-start;
`;

export const Form = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 2rem;
  padding-bottom: 5rem;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 2rem;
  width: 100%;
`;

export const UserProfileImage = styled(Avatar)`
  width: 7rem;
  height: 7rem;
`;

export const Label = styled.label`
  ${labelCSS}
`;

export const CameraIcon = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 0;
`;

export const FileLabel = styled(Label)`
  transform: scale(1.8);
  margin: 0 auto;
  & > input {
    display: none;
  }
`;

export const Input = styled.input`
  ${inputCSS}
`;

export const SubmitButton = styled(SubmitButtonComponent)`
  align-items: flex-end;
  margin-top: 4rem;
`;

export const UserNameCounter = styled.span`
  align-self: flex-end;
`;
