<script>
import {fetchDataFromApi} from '../helpers/apiHelper.js'

export default {
    data() {
        return {
            circuits: [],
            showInfo: false,
            userData: {},
            userId: this.$store.state.userId,
            goodWarning: false,
        }
    },
    methods: {
        async getDataFromApi() {
            try {
                const data = await fetchDataFromApi(`https://apimotogp2023-production.up.railway.app/api/users/${this.userId}`);
                this.userData = data;
                this.listaFavoritos(); // Llamar a listaFavoritos después de obtener los datos
            } catch (error) {
                console.error('Error al obtener los datos de la API:', error);
            }
        },
        async listaFavoritos() {
            if (this.userData.favorites) {
                for (let i = 0; i < this.userData.favorites.length; i++) {
                    let fav = this.userData.favorites[i];
                    
                    const data = await fetchDataFromApi(`https://apimotogp2023-production.up.railway.app/api/circuitsMotoGP/${fav}`);
                    this.circuits.push(data);
                }
            }
        },
        toggleInfo(index) {
        this.showInfo = this.showInfo === index ? null : index;
      },
      changeFlag(id){
        if(this.$store.state.isLoggedIn){
          if(this.userData.favorites){
            if(this.userData.favorites.indexOf(id) != -1){
              return true
            }return false
          }
        }else{
          return false;
        }
      },

      async clickFav(id){
        if(this.$store.state.isLoggedIn){
          if(this.userData.favorites){
            let posicion = this.userData.favorites.indexOf(id)
            this.userData.favorites.splice(posicion, 1);
            const data = await fetch(`https://apimotogp2023-production.up.railway.app/api/users/${this.userId}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.userData),
            });
            this.circuits = []
            this.listaFavoritos();
            return true
          }

        }else{
          this.goodWarning = true;
          setTimeout(() => {
            this.goodWarning = false;
            this.$router.push(`/login`)
          },2000)
          return false;
        }
      },
    
        verifyAuth(){
            if(!this.$store.state.isLoggedIn){
                this.$router.push(`/`)
            }
        },
    },
    created() {
        this.verifyAuth();
        this.getDataFromApi();
        
        
    },
    mounted() {
        
        this.changeFlag();
        
    },
}
</script>

<template>
    <!-- Pop Up Good -->
    <div class="popup" v-if="goodWarning">
          <div class="popup-content">
              <p>No estas logueado</p>
          </div>
    </div>
    <div class="circuitspage">
    <div v-for="(item, index) in circuits" v-if="this.circuits" :key="item._id" class="cardcircuit">
      <div class="card-content">
        <img :src="item.backImage" alt="Imagen del circuito" class="backImage" />
        <div class="infocircuit">
          <p class="circuitName">{{ item.circuit }}</p>
          <p>{{ item.country }}</p>
          <p>{{ item.start }}  a  {{ item.finish }}</p>
          <div class="toggle-button" @click="toggleInfo(index)">
            <i :class="['fa-solid', showInfo === index ? 'fa-angle-up' : 'fa-angle-down']"></i>
          </div>
          
          <div class="componentFav" @click="clickFav(item._id)"><i  v-if="changeFlag(item._id) == true" class="fa-solid fa-flag-checkered"></i>
            <i v-else class="fa-regular fa-flag"></i></div>
            
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
    <div v-else>
        <h1>No hay favoritos para mostrar</h1>
    </div>
    </div>
  </template>
  
  <style scoped>
  .circuitspage {
    background-color: #a4a4a4;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 7vh;
    gap: 0.1rem;
  }
  .circuitName{
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
  
  .componentFav{
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
  .textInfo{
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