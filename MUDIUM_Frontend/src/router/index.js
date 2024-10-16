import { createRouter, createWebHistory } from 'vue-router';

// 도메인별 라우트 가져오기
import boardRoutes from "./board";
import signupRoutes from "./signup";
import App from '@/App.vue';



const routes = [
  {
    path: '/'
  },
  ...boardRoutes,
  ...signupRoutes
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition; 
    } else {
      return { top: 0 };
    }
  }
});

export default router;