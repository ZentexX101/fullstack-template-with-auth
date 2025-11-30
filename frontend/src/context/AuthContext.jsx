/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState, useCallback } from "react";
import apiRequestHandler from "../services/ApiRequestHandler";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  // Load initial state from localStorage immediately
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  const safeParse = (val) => {
    if (!val || val === "undefined" || val === "null") return null;
    try {
      return JSON.parse(val);
    } catch {
      return null;
    }
  };

  const [user, setUser] = useState(safeParse(storedUser));
  const [userToken, setUserToken] = useState(storedToken || null);
  const [loading, setLoading] = useState(false); // not true by default

  // login function
  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
    setUserToken(token);
  };

  // Logout function
  const logout = async () => {
    setLoading(true);
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      setUserToken(null);
    } finally {
      setLoading(false);
    }
  };

  // Token expiry check
  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp < Date.now() / 1000;
    } catch {
      return true;
    }
  };

  // set user in local storage
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await apiRequestHandler(
        "/user/profile",
        "GET",
        null,
        localStorage.getItem("token")
      );
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      return data;
    };
    fetchUser();
    const token = localStorage.getItem("token");
    if (!isTokenExpired(token)) {
      setUserToken(token);
      fetchUser();
    }
  }, []);

  // Token validation
  const checkTokenValidity = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      if (isTokenExpired(token)) {
        localStorage.removeItem("token");
        setUserToken(null);
        window.location.href = "/login";
      } else {
        setUserToken(token);
      }
    } else {
      setUserToken(null);
    }
  }, []);

  // Effect to recheck token every 30 mins
  useEffect(() => {
    checkTokenValidity();
    const intervalId = setInterval(checkTokenValidity, 1800000);
    return () => clearInterval(intervalId);
  }, [checkTokenValidity]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        userToken,
        setUserToken,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
