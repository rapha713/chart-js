<template>
  <div class="modal" v-if="isOpen">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <slot name="header"></slot>
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserModal',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  /* Flexbox para centralizar o conteúdo */
  justify-content: center;
  /* Centraliza horizontalmente */
  align-items: center;
  /* Centraliza verticalmente */
  position: fixed;
  /* Fixa o modal na tela */
  z-index: 1000;
  /* Coloca o modal acima de outros elementos */
  left: 0;
  top: 0;
  width: 100%;
  /* Largura total */
  height: 100%;
  /* Altura total */
  background-color: rgba(0, 0, 0, 0.7);
  /* Fundo semi-transparente */
}

.modal-content {
  background-color: white;
  /* Cor de fundo branca */
  border-radius: 8px;
  /* Bordas arredondadas */
  box-shadow: 0 2px 10px rgba(255, 255, 255, 0.3);
  /* Sombra para dar profundidade */
  max-width: 500px;
  /* Largura máxima do modal */
  width: 90%;
  /* Largura responsiva */
  padding: 20px;
  /* Espaçamento interno */
  animation: fadeIn 0.3s;
  /* Efeito de aparecimento */
  color: black;
  text-align: left;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    /* Começa invisível */
  }

  to {
    opacity: 1;
    /* Termina visível */
  }
}

.close {
  color: black;
  /* Cor do botão de fechar */
  margin-left: auto;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #46466c;
  /* Cor do botão ao passar o mouse */
  text-decoration: none;
  cursor: pointer;
}

.form-group {
  margin-bottom: 15px;
  /* Espaçamento entre os grupos de formulários */
}

button {
  margin-top: 10px;
  /* Espaçamento acima do botão de submit */
}
</style>
