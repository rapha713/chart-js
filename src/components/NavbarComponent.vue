<template>
  <div class="w-full flex justify-between px-6 py-2 nav border-b-[1px] border-gray-200 bg-white">
    <div class="text-black text-3xl font-semibold pl-[120px]">
      {{ title }}
    </div>
    <div class="flex items-center">
      <svg width="27px" height="27px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54"
            stroke="#121212" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
          <path d="M15 12H3.62" stroke="#121212" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          </path>
          <path d="M5.85 8.6499L2.5 11.9999L5.85 15.3499" stroke="#121212" stroke-width="1.8" stroke-linecap="round"
            stroke-linejoin="round"></path>
        </g>
      </svg>
      <a href="#" @click.prevent="logout" class="no-underline text-black ml-2">Logout</a>
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
      localStorage.removeItem('token'); // Se você estiver usando token
      localStorage.removeItem('isAuthenticated'); // Remove o estado de autenticação
      this.$router.push({ name: 'Login' });

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

<style scoped></style>