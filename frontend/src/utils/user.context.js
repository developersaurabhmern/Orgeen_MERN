import { createContext, useState } from "react";

export const AuthContext = createContext(null);

function useUserContext() {
  const [user, setUser] = useState({ token: null });

  const login = (token) => {
    localStorage.setItem("token", JSON.stringify(token));
    setUser({ token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser({ token: null });
  };

  return { login, logout, user };
}

export default useUserContext;
