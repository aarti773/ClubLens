import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
  const savedUser = localStorage.getItem("user");

  if (savedUser) {
    return JSON.parse(savedUser);
  }

  return null;
});
  const isLoggedIn = Boolean(user);

  function login(authData) {
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", JSON.stringify(authData.user));
    setUser(authData.user);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };