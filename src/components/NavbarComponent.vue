<template>
  <div class="navbar">
    <div class="navbar-title" style="cursor: default;">{{ title }}</div>
    <div class="profile" @mouseenter="showDropdown = true" @mouseleave="showDropdown = false">
      <button class="dropdown-button">
        <i class="fa fa-fw fa-user"></i> <!-- Ícone de perfil -->
        ▼
      </button>
      <div class="dropdown-content" v-if="showDropdown">
        <a href="#" @click.prevent="logout">Logout</a>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useNotification } from '@kyvg/vue3-notification';

export default {
  name: 'NavbarComponent',
  props: {
    title: {
      type: String,
      default: 'Dashboard'
    }
  },
  data() {
    return {
      showDropdown: false
    };
  },
  setup() {
    const router = useRouter();
    const { notify } = useNotification();
    return {
      router,
      notify
    };
  },
  methods: {
  logout() {
    this.router.push({ name: 'Login' });

    this.notify({
      title: 'Logout realizado',
      text: 'Você foi redirecionado para a página de login.',
      type: 'error',
      duration: 5000
    });
  }
}
};
</script>
  
<style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #1E1E2F;
    color: white;
    padding: 10px 20px;
    z-index: 1000; /* Adicionando z-index alto */
    position: relative; /* Para garantir que z-index funcione */
    border-top: 2px solid #3e9ed8; /* Borda superior com 3px de espessura e cor branca */
}

.profile {
  position: relative;
  margin-right: 40px;
}

.dropdown-button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1em;
  display: flex;
  align-items: center;
}

.dropdown-content {
  position: absolute;
  background-color: #46466c;
  min-width: 100px;
  box-shadow: 0px 8px 16px 0px rgba(75, 75, 75, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: #fff;
  padding: 10px 12px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  color: #ddd;
  background-color: #1E1E2F;
}
</style>