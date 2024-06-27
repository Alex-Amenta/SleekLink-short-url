import axios from "axios";
import { create } from "zustand";

export const useUserStore = create((set, get) => ({
    user: null,
    error: null,
    setError: (error) => set({ error }),
    setUser: (user) => set({ user }),
    logout: () => { set({ user: null }) },
    login: async (email, password) => {
        try {
            const response = await axios.post("/api/user/login", { email, password });
            if (response.status === 200) {
                set({ user: response.data });
                return true;
            } else {
                throw new Error("Failed to login");
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                set({ error: "Invalid username or password" });
            } else {
                console.error("Error:", error.message);
            }
            return false;

        }

    },
    signup: async (name, email, password) => {
        try {
            const response = await axios.post("/api/user", { name, email, password });
            if (response.status === 200) {
                return true;
            }

            throw new Error("Failed to create new user")
        } catch (error) {
            console.log("Error", error.message);
            return false;
        }
    },
    isAuthenticated: () => {
        return !!get().user
    }
}));

export const getZustandState = () => {
    const state = useUserStore.getState();
    return state;
}

export const useUrlStore = create((set) => ({
    urls: [],
    selectedUrl: null,
    shortUrl: null,
    error: null,
    loading: false,

    createShortUrl: async (title, originalUrl, customDomain = null) => {
        set({ loading: true, error: null });

        try {
            const token = localStorage.getItem('authToken');
            const headers = token ? { "Authorization": `Bearer ${token}` } : {};

            const response = await axios.post("/api/url", { title, originalUrl, customDomain }, { withCredentials: true, headers });

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

    getUrlById: async (urlId) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`/api/url/${urlId}`, { withCredentials: true });

            set({
                selectedUrl: response.data,
                loading: false
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
            await new Promise((resolve) => setTimeout(resolve, 3000));

            const response = await axios.get(`/api/url/user/${userId}`, { withCredentials: true });

            set({
                urls: response.data,
                loading: false,
            });
        } catch (error) {
            set({
                error: error.response ? error.response.data.message : "An error occurred",
                loading: false,
            });
        }
    },
    deleteUrl: async (id) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.delete(`/api/url/${id}`);

            if (response.statusCode === 200) {
                set((state) => ({
                    urls: state.urls.filter(url => url.id !== id),
                    loading: false,
                }));
                return { success: true, message: response.data.message }
            } else {
                return { success: false, error: "Failed to delete URL" }
            }

        } catch (error) {
            console.error("Error deleting URL:", error);
            set({
                error: error.response ? error.response.data.message : "An error occurred while deleting the URL",
                loading: false,
            });
        }
    },
}));