<template>
  <div id="app">
    <NavbarComponent title="Dashboard" />
    <SidebarComponent />
    <div class="main">
      <DashboardPage msg="Consórcio Ápice" />
    </div>
  </div>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue'
import SidebarComponent from './components/SidebarComponent.vue'
import DashboardPage from './views/DashboardPage.vue'
import 'font-awesome/css/font-awesome.css'; // Importação aqui

export default {
  name: 'App',
  components: {
    NavbarComponent,
    SidebarComponent,
    DashboardPage
  }
}
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
  margin-top: 0; /* Removendo a margem para a navbar */
  background: linear-gradient(to bottom, #1E1E2F, #14141f);
  display: flex;
  flex-direction: column; /* Mudando a direção do flex */
}

.main {
  margin-left: 220px; /* Ajustando a margem para corresponder à nova largura do sidebar */
  padding: 20px; /* Adicionando padding para o conteúdo principal */
}
</style>
