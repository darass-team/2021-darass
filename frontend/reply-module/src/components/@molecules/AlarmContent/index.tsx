import { GetAlarmResponse } from "@/types/comment";
import { getTimeDifference } from "@/utils/time";
import {
  AlarmHeader,
  Content,
  ContentWrapper,
  LockIcon,
  Name,
  NoContent,
  Notification,
  NotificationCount,
  Text,
  Url
} from "./styles";

export const ALARM_MESSAGE_TABLE = {
  CREATE_COMMENT: "님이 댓글을 남겼습니다.",
  CREATE_SUB_COMMENT: "님이 대댓글을 남겼습니다.",
  CREATE_COMMENT_LIKE: "님이 좋아요를 누르셨습니다."
} as const;

export interface Props {
  alarmContents: GetAlarmResponse[];
}

const AlarmContent = ({ alarmContents }: Props) => {
  const hasAlarmContent = alarmContents.length > 0;

  return (
    <>
      <AlarmHeader>
        내 소식 <NotificationCount>{alarmContents.length}</NotificationCount>
      </AlarmHeader>

      {hasAlarmContent ? (
        alarmContents.map(({ id, createdDate, commentAlarmType, sender, comment }) => {
          const isLikeAlarm = commentAlarmType === "CREATE_COMMENT_LIKE";

          return (
            <Content
              key={id}
              onClick={() => window.open(comment.url, "_blank", "noopener")}
              data-testid="alarm-content-container"
            >
              <ContentWrapper>
                <Notification>
                  <span>
                    <Name data-testid="alarm-content-sender-name">{sender.nickName}</Name>
                    <span data-testid="alarm-content-sender-notification-text">
                      {ALARM_MESSAGE_TABLE[commentAlarmType]}
                    </span>
                    {comment.secret && <LockIcon>{"🔒"}</LockIcon>}
                  </span>

                  <time>{getTimeDifference(createdDate)}</time>
                </Notification>

                {!isLikeAlarm && <Text>{comment.content}</Text>}

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
