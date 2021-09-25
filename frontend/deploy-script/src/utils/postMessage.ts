interface IFrameMessageProps {
  iframe: HTMLIFrameElement;
  message: { type: string; data?: string };
}

export const postMessageToIframe = ({ iframe, message }: IFrameMessageProps) => {
  iframe.contentWindow?.postMessage(message, "*");
};
