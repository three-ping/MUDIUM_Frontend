import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js"; // 라우터 가져오기
import "@/assets/styles/main.css";
const app = createApp(App);

app.use(router); // 라우터 사용 등록
app.mount("#app"); // Vue 애플리케이션을 마운트
