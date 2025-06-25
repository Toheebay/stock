import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

interface User {
  _id: string;
  email: string;
  fullName: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, fullName: string) => Promise<any>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("https://stock-2-nzro.onrender.com/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const res = await axios.post(
        "https://stock-2-nzro.onrender.com/api/auth/register",
        { email, password, fullName }
      );
      return res.data;
    } catch (error: any) {
      return { error: error.response?.data || "Signup failed" };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const res = await axios.post(
        "https://stock-2-nzro.onrender.com/api/auth/login",
        { email, password }
      );

      const { user, token } = res.data;
      setUser(user);
      localStorage.setItem("token", token);
      return res.data;
    } catch (error: any) {
      return { error: error.response?.data || "Login failed" };
    }
  };

  const signOut = async () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
