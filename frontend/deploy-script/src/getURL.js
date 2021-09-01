import { END_POINT } from "./constants.js";

export const getReplyModuleURL = () => {
  const $darass = document.querySelector("#darass");
  const replyModuleURL = END_POINT + "?";

  let currentURL = window.location.origin + window.location.pathname;
  if (currentURL.endsWith("/")) {
    currentURL = currentURL.slice(0, -1);
  }
  const projectKey = $darass.dataset.projectKey;

  const urlParams = new URLSearchParams(replyModuleURL);
  urlParams.set("url", currentURL);
  urlParams.set("projectKey", projectKey);

  return decodeURIComponent(urlParams.toString());
};

export const getModalURL = () => {
  return `${END_POINT}/modal.html`;
};
