<template>
    <div class="account">
      <h1>Gestione Account</h1>
      <div v-if="utenteAutenticato">
        <h2>Progresso Servizi Acquistati</h2>
        <div v-for="servizio in serviziAcquistati" :key="servizio.id" class="progresso-servizio">
          <h3>{{ servizio.nome }}</h3>
          <p>Avanzamento: {{ servizio.progresso }}%</p>
          <progress :value="servizio.progresso" max="100"></progress>
        </div>
      </div>
      <div v-else>
        <p>Accedi per visualizzare i dettagli del tuo account.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        utenteAutenticato: true,
        serviziAcquistati: [
          { id: 1, nome: 'Consulenza', progresso: 40 },
          { id: 2, nome: 'Coaching', progresso: 70 },
        ],
      };
    },
    methods: {
      login () {
        this.utenteAutenticato = true;
      },
    },
  };
  </script>
  
  <style>
  .account {
    padding: 20px;
  }
  .progresso-servizio {
    margin: 10px 0;
  }
  progress {
    width: 100%;
  }
  </style>
  