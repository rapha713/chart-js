<template>
    <div class="container bg-white" style="margin-top: 15px;">
      <div class="w-full flex px-8 justify-between pb-2 items-center">
        <div class="flex flex-col items-start justify-start py-2">
          <h3 class="mb-0 text-gray-800 font-bold">Valores do slider</h3>
          <p class="m-0 text-gray-600">Edite os valores</p>
        </div>
      </div>
      <table>
        <thead class="border-b-[1px] border-gray-200">
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Valor padrão</th>
            <th>Valor mínimo</th>
            <th>Valor máximo</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="value in values" :key="value.id">
            <td>{{ value.id }}</td>
            <td>
              <div class="w-full flex justify-center items-center">
                <strong>{{ value.nome }}</strong>
              </div>
            </td>
            <td>
              {{ value.defaultValue }}
            </td>
            <td>
              {{ value.minValue }}
            </td>
            <td>
              {{ value.maxValue }}
            </td>
            <td>
              <button @click="editValue(value)"
                class="rounded-md shadow-sm bg-white border-2 border-orange-400 text-orange-400 font-semibold px-[10px] py-[5px]">Editar</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <UserModal :isOpen="showModal" @close="closeModal">
        <template v-slot:header>
          <h5 class="text-black font-bold">{{ isEdit ? 'Editar Valor' : 'Adicionar Valor' }}</h5>
        </template>
        <template v-slot:body>
          <form @submit.prevent="isEdit ? updateValue() : addValue()">
            <div class="form-group">
              <label for="id">ID</label>
              <input type="number" v-model="form.id" id="id" class="form-control" required
                style="margin-bottom: 15px;">
            </div>
            <div class="form-group">
              <label for="nome">Nome</label>
              <input type="text" v-model="form.nome" id="nome" class="form-control" required
                style="margin-bottom: 15px;">
            </div>
            <div class="form-group">
              <label for="defaultValue">Valor Padrão</label>
              <input type="number" v-model="form.defaultValue" id="defaultValue" class="form-control" required
                style="margin-bottom: 15px;">
            </div>
            <div class="form-group">
              <label for="minValue">Valor Mínimo</label>
              <input type="number" v-model="form.minValue" id="minValue" class="form-control" required
                style="margin-bottom: 15px;">
            </div>
            <div class="form-group">
              <label for="maxValue">Valor Máximo</label>
              <input type="number" v-model="form.maxValue" id="maxValue" class="form-control" required
                style="margin-bottom: 15px;">
            </div>
            <div class="w-full flex justify-end">
              <button type="submit" class="btn btn-success" style="margin-top: 10px;">{{ isEdit ? 'Salvar' : 'Adicionar' }}</button>
            </div>
          </form>
        </template>
      </UserModal>
    </div>
  </template>  
  
<script>
  import UserModal from '../components/UserModal.vue';
  import { notify } from '@kyvg/vue3-notification';
  
  export default {
    name: 'ValueManagement',
    components: {
      UserModal,
    },
    data() {
      return {
        values: [],
        showModal: false,
        isEdit: false,
        form: {
          id: 0,
          nome: '',
          defaultValue: 0,
          minValue: 0,
          maxValue: 0,
        }
      };
    },
    async mounted() {
      await this.fetchValues();
    },
    methods: {
      formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(value);
      },
  
      async fetchValues() {
        const token = localStorage.getItem('token');
        const response = await fetch('https://restrito.consorcioapice.com.br/apiadmin/values', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });
        if (response.ok) {
          const data = await response.json();
          this.values = data.map(value => ({
            ...value,
            defaultValue: this.formatCurrency(value.defaultValue),
            minValue: this.formatCurrency(value.minValue),
            maxValue: this.formatCurrency(value.maxValue),
          }));
        } else {
          console.error('Erro ao buscar valores:', response.statusText);
          notify({
            title: "Erro",
            text: "Erro ao buscar valores.",
            type: "error"
          });
        }
      },
  
      openModal() {
        document.body.classList.add('no-scroll');
        this.showModal = true;
        this.isEdit = false;
        this.form = {
          id: 0,
          nome: '',
          defaultValue: 0,
          minValue: 0,
          maxValue: 0,
        };
      },
  
      closeModal() {
        this.showModal = false;
        document.body.classList.remove('no-scroll');
      },
  
      editValue(value) {
        this.isEdit = true;
        this.form = {
          ...value,
          defaultValue: this.parseCurrency(value.defaultValue),
          minValue: this.parseCurrency(value.minValue),
          maxValue: this.parseCurrency(value.maxValue),
        };
        this.showModal = true;
      },
  
      parseCurrency(value) {
        return parseFloat(value.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
      },
  
      async updateValue() {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch('https://restrito.consorcioapice.com.br/apiadmin/values/update', {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.form)
          });
  
          if (response.ok) {
            await this.fetchValues();
            this.closeModal();
            notify({
              title: "Sucesso",
              text: "Valor atualizado com sucesso!",
              type: "success"
            });
          } else {
            const errorText = await response.text();
            console.error('Erro ao atualizar valor:', errorText);
            notify({
              title: "Erro",
              text: "Erro ao atualizar o valor.",
              type: "error"
            });
          }
        } catch (error) {
          console.error('Erro na requisição:', error);
          notify({
            title: "Erro",
            text: "Erro ao atualizar o valor.",
            type: "error"
          });
        }
      },
  
      async addValue() {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch('https://restrito.consorcioapice.com.br/apiadmin/values', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.form)
          });
  
          if (response.ok) {
            await this.fetchValues();
            this.closeModal();
            notify({
              title: "Sucesso",
              text: "Valor adicionado com sucesso!",
              type: "success"
            });
          } else {
            const errorText = await response.text();
            console.error('Erro ao adicionar valor:', errorText);
            notify({
              title: "Erro",
              text: "Erro ao adicionar o valor.",
              type: "error"
            });
          }
        } catch (error) {
          console.error('Erro na requisição:', error);
          notify({
            title: "Erro",
            text: "Erro ao adicionar o valor.",
            type: "error"
          });
        }
      },
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
    text-align: center;
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
    text-align: center;
    width: 20%;
  }
  
  th:nth-child(3),
  td:nth-child(3) {
    width: 30%;
    text-align: center;
  }
  
  th:nth-child(4),
  td:nth-child(4) {
    width: 30%;
    text-align: center;
  }
  
  th:nth-child(5),
  td:nth-child(5) {
    width: 30%;
    text-align: center;
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
  </style>