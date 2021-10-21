export const resizeTextArea = (textAreaElement: HTMLTextAreaElement) => {
  textAreaElement.style.height = "inherit";
  textAreaElement.style.height = `${textAreaElement.scrollHeight}px`;
};
