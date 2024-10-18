import { createRouter, createWebHistory } from 'vue-router';

// 도메인별 라우트 가져오기
import boardRoutes from "./board";
// import LoginRoutes from "./login";
import MusicalRoutes from "./musical";
// import HomeView from '/HomeView.vue';
import NoticeRoutes from "./notice";
import reviewRoutes from "./review";
import secretReviewRoutes from "./secret-review";



const routes = [
  {
    path: '/',
    redirect: '/musicalInfo'
  },
  ...boardRoutes,
  // ...LoginRoutes,
  ...MusicalRoutes,
  ...NoticeRoutes,
  ...reviewRoutes,
  ...secretReviewRoutes
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