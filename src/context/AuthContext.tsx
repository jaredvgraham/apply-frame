// src/context/AuthContext.tsx
"use client";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { axiosPublic } from "@/utils/axios";
import { usePathname, useRouter } from "next/navigation";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

interface AuthContextProps {
  isAuthenticated: boolean;
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshSession: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        await refreshSession();
      } catch {
        // handle error if necessary
        console.log("Session expired");
      } finally {
        setLoading(false);
      }
    };
    checkAuthentication();
  }, []);

  useEffect(() => {
    if (
      !loading &&
      !isAuthenticated &&
      !["/login", "/signup", "/landing"].includes(pathname)
    ) {
      router.push("/landing");
    }
  }, [loading, isAuthenticated, pathname]);
  const login = async (email: string, password: string) => {
    try {
      const response = await axiosPublic.post("/auth/login", {
        email,
        password,
      });
      const { accessToken } = response.data;
      setAccessToken(accessToken);
      setIsAuthenticated(true);
      router.push("/protected");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = async () => {
    try {
      await axiosPublic.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setAccessToken(null);
      setIsAuthenticated(false);
      router.push("/login");
    }
  };

  const refreshSession = async () => {
    try {
      const response = await axiosPublic.post("/auth/session", {
        withCredentials: true,
      });
      const { accessToken } = response.data;
      if (accessToken) {
        setAccessToken(accessToken);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Failed to refresh session", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        accessToken,
        setAccessToken,
        setIsAuthenticated,
        login,
        logout,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
