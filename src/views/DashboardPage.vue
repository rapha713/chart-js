<template>
  <div class="container py-0 mt-4">
    <div class="row pb-2">
      <div class="col-8">
        <div class="canvas-box flex flex-col bg-white">
          <div class="w-full px-4 justify-start flex border-b-[1px] border-gray-300 py-2 m-0">
            <span class="text-2xl text-gray-800 font-semibold">Leads</span>
          </div>
          <canvas id="multiLineChart"></canvas>
        </div>
      </div>
      <div class="col-4">
        <div class="canvas-box flex flex-col bg-white">
          <div class="w-full px-4 justify-start flex border-b-[1px] border-gray-300 py-2 m-0">
            <span class="text-2xl text-gray-800 font-semibold">Contatos</span>
          </div>
          <canvas id="contato"></canvas>
        </div>
      </div>

    </div>

    <div class="row p-0">
      <div class="col-6">
        <div class="canvas-box flex flex-col bg-white">
          <div class="w-full px-4 justify-start flex border-b-[1px] border-gray-300 py-2 m-0">
            <span class="text-2xl text-gray-800 font-semibold">Lances</span>
          </div>
          <canvas id="lance"></canvas>
        </div>
      </div>
      <div class="col-6">
        <div class="canvas-box flex flex-col bg-white">
          <div class="w-full px-4 justify-start flex border-b-[1px] border-gray-300 py-2 m-0">
            <span class="text-2xl text-gray-800 font-semibold">Simulações</span>

          </div>
          <canvas id="simulacao"></canvas>
        </div>
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
    const { notify } = useNotification();
    return { notify };
  },
  async mounted() {

    document.getElementById('simulacao').width = 300;
    document.getElementById('simulacao').height = 130;

    document.getElementById('lance').width = 300;
    document.getElementById('lance').height = 130;

    document.getElementById('contato').width = 300;
    document.getElementById('contato').height = 190;

    document.getElementById('multiLineChart').width = 300;
    document.getElementById('multiLineChart').height = 92;

    const token = localStorage.getItem('token');
    // Gráfico de Simulação
    const simulacaoCtx = document.getElementById('simulacao');
    const simulacaoResponse = await fetch('https://localhost:7290/simulacoes/monthly-counts', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
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
          tension: 0.4,

        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            grid: {
              display: false // Remove as linhas verticais
            }
          },
          y: {
            beginAtZero: true
          }
        },
        layout: {
          padding: {
            top: 25,    // Padding superior
            right: 30,  // Padding à direita
            bottom: 10, // Padding inferior
            left: 30       // Padding à esquerda
          }
        },
        plugins: {
          legend: {
            labels: {
              color: 'black',
              usePointStyle: true,
              padding: 20,
            },
            position: 'bottom',
          },

        }
      }

    });

    // Gráfico de Lance
    const lanceCtx = document.getElementById('lance');
    const lanceResponse = await fetch('https://localhost:7290/lances/monthly-counts', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
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
          x: {
            grid: {
              display: false // Remove as linhas verticais
            }
          },
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            labels: {
              color: 'black',
              usePointStyle: true,
              padding: 20,
            },
            position: 'bottom',
          }
        },
        layout: {
          padding: {
            top: 25,    // Padding superior
            right: 30,  // Padding à direita
            bottom: 10, // Padding inferior
            left: 30       // Padding à esquerda
          }
        },
      },
    });

    // Gráfico de Contatos como um gráfico de barras
    const contatoCtx = document.getElementById('contato').getContext('2d');

    // Buscar dados das APIs
    const boletoResponse = await fetch('https://localhost:7290/contact/monthly-boleto', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const boletoData = await boletoResponse.json();
    const boletoTotals = boletoData.map(item => item.total);

    const workResponse = await fetch('https://localhost:7290/contact/monthly-work', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const workData = await workResponse.json();
    const workTotals = workData.map(item => item.total);

    const partnerResponse = await fetch('https://localhost:7290/contact/monthly-partner', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const partnerData = await partnerResponse.json();
    const partnerTotals = partnerData.map(item => item.total);

    const labels = boletoData.map(item => item.month);

    this.contatoData = {
      labels: labels,
      datasets: [
        {
          label: 'Boleto',
          data: boletoTotals,
          backgroundColor: 'rgb(154, 208, 245)',
          borderColor: 'rgba(71, 170, 237, 1)',
          borderWidth: 1,
        },
        {
          label: 'Trabalhe',
          data: workTotals,
          backgroundColor: 'rgb(255, 177, 193)',
          borderColor: 'rgba(255, 104, 135, 1)',
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
      type: 'bar',
      data: {
        labels: this.contatoData.labels,
        datasets: this.contatoData.datasets,
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: 'black',
              usePointStyle: true,
              padding: 20,
              boxHeight: 15,
            }
          },
        },
        scales: {
          x: {
            grid: {
              display: false // Remove as linhas verticais
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 10 // Define o intervalo entre os valores
            }
          }
        },
        layout: {
          padding: {
            top: 25,    // Padding superior
            right: 30,  // Padding à direita
            bottom: 10, // Padding inferior
            left: 30       // Padding à esquerda
          }
        },
      },
    });

    // Gráfico de Múltiplas Linhas
    const multiLineCtx = document.getElementById('multiLineChart').getContext('2d');

    // Buscar dados das APIs
    const offerResponse = await fetch('https://localhost:7290/leads/monthly-offer', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const offerData = await offerResponse.json();
    const offerTotals = offerData.map(item => item.total);
    const offerLabels = offerData.map(item => item.month);

    const simulationResponse = await fetch('https://localhost:7290/leads/monthly-simulation', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const simulationData = await simulationResponse.json();
    const simulationTotals = simulationData.map(item => item.total);

    const contactResponse = await fetch('https://localhost:7290/leads/monthly-contact', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
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
          legend: {
            labels: {
              color: 'black',
              usePointStyle: true,
              padding: 20,
            },
            position: 'bottom',
          }
        },
        scales: {
          x: {
            grid: {
              display: false // Remove as linhas verticais
            }
          },
          y: {
            beginAtZero: true,
          },
        },
        layout: {
          padding: {
            top: 25,    // Padding superior
            right: 30,  // Padding à direita
            bottom: 10, // Padding inferior
            left: 30       // Padding à esquerda
          }
        },
      },
    };

    // Criar o gráfico com o contexto
    this.multiLineChart = new Chart(multiLineCtx, multiLineConfig);

  },
  beforeUnmount() {
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
  padding: 10px;
  margin-top: 15px;
  width: 100rem;
  background-color: #F3F4F8;
}

h3 {
  color: #323234;
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
  padding-bottom: 5.1rem;
}

canvas {
  width: 100%;
  height: 100%;
  display: block;
  background-color: white;

}

.canvas-box {
  -webkit-box-shadow: 0px 0px 27px 1px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 0px 27px 1px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 0px 27px 1px rgba(0, 0, 0, 0.15);
  border-radius: 3px;
}
</style>