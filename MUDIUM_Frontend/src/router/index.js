import { createRouter, createWebHistory } from 'vue-router';

// 도메인별 라우트 가져오기
import boardRoutes from "./board";
import MusicalRoutes from "./musical";
// import HomeView from '/HomeView.vue';



const routes = [
  {
    path: '/',
  },
  ...boardRoutes,
  ...MusicalRoutes
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