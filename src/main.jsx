import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { store } from "./store/store";

import { registerSW } from "virtual:pwa-register";

/* =========================================================
   CANLIGHT PWA SERVICE WORKER
========================================================= */

registerSW({
  immediate: true,

  onNeedRefresh() {
    console.log(
      "🔄 A new version of CANLight Clothing is available."
    );
  },

  onOfflineReady() {
    console.log(
      "✅ CANLight Clothing is ready to work offline."
    );
  },

  onRegistered(registration) {
    console.log(
      "✅ CANLight Clothing service worker registered:",
      registration
    );
  },

  onRegisterError(error) {
    console.error(
      "❌ CANLight Clothing service worker registration failed:",
      error
    );
  },
});

/* =========================================================
   REACT APPLICATION
========================================================= */

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