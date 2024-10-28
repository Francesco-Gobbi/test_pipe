<template>
  <div class="prenotazioni">
    <h1>Prenota un Servizio</h1>
    <div class="card-container">
      <div 
        class="card" 
        v-for="servizio in servizi" 
        :key="servizio.nome"
      >
        <h2>{{ servizio.nome }}</h2>
        <p>Disponibilità: {{ servizio.numero }}</p>
        <button 
          :disabled="servizio.numero === 0" 
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
    <div v-if="servizi == ''" class="messaggio">
      <p>Non ci sono servizi disponibili al momento.</p>
    </div>
    <div class="elenco-prenotazioni" v-if="prenotazioni.length > 0">
      <h2>Le tue Prenotazioni</h2>
      <ul>
        <li v-for="(prenotazione, index) in prenotazioni" :key="index">
          <strong>{{ prenotazione.servizio }}</strong> prenotato da {{ prenotazione.nome }} ({{ prenotazione.email }})
        </li>
      </ul>
    </div>

    <div v-if="error">
      <textarea class="error" readonly v-model="error"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: '',
      servizi: [
      ],
      servizioSelezionato: null,
      dettagli: {
        nome: '',
        email: '',
      },
      prenotazioni: [],
    };
  },
  beforeMount: function(){
    this.getServizi();
  },
  methods: {
    triggerError(msg) {
      this.error = 'Si è verificato un errore. ' + msg;
    },
    getServizi(){
      try{
        fetch("https://test-pipe-gobbi.onrender.com/data")
        .then((data)=>{
          if (data.ok){
            console.log(data)
            this.servizi = data.json();
          }else{
            throw new Error("Errore nella richiesta");
          }
        })
        
      }
      catch(error){
        this.error = error;
      }

    },
    selezionaServizio(servizio) {
      this.servizioSelezionato = servizio.id;
    },
    prenotaServizio(id) {
      const servizio = this.servizi.find((s) => s.id === id);
      if (servizio.disponibilita > 0) {
        servizio.disponibilita -= 1;

        this.prenotazioni.push({
          servizio: servizio.nome,
          nome: this.dettagli.nome,
          email: this.dettagli.email,
        });

        this.dettagli.nome = '';
        this.dettagli.email = '';
        this.servizioSelezionato = null;

        this.salvaStato();

        alert('Prenotazione effettuata con successo!');
      } else {
        alert('Non ci sono più posti disponibili.');
      }
    },
    salvaStato() {
      localStorage.setItem('servizi', JSON.stringify(this.servizi));
      localStorage.setItem('prenotazioni', JSON.stringify(this.prenotazioni));
    },
    caricaStato() {
      const serviziSalvati = localStorage.getItem('servizi');
      const prenotazioniSalvate = localStorage.getItem('prenotazioni');

      if (serviziSalvati) {
        this.servizi = JSON.parse(serviziSalvati);
      }

      if (prenotazioniSalvate) {
        this.prenotazioni = JSON.parse(prenotazioniSalvate);
      }
    },
  },
  mounted() {
    this.caricaStato();
  },
};
</script>

<style>
.messaggio{
  padding: 5px;
  text-align: center;
  color: #000000; 
  background-color: #bb6a6a;
  border : 1px solid #5f5e5e00; 
  border-radius: 15px;
}
.error {
  width: 100%;
  height: 100px;
  color: #b71c1c; 
  background-color: #ffcdd2;
  border: 1px solid #f44336; 
  padding: 10px;
  resize: none; 
}
.prenotazioni {
  padding: 20px;
}
.card-container {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
.card {
  border: 1px solid #ccc;
  padding: 20px;
  width: 300px;
}
.form-prenotazione {
  margin-top: 10px;
}
.elenco-prenotazioni {
  margin-top: 30px;
}
.elenco-prenotazioni ul {
  list-style-type: none;
  padding: 0;
}
.elenco-prenotazioni li {
  background-color: #f5f5f5;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
