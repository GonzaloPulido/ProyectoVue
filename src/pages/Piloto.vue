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
        <p>{{ this.riderObject.country }}</p>
        <p>{{ this.riderObject.height }}</p>
        <p>{{ this.riderObject.dateOfBirth }}</p>
        <p>{{ this.riderObject.bike }}</p>
        <p>{{ this.riderObject.team }}</p>
        <p>{{ this.riderObject.poles }}</p>
        <p>{{ this.riderObject.worldChampionships }}</p>
      </div>
    </div>
</template>
<style>
    
</style>