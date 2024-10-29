import { createRouter, createWebHistory } from 'vue-router';
import DashboardPage from '@/views/DashboardPage.vue';
import ContatosPage from '@/views/ContatosPage.vue';
import LancesPage from '@/views/LancesPage.vue';
import SimulacoesPage from '@/views/SimulacoesPage.vue';
import UsuariosPage from '@/views/UsuariosPage.vue';
import ConfigPage from '@/views/ConfigPage.vue';
import FaqsPage from '@/views/FaqsPage.vue'

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
    name: 'Simulações',
    component: SimulacoesPage,
  },
  {
    path: '/usuarios',
    name: 'Usuários',
    component: UsuariosPage,
  },
  {
    path: '/configuracoes',
    name: 'Configurações',
    component: ConfigPage,
  },
   {
    path: '/faqs',
    name: 'Perguntas Frequentes',
    component: FaqsPage,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
