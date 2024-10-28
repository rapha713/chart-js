<template>
  <div class="card">
    <table>
      <thead>
        <tr>
          <th style="text-align: center; background-color: #14141f;">ID</th>
          <th style="text-align: center; background-color: #14141f;">Nome</th>
          <th style="text-align: center; background-color: #14141f;">Email</th>
          <th style="text-align: center; background-color: #14141f;">Telefone</th>
          <th style="text-align: center; background-color: #14141f;">Tipo/Documento</th>
          <th style="text-align: center; background-color: #14141f;">Detalhes</th>
        </tr>
        <tr>
          <th><input type="text" v-model="filters.id" style="text-align: center;" placeholder="ID" /></th>
          <th><input type="text" v-model="filters.name" placeholder="Nome" /></th>
          <th><input type="text" v-model="filters.email" placeholder="Email" /></th>
          <th><input type="text" v-model="filters.phone" placeholder="Telefone" /></th>
          <th><input type="text" v-model="filters.phone" placeholder="Tipo/Documento" /></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in filteredContacts" :key="contact.id">
          <td style="text-align: center;">{{ contact.id }}</td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.email }}</td>
          <td style="text-align: center;">{{ contact.phone }}</td>
          <td style="text-align: center;">{{ contact.tipo }}</td>
          <td style="text-align: center;">
            <i class="fa fa-fw fa-info" @click="showDetails(contact.id)" style="cursor: pointer;"></i>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination" style="color: white;">
      <button @click="prevPage" :disabled="currentPage === 1">Anterior</button>
      <span>Página {{ currentPage }} de {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Próximo</button>
    </div>

    <div :class="['off-canvas', { 'open': isOffCanvasOpen }]">
      <span class="close-button" @click="closeOffCanvas">&times;</span>
      <div v-html="selectedContactDetails"></div>
    </div>

    <div v-if="isOffCanvasOpen" class="overlay" @click="closeOffCanvas"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contacts: [],
      filters: {
        id: "",
        name: "",
        email: "",
        phone: ""
      },
      currentPage: 1,
      itemsPerPage: 10,
      totalPages: 1,
      loading: false,
      selectedContactDetails: null,
      isOffCanvasOpen: false,
    };
  },
  computed: {
    filteredContacts() {
      return this.contacts.filter(contact => {
        return (
          (this.filters.id ? contact.id.toString().includes(this.filters.id) : true) &&
          (this.filters.name ? contact.name.toLowerCase().includes(this.filters.name.toLowerCase()) : true) &&
          (this.filters.email ? contact.email.toLowerCase().includes(this.filters.email.toLowerCase()) : true) &&
          (this.filters.phone ? contact.phone.includes(this.filters.phone) : true)
        );
      });
    }
  },
  methods: {
    async fetchData() {
      this.loading = true;
      try {
        const response = await fetch(`https://localhost:7290/api/contact?pageNumber=${this.currentPage}&pageSize=${this.itemsPerPage}`);
        const data = await response.json();
        this.contacts = data.items;
        this.totalPages = data.totalPages;
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        this.loading = false;
      }
    },
    async showDetails(contactId) {
      try {
        const response = await fetch(`https://localhost:7290/api/contact/${contactId}`);
        const data = await response.json();
        this.selectedContactDetails = data.html;
        this.isOffCanvasOpen = true; // Abre o off-canvas
      } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
      }
    },
    closeOffCanvas() {
      this.isOffCanvasOpen = false; // Fecha o off-canvas
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchData();
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchData();
      }
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style scoped>
.card {
  padding: 20px;
  border-radius: 5px;
  background-color: #27293D;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #46466c;
  color: #fff;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #27293D; /* Cor de fundo do cabeçalho */
  color: white; /* Cor do texto do cabeçalho */
}

th:nth-child(1), td:nth-child(1) { width: 5%; } /* Coluna ID */
th:nth-child(2), td:nth-child(2) { width: 30%; } /* Coluna Nome */
th:nth-child(3), td:nth-child(3) { width: 30%; } /* Coluna Email */
th:nth-child(4), td:nth-child(4) { width: 10%; } /* Coluna Telefone */
th:nth-child(5), td:nth-child(5) { width: 10%; } /* Coluna Detalhes */
th:nth-child(6), td:nth-child(6) { width: 5%; }

tr:nth-child(even) {
  background-color: #27293D; /* Cor de fundo alternada para as linhas */
}

input[type="text"] {
  width: 100%; /* A largura do input ocupa toda a célula */
  padding: 8px;
  margin-top: 5px;
  box-sizing: border-box;
}

.pagination {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination button {
  padding: 8px 12px;
  border: none;
  background-color: #14141f;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #14141f; /* Cor do botão desabilitado */
  cursor: not-allowed;
}

.pagination span {
  font-weight: bold;
}
button {
  padding: 8px 12px;
  border: none;
  background-color: #14141f;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.details {
  margin-top: 20px;
  color: white;
}
.off-canvas {
  position: fixed;
  right: -400px;
  top: 0;
  height: 100%;
  width: 400px;
  background-color: #27293D;
  transition: right 0.3s ease;
  padding: 20px;
  color: white;
  z-index: 1001;
}

.off-canvas.open {
  right: 0;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
  color: white;
}
.fa-info:hover {
  color: #4eacf0; /* Cor ao passar o mouse */
}
</style>