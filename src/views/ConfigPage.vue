<template>
  <div class="container bg-white" style=" margin-top: 15px;">
      <div class="w-full flex px-8 justify-between pb-2 items-center">
        <div class="flex flex-col items-start justify-start py-2">
          <h3 class="mb-0 text-gray-800 font-bold">Configurações</h3>
          <p class="m-0 text-gray-600">Adicione ou exclua Emails</p>
        </div>
      </div>
      
<!-- Campo para "Simulation Emails" -->
<h3 style="font-weight: bold; text-align: center;">Emails de Simulação</h3>
<div class="input-container">
  <i class="fa fa-calculator icon"></i>
  <textarea v-model="config.simulationEmails" class="input-field" placeholder="Emails de Simulação"></textarea>
  <button @click="updateConfigField('simulationEmails')" class="btn">Atualizar</button>
</div>

<!-- Campo para "Bid Emails" -->
<h3 style="font-weight: bold; text-align: center;">Emails de Lances</h3>
<div class="input-container">
  <i class="fa fa-money icon"></i>
  <textarea v-model="config.bidEmails" class="input-field" type="text" placeholder="Emails de Lances"></textarea>
  <button @click="updateConfigField('bidEmails')" class="btn">Atualizar</button>
</div>

<!-- Campo para "Contact Emails" -->
<h3 style="font-weight: bold; text-align: center;">Emails de Contato</h3>
<div class="input-container">
  <i class="fa fa-envelope icon"></i>
  <textarea v-model="config.contactEmails" class="input-field" type="text" placeholder="Emails de Contato"></textarea>
  <button @click="updateConfigField('contactEmails')" class="btn">Atualizar</button>
</div>

    </div>
  </template>
  
<script>
  import { notify } from '@kyvg/vue3-notification';
  
  export default {
    data() {
      return {
        config: {
          title: '',
          description: '',
          keywords: '',
          simulationEmails: '',
          bidEmails: '',
          contactEmails: '',
        },
      };
    },
    async mounted() {
      await this.fetchConfig();
    },
    methods: {
      async fetchConfig() {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`https://localhost:7290/config`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });
          if (response.ok) {
            this.config = await response.json();
          } else {
            throw new Error(response.statusText);
          }
        } catch (error) {
          notify({
            type: 'error',
            text: `Erro ao buscar configurações: ${error.message}</p>`,
            dangerouslyUseHTMLString: true,
          });
        }
      },
  
      async updateConfigField(field) {
        const updateData = {
          [field]: this.config[field],
        };
  
        const fieldTitles = {
          title: 'Título',
          description: 'Descrição',
          keywords: 'Palavras-chave',
          simulationEmails: 'Emails de Simulação',
          bidEmails: 'Emails de Lances',
          contactEmails: 'Emails de Contato',
        };
  
        try {
          const token = localStorage.getItem('token');
          const response = await fetch('https://localhost:7290/config_update', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updateData),
          });
  
          if (response.ok) {
            notify({
              type: 'success',
              text: `${fieldTitles[field]} atualizado com sucesso!`,
              dangerouslyUseHTMLString: true,
            });
          } else {
            throw new Error(response.statusText);
          }
        } catch (error) {
          notify({
            type: 'error',
            text: `Erro ao atualizar ${fieldTitles[field]}: ${error.message}`,
            dangerouslyUseHTMLString: true,
          });
        }
      },
    },
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

h3 {
  color: #000;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
  
  .input-container {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .input-container .icon {
    margin-right: 10px;
    color: #54565c;
  }
  
/* Permite o redimensionamento dos inputs */
.input-field {
  width: 100%; /* Ou defina um valor fixo, como 500px */
  height: 100px; /* Aumentando a altura */
  font-size: 16px; /* Aumentando o tamanho da fonte */
  padding: 10px; /* Adicionando um padding para melhorar a aparência */
  box-sizing: border-box; /* Garantir que o padding não afete o tamanho total */
  border: 1px solid #000;
  color: #54565c;
  border-radius: 5px;
  margin-right: 5px;
  resize: none;
}

  
  .btn {
    padding: 8px 12px;
    background-color: #54565c;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn:hover {
    background-color: #323436;
  }
  </style>