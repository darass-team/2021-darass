export const createIframe = url => {
  const $iframe = document.createElement("iframe");
  const defaultStyle = `width: 1px !important; min-width: 100% !important; border: none !important; overflow: hidden !important; height: 540px !important;`;
  $iframe.setAttribute("scrolling", "no");
  $iframe.setAttribute("src", url);
  $iframe.setAttribute("style", defaultStyle);

  return $iframe;
};
