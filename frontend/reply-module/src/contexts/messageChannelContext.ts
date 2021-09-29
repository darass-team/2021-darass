import { createContext } from "react";

export const MessageChannelContext = createContext<{
  port: MessagePort | undefined;
}>({
  port: undefined
});
