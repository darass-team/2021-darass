import { END_POINT, URL_REPLACE_TABLE } from "@/constants/common";

const refineCurrentURL = () => {
  let currentURL = window.location.origin + window.location.pathname;

  currentURL = URL_REPLACE_TABLE.reduce((acc, curr) => {
    const { from, to } = curr;
    acc = acc.replaceAll(from, to);

    return acc;
  }, currentURL);

  currentURL = currentURL.replace("m.", "");
  if (currentURL.endsWith("/")) {
    currentURL = currentURL.slice(0, -1);
  }

  return currentURL;
};

export const getReplyModuleURL = ({
  projectKey,
  isDarkModePage,
  primaryColor
}: {
  projectKey: string;
  isDarkModePage: boolean;
  primaryColor: string;
}) => {
  const currentURL = refineCurrentURL();

  const urlParams = new URLSearchParams(END_POINT + "?");
  urlParams.set("url", currentURL);
  urlParams.set("projectKey", projectKey);
  urlParams.set("darkMode", `${isDarkModePage}`);
  urlParams.set("primaryColor", escape(primaryColor));

  const replyModuleUrlWithQuery = decodeURIComponent(urlParams.toString());

  return replyModuleUrlWithQuery;
};

export const getModalUrl = () => {
  return `${END_POINT}/modal.html`;
};
