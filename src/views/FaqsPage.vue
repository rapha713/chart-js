<template>
    <div class="container" style=" margin-top: 15px;">
      <div class="title">
        <h3>FAQs</h3>
        <button @click="openModal" class="btn btn-primary">Adicionar Pergunta</button>
      </div>
      <table class="table">
        <thead>
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
            <td>{{ faq.codPergunta }}</td>
            <td @click="faq.isExpanded = !faq.isExpanded" style="cursor: pointer;">
                <strong>{{ faq.pergunta }}</strong>
                <span v-if="faq.isExpanded"> - <em>(Clique para ocultar)</em></span>
                <span v-else> - <em>(Clique para expandir)</em></span>
            </td>
            <td v-if="faq.isExpanded">{{ faq.resposta }}</td>
            <td v-else>Resposta oculta</td>
            <td>
                <label class="switch">
                    <input type="checkbox" :checked="faq.ativa === 'S'" @change="toggleActive(faq.codPergunta, $event)">
                    <span class="slider round"></span>
                </label>
            </td>
            <td>
              <button @click="editFAQ(faq)" class="btn btn-warning" style="margin-right: 5px;">Editar</button>
              <button @click="confirmDelete(faq.codPergunta)" class="btn btn-danger">Deletar</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <UserModal :isOpen="showModal" @close="closeModal">
        <template v-slot:header>
          <h5 class="modal-title" style="text-align: center;">{{ isEdit ? 'Editar Pergunta' : 'Adicionar Pergunta' }}</h5>
        </template>
        <template v-slot:body>
          <form @submit.prevent="isEdit ? updateFAQ() : addFAQ()">
            <div class="form-group">
              <label for="codPergunta">Codigo Pergunta</label>
              <input type="text" v-model="form.codPergunta" id="codPergunta" class="form-control" required style="margin-bottom: 15px;">
              <p>*Não pode ser repetida</p>
            </div>
            <div class="form-group">
              <label for="pergunta">Pergunta</label>
              <input type="text" v-model="form.pergunta" id="pergunta" class="form-control" required style="margin-bottom: 15px;">
            </div>
            <div class="form-group">
                <label for="resposta">Resposta</label>
                <textarea v-model="form.resposta" id="resposta" class="form-control" required style="margin-bottom: 15px; height: 100px;"></textarea>
            </div>
            <div class="form-group">
              <label for="ativa">Ativa</label>
              <select v-model="form.ativa" id="ativa" class="form-control" required>
                <option value="S">Sim</option>
                <option value="N">Não</option>
              </select>
            </div>
            <button type="submit" class="btn btn-success" style="margin-top: 10px;">{{ isEdit ? 'Salvar' : 'Adicionar' }}</button>
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
      const response = await fetch(`https://restrito.consorcioapice.com.br/apiadmin/faqs`, {
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
      const response = await fetch('https://restrito.consorcioapice.com.br/apiadmin/faqs/add', {
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
      console.log('Dados da FAQ:', {
        codPergunta: this.form.codPergunta,
        pergunta: this.form.pergunta,
        resposta: this.form.resposta,
        ativa: this.form.ativa
      });
      
      const token = localStorage.getItem('token');
      const response = await fetch('https://restrito.consorcioapice.com.br/apiadmin/faqs/edit', {
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
        const errorData = await response.json();
        console.error('Erro ao atualizar pergunta:', errorData);
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
        const response = await fetch('https://restrito.consorcioapice.com.br/apiadmin/faqs/delete', {
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
        const response = await fetch('https://restrito.consorcioapice.com.br/apiadmin/faqs/toggle', {
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
  border-radius: 3px;
  background-color: #27293D;
  margin-bottom: 5px;
  margin-left: 10.7%;
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
  th, td {
    border: 1px solid #46466c;
    color: #fff;
    padding: 3px;
    text-align: center;
    background-color: #27293D;
  }
  tr, th {
    background-color: #14141f; 
    text-align: center;
    color: white; 
  }
  tr:nth-child(even) {
    background-color: #46466c; 
  }
  input[type="text"] {
    width: 100%; 
    padding: 8px;
    margin-top: 5px;
    box-sizing: border-box;
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
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1000;
  }
  h3 {
  color: #42b983;
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: bold;
}
    th:nth-child(1), td:nth-child(1) { width: 5%; } 
    th:nth-child(2), td:nth-child(2) { width: 20%; } 
    th:nth-child(3), td:nth-child(3) { width: 30%; }
    th:nth-child(4), td:nth-child(4) { width: 15%; }
    th:nth-child(5), td:nth-child(5) { width: 15%; }

  .container {
  padding: 7px;
  border-radius: 5px;
  background-color: #27293D;
  margin-top: 12%;
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

  .btn-primary:hover {
    background-color: #46466c;
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

input:checked + .slider {
  background-color: #2196F3;
}

input:checked + .slider:before {
  transform: translateX(26px);
}
.no-scroll {
  overflow: hidden;
  height: 100%;
}
</style>