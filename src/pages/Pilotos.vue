<script>
import { fetchDataFromApi } from '../helpers/apiHelper';

export default {
  data() {
    return {
      apiUrl: 'https://apimotogp2023-production.up.railway.app/api/ridersMotoGP' // URL que deseas pasar como parámetro
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const data = await fetchDataFromApi(this.apiUrl);
        // Utiliza los datos obtenidos de la API como desees
        console.log(data);
      } catch (error) {
        // Maneja el error de manera adecuada
        console.error(error);
      }
    }
  }
  
}
</script>
<template>
    <div>Bienvenido a pilotos</div>
</template>