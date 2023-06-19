<script>
import { fetchDataFromApi } from '../helpers/apiHelper.js';

export default {
  data() {
    return {
      circuits: [],
      url: 'https://apimotogp2023-production.up.railway.app/api/circuitsMotoGP',
      showInfo: false,
      userData: {},
      userId: this.$store.state.userId,
      goodWarning: false,
      searchTerm: '',
      selectedMonth: '',
      months: [
        'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre'
      ],
    };
  },
  created() {
    this.getDataFromApi();
  },
  mounted() {
    this.changeFlag();
    this.getDataFromUserId();
  },
  methods: {
    // Peticion a circitos
    async getDataFromApi() {
      try {
        const data = await fetchDataFromApi(this.url);
        this.circuits = data;
      } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
      }
    },
    // Peticion al usuario
    async getDataFromUserId() {
      try {
        const response = await fetchDataFromApi(`https://apimotogp2023-production.up.railway.app/api/users/${this.userId}`);
        this.userData = await response;
      } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
      }
    },
    searchCircuits() {
      if (this.searchTerm.trim() === '') {
        this.searchResults = []; 
      } else {
        this.searchResults = this.circuits.filter((item) =>
          item.circuit.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }
    },
    toggleInfo(index) {
      this.showInfo = this.showInfo === index ? null : index;
    },
    applyMonthFilter() {
      this.searchTerm = '';
    },
    // Funciones relacionadas con los favoritos
    changeFlag(id) {
      if (this.$store.state.isLoggedIn) {
        if (this.userData.favorites) {
          if (this.userData.favorites.indexOf(id) !== -1) {
            return true;
          }
          return false;
        }
      } else {
        return false;
      }
    },
    async clickFav(id) {
      if (this.$store.state.isLoggedIn) {
        if (this.userData.favorites) {
          if (this.userData.favorites.indexOf(id) !== -1) {
            const posicion = this.userData.favorites.indexOf(id);
            this.userData.favorites.splice(posicion, 1);
            const data = await fetch(`https://apimotogp2023-production.up.railway.app/api/users/${this.userId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(this.userData),
            });
            return true;
          } else {
            this.userData.favorites.push(id);
            const data = await fetch(`https://apimotogp2023-production.up.railway.app/api/users/${this.userId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(this.userData),
            });
          }
        }
      } else {
        this.goodWarning = true;
        setTimeout(() => {
          this.goodWarning = false;
          this.$router.push(`/login`);
        }, 2000);
        return false;
      }
    },
  },
  computed: {
    filteredCircuits() {
      let filteredData = this.circuits;
          
      // Filtro mes
      if (this.selectedMonth) {
        filteredData = filteredData.filter((item) => {
          const startDate = new Date(item.start);
          const startMonth = startDate.getMonth() + 1;

          // Quitar enero, febrero y diciembre
          return startMonth >= 3 && startMonth <= 11 && startMonth === this.selectedMonth+2;
        });
      }
      
      if (this.searchTerm.trim() !== '') {
        const searchTermLower = this.searchTerm.toLowerCase();
        filteredData = filteredData.filter((item) =>
          item.circuit.toLowerCase().includes(searchTermLower)
        );
      }

      return filteredData;
    },



  },
};
</script>

<template>
  <!-- Pop Up Good -->
  <div class="popup" v-if="goodWarning">
    <div class="popup-content">
      <p>No estás logueado</p>
    </div>
  </div>
  <div class="filtros">
    <div class="search-container">
      <input type="text" v-model="searchTerm" @input="searchCircuits" placeholder="Buscar circuito" />
    </div>
    <div class="filter-container">
      <select v-model="selectedMonth" @change="applyMonthFilter">
        <option value="">Todos los meses</option>
        <option v-for="(month, index) in months" :value="index + 1" :key="index">{{ month }}</option>
      </select>
    </div>
  </div>

  <div v-for="(item, index) in filteredCircuits" :key="item._id" class="cardcircuit">
    <div class="card-content">
      <img :src="item.backImage" alt="Imagen del circuito" class="backImage" />
      <div class="infocircuit">
        <p class="circuitName">{{ item.circuit }}</p>
        <p>{{ item.country }}</p>
        <p>{{ item.start }} a {{ item.finish }}</p>
        <div class="toggle-button" @click="toggleInfo(index)">
          <i :class="['fa-solid', showInfo === index ? 'fa-angle-up' : 'fa-angle-down']"></i>
        </div>
        <div class="componentFav" @click="clickFav(item._id)">
          <i v-if="changeFlag(item._id) === true" class="fa-solid fa-flag-checkered"></i>
          <i v-else class="fa-regular fa-flag"></i>
        </div>
      </div>
    </div>
    <transition name="slide">
      <div v-if="showInfo === index" class="additional-info">
        <img :src="item.image" alt="Imagen del trazado" class="trackImage" />
        <div class="textInfo">
          <p>Longitud: {{ item.length }} kilómetros</p>
          <p>Curvas a Izquierdas: {{ item.leftCorners }} curvas</p>
          <p>Curvas a Derechas: {{ item.rightCorners }} curvas</p>
        </div>
      </div>
    </transition>
  </div>
  <div v-if="filteredCircuits.length === 0">
    <h2>No hay carreras disponibles</h2>
  </div>
</template>

<style scoped>
.circuitName {
  font-weight: bold;
}

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

.componentFav {
  width: 13%;
  color: #d9043d;
  font-size: 25px;
  cursor: pointer;
  position: relative;
  left: 92%;
}

.infocircuit {
  text-align: center;
  margin-top: 12px;
  width: 100%;
  padding: 20px;
}

.toggle-button {
  width: 20%;
  margin: auto;
  color: #d9043d;
  cursor: pointer;
  font-size: 25px;
  position: relative;
  top: 40px;
}

.additional-info {
  background-color: #2b2e31;
  padding: 20px;
  overflow: hidden;
  transition: 0.3s ease;
  display: flex;
  justify-content: space-between;
  text-align: center;
}

.textInfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  width: 100%;
  font-size: 20px;
}

.show {
  display: block;
}

.trackImage {
  width: 40%;
  border-radius: 5px;
}

.search-container {
  margin-top: 20px;
  display: flex;
  align-items: center;
}

.search-container input[type="text"] {
  width: 200px;
  padding: 5px;
}

.filter-container {
  margin-bottom: 20px;
}

.filter-container select {
  padding: 5px;
  font-size: 16px;
}

.filtros{
  display: flex;
  justify-content: space-between;
}
.filter-container{
  margin-top: auto;
  margin-top: 38px;
  margin-left: 20px;
}

@media (max-width: 1400px) {
  .card-content {
    flex-direction: column;
  }
  .backImage {
    width: 100%;
  }
  .additional-info {
    flex-direction: column;
  }
  .trackImage {
    margin: auto;
    width: 50%;
  }
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-content {
  background-color: #fff;
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
}
</style>
