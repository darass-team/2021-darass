import { useUser } from "@/hooks";
import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { BASE_URL } from "@/constants/api";
import { GetAlarmResponse } from "@/types/comment";

export const useRecentlyAlarmWebSocket = () => {
  const socketRef = useRef<WebSocket>();
  const [recentlyAlarmContent, setRecentlyAlarmContent] = useState<GetAlarmResponse>();
  const { user } = useUser();
  const [hasNewAlarmOnRealTime, setHasNewAlarmOnRealTime] = useState(!!user?.hasRecentAlarm);

  useEffect(() => {
    if (!user) {
      socketRef.current?.close();

      return;
    }

    if (!socketRef.current) {
      socketRef.current = new SockJS(`${BASE_URL}/websocket`);

      const stompClient = Stomp.over(socketRef.current);

      stompClient.connect(
        {},
        () => {
          stompClient.subscribe(`/queue/module${user.id}`, payload => {
            const data = JSON.parse(payload.body) as GetAlarmResponse;
            setRecentlyAlarmContent(data);
          });
        },
        () => console.error("소켓연결 실패")
      );
    }
  }, [user]);

  return { recentlyAlarmContent, hasNewAlarmOnRealTime, setHasNewAlarmOnRealTime };
};
