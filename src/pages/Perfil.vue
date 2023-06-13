<script>
import {fetchDataFromApi} from '../helpers/apiHelper.js'

export default {
    data() {
        return {
            userId: this.$store.state.userId,
            logedUser: {},
            
        }
    },
    methods: {
      async getDataFromApi() {
        try {
          const data = await fetchDataFromApi(`https://apimotogp2023-production.up.railway.app/api/users/${this.userId}`);
          this.logedUser = data
        } catch (error) {
          console.error('Error al obtener los datos de la API:', error);
        }
      },
      verifyAuth(){
          if(!this.$store.state.isLoggedIn){
            this.$router.push(`/`)
          }
      }
    },
    created(){
        this.getDataFromApi();
        this.verifyAuth();

        
        
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