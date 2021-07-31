import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import cameraIcon from "../../../assets/svg/camera.svg";
import { useDeleteUser, useEditUser, useInput, useUser } from "../../../hooks";
import ScreenContainer from "../../../styles/ScreenContainer";
import SubmitButton from "../../atoms/Buttons/SubmitButton";
import DeleteSection from "../../molecules/DeleteSection";
import { CameraIcon, Container, FileLabel, Form, InfoWrapper, Input, Label, Title, UserProfileImage } from "./styles";

const UserProfile = () => {
  const { user, logout } = useUser();
  const { editUser } = useEditUser();
  const { deleteUser } = useDeleteUser();
  const { value: userName, setValue: setUserName, onChange: onChangeUserName } = useInput("");
  const [profileImageAsUrl, setProfileImageAsUrl] = useState<string>();
  const [profileImageAsFile, setProfileImageAsFile] = useState<Blob | string>();

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const files = target?.files || [];

    setProfileImageAsUrl(state => {
      URL.revokeObjectURL(state || "");

      return URL.createObjectURL(files[0]);
    });

    setProfileImageAsFile(files[0]);
  };

  const confirmDeleteUser = async () => {
    if (!user) return;
    if (!confirm(`${user.nickName}님 정말로 회원탈퇴를 하시겠습니까?`)) return;

    try {
      await deleteUser();

      alert("회원탈퇴에 성공하셨습니다.");
      logout();
    } catch (error) {
      alert("회원탈퇴에 실패하였습니다.");
      console.error(error.message);
    }
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();

    try {
      const formData = new FormData();
      userName && formData.append("nickName", userName);
      profileImageAsFile && formData.append("profileImageFile", profileImageAsFile);

      await editUser(formData);
    } catch (error) {
      alert(error.response.data.message);
      console.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (user) {
      setUserName(user.nickName);
      setProfileImageAsUrl(user.profileImageUrl);
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
              <UserProfileImage imageURL={profileImageAsUrl} size="LG" />
              <Input type="file" accept="image/*" onChange={onChangeFile} />
            </FileLabel>
          </InfoWrapper>

          <InfoWrapper>
            <Label>별명</Label>
            <Input value={userName} onChange={onChangeUserName} />
          </InfoWrapper>

          <SubmitButton>수정</SubmitButton>
        </Form>

        <DeleteSection
          onDelete={confirmDeleteUser}
          title="회원탈퇴"
          message="회원탈퇴를 하게 되면 내 프로젝트와 연결된 모든 정보들이 삭제됩니다."
          buttonText="회원탈퇴"
        />
      </Container>
    </ScreenContainer>
  );
};

export default UserProfile;
