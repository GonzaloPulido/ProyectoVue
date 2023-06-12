<script>
  import { fetchDataFromApi } from '../helpers/apiHelper.js';

  export default {
    props: {
      category: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        teams: [],
      };
    },
    async mounted() {
      await this.getDataFromApi();
    },
    watch: {
      category: {
        immediate: true,
        handler() {
          this.getDataFromApi();
        },
      },
    },
    methods: {
      async getDataFromApi() {
        try {
          let url = '';

          if (this.category === 'MotoGP') {
            url = 'https://apimotogp2023-production.up.railway.app/api/teamsMotoGP';
          } else if (this.category === 'Moto2') {
            url = 'https://apimotogp2023-production.up.railway.app/api/teamsMoto2';
          } else if (this.category === 'Moto3') {
            url = 'https://apimotogp2023-production.up.railway.app/api/teamsMoto3';
          }

          
          const data = await fetchDataFromApi(url);
          this.teams = data;
          console.log(this.teams);
        } catch (error) {
          console.error('Error al obtener los datos de la API:', error);
        }
      },
    },
    render() {
      return null;
    },
  };
</script>

<template>
    <div
    v-for="(item, index) in teams"
    class="cardteam"
    >
        <img :src="item.image" alt="Imagen del piloto" class="teamimage" />
        <div class="infoteam">
            <p>{{ item.name }}</p>
            <router-link :to="`/piloto/${item.piloto1Id}`">
              <p>{{ item.piloto1 }}</p>
            </router-link>

            
            <router-link :to="`/piloto/${item.piloto2Id}`"> 
              <p>{{ item.piloto2 }}</p>
            </router-link>
        </div>
        
    </div>
  </template>


<style scoped>
.teamimage{
    width: 20%;
}
</style>
