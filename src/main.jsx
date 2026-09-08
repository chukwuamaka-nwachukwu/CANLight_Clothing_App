import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.scss";
import { UserProvider } from "./contexts/user.context";
import { CategoriesProvider } from "./contexts/categories.context";
import { CartProvider } from "./contexts/cart.context";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <CartProvider>
    <BrowserRouter>
      <UserProvider>
        <CategoriesProvider>
            <App />
        </CategoriesProvider>
      </UserProvider>
    </BrowserRouter>
  </CartProvider>
  </React.StrictMode>
);
