(function () {
  const $darass = document.querySelector("#darass");

  const replyModuleURL = "http://localhost:8080/dist/js/index.html" + "?";
  const currURL = window.location.href;
  const projectKey = $darass.dataset.projectKey;

  const urlParams = new URLSearchParams(replyModuleURL);
  urlParams.set("url", currURL);
  urlParams.set("projectKey", projectKey);

  const $iframe = document.createElement("iframe");
  $iframe.src = decodeURIComponent(urlParams.toString());
  $iframe.style =
    "width: 1px !important; min-width: 100% !important; border: none !important; overflow: hidden !important; height: 837px !important;";

  $darass.appendChild($iframe);
})();
