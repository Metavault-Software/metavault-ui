import "bootstrap/dist/css/bootstrap.min.css";
import { createApp } from 'vue';
import { createPinia } from "pinia";
import App from './App.vue';
import router from "./router";
import "@/scss/custom.scss";

import '@/utilities/axios-config';
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);

app.mount('#app');

