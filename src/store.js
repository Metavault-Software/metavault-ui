// store.js
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        isLoggedIn: false,
        token: null, // Add this line to manage the token in your store
    }),
    actions: {
        updateLoginStatus(status) {
            this.isLoggedIn = status;
            this.token = token; // Add this line to update the token in your store
        },
    },
});
