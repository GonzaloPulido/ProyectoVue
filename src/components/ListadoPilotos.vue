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
    <div
    v-for="(item, index) in riders"
    class="cardrider"
    >
        <img :src="item.image" alt="Imagen del piloto" class="riderimage" />
        <div class="inforider">
            <p>{{ item.name }}</p>
            <p>{{ item.country }}</p>
            <p>{{ item.height }}</p>
            <router-link :to="`/piloto/${item._id}`" class="buttoninfo">
            Informacion
          </router-link>
        </div>
        
    </div>
  </template>


<style scoped>
.riderimage{
    width: 20%;
}
</style>
