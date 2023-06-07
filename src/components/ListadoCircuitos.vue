<script>
import {fetchDataFromApi} from '../helpers/apiHelper.js'

export default {
    data() {
        return {  
            circuits: [],
            url: 'https://apimotogp2023-production.up.railway.app/api/circuitsMotoGP'
        }
    },
    mounted() {
      this.getDataFromApi();
    },
    methods: {
      async getDataFromApi() {
        try {
          const data = await fetchDataFromApi(this.url);
          this.circuits = data
        } catch (error) {
          console.error('Error al obtener los datos de la API:', error);
        }
      }
    }  
}
</script>

<template>
  <div
  v-for="(item, index) in circuits"
  class="cardcircuito"
  >
      <img :src="item.backImage" alt="Imagen del circuito" class="backImage" />
      <div class="infocircuit">
          <p>{{ item.country }}</p>
          <p>{{ item.circuit }}</p>
          <p>{{ item.start }} - {{ item.finish }}</p>
          <router-link :to="`/circuito/${item._id}`" class="buttoninfo">
            Informacion
          </router-link>
      </div>
      
  </div>
</template>

<style scoped>

a:link, a:visited, a:active {
  text-decoration: none;
}

.cardcircuito {
  background-color: #2b2e31;
  border-radius: 10px;
  border-color: #D9043D;
  color: white;
  font-size: 20px;
  display: flex;
  flex-direction: row;
  width: 80%;
}

.backImage{
  width: 40%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  filter: brightness(300%);
  
}

.infocircuit {
  text-align: center;
  margin-top: 12px;
  width: 100%;
  padding: 20px;
}

.buttoninfo{
  color: #D9043D;
}

@media (max-width: 1400px) {
  .cardcircuito {
    flex-direction: column;
    font-size: 20px;
  }

  .backImage {
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 0px;
  }

}

@media (max-width: 800px) {
  .cardcircuito {
    font-size: 15px;
  }

  .backImage {
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 0px;
  }


  
}
</style>
