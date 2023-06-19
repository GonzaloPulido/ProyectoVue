<script>
import { fetchDataFromApi } from '../helpers/apiHelper.js';

export default {
  data() {
    return {
      allCircuits: [],
      nextRace: {},
      url: 'https://apimotogp2023-production.up.railway.app/api/circuitsMotoGP',
    };
  },
  methods: {
    // Peticion a todos los circuitos
    async getDataFromApi() {
      try {
        const data = await fetchDataFromApi(this.url);
        this.allCircuits = data;
        this.searchNextRace(); 
      } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
      }
    },
    // Logica siguiente carrera
    searchNextRace() {
      const currentDate = new Date();

      const upcomingCircuits = this.allCircuits.map((circuit) => ({
        ...circuit,
        start: circuit.start.split('T')[0], 
        finish: circuit.finish.split('T')[0], 
      }));
      const filteredCircuits = upcomingCircuits.filter(
        (circuit) =>
          new Date(circuit.start) > currentDate || new Date(circuit.finish) > currentDate
      );
      filteredCircuits.sort((a, b) => new Date(a.start) - new Date(b.start));
      this.nextRace = JSON.parse(JSON.stringify(filteredCircuits[0]));
    },
  },
  mounted() {
    this.getDataFromApi();
  },
};
</script>

<template>
  <div>
    <h2 class="titleCircuito">Próximo Gran Premio</h2>
    <div v-if="nextRace" class="contenedorcircuito">
        <img :src="nextRace.backImage" alt="Circuito" class="imagenCircuito"/>
        <h3 class="circuitname">{{ nextRace.circuit }}</h3>
        <p class="circuitcountry">{{ nextRace.country }}</p>
        <p class="circuitdate">{{ nextRace.start }} a {{ nextRace.finish }}</p>
      
    </div>
    <div v-else>
      <p>No hay próximos grandes premios</p>
    </div>
  </div>
</template>

<style scoped>
.titleCircuito{
    font-size: 2.5rem;
    text-align: center;
}
.circuitname{
    font-size: 1.5rem;
}

.circuitcountry{
    font-size: 20px;
}   

.circuitdate{
    font-size: 20px;
}
.contenedorcircuito{
    text-align: center;
    width: 100%;
    display: flex;
    flex-direction: column;
}
.imagenCircuito{
    margin-bottom: 20px;
    filter: brightness(300%);
}
</style>
