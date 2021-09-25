export const hideElement = (element: HTMLElement) => {
  element.style.display = "none";
};

export const showElement = (element: HTMLElement) => {
  element.style.display = "";
};

export const disableScroll = () => {
  document.body.style.overflow = "hidden";
};

export const enableScroll = () => {
  document.body.style.overflow = "revert";
};

export const resizeElementHeight = (element: HTMLElement, height: string) => {
  element.style.setProperty("height", `${height}px`, "important");
};

export const createIframe = (src: string, style: string) => {
  const $iframe = document.createElement("iframe");
  $iframe.setAttribute("src", src);
  $iframe.setAttribute("style", style);

  return $iframe;
};
