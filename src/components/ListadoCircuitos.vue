<script>
import {fetchDataFromApi} from '../helpers/apiHelper.js'

export default {
    data() {
        return {  
            circuits: [],
            url: 'https://apimotogp2023-production.up.railway.app/api/circuitsMotoGP',
            showInfo: false,
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
      },
      toggleInfo(index) {
        this.showInfo = this.showInfo === index ? null : index;
      },
    }  
}
</script>

<template>
  <div v-for="(item, index) in circuits" :key="item._id" class="cardcircuit">
    <div class="card-content">
      <img :src="item.backImage" alt="Imagen del circuito" class="backImage" />
      <div class="infocircuit">
        <p>{{ item.country }}</p>
        <p>{{ item.circuit }}</p>
        <p>{{ item.start }} - {{ item.finish }}</p>
        <div class="toggle-button" @click="toggleInfo(index)">
          <i :class="['fa-solid', showInfo === index ? 'fa-angle-up' : 'fa-angle-down']"></i>
        </div>
      </div>
    </div>
    <transition name="slide">
      <div v-if="showInfo === index" class="additional-info">
        <img :src="item.image" alt="Imagen del trazado" class="trackImage" />
        <div class="textInfo">
          <p>Longitud: {{ item.length }} kilometros</p>
          <p>Curvas a Izquierdas: {{ item.leftCorners }} curvas</p>
          <p>Curvas a Derechas: {{ item.rightCorners }} curvas</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.cardcircuit {
  background-color: #2b2e31;
  border-radius: 10px;
  border-color: #d9043d;
  color: white;
  font-size: 20px;
  width: 80%;
  overflow: hidden;
  margin-bottom: 10px;
}

.card-content {
  display: flex;
}

.backImage {
  width: 40%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  filter: brightness(300%);
  transition: width 0.3s ease;
}

.infocircuit {
  text-align: center;
  margin-top: 12px;
  width: 100%;
  padding: 20px;
}

.toggle-button {
  color: #d9043d;
  cursor: pointer;
}

.additional-info {
  background-color: #2b2e31;
  padding: 20px;
  overflow: hidden;
  transition: max-height 0.3s ease;
  display: flex;
  justify-content: space-between;
  text-align: center;
}
.textInfo{
  width: 100%;
  font-size: 20px;
  margin-top: 68px;
}

.show {
  display: block;
}


.trackImage {
  width: 40%;
  border-radius: 5px;
}

@media (max-width: 1400px) {
  .card-content{
    flex-direction: column;
  }
  .backImage{
    width: 100%;
  }
  .additional-info{
    flex-direction: column;
  }
  .trackImage{
    margin: auto;
    width: 50%;
  }
}

</style>
