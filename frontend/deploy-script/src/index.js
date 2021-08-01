(function () {
  const $darass = document.querySelector("#darass");

  const replyModuleURL = "https://dorvcm7xtbd6v.cloudfront.net" + "?";
  const currURL = (window.location.origin + window.location.pathname).replace("index.html", "");

  const projectKey = $darass.dataset.projectKey;

  const urlParams = new URLSearchParams(replyModuleURL);
  urlParams.set("url", currURL);
  urlParams.set("projectKey", projectKey);

  const $iframe = document.createElement("iframe");
  const defaultStyle = `width: 1px !important; min-width: 100% !important; border: none !important; overflow: hidden !important; height: 540px !important;`;
  $iframe.setAttribute("scrolling", "no");
  $iframe.setAttribute("src", decodeURIComponent(urlParams.toString()));
  $iframe.setAttribute("style", defaultStyle);
  $darass.appendChild($iframe);

  window.addEventListener("message", event => {
    if (typeof event.data === "number") {
      $iframe.style.setProperty("height", `${event.data}px`, "important");
    }
  });
})();
