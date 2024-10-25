<template>
  <div class="sidebar">
    <a href="#dashboard" style="margin-top: 150%;"><i class="fa fa-fw fa-home"></i> Dashboard</a>
    <a href="#services"><i class="fa fa-fw fa-wrench"></i> Services</a>
    <a href="#clients"><i class="fa fa-fw fa-user"></i> Clients</a>
    <a href="#contact"><i class="fa fa-fw fa-envelope"></i> Contact</a>
  </div>
</template>

<script>
export default {
  name: 'SidebarComponent'
}
</script>

<style scoped>
.sidebar {
  height: 93%; /* Mantém a altura total da tela */
  width: 180px; /* Ajuste a largura conforme necessário */
  position: fixed;
  margin-top: 60px;
  z-index: 1;
  top: 0;
  left: 20px;
  background: linear-gradient(to bottom, #3e9ed8, #154968);
  overflow-x: hidden;
  padding-top: 50px;

  border-radius: 15px 15px 15px 15px; /* Borda arredondada do lado esquerdo */
  box-shadow: 2px 0 5px rgba(150, 150, 150, 0.3); /* Sombra para dar um efeito de profundidade */
}

.sidebar a {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 20px;
  color: #fff;
  display: block;
  margin-top: 10px;
}

.sidebar a:hover {
  color: #dddddd;
}
</style>
