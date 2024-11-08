<template>
  <div class="container bg-white" style=" margin-top: 15px;">
    <div class="w-full flex px-8 pb-2 items-center">
      <div class="flex flex-col items-start justify-start py-2">
        <h3 class="mb-0 text-gray-800 font-bold">Lances</h3>
      </div>
    </div>
    <table>
      <thead class="border-b-[1px] border-gray-200">
        <tr>
          <th>Grupo</th>
          <th>Cota</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Documento</th>
          <th>Tipo</th>
          <th>Valor</th>
          <th>Detalhes</th>
        </tr>
        <tr>
          <th><input class="text-center" type="text" v-model="filters.id" placeholder="Grupo" /></th>
          <th><input class="text-center" type="text" v-model="filters.id" placeholder="Cota" /></th>
          <th><input class="text-center" type="text" v-model="filters.name" placeholder="Nome" /></th>
          <th><input class="text-center" type="text" v-model="filters.email" placeholder="Email" /></th>
          <th><input class="text-center" type="text" v-model="filters.formattedDocument" placeholder="Documento" /></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="offer in filteredOffers" :key="offer.id">
          <td>
            {{ offer.group }}
          </td>

          <td class="text-center">
            {{ offer.quota }}
          </td>

          <td>
            {{ offer.name }}
          </td>

          <td>
            {{ offer.email }}
          </td>

          <td>
            {{ offer.formattedDocument }}
          </td>

          <td>
            {{ offer.type }}
          </td>

          <td>
            {{ offer.total }}
          </td>

          <td class="text-center">
            <i class="fa fa-fw fa-info" @click="showDetails(offer.id)" style="cursor: pointer;"></i>
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
      <div v-html="selectedOfferDetails"></div>
    </div>

    <div v-if="isOffCanvasOpen" class="overlay" @click="closeOffCanvas"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      offers: [],
      filters: {
        group: "",
        quota: "",
        name: "",
        email: "",
        formattedDocument: ""
      },
      currentPage: 1,
      itemsPerPage: 10,
      totalPages: 1,
      loading: false,
      selectedOfferDetails: null,
      isOffCanvasOpen: false,
    };
  },
  computed: {
    filteredOffers() {
      return this.offers.filter(offer => {
        return (
          (this.filters.group ? offer.group.toString().includes(this.filters.group) : true) &&
          (this.filters.quota ? offer.quota.toString().includes(this.filters.quota) : true) &&
          (this.filters.name ? offer.name.toLowerCase().includes(this.filters.name.toLowerCase()) : true) &&
          (this.filters.email ? offer.email.toLowerCase().includes(this.filters.email.toLowerCase()) : true) &&
          (this.filters.formattedDocument ? offer.formattedDocument.includes(this.filters.formattedDocument) : true) &&
          (this.filters.type ? offer.type.includes(this.filters.type) : true) &&
          (this.filters.total ? offer.total.includes(this.filters.total) : true)
        );
      });
    }
  },
  methods: {
    async fetchData() {
      this.loading = true;
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://localhost:7290/lances?pageNumber=${this.currentPage}&pageSize=${this.itemsPerPage}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        this.offers = data.items;
        console.log(this.offers);
        this.totalPages = data.totalPages;
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        this.loading = false;
      }
    },
    async showDetails(offerId) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://localhost:7290/lances/${offerId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        this.selectedOfferDetails = data.html;
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
  text-align: center;
  width: 5%;
}

th:nth-child(2),
td:nth-child(2) {
  width: 20%;
}

th:nth-child(3),
td:nth-child(3) {
  width: 40%;
  text-align: center;
}

th:nth-child(4),
td:nth-child(4) {
  width: 5%;
}

th:nth-child(5),
td:nth-child(5) {
  width: 15%;
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