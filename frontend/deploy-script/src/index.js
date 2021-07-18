(function () {
  const $darass = document.querySelector("#darass");

  const replyModuleURL = "https://dorvcm7xtbd6v.cloudfront.net" + "?";
  const currURL = window.location.origin + window.location.pathname;
  const projectKey = $darass.dataset.projectKey;

  const urlParams = new URLSearchParams(replyModuleURL);
  urlParams.set("url", currURL);
  urlParams.set("projectKey", projectKey);

  const $iframe = document.createElement("iframe");
  $iframe.src = decodeURIComponent(urlParams.toString());
  $iframe.style = `width: 1px !important; min-width: 100% !important; border: none !important; overflow: hidden !important; height: 540px !important;`;
  $darass.appendChild($iframe);

  window.addEventListener("message", event => {
    if (typeof event.data === "number") {
      $iframe.style = `width: 1px !important; min-width: 100% !important; border: none !important; overflow: hidden !important; height: ${event.data}px !important;`;
    }
  });
})();
