interface IFrameMessageProps {
  iframe: HTMLIFrameElement;
  message: Partial<MessageEvent>;
}

export const postMessageToIframe = ({ iframe, message }: IFrameMessageProps) => {
  iframe.contentWindow?.postMessage(message, "*");
};
