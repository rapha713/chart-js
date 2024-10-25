<template>
  <div class="container">
    <h1>{{ msg }}</h1>
    <div class="row">
      <div class="col-12">
        <canvas id="multiLineChart"></canvas>
      </div>
    </div>
      <div class="row">
      <div class="col-4">
        <canvas id="simulacao"></canvas>
      </div>
      <div class="col-4">
        <canvas id="lance"></canvas>
      </div>
      <div class="col-4">
        <canvas id="contato"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      simulacaoChart: null, // Armazena o gráfico de simulação
      lanceChart: null,     // Armazena o gráfico de lance
      contatoChart: null,   // Armazena o gráfico com múltiplos eixos
      multiLineChart: null, // Armazena o gráfico de múltiplas linhas
    };
  },
  async mounted() {
    // Gráfico de Simulação
    const simulacaoCtx = document.getElementById('simulacao');
    const simulacaoResponse = await fetch('https://localhost:7290/api/simulacoes/monthly-counts');
    const simulacaoData = await simulacaoResponse.json();

    const simulacaoLabels = simulacaoData.map(item => item.month);
    const simulacaoTotals = simulacaoData.map(item => item.total);

    this.simulacaoChart = new Chart(simulacaoCtx, {
      type: 'line',
      data: {
        labels: simulacaoLabels,
        datasets: [{
          label: 'Simulação',
          data: simulacaoTotals,
          fill: 'origin',
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          tension: 0.4
        }]
      },
    });

    // Gráfico de Lance
    const lanceCtx = document.getElementById('lance');
    const lanceResponse = await fetch('https://localhost:7290/api/lances/monthly-counts');
    const lanceData = await lanceResponse.json();

    const lanceLabels = lanceData.map(item => item.month);
    const lanceTotals = lanceData.map(item => item.total);

    this.lanceChart = new Chart(lanceCtx, {
      type: 'line',
      data: {
        labels: lanceLabels,
        datasets: [{
          label: 'Lances',
          data: lanceTotals,
          fill: 'origin',
          borderColor: 'rgb(77, 127, 235)',
          backgroundColor: 'rgba(77, 127, 235, 0.5)',
          tension: 0.4
        }]
      },
    });

    // Gráfico Multi-Eixos com dados dinâmicos
    const contatoCtx = document.getElementById('contato').getContext('2d');

    // Buscar dados das APIs
    const boletoResponse = await fetch('https://localhost:7290/api/contact/monthly-boleto');
    const boletoData = await boletoResponse.json();
    const boletoTotals = boletoData.map(item => item.total);

    const workResponse = await fetch('https://localhost:7290/api/contact/monthly-work');
    const workData = await workResponse.json();
    const workTotals = workData.map(item => item.total);

    const partnerResponse = await fetch('https://localhost:7290/api/contact/monthly-partner');
    const partnerData = await partnerResponse.json();
    const partnerTotals = partnerData.map(item => item.total);

    // Usar os mesmos labels para os 3 datasets
    const labels = boletoData.map(item => item.month); // Supondo que todas as APIs retornem os mesmos meses

    // Dados do gráfico
    const contatoData = {
      labels: labels,
      datasets: [
        {
          label: 'Boleto',
          data: boletoTotals,
          borderColor: 'rgb(255, 250, 250)',
          backgroundColor: 'rgba(255, 250, 250, 0.2)',
          fill: 'origin', // Preencher até a origem
          tension: 0.4
        },
        {
          label: 'Trabalhe',
          data: workTotals,
          borderColor: 'rgb(227, 13, 64)',
          backgroundColor: 'rgba(227, 13, 64, 0.4)',
          fill: 'origin', // Preencher até o conjunto de dados anterior
          tension: 0.4
        },
        {
          label: 'Parceiro',
          data: partnerTotals,
          borderColor: 'rgb(28, 242, 191)',
          backgroundColor: 'rgba(28, 242, 191, 0.6)',
          fill: 'origin', // Preencher até a origem
          tension: 0.4
        }
      ]
    };

    // Configuração para o gráfico de contatos
    const contatoConfig = {
      type: 'line', // Mudei para 'line' para corresponder ao que você quer
      data: contatoData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Contatos',
          }
        },
        scales: {
          y: {
            beginAtZero: true,
          }
        }
      },
    };

    // Criar o gráfico de contatos
    this.contatoChart = new Chart(contatoCtx, contatoConfig);

    // Gráfico de Múltiplas Linhas
    const multiLineCtx = document.getElementById('multiLineChart').getContext('2d');

    // Buscar dados das APIs
    const offerResponse = await fetch('https://localhost:7290/api/leads/monthly-offer');
    const offerData = await offerResponse.json();
    const offerTotals = offerData.map(item => item.total);
    const offerLabels = offerData.map(item => item.month); // Supondo que todas as APIs retornem os mesmos meses

    const simulationResponse = await fetch('https://localhost:7290/api/leads/monthly-simulation');
    const simulationData = await simulationResponse.json();
    const simulationTotals = simulationData.map(item => item.total);

    const contactResponse = await fetch('https://localhost:7290/api/leads/monthly-contact');
    const contactData = await contactResponse.json();
    const contactTotals = contactData.map(item => item.total);

    // Configuração do gráfico de múltiplas linhas com preenchimento
    const multiLineData = {
      labels: offerLabels,
      datasets: [
        {
          label: 'Ofertas',
          data: offerTotals,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          fill: 'origin', // Preencher até a origem
          tension: 0.4,
        },
        {
          label: 'Simulações',
          data: simulationTotals,
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          fill: '-1', // Preencher até o conjunto de dados anterior
          tension: 0.4,
        },
        {
          label: 'Contatos',
          data: contactTotals,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          fill: 'origin', // Preencher até a origem
          tension: 0.4,
        }
      ]
    };

    const multiLineConfig = {
      type: 'line',
      data: multiLineData,
      options: {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        stacked: false,
        plugins: {
          title: {
            display: true,
            text: 'Leads',
          }
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        }
      },
    };

    // Criar o gráfico com o contexto
    this.multiLineChart = new Chart(multiLineCtx, multiLineConfig);
  },
  beforeUnmount() {
    // Destruir os gráficos antes de desmontar o componente para evitar vazamentos de memória
    if (this.simulacaoChart) {
      this.simulacaoChart.destroy();
    }
    if (this.lanceChart) {
      this.lanceChart.destroy();
    }
    if (this.contatoChart) {
      this.contatoChart.destroy();
    }
    if (this.multiLineChart) {
      this.multiLineChart.destroy();
    }
  }
}
</script>

<style scoped>
.container {
  background-color: #1E1E2F; /* Altere para a cor desejada */
  border-color: #222a42;
  min-height: 100vh; /* Garante que a altura mínima cubra toda a página */
  padding: 20px; /* Adiciona algum espaço ao redor do conteúdo */
}
h3 {
  color: #42b983;
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
canvas {
  width: 100%;
  height: 100%; /* Ajuste o tamanho dos gráficos */
  display: grid;
  background-color: #27293D;
}
</style>