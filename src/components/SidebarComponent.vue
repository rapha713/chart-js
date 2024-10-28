<template>
  <div class="sidebar">
    <a href="/" style="margin-top: 150%;"><i class="fa fa-fw fa-home"></i> Dashboard</a>
    <div @click="toggleDropdown" class="dropdown">
      <a href="javascript:void(0)" aria-haspopup="true" :aria-expanded="dropdownVisible">
        <i class="fa fa-fw fa-th"></i> Dados
      </a>
      <div v-if="dropdownVisible" class="dropdown-content" :class="{ 'show': dropdownVisible }">
        <a href="/contatos" style="font-size: medium;">
          <i class="fa fa-fw fa-angle-double-right"></i> Contatos
        </a>
        <a href="/lances" style="font-size: medium;">
          <i class="fa fa-fw fa-angle-double-right"></i> Lances
        </a>
        <a href="/simulacoes" style="font-size: medium;">
          <i class="fa fa-fw fa-angle-double-right"></i> Simulações
        </a>
      </div>
    </div>
    <a href="#clients"><i class="fa fa-fw fa-user"></i> Usuários</a>
    <a href="#contact"><i class="fa fa-fw fa-envelope"></i> Contact</a>
  </div>
</template>

<script>
export default {
  name: 'SidebarComponent',
  data() {
    return {
      dropdownVisible: false // Estado para controlar a visibilidade do dropdown
    };
  },
  mounted() {
  document.addEventListener('click', this.handleClickOutside);
},
beforeUnmount() {
  document.removeEventListener('click', this.handleClickOutside);
},
methods: {
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible; // Alterna a visibilidade
    }
  }
};
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
  margin-left: -0.3%;
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
.dropdown-content {
  display: none;
}

.dropdown-content.show {
  display: block; /* Exibe quando a classe 'show' é aplicada */
  transition: max-height 0.3s ease-in-out; /* Exemplo de transição */
}
</style>
