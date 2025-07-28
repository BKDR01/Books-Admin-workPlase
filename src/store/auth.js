import { create } from "zustand";

const useAuthStore = create((set) => {


    return {
        login: (token) => {
            localStorage.setItem('accessToken', token)
            set({ token })
        }
    }
})

export default useAuthStore