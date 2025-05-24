import { create } from "zustand";

export const useAuth = create((set) => ({
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  setTokens: ({ access, refresh }) => {
    if (access) localStorage.setItem("access", access);
    if (refresh) localStorage.setItem("refresh", refresh);
    set({ access, refresh });
  },
  logout: () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    set({ access: null, refresh: null });
  },
}));
