import { GetAlarmResponse } from "@/types/comment";
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

export const ALARM_MESSAGE_TABLE = {
  CREATE_COMMENT: "님이 댓글을 남겼습니다.",
  CREATE_SUB_COMMENT: "님이 대댓글을 남겼습니다.",
  CREATE_COMMENT_LIKE: "님이 좋아요를 누르셨습니다."
};

export interface Props {
  alarmContents: GetAlarmResponse[];
}

const AlarmContent = ({ alarmContents }: Props) => {
  return (
    <>
      <AlarmHeader>
        내 소식 <NotificationCount>{alarmContents.length}</NotificationCount>
      </AlarmHeader>

      {alarmContents.length > 0 ? (
        alarmContents.map(({ id, createdDate, commentAlarmType, sender, comment }) => {
          return (
            <Content key={id}>
              <ContentWrapper>
                <Notification>
                  <span>
                    <Name>{sender.nickName}</Name>
                    <span>{ALARM_MESSAGE_TABLE[commentAlarmType]}</span>
                  </span>

                  <time>{getTimeDifference(createdDate)}</time>
                </Notification>

                {commentAlarmType !== "CREATE_COMMENT_LIKE" && <Text>{comment.content}</Text>}

                <Url>{comment.url}</Url>
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
