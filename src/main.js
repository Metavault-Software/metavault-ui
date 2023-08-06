// main.js
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "@/scss/custom.scss";

import { useAuthStore } from "@/store"; // Import the store
import SignIn from "@/components/SignIn";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);

const authStore = useAuthStore(); // Create an instance of the auth store

// Add a global property to access the auth store in components
app.config.globalProperties.$auth = authStore;

app.component("sign-in", SignIn); // Register the SignIn component with the app

app.mount("#app");
