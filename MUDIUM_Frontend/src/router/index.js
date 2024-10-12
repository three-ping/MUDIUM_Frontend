import { createRouter, createWebHistory } from 'vue-router';

// 도메인별 라우트 가져오기
import boardRoutes from "./board";

import HomeView from '@/views/HomeView.vue';



const routes = [
  {
    path: '/',
    component: HomeView 
  },
  ...boardRoutes
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;