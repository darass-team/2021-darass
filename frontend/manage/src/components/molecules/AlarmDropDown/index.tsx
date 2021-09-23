import Alarm from "@/components/atoms/Alarm";
import { User } from "@/types/user";
import { getTimeDifference } from "@/utils/time";
import { useState } from "react";
import {
  Container,
  Content,
  ContentWrapper,
  DropDownContainer,
  DropDownContent,
  DropDownHeader,
  Name,
  Notification,
  NotificationCount,
  Url
} from "./styles";

interface AlarmContent {
  sender: User["nickName"];
  url: string;
  content: string;
  createDate: string;
  alarmMessageType: "CREATE_COMMENT" | "CREATE_SUB_COMMENT" | "CREATE_COMMENT_LIKE";
  hasBeenRead: boolean;
}

const ALARM_MESSAGE_TABLE = {
  CREATE_COMMENT: "님이 댓글을 남겼습니다.",
  CREATE_SUB_COMMENT: "님이 대댓글을 남겼습니다.",
  CREATE_COMMENT_LIKE: "님이 좋아요를 누르셨습니다."
};

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
              alarmContents.map(({ sender, url, content, createDate, alarmMessageType }) => {
                return (
                  <DropDownContent>
                    <ContentWrapper>
                      <Notification>
                        <span>
                          <Name>{sender}</Name>
                          <span>{ALARM_MESSAGE_TABLE[alarmMessageType]}</span>
                        </span>

                        <time>{getTimeDifference(createDate)}</time>
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
