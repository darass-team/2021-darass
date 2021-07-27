import { ChangeEvent, useEffect, useState } from "react";
import cameraIcon from "../../../assets/svg/camera.svg";
import { useInput, useUser } from "../../../hooks";
import ScreenContainer from "../../../styles/ScreenContainer";
import {
  CameraIcon,
  Container,
  FileLabel,
  Form,
  InfoWrapper,
  Input,
  Label,
  SubmitButton,
  Title,
  UserProfileImage
} from "./styles";

const UserProfile = () => {
  const { user } = useUser();
  const { value: userName, setValue: setUserName, onChange: onChangeUserName } = useInput("");

  const [profileImage, setProfileImage] = useState<string>();

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const files = target?.files || [];

    setProfileImage(URL.createObjectURL(files[0]));
  };

  useEffect(() => {
    if (user) {
      setUserName(user.nickName);
      setProfileImage(user.profileImageUrl);
    }
  }, [user]);

  return (
    <ScreenContainer>
      <Container>
        <Form>
          <Title>프로필</Title>

          <InfoWrapper>
            <Label>사진</Label>
            <FileLabel>
              <CameraIcon src={cameraIcon} />
              <UserProfileImage imageURL={profileImage} size="LG" />
              <Input type="file" accept="image/*" onChange={onChangeFile} />
            </FileLabel>
          </InfoWrapper>

          <InfoWrapper>
            <Label>별명</Label>
            <Input value={userName} onChange={onChangeUserName} />
          </InfoWrapper>

          <SubmitButton>수정</SubmitButton>
        </Form>
      </Container>
    </ScreenContainer>
  );
};

export default UserProfile;
