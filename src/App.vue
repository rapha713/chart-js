<template>
  <div id="app">
    <NavbarComponent :title="pageTitle" />
    <SidebarComponent />
    <router-view />
  </div>
</template>

<script>
import { watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import NavbarComponent from './components/NavbarComponent.vue'
import SidebarComponent from './components/SidebarComponent.vue'
import 'font-awesome/css/font-awesome.css';

export default {
  name: 'App',
  components: {
    NavbarComponent,
    SidebarComponent,
  },
  setup() {
    const route = useRoute();
    const pageTitle = ref(route.name);

    watch(route, (newRoute) => {
      pageTitle.value = newRoute.name;
    });

    return {
      pageTitle,
    };
  },
};
</script>

<style>
html {
  background: linear-gradient(to bottom, #14141f, #0a0a10);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #3e9ed8;
  margin-top: 0;
  background: linear-gradient(to bottom, #1E1E2F, #14141f);
  display: flex;
  flex-direction: column;
}

.main {
  margin-left: 220px;
  padding: 20px;
}
</style>
