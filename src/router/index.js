import { createRouter, createWebHistory } from 'vue-router';
import DashboardPage from '../views/DashboardPage.vue';
import ContatosPage from '../views/ContatosPage.vue';
import LancesPage from '../views/LancesPage.vue';
import SimulacoesPage from '@/views/SimulacoesPage.vue';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardPage,
  },
  {
    path: '/contatos',
    name: 'Contatos',
    component: ContatosPage,
  },
  {
    path: '/lances',
    name: 'Lances',
    component: LancesPage,
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
