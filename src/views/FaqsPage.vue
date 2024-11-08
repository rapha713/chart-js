<template>
  <div class="container bg-white" style=" margin-top: 15px;">
    <div class="w-full flex px-8 justify-between pb-2 items-center">
      <div class="flex flex-col items-start justify-start py-2">
        <h3 class="mb-0 text-gray-800 font-bold">FAQs</h3>
        <p class="m-0 text-gray-600">Edite as perguntas e respostas</p>
      </div>
      <button @click="openModal" class="btn btn-primary h-min">Adicionar Pergunta</button>
    </div>
    <table>
      <thead class="border-b-[1px] border-gray-200">
        <tr>
          <th>Código</th>
          <th>Pergunta</th>
          <th>Resposta</th>
          <th>Ativa</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="faq in faqs" :key="faq.codPergunta">
          <td>
            {{ faq.codPergunta }}
          </td>
          <td>

            <div class="w-full flex justify-start items-center">

              <strong>{{ faq.pergunta }}</strong>

            </div>

          </td>
          <td v-if="faq.isExpanded">
            <div class="flex justify-center items-center flex-col-reverse">
              {{ faq.resposta }}
              <span>
                <a @click="faq.isExpanded = false">
                  <svg class="ml-2 cursor-pointer" width="20px" height="20px" viewBox="-1.92 -1.92 27.84 27.84"
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0">
                      <rect x="-1.92" y="-1.92" width="27.84" height="27.84" rx="13.92" fill="#373d3f" strokewidth="0">
                      </rect>
                    </g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
                        stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
                      <path
                        d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
                        stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
                    </g>
                  </svg>
                </a>
              </span>
            </div>
          </td>

          <td v-else>
            <div class="flex justify-center items-center flex-col-reverse">
              Resposta oculta

              <span v-if="!faq.isExpanded">
                <a @click="faq.isExpanded = true">
                  <svg class="ml-2 cursor-pointer" fill="#ffffff" width="20px" height="20px"
                    viewBox="-35.84 -35.84 327.68 327.68" id="Flat" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"
                    stroke-width="0.00256">
                    <g id="SVGRepo_bgCarrier" stroke-width="0">
                      <rect x="-35.84" y="-35.84" width="327.68" height="327.68" rx="163.84" fill="#373D3F"
                        strokewidth="0"></rect>
                    </g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M230.8877,162.8125a7.99959,7.99959,0,1,1-13.85547,8L198.6499,138.97412a123.56028,123.56028,0,0,1-35.28808,16.27832l5.813,32.96436a8.00173,8.00173,0,0,1-6.48925,9.26855,8.13106,8.13106,0,0,1-1.39942.12207,8.00278,8.00278,0,0,1-7.86914-6.61133l-5.71826-32.42724a136.26072,136.26072,0,0,1-39.4873-.01367l-5.71729,32.42724a8.00272,8.00272,0,0,1-7.86914,6.61231,8.12,8.12,0,0,1-1.39844-.12207,8.00124,8.00124,0,0,1-6.49023-9.26758l5.81445-32.978A123.57956,123.57956,0,0,1,57.3064,138.94531l-18.49,32.02539a7.99959,7.99959,0,1,1-13.85547-8l19.49731-33.77a147.761,147.761,0,0,1-18.68188-19.29834A7.99972,7.99972,0,1,1,38.22168,99.84766a128.70627,128.70627,0,0,0,21.24561,20.92285c.06274.04492.12011.09424.18115.14062A109.59068,109.59068,0,0,0,128,144a109.58952,109.58952,0,0,0,68.3374-23.07861c.05225-.03955.10156-.08155.15528-.11963a128.72532,128.72532,0,0,0,21.28466-20.9541,7.99973,7.99973,0,0,1,12.44532,10.05468,147.78919,147.78919,0,0,1-18.72144,19.333Z">
                      </path>
                    </g>
                  </svg>
                </a>
              </span>


            </div>
          </td>
          <td>
            <label class="switch">
              <input type="checkbox" :checked="faq.ativa === 'S'" @change="toggleActive(faq.codPergunta, $event)">
              <span class="slider round"></span>
            </label>
          </td>
          <td>
            <div class="flex justify-center">
              <button @click="editFAQ(faq)"
                class="rounded-md shadow-sm bg-white border-2 border-orange-400 text-orange-400 font-semibold px-[10px] py-[5px]">Editar</button>
              <button @click="confirmDelete(faq.codPergunta)"
                class="ml-2 rounded-md shadow-sm bg-white border-2 border-red-400 text-red-400 font-semibold px-[10px] py-[5px]">Deletar</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <UserModal :isOpen="showModal" @close="closeModal">
      <template v-slot:header>
        <h5 class="text-black font-bold">{{ isEdit ? 'Editar Pergunta' : 'Adicionar Pergunta' }}</h5>
      </template>
      <template v-slot:body>
        <form @submit.prevent="isEdit ? updateFAQ() : addFAQ()">
          <div class="form-group">
            <label for="codPergunta">Codigo Pergunta</label>
            <input type="text" v-model="form.codPergunta" id="codPergunta" class="form-control" required
              style="margin-bottom: 15px;">
            <p>*Não pode ser repetida</p>
          </div>
          <div class="form-group">
            <label for="pergunta">Pergunta</label>
            <input type="text" v-model="form.pergunta" id="pergunta" class="form-control" required
              style="margin-bottom: 15px;">
          </div>
          <div class="form-group">
            <label for="resposta">Resposta</label>
            <textarea v-model="form.resposta" id="resposta" class="form-control" required
              style="margin-bottom: 15px; height: 100px;"></textarea>
          </div>
          <div class="form-group">
            <label for="ativa">Ativa</label>
            <select v-model="form.ativa" id="ativa" class="form-control" required>
              <option value="S">Sim</option>
              <option value="N">Não</option>
            </select>
          </div>
          <div class="w-full flex justify-end">
            <button type="submit" class="btn btn-success" style="margin-top: 10px;">{{ isEdit ? 'Salvar' : 'Adicionar'
              }}</button>
          </div>
        </form>
      </template>
    </UserModal>

    <!-- Off-Canvas para confirmação de exclusão -->
    <div :class="['off-canvas', { 'open': isOffCanvasOpen }]">
      <span class="close-button" @click="closeOffCanvas">&times;</span>
      <div>
        <h5>Confirmar Exclusão</h5>
        <p>Você tem certeza que deseja deletar esta pergunta?</p>
        <button class="btn btn-danger" @click="deleteFAQ" style="margin-right: 5px;">Deletar</button>
        <button class="btn btn-secondary" @click="closeOffCanvas">Cancelar</button>
      </div>
    </div>

    <div v-if="isOffCanvasOpen" class="overlay" @click="closeOffCanvas"></div>
  </div>
</template>

<script>
import UserModal from '../components/UserModal.vue';
import { notify } from '@kyvg/vue3-notification';

export default {
  name: 'FAQManagement',
  components: {
    UserModal,
  },
  data() {
    return {
      faqs: [],
      showModal: false,
      isEdit: false,
      isOffCanvasOpen: false,
      codPerguntaToDelete: null,
      form: {
        codPergunta: 0,
        pergunta: '',
        resposta: '',
        ativa: 'N',
      }
    };
  },
  async mounted() {
    await this.fetchFAQs();
  },
  methods: {
    async fetchFAQs() {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://localhost:7290/faqs`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      if (response.ok) {
        this.faqs = (await response.json()).map(faq => ({
          ...faq,
          isExpanded: false
        }));
      } else {
        console.error('Erro ao buscar FAQs:', response.statusText);
        notify({
          title: "Erro",
          text: "Erro ao buscar FAQs.",
          type: "error"
        });
      }
    },
    openModal() {
      document.body.classList.add('no-scroll');
      this.showModal = true;
      this.isEdit = false;
      this.form = {
        codPergunta: 0,
        pergunta: '',
        resposta: '',
        ativa: 'S',
        origem: '',
      };
    },
    closeModal() {
      this.showModal = false;
      document.body.classList.remove('no-scroll');
    },
    editFAQ(faq) {
      this.isEdit = true;
      this.form = { ...faq };
      this.showModal = true;
    },
    async addFAQ() {
      const token = localStorage.getItem('token');
      const response = await fetch('https://localhost:7290/faqs/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.form)
      });
      if (response.ok) {
        await this.fetchFAQs();
        this.closeModal();
        notify({
          title: "Sucesso",
          text: "Pergunta adicionada com sucesso!",
          type: "success"
        });
      } else {
        console.error('Erro ao adicionar pergunta:', response.statusText);
        notify({
          title: "Erro",
          text: "Erro ao adicionar a pergunta.",
          type: "error"
        });
      }
    },
    async updateFAQ() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://localhost:7290/faqs/edit', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            codPergunta: this.form.codPergunta,
            pergunta: this.form.pergunta,
            resposta: this.form.resposta,
            ativa: this.form.ativa,
          })
        });

        if (response.ok) {
          await this.fetchFAQs();
          this.closeModal();
          notify({
            title: "Sucesso",
            text: "Pergunta editada com sucesso!",
            type: "success"
          });
        } else {
          const errorText = await response.text(); // Use .text() para capturar a resposta quando não é JSON
          console.error('Erro ao atualizar pergunta:', errorText);
          notify({
            title: "Erro",
            text: "Erro ao atualizar a pergunta.",
            type: "error"
          });
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
        notify({
          title: "Erro",
          text: "Erro ao atualizar a pergunta.",
          type: "error"
        });
      }
    },

    confirmDelete(codPergunta) {
      this.codPerguntaToDelete = codPergunta;
      this.isOffCanvasOpen = true;
    },
    closeOffCanvas() {
      this.isOffCanvasOpen = false;
    },
    async deleteFAQ() {
      if (this.codPerguntaToDelete) {
        console.log('Cod Pergunta para deletar:', this.codPerguntaToDelete);
        const token = localStorage.getItem('token');
        const response = await fetch('https://localhost:7290/faqs/delete', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            codPergunta: this.codPerguntaToDelete,
            status: "N"
          })
        });
        if (response.ok) {
          await this.fetchFAQs();
          this.closeOffCanvas();
          notify({
            title: "Sucesso",
            text: "Pergunta deletada com sucesso!",
            type: "success"
          });
        } else {
          const errorData = await response.json();
          console.error('Erro ao deletar pergunta:', errorData);
          notify({
            title: "Erro",
            text: "Erro ao deletar a pergunta.",
            type: "error"
          });
        }
      }
    },
    async toggleActive(codPergunta, event) {
      const novaAtivacao = event.target.checked ? 'S' : 'N';
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://localhost:7290/faqs/toggle', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ codPergunta, ativa: novaAtivacao })
        });

        if (response.ok) {
          await this.fetchFAQs();
          notify({
            title: "Sucesso",
            text: `FAQ ${novaAtivacao === 'S' ? 'ativada' : 'desativada'} com sucesso!`,
            type: "success"
          });
        } else {
          console.error('Erro ao alterar o estado:', response.statusText);
          notify({
            title: "Erro",
            text: `Erro ao ${novaAtivacao === 'S' ? 'ativar' : 'desativar'} a FAQ.`,
            type: "error"
          });
        }
      } catch (error) {
        console.error('Erro ao fazer o toggle:', error);
        notify({
          title: "Erro",
          text: `Erro ao ${novaAtivacao === 'S' ? 'ativar' : 'desativar'} a FAQ.`,
          type: "error"
        });
      }
    }
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