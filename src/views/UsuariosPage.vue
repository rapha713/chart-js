<template>
    <div class="container">
      <div class="title">
        <h3>Usuários</h3>
        <button @click="openModal" class="btn btn-primary">Adicionar Usuário</button>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Usuário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.full_Name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.username }}</td>
            <td>
              <button @click="editUser(user)" class="btn btn-warning" style="margin-right: 5px;">Editar</button>
              <button @click="confirmDelete(user.id)" class="btn btn-danger">Deletar</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <UserModal :isOpen="showModal" @close="closeModal">
        <template v-slot:header>
          <h5 class="modal-title" style="text-align: center;">{{ isEdit ? 'Editar Usuário' : 'Adicionar Usuário' }}</h5>
        </template>
        <template v-slot:body>
          <form @submit.prevent="isEdit ? updateUser() : addUser()">
            <div class="form-group">
              <label for="name">Nome</label>
              <input type="text" v-model="form.full_Name" id="full_Name" class="form-control" required style="margin-bottom: 15px;">
            </div>
            <div class="form-group">
              <label for="username">Usuário</label>
              <input type="text" v-model="form.username" id="username" class="form-control" required style="margin-bottom: 15px;">
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" v-model="form.email" id="email" class="form-control" required style="margin-bottom: 15px;">
            </div>
            <div class="form-group">
              <label for="password">Senha</label>
              <div>
                <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="form.password"
                  id="password"
                  class="form-control"
                  required
                  style="margin-bottom: 15px;"
                />
                <input style="margin-left: 75%;" type="checkbox" v-model="showPassword" /> Exibir Senha
              </div>
            </div>
            <div class="form-group" v-if="isEdit">
              <label for="adminPassword">Senha do Administrador</label>
              <input type="password" v-model="form.adminPassword" id="adminPassword" class="form-control" required style="margin-bottom: 15px;">
            </div>
            <button type="submit" class="btn btn-success">{{ isEdit ? 'Salvar' : 'Adicionar' }}</button>
          </form>
        </template>
      </UserModal>
  
      <!-- Off-Canvas para confirmação de exclusão -->
      <div :class="['off-canvas', { 'open': isOffCanvasOpen }]">
        <span class="close-button" @click="closeOffCanvas">&times;</span>
        <div>
          <h5>Confirmar Exclusão</h5>
          <p>Você tem certeza que deseja deletar este usuário?</p>
          <input type="password" v-model="adminPassword" placeholder="Senha do Administrador" class="form-control" required style="margin-bottom: 15px;" />
          <button class="btn btn-danger" @click="deleteUser" style="margin-right: 5px;">Deletar</button>
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
  name: 'UserManagement',
  components: {
    UserModal,
  },
  data() {
    return {
      users: [],
      showModal: false,
      isEdit: false,
      showPassword: false,
      isOffCanvasOpen: false,
      adminPassword: '',
      userIdToDelete: null,
      form: {
        id: 0,
        full_Name: '',
        email: '',
        username: '',
        password: '',
        adminPassword: '',
      }
    };
  },
  async mounted() {
    await this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch('https://restrito.consorcioapice.com.br/apiadmin/api/users');
        if (response.ok) {
          this.users = await response.json();
        } else {
          throw new Error(response.statusText);
        }
      } catch (error) {
        notify({ type: 'error', title: 'Erro', text: `Erro ao buscar usuários: ${error.message}` });
      }
    },
    openModal() {
      this.showModal = true;
      this.isEdit = false;
      this.showPassword = false;
      this.form = {
        id: 0,
        full_Name: '',
        email: '',
        username: '',
        password: '',
        adminPassword: '',
      };
    },
    closeModal() {
      this.showModal = false;
    },
    editUser(user) {
      this.isEdit = true;
      this.form = { ...user };
      this.showModal = true;
    },
    async addUser() {
      try {
        const response = await fetch('https://restrito.consorcioapice.com.br/apiadmin/api/users/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.form)
        });
        if (response.ok) {
          await this.fetchUsers();
          this.closeModal();
          notify({ type: 'success', title: 'Sucesso', text: 'Usuário adicionado com sucesso!' });
        } else {
          throw new Error(response.statusText);
        }
      } catch (error) {
        notify({ type: 'error', title: 'Erro', text: `Erro ao adicionar usuário: ${error.message}` });
      }
    },
    async updateUser() {
      try {
        const response = await fetch('https://restrito.consorcioapice.com.br/apiadmin/api/users/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.form)
        });
        if (response.ok) {
          await this.fetchUsers();
          this.closeModal();
          notify({ type: 'success', title: 'Sucesso', text: 'Usuário atualizado com sucesso!' });
        } else {
          throw new Error(response.statusText);
        }
      } catch (error) {
        notify({ type: 'error', title: 'Erro', text: `Erro ao atualizar usuário: ${error.message}` });
      }
    },
    confirmDelete(id) {
      this.userIdToDelete = id;
      this.isOffCanvasOpen = true; // Abre o off-canvas
    },
    closeOffCanvas() {
      this.isOffCanvasOpen = false; // Fecha o off-canvas
      this.adminPassword = ''; // Resetar a senha ao fechar
    },
    async deleteUser() {
      if (this.userIdToDelete) {
        try {
          const response = await fetch('https://restrito.consorcioapice.com.br/apiadmin/api/users/deleteWithPassword', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: this.userIdToDelete, password: this.adminPassword })
          });
          if (response.ok) {
            await this.fetchUsers();
            notify({ type: 'success', title: 'Sucesso', text: 'Usuário excluído com sucesso!' });
          } else {
            throw new Error(response.statusText);
          }
        } catch (error) {
          notify({ type: 'error', title: 'Erro', text: `Erro ao deletar usuário: ${error.message}` });
        }
      }
      this.closeOffCanvas(); // Fecha o off-canvas após a exclusão
    }
  }
};
</script>
  
  <style scoped>
  .container {
  padding: 7px;
  border-radius: 5px;
  background-color: #27293D;
  margin-top: 12%;
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
    background-color: #14141f; /* Cor de fundo do cabeçalho */
    text-align: center;
    color: white; /* Cor do texto do cabeçalho */
  }
  tr:nth-child(even) {
    background-color: #46466c; /* Cor de fundo alternada para as linhas */
  }
  input[type="text"] {
    width: 100%; /* A largura do input ocupa toda a célula */
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
    th:nth-child(1), td:nth-child(1) { width: 5%; } /* Coluna Id */
    th:nth-child(2), td:nth-child(2) { width: 20%; } /* Coluna Nome */
    th:nth-child(3), td:nth-child(3) { width: 30%; } /* Coluna Email */
    th:nth-child(4), td:nth-child(4) { width: 15%; } /* Coluna Telefone */
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
</style>