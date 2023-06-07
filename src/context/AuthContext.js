import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = React.createContext({});
const usersRef = collection(db, "users");

const provider = new GoogleAuthProvider();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUser(user.uid);
        setLoggedIn(true);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        setUser(null);
        setLoggedIn(false);
      });
  };

  const logout = () => {
    signOut(auth);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(uid);
        setLoggedIn(true);
      } else {
        setUser(null);
        setLoggedIn(false);
      }
    });
  }, []);

  useEffect(() => {
    if (user !== null) {
      setLoading(true)
      getData();
      setLoading(false)
    }
  }, [user]);

  const getData = async () => {
    if (user !== null) {
      const docSnap = await getDoc(doc(db,"users", user));
      if (docSnap.exists()) {
        setUserData(docSnap.data())
      } else {
        setUserData(null)
      }
    }
  };

  const setData = async (data) => {
    if (user !== null) {
      await setDoc(doc(usersRef, user), data);
      await getData()
    }
  };

  console.log(userData)

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        user,
        userData,
        loading,
        saving,
        loggedIn,
        getData,
        setData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
