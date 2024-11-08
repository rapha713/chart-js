<template>
  <div id="app">
    <NavbarComponent :title="pageTitle" v-if="!isLoginPage" />
    <SidebarComponent v-if="!isLoginPage" />
    <notifications />
    <router-view />
  </div>
</template>

<script>
import { watch, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import NavbarComponent from './components/NavbarComponent.vue';
import SidebarComponent from './components/SidebarComponent.vue';
import { Notifications } from '@kyvg/vue3-notification';
import 'font-awesome/css/font-awesome.css';

export default {
  name: 'App',
  components: {
    NavbarComponent,
    SidebarComponent,
    Notifications,
  },
  setup() {
    const route = useRoute();
    const pageTitle = ref(route.name);

    watch(route, (newRoute) => {
      pageTitle.value = newRoute.name;
    });

    // Computed property to check if the current route is the login page
    const isLoginPage = computed(() => route.name === 'Login');

    return {
      pageTitle,
      isLoginPage,
    };
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Lexend+Mega:wght@100..900&display=swap');

html {
  background-color: #F3F4F8 !important;
}

#app {
  font-family: "Lato", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #3e9ed8;
  margin-top: 0;
  display: flex;
  flex-direction: column;
  background-color: #F3F4F8;
}

.main {
  margin-left: 220px;
  padding: 20px;
}
</style>