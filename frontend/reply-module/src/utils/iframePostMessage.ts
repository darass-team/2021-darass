const postScrollHeightToParentWindow = () => {
  window.parent.postMessage(document.querySelector("#root")?.scrollHeight, "*");
};

export { postScrollHeightToParentWindow };
