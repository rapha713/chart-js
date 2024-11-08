import { createRouter, createWebHistory } from 'vue-router';
import DashboardPage from '@/views/DashboardPage.vue';
import ContatosPage from '@/views/ContatosPage.vue';
import LancesPage from '@/views/LancesPage.vue';
import SimulacoesPage from '@/views/SimulacoesPage.vue';
import UsuariosPage from '@/views/UsuariosPage.vue';
import ConfigPage from '@/views/ConfigPage.vue';
import FaqsPage from '@/views/FaqsPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import ValuePage from '@/views/ValuePage.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage,
    meta: { title: 'Apice Admin' }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage,
    meta: { requiresAuth: true, title: 'Dashboard' }
  },
  {
    path: '/contatos',
    name: 'Contatos',
    component: ContatosPage,
    meta: { requiresAuth: true, title: 'Contatos' }
  },
  {
    path: '/lances',
    name: 'Lances',
    component: LancesPage,
    meta: { requiresAuth: true, title: 'Lances' }
  },
  {
    path: '/simulacoes',
    name: 'Simulações',
    component: SimulacoesPage,
    meta: { requiresAuth: true, title: 'Simulações' }
  },
  {
    path: '/usuarios',
    name: 'Usuários',
    component: UsuariosPage,
    meta: { requiresAuth: true, title: 'Usuários' }
  },
  {
    path: '/configuracoes',
    name: 'Configurações',
    component: ConfigPage,
    meta: { requiresAuth: true, title: 'Configurações' }
  },
  {
    path: '/faqs',
    name: 'Perguntas Frequentes',
    component: FaqsPage,
    meta: { requiresAuth: true, title: 'Perguntas Frequentes' }
  },
  {
    path: '/valores',
    name: 'Valores',
    component: ValuePage,
    meta: { requiresAuth: true, title: 'Valores' }
  }
];

const router = createRouter({
  history: createWebHistory('/restrito/ApiceAdmin/'), // Definindo a base path corretamente
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  console.log(`Autenticado: ${isAuthenticated}, Rota: ${to.name}`);

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'Login' }); // Redireciona para a página de login se não estiver autenticado
  } else {
    next(); // Continua a navegação se estiver autenticado ou não precisar de autenticação
  }

  // Atualiza o título da página
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = 'Apice Admin'; // Caso não tenha título definido
  }
});

export default router;