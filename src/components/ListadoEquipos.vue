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
  <div class="teamslist">
    <div
    v-for="(item, index) in teams"
    class="cardteam"
    >
        <img :src="item.image" alt="Imagen del piloto" class="teamimage" />
        <div class="infoteam">
            <p class="teamname">{{ item.name }}</p>
            <router-link :to="`/piloto/${item.piloto1Id}?category=${this.category}`">
              <p class="ridername">{{ item.piloto1 }}</p>
            </router-link>
            <router-link :to="`/piloto/${item.piloto2Id}?category=${this.category}`"> 
              <p class="ridername">{{ item.piloto2 }}</p>
            </router-link>
        </div>
    </div>
  </div>
</template>


<style scoped>
a:link, a:visited, a:active {
  text-decoration: none;
}
.teamslist{
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.cardteam{
  width: 31.3%; 
  min-width: 400px;
  margin: auto;
  margin-bottom: 30px;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  background: rgb(0,0,0);
  background: linear-gradient(0deg, rgba(0,0,0,1) 50%, rgba(255,255,255,0) 100%);
  display: flex;
  justify-content: space-between;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
}
.teamimage{
    width: 60%;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
}

.infoteam{
  width: 50%;
  text-align: right;
  margin-right: 10px;
  margin-top: 20%;
  color: white;
}
.ridername{
  color: white;
  text-decoration: underline white;
}
.teamname{
  font-weight: bold;
}
</style>
