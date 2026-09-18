
import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(app);

export const db = getFirestore(app);

// ======================================
// GOOGLE AUTHENTICATION
// ======================================

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, provider);

// ======================================
// CATEGORIES
// ======================================

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);

  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(
      collectionRef,
      object.title.toLowerCase()
    );

    batch.set(docRef, object);
  });

  await batch.commit();

  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");

  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  const categoryMap = querySnapshot.docs.reduce(
    (acc, docSnapshot) => {
      const { title, items } = docSnapshot.data();

      acc[title.toLowerCase()] = items;

      return acc;
    },
    {}
  );

  return categoryMap;
};

// ======================================
// USER
// ======================================

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(
    db,
    "users",
    userAuth.uid
  );

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const {
      displayName,
      email,
    } = userAuth;

    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.error(
        "Error creating the user:",
        error.message
      );
    }
  }

  return userDocRef;
};

// ======================================
// EMAIL AUTHENTICATION
// ======================================

export const createAuthUserWithEmailAndPassword = async (
  email,
  password
) => {
  if (!email || !password) {
    return;
  }

  return await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
};

export const signInAuthUserWithEmailAndPassword = async (
  email,
  password
) => {
  if (!email || !password) {
    return;
  }

  return await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
};

// ======================================
// SIGN OUT
// ======================================

export const signOutUser = async () => {
  return await signOut(auth);
};

// ======================================
// AUTH STATE LISTENER
// ======================================

export const onAuthStateChangedListener = (
  callback
) => {
  return onAuthStateChanged(auth, callback);
};
