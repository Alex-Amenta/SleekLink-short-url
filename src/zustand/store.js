import axios from "axios";
import { getSession } from "next-auth/react";
import { create } from "zustand";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const useModalStore = create((set, get) => ({
    modals: {},
    openModal: (modalId) => set((state) => ({
        modals: { ...state.modals, [modalId]: true }
    })),
    closeModal: (modalId) => set((state) => ({
        modals: { ...state.modals, [modalId]: false }
    })),
    toggleModal: (id) => set((state) => ({
        modals: { ...state.modals, [id]: !state.modals[id] }
    })),
    isOpen: (modalId) => (get().modals[modalId] || false),
}))

export const useUserStore = create((set, get) => ({
    user: null,
    error: null,
    setError: (error) => set({ error }),
    setUser: (user) => set({ user }),
    logout: () => { set({ user: null }) },
    login: async (email, password) => {
        try {
            const response = await axios.post("/api/user/login", { email, password }, { withCredentials: true });
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

    updateUser: async (userId, name = null, password = null) => {
        const currentUser = get().user;

        try {
            const response = await axios.put(`/api/user/${userId}`, { name, password });
            if (response.status === 200) {
                const updatedUser = { ...currentUser, name: name || currentUser.name };

                set({ user: updatedUser });
                return { success: true, message: response.data.message }
            }

            return { success: false, error: response.data.message };
        } catch (error) {
            console.log("Error", error.message);
            set({
                error: error.response ? error.response.data.message : "An error occurred updating the user",
            });
        }
    },

    deleteAccount: async (userId) => {
        try {
            const response = await axios.delete(`/api/user/${userId}`);

            if (response.status !== 200) {
                return { success: false, error: response.data.message };
            }

            set((state) => ({
                user: state.user.filter(user => user.id !== userId)
            }))

            return { success: true, message: response.data.message }
        } catch (error) {
            set({
                error: error.response ? error.response.data.message : "An error occurred deleted the user",
            });
        }
    },
}));

export const useUrlStore = create((set) => ({
    urls: [],
    nonAuthUrls: [],
    searchTerm: '',
    setSearchTerm: (term) => set({ searchTerm: term }),
    selectedUrl: null,
    shortUrl: null,
    error: null,
    loading: false,

    createShortUrl: async (title, originalUrl, customDomain = null) => {
        set({ loading: true, error: null });

        try {
            const session = await getSession();
            const response = await axios.post("/api/url", { title, originalUrl, customDomain }, {
                withCredentials: true, headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                }
            });

            if (response.data.user_id) {
                set((state) => ({
                    urls: [response.data, ...state.urls],
                    shortUrl: response.data,
                    loading: false,
                }));
            } else {
                set((state) => ({
                    nonAuthUrls: [response.data, ...state.nonAuthUrls],
                    shortUrl: response.data,
                    loading: false,
                }));
            }

            return true;
        } catch (error) {
            set({
                error: error.response ? error.response.data.message : "An error occurred",
                loading: false,
            });
            return false;
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
            await delay(3000);

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

    getUrlsByUserId: async (userId) => {
        set({ loading: true, error: null });

        try {
            await delay(2000);

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

    filteredUrls: () => {
        const { urls, searchTerm } = useUrlStore.getState();
        return urls.filter((url) =>
            url.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
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