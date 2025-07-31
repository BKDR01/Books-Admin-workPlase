import { jwtDecode } from "jwt-decode";
import { create } from "zustand";

const useAuthStore = create((set) => ({
    token: localStorage.getItem("accessToken"),
    login: (token) => {
        localStorage.setItem("accessToken", token);
        set({ token })
    },
    // logout: () => {
    //     localStorage.removeItem("accessToken");
    //     set({ token: null });
    // },
    isTokenExpired: () => {
        const token = localStorage.getItem("accessToken");
        if (!token) return true;
        try {
            const decoded = jwtDecode(token);
            return decoded.exp * 1000 < Date.now();
        } catch {
            return true;
        }
    },
}))

export default useAuthStore