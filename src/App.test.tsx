import React from "react";
import { render } from "@testing-library/react";
import App from "App";
import { configureStore } from "store/store";
import { Provider } from "react-redux";

it("App renders without crashing", () => {
  render(
    <Provider store={configureStore()}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  );
});
