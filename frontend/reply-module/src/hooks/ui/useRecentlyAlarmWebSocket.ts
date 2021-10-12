import { BASE_URL } from "@/constants/api";
import { GetAlarmResponse } from "@/types/comment";
import { Stomp } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { useUserContext } from "../contexts/useUserContext";

export const useRecentlyAlarmWebSocket = () => {
  const socketRef = useRef<WebSocket>();
  const [recentlyAlarmContent, setRecentlyAlarmContent] = useState<GetAlarmResponse>();
  const { user } = useUserContext();
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
