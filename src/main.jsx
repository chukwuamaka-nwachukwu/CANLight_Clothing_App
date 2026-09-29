
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { store } from "./store/store";

import { registerSW } from "virtual:pwa-register";

/*
=========================================================
REGISTER CANLIGHT PWA SERVICE WORKER
=========================================================

This allows CANLight to:

- Be installed as an app
- Use the PWA application shell
- Support basic offline loading
- Automatically detect new versions
*/

registerSW({
  onNeedRefresh() {
    console.log(
      "A new version of CANLight is available."
    );
  },

  onOfflineReady() {
    console.log(
      "CANLight is ready to work offline."
    );
  },

  onRegistered(registration) {
    console.log(
      "CANLight PWA service worker registered.",
      registration
    );
  },

  onRegisterError(error) {
    console.error(
      "CANLight PWA service worker registration failed:",
      error
    );
  },
});

/*
=========================================================
REACT APPLICATION
=========================================================
*/

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
