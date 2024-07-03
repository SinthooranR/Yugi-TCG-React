"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  FC,
  ReactNode,
} from "react";
import { parseCookies, destroyCookie, setCookie } from "nookies";
import { useRouter } from "next/navigation";

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  userId?: string;
  userName?: string;
  email?: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { token } = parseCookies();
    if (token) {
      const decodedUser = parseJwt(token);
      setUser({
        userId: decodedUser.userId,
        userName: decodedUser.userName,
        email: decodedUser.email,
        token,
      });
    }
  }, []);

  const login = (token: string) => {
    const decodedUser = parseJwt(token);
    setUser({
      userId: decodedUser.userId,
      userName: decodedUser.userName,
      email: decodedUser.email,
      token,
    });
    router.push("/cards");
  };

  const logout = () => {
    destroyCookie(null, "token");
    setUser(null);
    router.push("/");
  };

  const contextValue: AuthContextType = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
