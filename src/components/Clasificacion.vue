<script>
import {fetchDataFromApi} from '../helpers/apiHelper.js'

export default {
    data() {
        return {  
            riders: [],
            url: 'https://apimotogp2023-production.up.railway.app/api/ridersMotoGP',
        }
    },
    mounted() {
      this.getDataFromApi();
    },
    methods: {
      async getDataFromApi() {
        try {
          const data = await fetchDataFromApi(this.url);
          this.riders = data
          this.orderAndSliceriders();
          console.log(this.riders);
        } catch (error) {
          console.error('Error al obtener los datos de la API:', error);
        }
      },
      orderAndSliceriders(){
        this.riders.sort((a,b) => b.points - a.points);
        this.riders = this.riders.slice(0,10);
      }
    }  
}
</script>

<template>
  <div class="containerchampionship">
    <h1 class="titulochampionship">Clasificacion en vivo</h1>
    <div v-if="riders" v-for="rider in riders" class="cardpiloto">
        <p class="nombrepiloto">{{ rider.name }}</p>
        <p class="puntospiloto">{{ rider.points }}</p>
    </div>
  </div>
</template>

<style>
.cardpiloto{
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color:#D9043D;
  color: white;
  font-size: 20px;
  padding: 8px;
}

.containerchampionship{
  margin-top: 22px;
  text-align: center;
}


</style>