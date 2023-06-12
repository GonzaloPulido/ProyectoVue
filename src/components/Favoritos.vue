<script>
import { mapState} from 'vuex';
import {fetchDataFromApi} from '../helpers/apiHelper.js'

export default {
    props: {
        circuitId: {
            type: String,
            required: true,
        }
    },
    data(){
        return {
            userId : localStorage.getItem('logedUser'),
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
        updateFav(){
            if(this.isLoggedIn){
                console.log(this.logedUser.favorites);
                if(this.logedUser.favorites.includes(this.circuitId)){
                    console.log(this.circuitId);
                    console.log("Esta en favoritos");
                }else{
                    console.log("Añadiendo a favoritos");
                    console.log("No esta en favoritos",this.circuitId);
                }
            }else{
                console.log('No estas logueado');
            }
        },
        
    },
    computed: {
    ...mapState(['isLoggedIn'])
    },
    mounted() {
      this.getDataFromApi();
    },
}
</script>

<template lang="">
    <div class="buttonFav" @click="updateFav()">
        <i class="fa-regular fa-flag"></i>
    </div>
</template>

<style>
    .buttonFav {
        color: #d9043d;
    }
</style>