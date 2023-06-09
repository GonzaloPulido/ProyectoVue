<script>
import {fetchDataFromApi} from '../helpers/apiHelper.js'

export default {
    data() {
        return {
            userId: localStorage.getItem('logedUser'),
            logedUser: {},
            
        }
    },
    methods: {
      async getDataFromApi() {
        console.log(this.userId)
        try {
          const data = await fetchDataFromApi(`https://apimotogp2023-production.up.railway.app/api/users/${this.userId}`);
          this.logedUser = data
          console.log(this.logedUser)
        } catch (error) {
          console.error('Error al obtener los datos de la API:', error);
        }
      }
    },
    created(){
        this.getDataFromApi();
    } 
}
</script>


<template>
    <div>Bienvenido a tu Perfil</div>
    <p>{{ logedUser.userName }}</p>
    <p>{{ logedUser.firstname }}</p>
    <p>{{ logedUser.surname }}</p>
    <p>{{ logedUser.email }}</p>
    <p>{{ logedUser.age }}</p>

</template>