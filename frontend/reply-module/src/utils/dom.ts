export const resizeTextArea = (textAreaElement: HTMLTextAreaElement) => {
  textAreaElement.style.height = "inherit";
  textAreaElement.style.height = `${textAreaElement.scrollHeight}px`;
};

export const parseLinkTextToHTML = (text: string) => {
  const regURL = new RegExp("(http|https|ftp|telnet|news|irc)://([-/.a-zA-Z0-9_~#%$?&=:200-377()]+)", "gi");
  const regEmail = new RegExp("([xA1-xFEa-z0-9_-]+@[xA1-xFEa-z0-9-]+.[a-z0-9-]+)", "gi");

  return text
    .replace(regURL, "<a href='$1://$2' target='_blank'>$1://$2</a>")
    .replace(regEmail, "<a href='mailto:$1'>$1</a>");
};
