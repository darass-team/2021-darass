import styled from "styled-components";
import { contentBoxCSS, inputCSS, labelCSS, titleCSS } from "../../../styles/css";
import Avatar from "../../atoms/Avatar";

export const Container = styled.div`
  width: 40rem;
  ${contentBoxCSS}
`;

export const Title = styled.h2`
  ${titleCSS}
  margin-bottom: 5rem;
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
  position: relative;
  transform: scale(1.8);
  margin: 0 auto;
  > input {
    display: none;
  }
`;

export const Input = styled.input`
  ${inputCSS}
`;
