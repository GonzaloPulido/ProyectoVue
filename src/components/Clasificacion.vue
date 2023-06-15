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
  <h1 class="titlechampionship">Clasificacion en vivo</h1>
  <div class="containerchampionship">
    <div v-if="riders" v-for="rider in riders" class="cardrider">
        <p class="ridername">{{ rider.name }}</p>
        <p class="riderpoints">{{ rider.points }}</p>
    </div>
  </div>
</template>

<style scoped>
.cardrider{
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: white;
  font-size: 20px;
  padding: 8px;
}

.containerchampionship{
  box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  text-align: center;
  background: rgb(0,0,0);
  background: linear-gradient(0deg, rgba(0,0,0,0.5690651260504201) 0%, rgba(217,4,61,1) 76%);
}

.titlechampionship{
  text-align: center;
}


</style>