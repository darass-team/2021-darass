import Avatar from "@/components/atoms/Avatar";
import Modal from "@/components/atoms/Modal";
import { SVG } from "@/constants/clientAssets";
import { useUserContext } from "@/hooks/context/useUserContext";

import { MouseEvent, ReactNode, useEffect, useState } from "react";
import { Container, DownArrow, UserNickName, UserOption } from "./styles";

export interface Props {
  children: ReactNode;
}

const UserAvatarOption = ({ children }: Props) => {
  const { user, isActiveAccessToken, isUserFetched } = useUserContext();
  const [isShowOptionBox, setShowOptionBox] = useState(false);
  const [isDownArrowLoaded, setIsDownArrowLoaded] = useState(false);

  const onShowOptionBox = (event: MouseEvent) => {
    event.stopPropagation();
    setShowOptionBox(state => !state);
  };

  useEffect(() => {
    setShowOptionBox(false);
  }, [user]);

  const isUserInfoReady = isActiveAccessToken && !isUserFetched;

  return (
    <Container isUserInfoReady={isUserInfoReady}>
      <Avatar imageURL={user?.profileImageUrl} onClick={onShowOptionBox} alt="유저 프로필 이미지" />
      <UserNickName onClick={onShowOptionBox}>{user?.nickName ?? "로그인"}</UserNickName>
      <DownArrow
        src={SVG.ARROW_DOWN}
        alt={`유저 옵션 드롭다운 버튼`}
        onClick={onShowOptionBox}
        isShowOptionBox={isShowOptionBox}
        isImageLoaded={isDownArrowLoaded}
        onLoad={() => {
          setIsDownArrowLoaded(true);
        }}
      />
      <Modal isOpen={isShowOptionBox} closeModal={() => setShowOptionBox(false)} dimmedOpacity={0} blockScroll={false}>
        <UserOption>{children}</UserOption>
      </Modal>
    </Container>
  );
};

export default UserAvatarOption;
