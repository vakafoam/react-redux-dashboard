import React from "react";
import Header from "components/header/Header";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { configureStore } from "store/store";
import { Provider } from "react-redux";

let container: Element | null = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  if (container) {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  }
});

it("Headers renders with correct heading text", () => {
  act(() => {
    render(
      <Provider store={configureStore()}>
        <React.StrictMode>
          <Header />
        </React.StrictMode>
      </Provider>,
      container
    );
  });

  expect(container?.firstChild?.firstChild?.firstChild?.textContent).toBe(
    "Music events"
  );
});
