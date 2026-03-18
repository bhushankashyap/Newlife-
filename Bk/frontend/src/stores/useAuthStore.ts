import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface User {
  _id: string;
  fullName: string;
  email: string;
  imageUrl: string;
  role: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAdmin: boolean;

  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loadFromStorage: () => void;
  checkAdminStatus: () => Promise<void>;
  reset: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAdmin: false,

  loadFromStorage: () => {
    const token = localStorage.getItem("sw_token");
    const userStr = localStorage.getItem("sw_user");
    if (token && userStr) {
      const user = JSON.parse(userStr);
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      set({ token, user, isAdmin: user.role === "admin" });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      const { token, user } = res.data;
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("sw_token", token);
      localStorage.setItem("sw_user", JSON.stringify(user));
      set({ token, user, isAdmin: user.role === "admin", isLoading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Login failed", isLoading: false });
      throw err;
    }
  },

  register: async (fullName, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.post("/auth/register", { fullName, email, password });
      const { token, user } = res.data;
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("sw_token", token);
      localStorage.setItem("sw_user", JSON.stringify(user));
      set({ token, user, isAdmin: user.role === "admin", isLoading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Registration failed", isLoading: false });
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem("sw_token");
    localStorage.removeItem("sw_user");
    delete axiosInstance.defaults.headers.common["Authorization"];
    set({ user: null, token: null, isAdmin: false });
  },

  checkAdminStatus: async () => {
    try {
      const res = await axiosInstance.get("/admin/check");
      set({ isAdmin: res.data.admin });
    } catch {
      set({ isAdmin: false });
    }
  },

  reset: () => set({ user: null, token: null, isAdmin: false, isLoading: false, error: null }),
}));
