import { createContext, useState, useEffect } from "react";
import{ onAuthStateChangedListener,
  createUserDocumentFromAuth,}from "../utils/firebase/firebase.utils";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
       if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe; // cleanup listener
  }, []);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
