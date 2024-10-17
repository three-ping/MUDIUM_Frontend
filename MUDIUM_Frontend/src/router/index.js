import { createRouter, createWebHistory } from 'vue-router';

// 도메인별 라우트 가져오기
import boardRoutes from "./board";
import signupRoutes from "./signup";
import guidebookRoutes from "./guidebook";
// import GuidebookMain from '@/views/guidebook/GuidebookMain.vue';
import App from '@/App.vue';



const routes = [
  {
    path: '/'
  },
  ...guidebookRoutes,
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