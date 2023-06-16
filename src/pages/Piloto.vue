<script>
import {fetchDataFromApi} from '../helpers/apiHelper.js'

export default {
    data() {
        return {
            riderId: this.$route.params.id,
            category: this.$route.query.category,
            riderObject: {}
        }
    },
    methods: {
        async getDataFromApi() {
            console.log(this.riderId);
            console.log(this.category);
            console.log(`https://apimotogp2023-production.up.railway.app/api/riders${this.category}/${this.riderId}`);
        try {
          const data = await fetchDataFromApi(`https://apimotogp2023-production.up.railway.app/api/riders${this.category}/${this.riderId}`);
          this.riderObject = data
          console.log(this.riderObject);
        } catch (error) {
          console.error('Error al obtener los datos de la API:', error);
        }
      },
    },
    created() {
        this.getDataFromApi();
    },
}
</script>
<template>
    <div class="containerrider">
        <img :src="this.riderObject.image" alt="Imagen del piloto" class="riderimage" />
        <div class="inforider">
        <p class="ridername">{{ this.riderObject.name }}</p>
        <p>Pais: {{ this.riderObject.country }}</p>
        <p>Altura: {{ this.riderObject.height }} cm</p>
        <p>Fecha de nacimiento: {{ this.riderObject.dateOfBirth }}</p>
        <p>Moto: {{ this.riderObject.bike }}</p>
        <p>Equipo: {{ this.riderObject.team }}</p>
        <p>Poles en la categoria: {{ this.riderObject.poles }}</p>
        <p>Mundiales totales: {{ this.riderObject.worldChampionships }}</p>
      </div>
    </div>
</template>

<style scoped>
  .containerrider{
    color: white;
    flex-wrap: wrap;
    margin: auto;
    width: 60%;
    display: flex;
    justify-content: space-between;
    padding: 2rem;
    margin-top: 50px;
    background: rgb(0,0,0);
    background: linear-gradient(0deg, rgba(0,0,0,1) 50%, rgba(255,255,255,0) 100%);
    box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    margin-bottom: 100px;
  }
  .riderimage{
    width: 50%;
  }
  .inforider{
    margin-top: 50%;
  }
  @media (max-width: 1100px) {
  .containerrider {
    flex-direction: column;
    margin: auto;
    margin-bottom: 100px;
  }
  .riderimage{
    width: 80%;
    margin: auto;
  }
  .inforider{
    margin: auto;
    margin-top: 30px;
  }
}
</style>