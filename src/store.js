// store.js
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        isLoggedIn: false,
    }),
    actions: {
        updateLoginStatus(status) {
            this.isLoggedIn = status;
        },
    },
});
