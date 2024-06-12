import axios from "axios";
import { create } from "zustand";

export const useUserStore = create((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: () => set({ user: null }),
    login: async (email, password) => {
        try {
            const response = await axios.post("/api/user/login", { email, password });

            if (response.status === 200) {
                set({ user: JSON.stringify(response.data) });
                return true;
            } else {
                throw new Error("Failed to login");
            }
        } catch (error) {
            console.error("Error:", error.message);
            return false;
        }

    },
    signup: async (name, email, password) => {
        try {
            const response = await axios.post("/api/user", { name, email, password });
            if (response.status === 200) {
                console.log(JSON.stringify(response.data));
                return true;
            }

            throw new Error("Failed to create new user")
        } catch (error) {
            console.log("Error", error.message);
            return false;
        }
    }
}));

export const useUrlStore = create((set) => ({
    urls: [],
    shortUrl: null,
    error: null,
    loading: false,

    createShortUrl: async (originalUrl, customDomain = null) => {
        set({ loading: true, error: null });

        try {
            const response = await axios.post("/api/url", { originalUrl, customDomain }, { withCredentials: true });

            set((state) => ({
                urls: [...state.urls, response.data],
                shortUrl: response.data,
                loading: false,
            }));
        } catch (error) {
            set({
                error: error.response ? error.response.data.message : "An error occurred",
                loading: false,
            });
        }
    },

    fetchUrls: async () => {
        set({ loading: true, error: null });

        try {
            const response = await axios.get("/api/url", { withCredentials: true });

            set({
                urls: response.data.result,
                loading: false,
            });
        } catch (error) {
            set({
                error: error.response ? error.response.data.message : "An error occurred",
                loading: false,
            });
        }
    },

    fetchUrlsByUserId: async (userId) => {
        set({ loading: true, error: null });

        try {
            const response = await axios.get(`/api/url/user/${userId}`, { withCredentials: true });

            set({
                urls: response.data.result,
                loading: false,
            });
        } catch (error) {
            set({
                error: error.response ? error.response.data.message : "An error occurred",
                loading: false,
            });
        }
    },
}));