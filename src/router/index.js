import { createRouter, createWebHistory } from 'vue-router';
import DashboardPage from '../views/DashboardPage.vue';

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage,
  },
  // Outras rotas...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
