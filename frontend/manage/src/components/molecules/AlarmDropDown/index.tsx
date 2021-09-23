import Alarm from "@/components/atoms/Alarm";
import Avatar from "@/components/atoms/Avatar";
import { User } from "@/types/user";
import { getTimeDifference } from "@/utils/time";
import { useState } from "react";
import {
  Container,
  DropDownContainer,
  DropDownContent,
  DropDownHeader,
  NotificationCount,
  ContentWrapper,
  Name,
  Content,
  Notification,
  Url
} from "./styles";

interface AlarmContent {
  user: User;
  url: string;
  content: string;
  time: string;
  category: "NewComment" | "ReplyComment";
  hasBeenRead: boolean;
}

export interface Props {
  alarmContents: AlarmContent[];
}

const AlarmDropDown = ({ alarmContents }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClickAlarmIcon = () => {
    setIsOpen(state => !state);
  };

  return (
    <Container>
      <Alarm size="MD" hasUnReadNotification={false} onClick={onClickAlarmIcon} />
      {isOpen && (
        <DropDownContainer>
          <DropDownHeader>
            내 소식 <NotificationCount>{alarmContents.length}</NotificationCount>
          </DropDownHeader>
          <>
            {alarmContents.length > 0 ? (
              alarmContents.map(({ user, url, content, time: date, category }) => {
                return (
                  <DropDownContent>
                    <Avatar imageURL={user.profileImageUrl} />
                    <ContentWrapper>
                      <Notification>
                        {category === "NewComment" ? (
                          <span>
                            <Name>{user.nickName}</Name>님이 새 댓글을 남기셨습니다.
                          </span>
                        ) : (
                          <span>
                            <Name>{user.nickName}</Name>님이 대댓글을 남기셨습니다.
                          </span>
                        )}
                        <time>{getTimeDifference(date)}</time>
                      </Notification>

                      <Content>{content}</Content>

                      <Url>{url}</Url>
                    </ContentWrapper>
                  </DropDownContent>
                );
              })
            ) : (
              <DropDownContent>"최근 30일간 받은 알람이 없습니다."</DropDownContent>
            )}
          </>
        </DropDownContainer>
      )}
    </Container>
  );
};

export default AlarmDropDown;
