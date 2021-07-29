import { configure, addDecorator } from "@storybook/react";
import GlobalStyles from "../src/styles/GlobalStyles";
import "./preview.css";

const modalRoot = document.createElement("div");
modalRoot.setAttribute("id", "modal-root");
document.querySelector("body").appendChild(modalRoot);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: "centered",
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};

addDecorator(style => (
  <>
    <GlobalStyles />
    <>{style()}</>
  </>
));

configure(require.context("../src", true, /\.stories\.js?$/), module);
