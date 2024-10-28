import { createRouter, createWebHistory } from 'vue-router';
import DashboardPage from '../views/DashboardPage.vue';
import ContatosPage from '../views/ContatosPage.vue';
import SimulacoesPage from '@/views/SimulacoesPage.vue';

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage,
  },
  {
    path: '/contatos',
    name: 'Contatos',
    component: ContatosPage,
  },
  {
    path: '/simulacoes',
    name: 'Simulacoes',
    component: SimulacoesPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
