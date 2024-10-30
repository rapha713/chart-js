<template>
  <div class="container">
    <div class="title">
      <h3>Dashboard</h3>
    </div>
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
import { useNotification } from '@kyvg/vue3-notification';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      simulacaoChart: null,
      lanceChart: null,
      contatoChart: null,
      contatoData: null,
      multiLineChart: null,
    };
  },
  setup() {
    const { notify } = useNotification(); // Usando o hook de notificações
    return { notify };
  },
  async mounted() {
    // Configurações dos gráficos
    document.getElementById('simulacao').width = 300;
    document.getElementById('simulacao').height = 200;

    document.getElementById('lance').width = 300;
    document.getElementById('lance').height = 200;

    document.getElementById('contato').width = 300;
    document.getElementById('contato').height = 200;

    document.getElementById('multiLineChart').width = 300;
    document.getElementById('multiLineChart').height = 80;
    
    // Gráfico de Simulação
    const simulacaoCtx = document.getElementById('simulacao');
    const simulacaoResponse = await fetch('https://restrito.consorcioapice.com.br/apiadmin/api/simulacoes/monthly-counts');
    const simulacaoData = await simulacaoResponse.json();

    const simulacaoLabels = simulacaoData.map(item => item.month);
    const simulacaoTotals = simulacaoData.map(item => item.total);

    this.simulacaoChart = new Chart(simulacaoCtx, {
      type: 'line',
      data: {
        labels: simulacaoLabels,
        datasets: [{
          label: 'Simulações',
          data: simulacaoTotals,
          fill: 'origin',
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          tension: 0.4
        }]
      },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Simulações',
        color: 'white',
      },
      legend: {
        labels: {
          color: 'white', // Altere para a cor desejada
        }
      }
    }
  }
});

    // Gráfico de Lance
    const lanceCtx = document.getElementById('lance');
    const lanceResponse = await fetch('https://restrito.consorcioapice.com.br/apiadmin/api/lances/monthly-counts');
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
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Lances',
        color: 'white',
      },
      legend: {
        labels: {
          color: 'white', // Altere para a cor desejada
        }
      }
    }
  }
});

    // Gráfico de Contatos como um gráfico de barras
    const contatoCtx = document.getElementById('contato').getContext('2d');

    // Buscar dados das APIs
    const boletoResponse = await fetch('https://restrito.consorcioapice.com.br/apiadmin/api/contact/monthly-boleto');
    const boletoData = await boletoResponse.json();
    const boletoTotals = boletoData.map(item => item.total);

    const workResponse = await fetch('https://restrito.consorcioapice.com.br/apiadmin/api/contact/monthly-work');
    const workData = await workResponse.json();
    const workTotals = workData.map(item => item.total);

    const partnerResponse = await fetch('https://restrito.consorcioapice.com.br/apiadmin/api/contact/monthly-partner');
    const partnerData = await partnerResponse.json();
    const partnerTotals = partnerData.map(item => item.total);

    const labels = boletoData.map(item => item.month);

    this.contatoData = {
  labels: labels,
  datasets: [
    {
      label: 'Boleto',
      data: boletoTotals,
      backgroundColor: 'rgb(190, 190, 190)',
      borderColor: 'rgba(190, 190, 190, 1)',
      borderWidth: 1,
    },
    {
      label: 'Trabalhe',
      data: workTotals,
      backgroundColor: 'rgb(227, 13, 64)',
      borderColor: 'rgba(227, 13, 64, 1)',
      borderWidth: 1,
    },
    {
      label: 'Parceiro',
      data: partnerTotals,
      backgroundColor: 'rgb(28, 242, 191)',
      borderColor: 'rgba(28, 242, 191, 1)',
      borderWidth: 1,
    }
  ]
};

// Criar o gráfico de contatos com dados de barras
this.contatoChart = new Chart(contatoCtx, {
  type: 'bar', // Altera para gráfico de barras
  data: {
    labels: this.contatoData.labels,
    datasets: this.contatoData.datasets, // Exibe todos os conjuntos de dados
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgba(255, 255, 255, 1)' // Cor dos labels da legenda (ex: preto)
        }
      },
      title: {
        display: true,
        text: 'Contatos',
        color: 'rgba(255, 255, 255, 1)' // Cor do título (ex: preto)
      }
    },
    scales: {
      y: {
        beginAtZero: true,
      }
    }
  },
});


    // Gráfico de Múltiplas Linhas
const multiLineCtx = document.getElementById('multiLineChart').getContext('2d');

// Buscar dados das APIs
const offerResponse = await fetch('https://restrito.consorcioapice.com.br/apiadmin/api/leads/monthly-offer');
const offerData = await offerResponse.json();
const offerTotals = offerData.map(item => item.total);
const offerLabels = offerData.map(item => item.month);

const simulationResponse = await fetch('https://restrito.consorcioapice.com.br/apiadmin/api/leads/monthly-simulation');
const simulationData = await simulationResponse.json();
const simulationTotals = simulationData.map(item => item.total);

const contactResponse = await fetch('https://restrito.consorcioapice.com.br/apiadmin/api/leads/monthly-contact');
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
      fill: 'origin',
      tension: 0.4,
    },
    {
      label: 'Simulações',
      data: simulationTotals,
      borderColor: 'rgb(54, 162, 235)',
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      fill: '-1',
      tension: 0.4,
    },
    {
      label: 'Contatos',
      data: contactTotals,
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      fill: 'origin',
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
        color: 'white',
      },
      legend: {
        labels: {
          color: 'white', // Altere para a cor desejada
        }
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

  this.notify({
      title: 'Login bem-sucedido',
      text: 'Bem-vindo de volta.',
      type: 'success',
      duration: 5000 // Tempo em milissegundos que a notificação ficará visível
    });
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
  padding: 10px; /* Adiciona algum espaço ao redor do conteúdo */
  margin-top: 15px;
  width: 100rem;
  background-color: #27293D;
}
h3 {
  color: #42b983;
  margin-top: 15px;
  margin-bottom: 20px;
  font-weight: bold;
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
.row {
  padding-bottom: 5.1rem; /* Ajuste o valor conforme necessário */
}
canvas {
  width: 100%;
  height: 100%; /* Ajuste o tamanho dos gráficos */
  display: block;
  background-color: #31344c;
}
</style>