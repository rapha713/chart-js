<template>
    <div class="container">
      <h2 style="font-weight: bold; color: #42b983;">Configurações</h2>
  
      <!-- Campo para "Title" -->
      <h5 style="font-weight: bold; text-align: left;">Título</h5>
      <div class="input-container">
        <i class="fa fa-tag icon"></i>
        <input v-model="config.title" class="input-field" type="text" placeholder="Title" />
        <button @click="updateConfigField('title')" class="btn">Atualizar</button>
      </div>
  
      <!-- Campo para "Description" -->
      <h5 style="font-weight: bold; text-align: left;">Descrição</h5>
      <div class="input-container">
        <i class="fa fa-info-circle icon"></i>
        <input v-model="config.description" class="input-field" type="text" placeholder="Description" />
        <button @click="updateConfigField('description')" class="btn">Atualizar</button>
      </div>
  
      <!-- Campo para "Keywords" -->
      <h5 style="font-weight: bold; text-align: left;">Palavras-chave</h5>
      <div class="input-container">
        <i class="fa fa-key icon"></i>
        <input v-model="config.keywords" class="input-field" type="text" placeholder="Keywords" />
        <button @click="updateConfigField('keywords')" class="btn">Atualizar</button>
      </div>
  
      <!-- Campo para "Simulation Emails" -->
      <h5 style="font-weight: bold; text-align: left;">Emails de Simulação</h5>
      <div class="input-container">
        <i class="fa fa-envelope icon"></i>
        <input v-model="config.simulationEmails" class="input-field" type="text" placeholder="Simulation Emails" />
        <button @click="updateConfigField('simulationEmails')" class="btn">Atualizar</button>
      </div>
  
      <!-- Campo para "Bid Emails" -->
      <h5 style="font-weight: bold; text-align: left;">Emails de Lances</h5>
      <div class="input-container">
        <i class="fa fa-envelope icon"></i>
        <input v-model="config.bidEmails" class="input-field" type="text" placeholder="Bid Emails" />
        <button @click="updateConfigField('bidEmails')" class="btn">Atualizar</button>
      </div>
  
      <!-- Campo para "Contact Emails" -->
      <h5 style="font-weight: bold; text-align: left;">Emails de Contato</h5>
      <div class="input-container">
        <i class="fa fa-envelope icon"></i>
        <input v-model="config.contactEmails" class="input-field" type="text" placeholder="Contact Emails" />
        <button @click="updateConfigField('contactEmails')" class="btn">Atualizar</button>
      </div>
    </div>
  </template>
  
  <script>
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
          const response = await fetch('https://localhost:7290/api/config');
          if (response.ok) {
            this.config = await response.json();
          } else {
            console.error('Erro ao buscar configurações:', response.statusText);
          }
        } catch (error) {
          console.error('Erro ao buscar configurações:', error);
        }
      },
  
      async updateConfigField(field) {
        const updateData = {
          [field]: this.config[field],
        };
  
        try {
          const response = await fetch('https://localhost:7290/api/config_update', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
          });
  
          if (response.ok) {
            alert(`${field} atualizado com sucesso!`);
          } else {
            console.error(`Erro ao atualizar ${field}:`, response.statusText);
          }
        } catch (error) {
          console.error(`Erro ao atualizar ${field}:`, error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    padding: 20px;
    background-color: #27293D;
    border-radius: 10px;
    margin-top: 15px;
  }
  
  .input-container {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .input-container .icon {
    margin-right: 10px;
  }
  
  .input-field {
    flex: 1;
    padding: 8px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .btn {
    padding: 8px 12px;
    background-color: #14141f;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn:hover {
    background-color: #46466c;
  }
  </style>