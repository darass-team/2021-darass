import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import cameraIcon from "../../../assets/svg/camera.svg";
import { useEditUser, useInput, useUser } from "../../../hooks";
import ScreenContainer from "../../../styles/ScreenContainer";
import SubmitButton from "../../atoms/Buttons/SubmitButton";
import { CameraIcon, Container, FileLabel, Form, InfoWrapper, Input, Label, Title, UserProfileImage } from "./styles";

const UserProfile = () => {
  const { user } = useUser();
  const { editUser } = useEditUser();
  const { value: userName, setValue: setUserName, onChange: onChangeUserName } = useInput("");

  const [profileImage, setProfileImage] = useState<string>();

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const files = target?.files || [];

    setProfileImage(URL.createObjectURL(files[0]));
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();

    try {
      await editUser({ nickName: userName });
    } catch (error) {
      alert(error.response.data.message);
      console.error(error.response.data.message);
    }
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
        <Form onSubmit={onSubmit}>
          <Title>프로필</Title>

          <InfoWrapper>
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
