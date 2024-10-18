import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
// import router from "./router/index.js"; // 라우터 가져오기
import "@/assets/styles/layout.css";
import "@/assets/styles/buttons.css";
import "@/assets/styles/cards.css";
import "@/assets/styles/variable.css";
import "@/assets/styles/typography.css";

import router from "./router/index.js";

const app = createApp(App);
const pinia = createPinia();

app.use(router); // 라우터 사용 등록
app.use(pinia);
app.mount("#app"); // Vue 애플리케이션을 마운트
