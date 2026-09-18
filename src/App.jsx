import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import HomePage from "./components/routes/home/home.component.jsx";
import Navigation from "./components/routes/navigation/navigation.component.jsx";
import Authentication from "./components/routes/authentication/authentication.component.jsx";
import Shop from "./components/routes/shop/shop.component.jsx";
import Checkout from "./components/routes/checkout/checkout.component.jsx";

import { setCurrentUser } from "./store/user/user.actions";
import { fetchCategoriesAsync } from "./store/categories/categories.actions";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "./utils/firebase/firebase.utils";

import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // ✅ load categories on mount
    dispatch(fetchCategoriesAsync());

    // ✅ Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        await createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, [dispatch]);

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
