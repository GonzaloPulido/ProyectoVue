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
        riders: [],
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
            url = 'https://apimotogp2023-production.up.railway.app/api/ridersMotoGP';
          } else if (this.category === 'Moto2') {
            url = 'https://apimotogp2023-production.up.railway.app/api/ridersMoto2';
          } else if (this.category === 'Moto3') {
            url = 'https://apimotogp2023-production.up.railway.app/api/ridersMoto3';
          }

          
          const data = await fetchDataFromApi(url);
          this.riders = data;
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
  <div class="rider-list">
    <div
      v-for="(item, index) in riders"
      :key="index"
      class="cardrider"
    >
      <img :src="item.image" alt="Imagen del piloto" class="riderimage" />
      <div class="inforider">
        <p class="ridername">{{ item.name }}</p>
        <p>{{ item.country }}</p>
        <p>{{ item.height }}</p>
        <router-link :to="`/piloto/${item._id}?category=${this.category}`" class="buttoninfo" :category="this.category">
          Informacion
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>

a:link, a:visited, a:active {
  text-decoration: none;
}
.rider-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.cardrider {
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
.inforider{
  width: 50%;
  margin-top: 38%;
  text-align: right;
  margin-right: 20px;
  color: white;
}

.riderimage {
  width: 50%;
  margin-top: auto;
}

.buttoninfo{
  background-color: #D9043D;
  padding: 4px;
  border-radius: 5px;
  color: white;
}
.ridername{
  font-weight: bold;
  text-decoration: underline white;
}

</style>

