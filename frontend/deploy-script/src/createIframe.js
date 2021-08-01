export const createIframe = ({ src, style }) => {
  const $iframe = document.createElement("iframe");
  $iframe.setAttribute("src", src);
  $iframe.setAttribute("style", style);

  return $iframe;
};
