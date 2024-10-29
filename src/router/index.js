import { createRouter, createWebHistory } from 'vue-router';
import DashboardPage from '@/views/DashboardPage.vue';
import ContatosPage from '@/views/ContatosPage.vue';
import LancesPage from '@/views/LancesPage.vue';
import SimulacoesPage from '@/views/SimulacoesPage.vue';
import UsuariosPage from '@/views/UsuariosPage.vue';
import ConfigPage from '@/views/ConfigPage.vue';
import FaqsPage from '@/views/FaqsPage.vue';
import LoginPage from '@/views/LoginPage.vue'; // Importando a página de login

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/contatos',
    name: 'Contatos',
    component: ContatosPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/lances',
    name: 'Lances',
    component: LancesPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/simulacoes',
    name: 'Simulações',
    component: SimulacoesPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/usuarios',
    name: 'Usuários',
    component: UsuariosPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/configuracoes',
    name: 'Configurações',
    component: ConfigPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/faqs',
    name: 'Perguntas Frequentes',
    component: FaqsPage,
    meta: { requiresAuth: true },
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  console.log(`Autenticado: ${isAuthenticated}, Rota: ${to.name}`); // Adicione esta linha

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;