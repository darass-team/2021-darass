import { CLOSE_MODAL_ANIMATION_FINISH_TIME } from "@/constants/common";

export const hideElement = (element: HTMLElement) => {
  setTimeout(() => {
    element.style.transform = "translateY(-100%)";
  }, CLOSE_MODAL_ANIMATION_FINISH_TIME);
};

export const showElement = (element: HTMLElement) => {
  element.style.setProperty("transform", `translateY(0%)`);
  element.style.setProperty("z-index", `2147483647`, "important");
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

export const blockScroll = () => {
  document.body.style.setProperty("overflow", "hidden");
};

export const unBlockScroll = () => {
  document.body.style.setProperty("overflow", "revert");
};
