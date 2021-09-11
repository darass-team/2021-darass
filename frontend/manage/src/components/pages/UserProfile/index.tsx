import { ChangeEvent, FormEventHandler, useContext, useEffect, useState } from "react";
import cameraIcon from "@/assets/svg/camera.svg";
import { MAX_PROFILE_IMAGE_SIZE, MAX_USER_NAME_LENGTH } from "@/constants/validation";
import { useDeleteUser, useEditUser, useInput, useUser } from "@/hooks";
import ScreenContainer from "@/styles/ScreenContainer";
import { AlertError } from "@/utils/error";
import DeleteSection from "@/components/molecules/DeleteSection";
import {
  CameraIcon,
  Container,
  FileLabel,
  Form,
  InfoWrapper,
  Input,
  Label,
  Title,
  UserProfileImage,
  SubmitButton,
  UserNameCounter
} from "./styles";
import { accessTokenContext } from "@/contexts/AccessTokenProvider";

const UserProfile = () => {
  const { user, logout } = useContext(accessTokenContext);
  const { editUser, isLoading: isEditLoading } = useEditUser();
  const { deleteUser } = useDeleteUser();
  const {
    value: userName,
    setValue: setUserName,
    onChangeWithMaxLength: onChangeUserName
  } = useInput("", MAX_USER_NAME_LENGTH);
  const [profileImageAsUrl, setProfileImageAsUrl] = useState<string>();
  const [profileImageAsFile, setProfileImageAsFile] = useState<Blob | string>();

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const files = target?.files || [];

    if (files[0].size > MAX_PROFILE_IMAGE_SIZE) {
      alert("프로필 사진의 용량은 5MB를 초과할 수 없습니다.");

      return;
    }

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
      if (error instanceof AlertError) {
        alert(error.message);
      }
    }
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();

    try {
      if (userName.length === 0) {
        alert("유저 이름을 입력해주세요.");

        return;
      }

      const formData = new FormData();
      userName && formData.append("nickName", userName);
      profileImageAsFile && formData.append("profileImageFile", profileImageAsFile);

      await editUser(formData);

      alert("회원정보 수정에 성공하셨습니다.");
    } catch (error) {
      if (error instanceof AlertError) {
        alert(error.message);
      }
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
              <CameraIcon src={cameraIcon} alt="이미지 업로드 버튼" />
              <UserProfileImage imageURL={profileImageAsUrl} size="LG" alt="유저 프로필 이미지" />
              <Input type="file" accept="image/*" onChange={onChangeFile} data-testid="user-profile-image-input" />
            </FileLabel>
          </InfoWrapper>

          <InfoWrapper>
            <Label htmlFor="user-name-input">별명</Label>
            <Input
              id="user-name-input"
              value={userName}
              onChange={onChangeUserName}
              data-testid="user-profile-name-input"
            />
            <UserNameCounter>
              {userName.length} / {MAX_USER_NAME_LENGTH}
            </UserNameCounter>
          </InfoWrapper>

          <SubmitButton disabled={isEditLoading} data-testid="user-profile-submit-button">
            수정
          </SubmitButton>
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
