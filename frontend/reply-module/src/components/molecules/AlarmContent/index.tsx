import { User } from "@/types/user";
import { getTimeDifference } from "@/utils/time";
import {
  AlarmHeader,
  NotificationCount,
  NoContent,
  Content,
  ContentWrapper,
  Notification,
  Name,
  Text,
  Url
} from "./styles";

export interface AlarmContentType {
  sender: User["nickName"];
  url: string;
  content: string;
  createDate: string;
  alarmMessageType: "CREATE_COMMENT" | "CREATE_SUB_COMMENT" | "CREATE_COMMENT_LIKE";
  hasBeenRead: boolean;
}

export const ALARM_MESSAGE_TABLE = {
  CREATE_COMMENT: "님이 댓글을 남겼습니다.",
  CREATE_SUB_COMMENT: "님이 대댓글을 남겼습니다.",
  CREATE_COMMENT_LIKE: "님이 좋아요를 누르셨습니다."
};

export interface Props {
  alarmContents: AlarmContentType[];
}

const AlarmContent = ({ alarmContents }: Props) => {
  return (
    <>
      <AlarmHeader>
        내 소식 <NotificationCount>{alarmContents.length}</NotificationCount>
      </AlarmHeader>

      {alarmContents.length > 0 ? (
        alarmContents.map(({ sender, url, content, createDate, alarmMessageType }) => {
          return (
            <Content>
              <ContentWrapper>
                <Notification>
                  <span>
                    <Name>{sender}</Name>
                    <span>{ALARM_MESSAGE_TABLE[alarmMessageType]}</span>
                  </span>

                  <time>{getTimeDifference(createDate)}</time>
                </Notification>

                <Text>{content}</Text>

                <Url>{url}</Url>
              </ContentWrapper>
            </Content>
          );
        })
      ) : (
        <NoContent>"최근 30일간 받은 알람이 없습니다."</NoContent>
      )}
    </>
  );
};

export default AlarmContent;
