<template>
  <div class="container bg-white" style=" margin-top: 15px;">
    <div class="w-full flex px-8 pb-2 items-center">
      <div class="flex flex-col items-start justify-start py-2">
        <h3 class="mb-0 text-gray-800 font-bold">Contatos</h3>
      </div>
    </div>
    <table>
      <thead class="border-b-[1px] border-gray-200">
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Telefone</th>
          <th>Tipo/Documento</th>
          <th>Detalhes</th>
        </tr>
        <tr>
          <th><input class="text-center" type="text" v-model="filters.id" placeholder="ID" /></th>
          <th><input class="text-center" type="text" v-model="filters.name" placeholder="Nome" /></th>
          <th><input class="text-center" type="text" v-model="filters.email" placeholder="Email" /></th>
          <th><input class="text-center" type="text" v-model="filters.phone" placeholder="Telefone" /></th>
          <th><input class="text-center" type="text" v-model="filters.type" placeholder="Tipo/Documento" /></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in filteredContacts" :key="contact.id">
          <td class="text-center">
            {{ contact.id }}
          </td>

          <td>
            {{ contact.name }}
          </td>

          <td>
            {{ contact.email }}
          </td>

          <td>
            {{ contact.phone }}
          </td>

          <td>
            {{ contact.tipo }}
          </td>

          <td style="text-align: center;">
            <i class="fa fa-fw fa-info" @click="showDetails(contact.id)" style="cursor: pointer;"></i>
          </td>

        </tr>
      </tbody>
    </table>

    <div class="pagination text-black">
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
        phone: "",
        type: ""
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
          (this.filters.id === "" || contact.id?.toString().includes(this.filters.id)) &&
          (this.filters.name === "" || contact.name?.toLowerCase().includes(this.filters.name.toLowerCase())) &&
          (this.filters.email === "" || contact.email?.toLowerCase().includes(this.filters.email.toLowerCase())) &&
          (this.filters.phone === "" || contact.phone?.toString().includes(this.filters.phone)) &&
          (this.filters.type === "" || contact.tipo?.toLowerCase().includes(this.filters.type.toLowerCase()))
        );
      });
    },
    // Aplica a paginação após a filtragem
    paginatedContacts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredContacts.slice(start, end);
    },
  },
  methods: {
    async fetchData() {
      this.loading = true;
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://restrito.consorcioapice.com.br/apiadmin/contact?pageNumber=${this.currentPage}&pageSize=${this.itemsPerPage}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
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
        const token = localStorage.getItem('token');
        const response = await fetch(`https://restrito.consorcioapice.com.br/apiadmin/contact/${contactId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        this.selectedContactDetails = data.html; // Alterado para selectedContactDetails
        this.isOffCanvasOpen = true;
      } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
      }
    },
    closeOffCanvas() {
      this.isOffCanvasOpen = false;
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
.container {
  padding: 5px;
  background-color: white;
  margin-bottom: 5px;
  margin-left: 10.7%;
  border-radius: 15px !important;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

input[type="text"] {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  box-sizing: border-box;
}

.details {
  margin-top: 20px;
  color: white;
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

th {
  background-color: #F8F9FD;
}

th,
td {
  padding: 10px;
  color: #54565c;
}

th {
  text-align: center;

}

td {
  text-align: left;
}

tr:nth-child(even) {
  background-color: #F9FBFC !important;
}

tr:nth-child(odd) {
  background-color: #FFFFFF;
}

th:nth-child(1),
td:nth-child(1) {
  width: 5%;
}

th:nth-child(2),
td:nth-child(2) {
  width: 30%;
}

th:nth-child(3),
td:nth-child(3) {
  width: 30%;
}

th:nth-child(4),
td:nth-child(4) {
  width: 10%;
}

th:nth-child(5),
td:nth-child(5) {
  width: 10%;
}

th:nth-child(6),
td:nth-child(6) {
  width: 5%;
}

.container {
  padding: 7px;
  border-radius: 5px;
  margin-top: 12%;
}

.off-canvas {
  position: fixed;
  right: -400px;
  top: 0;
  height: 100%;
  width: 400px;
  background-color: #ffffff !important;
  transition: right 0.3s ease;
  padding: 20px;
  color: white;
  z-index: 1051;
  color: black;
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
  z-index: 1005;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
  color: white;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked+.slider {
  background-color: #2196F3;
}

input:checked+.slider:before {
  transform: translateX(26px);
}

.no-scroll {
  overflow: hidden;
  height: 100%;
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

.pagination button:hover {
  background-color: #46466c;
}

.pagination button:disabled {
  background-color: #14141f;
  cursor: not-allowed;
}

.pagination span {
  font-weight: bold;
}
</style>