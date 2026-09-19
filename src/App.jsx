
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import HomePage from "./components/routes/home/home.component.jsx";
import Navigation from "./components/routes/navigation/navigation.component.jsx";
import Authentication from "./components/routes/authentication/authentication.component.jsx";
import Shop from "./components/routes/shop/shop.component.jsx";
import Checkout from "./components/routes/checkout/checkout.component.jsx";

import Spinner from "./components/spinner/spinner.component.jsx";

import { setCurrentUser } from "../src/store/user/user.actions";
import { fetchCategoriesAsync } from "../src/store/categories/categories.actions";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "./utils/firebase/firebase.utils";

import { selectCategoriesLoading } from "../src/store/categories/categories.selectors";

import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const isCategoriesLoading = useSelector(selectCategoriesLoading);

  useEffect(() => {
    // Load categories
    dispatch(fetchCategoriesAsync());

    // Listen for Firebase authentication changes
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      try {
        if (user) {
          await createUserDocumentFromAuth(user);
        }

        dispatch(setCurrentUser(user));
      } catch (error) {
        console.error("Authentication initialization error:", error);
      } finally {
        setIsAuthLoading(false);
      }
    });

    return unsubscribe;
  }, [dispatch]);

  // Show spinner while Firebase auth or categories are loading
  if (isAuthLoading || isCategoriesLoading) {
    return <Spinner />;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<HomePage />} />

        <Route path="shop/*" element={<Shop />} />

        <Route path="auth" element={<Authentication />} />

        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
