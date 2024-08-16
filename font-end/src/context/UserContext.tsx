/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

interface User {
  email: string;
  name: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  orderPopup: boolean;
  setOrderPopup: React.Dispatch<React.SetStateAction<boolean>>;
  handleOrderPopup: () => void;
  darkMode: boolean;
  handleThemeSwitch: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [orderPopup, setOrderPopup] = React.useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleThemeSwitch = () => {
    setDarkMode((prevMode: any) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      document.documentElement.classList.toggle("dark", newMode);
      return newMode;
    });
  };

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        orderPopup,
        setOrderPopup,
        handleOrderPopup,
        darkMode,
        handleThemeSwitch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
