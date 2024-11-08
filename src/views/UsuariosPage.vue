<template>
  <div class="container bg-white" style=" margin-top: 15px;">
    <div class="w-full flex px-8 justify-between pb-2 items-center">
      <div class="flex flex-col items-start justify-start py-2">
        <h3 class="mb-0 text-gray-800 font-bold">Usuários</h3>
        <p class="m-0 text-gray-600">Adicione ou exclua usuários</p>
      </div>
      <button @click="openModal" class="btn btn-primary h-min">Adicionar Usuário</button>
    </div>
    <table>
      <thead class="border-b-[1px] border-gray-200">
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Usuários</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>
            {{ user.id }}
          </td>
          <td>

            <div class="text-center">

              <strong>{{ user.full_Name }}</strong>

            </div>

          </td>
          <td>
            <div class="flex justify-center items-center flex-col-reverse">
              {{ user.email }}
            </div>
          </td>

          <td>
            {{ user.username }}
          </td>
          <td>
            <div class="flex justify-center">
              <button @click="editUser(user)"
                class="rounded-md shadow-sm bg-white border-2 border-orange-400 text-orange-400 font-semibold px-[10px] py-[5px]">Editar</button>
              <button @click="confirmDelete(user.id)"
                class="ml-2 rounded-md shadow-sm bg-white border-2 border-red-400 text-red-400 font-semibold px-[10px] py-[5px]">Deletar</button>
            </div>
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
            <input type="text" v-model="form.full_Name" id="full_Name" class="form-control" required
              style="margin-bottom: 15px;">
          </div>
          <div class="form-group">
            <label for="username">Usuário</label>
            <input type="text" v-model="form.username" id="username" class="form-control" required
              style="margin-bottom: 15px;">
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" v-model="form.email" id="email" class="form-control" required
              style="margin-bottom: 15px;">
          </div>
          <div class="form-group">
            <label for="role">Função</label>
            <select v-model="form.role" id="role" class="form-control" required style="margin-bottom: 15px;">
              <option disabled value="">Selecione uma função</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>
          <div class="form-group">
            <label for="password">Senha</label>
            <div>
              <input :type="showPassword ? 'text' : 'password'" v-model="form.password" id="password"
                class="form-control" required style="margin-bottom: 15px;" />
              <input style="margin-left: 75%;" type="checkbox" v-model="showPassword" /> Exibir Senha
            </div>
          </div>
          <div class="form-group" v-if="isEdit">
            <label for="adminPassword">Senha do Administrador</label>
            <input type="password" v-model="form.adminPassword" id="adminPassword" class="form-control" required
              style="margin-bottom: 15px;">
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
        <input type="password" v-model="adminPassword" placeholder="Senha do Administrador" class="form-control"
          required style="margin-bottom: 15px;" />
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
        role: '',
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
        const token = localStorage.getItem('token');
        const response = await fetch(`https://restrito.consorcioapice.com.br/apiadmin/users`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });
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
        role: '',
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
        const token = localStorage.getItem('token');
        const response = await fetch('https://restrito.consorcioapice.com.br/apiadmin/users/add', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
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
        const token = localStorage.getItem('token');
        const response = await fetch('https://restrito.consorcioapice.com.br/apiadmin/users/update', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
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
      this.isOffCanvasOpen = true;
    },
    closeOffCanvas() {
      this.isOffCanvasOpen = false;
      this.adminPassword = '';
    },
    async deleteUser() {
      if (this.userIdToDelete) {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch('https://restrito.consorcioapice.com.br/apiadmin/users/deleteWithPassword', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
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
      this.closeOffCanvas();
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