import { createIframe } from "./createIframe.js";

(function () {
  const $darass = document.querySelector("#darass");

  const replyModuleURL = "https://dorvcm7xtbd6v.cloudfront.net" + "?";
  const currentURL = (window.location.origin + window.location.pathname).replace("index.html", "");

  const projectKey = $darass.dataset.projectKey;

  const urlParams = new URLSearchParams(replyModuleURL);
  urlParams.set("url", currentURL);
  urlParams.set("projectKey", projectKey);

  const url = decodeURIComponent(urlParams.toString());
  const $iframe = createIframe(url);
  $darass.appendChild($iframe);

  const postMessageToIframe = () => {
    $iframe.contentWindow.postMessage("click", "*");
  };

  window.addEventListener("click", postMessageToIframe);
  window.addEventListener("message", event => {
    if (typeof event.data === "number") {
      $iframe.style.setProperty("height", `${event.data}px`, "important");
    }
  });
})();
