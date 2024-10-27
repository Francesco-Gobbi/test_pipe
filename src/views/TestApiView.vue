<template>
  <div class="prenotazioni">
    <h1>Prenota un Servizio</h1>
    <div class="card-container">
      <div 
        class="card" 
        v-for="servizio in servizi" 
        :key="servizio.id"
      >
        <h2>{{ servizio.nome }}</h2>
        <p>{{ servizio.descrizione }}</p>
        <p>Disponibilità: {{ servizio.disponibilita }}</p>
        <button 
          :disabled="servizio.disponibilita === 0" 
          @click="selezionaServizio(servizio)"
        >
          Prenota
        </button>
        <div v-if="servizioSelezionato === servizio.id" class="form-prenotazione">
          <h3>Compila i dettagli per prenotare</h3>
          <form @submit.prevent="prenotaServizio(servizio.id)">
            <input type="text" v-model="dettagli.nome" placeholder="Nome" required />
            <input type="email" v-model="dettagli.email" placeholder="Email" required />
            <button type="submit">Conferma Prenotazione</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      servizi: [
        { id: 1, nome: 'Consulenza', descrizione: 'Sessione di consulenza individuale', disponibilita: 5 },
        { id: 2, nome: 'Coaching', descrizione: 'Sessione di coaching', disponibilita: 3 },
      ],
      servizioSelezionato: null,
      dettagli: {
        nome: '',
        email: '',
      },
    };
  },
  methods: {
    selezionaServizio(servizio) {
      this.servizioSelezionato = servizio.id;
    },
    prenotaServizio(id) {
      const servizio = this.servizi.find(s => s.id === id);
      if (servizio.disponibilita > 0) {
        servizio.disponibilita -= 1;
        alert('Prenotazione effettuata con successo!');
        this.servizioSelezionato = null;
      } else {
        alert('Non ci sono più posti disponibili.');
      }
    },
  },
};
</script>

<style>
.prenotazioni {
  padding: 20px;
}
.blocco-autenticazione {
  margin: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  text-align: center;
}
.card-container {
  display: flex;
  gap: 20px;
}
.card {
  border: 1px solid #ccc;
  padding: 20px;
  width: 200px;
}
.form-prenotazione {
  margin-top: 10px;
}
</style>
