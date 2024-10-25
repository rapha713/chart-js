<template>
  <DashboardPage msg="Consórcio Ápice"/>
</template>

<script>
import DashboardPage from './views/DashboardPage.vue'

export default {
  name: 'App',
  components: {
    DashboardPage
  }
}
</script>

<style>
html{
  background-color: #1E1E2F;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #3e9ed8;
  margin-top: 60px;
  background-color: #1E1E2F;
}
</style>
