import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // update isLoggedIn true/false
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        setIsLoggedIn(token ? true : false);
      } catch (error) {
        throw error;
      }
    };
    checkToken();
  }, []);
  // log loggedin
  useEffect(() => {
    console.log("LoginContextProvider -> isLoggedIn updated:", isLoggedIn);
  }, [isLoggedIn]);
  // save token to store + loggedin true
  const setTokenLogin = async (token) => {
    try {
      await SecureStore.setItemAsync("token", token);
      const checkToken = await SecureStore.getItemAsync("token");
      console.log("LoginContextProvider -> set token:", checkToken);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };
  // del token to store + loggedin false
  const removeTokenLogin = async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      console.log("LoginContextProvider -> del token");
      setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  };
  // hug child
  return (
    <LoginContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, setTokenLogin, removeTokenLogin }} // TODO: setIsLoggedIn perlu?
    >
      {children}
    </LoginContext.Provider>
  );
};
